/* ============================================================
   animations.js
   --------------------------------------------------------------
   Tasteful motion. Two responsibilities:
     1. Hero intro orchestration. Body has class `preload` until
        fonts are ready; we then strip it and the staggered CSS
        cascade plays. Falls back gracefully on slow networks.
     2. Subtle parallax on elements with `[data-parallax]`. Uses
        rAF + IntersectionObserver — no scroll-listener tax.
   --------------------------------------------------------------
   Respects prefers-reduced-motion throughout.
============================================================ */
(function () {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Hero intro orchestration ---------- */
  function startIntro() {
    document.body.classList.remove('preload');
  }

  function bootIntro() {
    if (!document.body.classList.contains('preload')) return;

    if (reducedMotion) {
      // Skip the cascade entirely
      startIntro();
      return;
    }

    // Wait for fonts (so headlines don't flash in mid-anim) but cap at 1.2s
    const fontsReady = (document.fonts && document.fonts.ready)
      ? document.fonts.ready
      : Promise.resolve();

    const cap = new Promise((resolve) => setTimeout(resolve, 1200));

    Promise.race([fontsReady, cap]).then(() => {
      // Tiny additional rAF to ensure first paint has happened
      requestAnimationFrame(startIntro);
    });
  }

  /* ---------- 2. Parallax for [data-parallax] ---------- */
  function initParallax() {
    if (reducedMotion) return;

    const elements = document.querySelectorAll('[data-parallax]');
    if (elements.length === 0) return;

    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else                      visible.delete(entry.target);
        });
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    elements.forEach((el) => observer.observe(el));

    let ticking = false;
    function onScroll() {
      if (ticking || visible.size === 0) return;
      ticking = true;
      requestAnimationFrame(() => {
        const vh = window.innerHeight;
        visible.forEach((el) => {
          const rect = el.getBoundingClientRect();
          // Progress: -0.5 at top of viewport, 0 at center, 0.5 at bottom
          const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
          // Translate up to ±10px based on progress (gentle)
          const translate = -progress * 10;
          el.style.transform = `translateY(${translate.toFixed(2)}px)`;
        });
        ticking = false;
      });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial position
  }

  /* ---------- Boot ---------- */
  function boot() {
    bootIntro();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
