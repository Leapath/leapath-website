/* ============================================================
   region-selector.js
   --------------------------------------------------------------
   First-visit region/country selector.
     1. Renders a modal once if the user has never picked a region
        (localStorage key: `leapath.region`).
     2. Saves the selection.
     3. Shows a transient confirmation banner.
     4. Exposes a global `Leapath.region` API so future region-
        scoped content modules can subscribe and dynamically
        re-render when the region changes.
   --------------------------------------------------------------
   Future work hook:
     window.Leapath.region.onChange((newRegion) => { ... })
   --------------------------------------------------------------
   The modal markup is injected by JS so every page picks it up
   automatically — no HTML edits required when adding new pages.
============================================================ */
(function () {
  'use strict';

  const STORAGE_KEY = 'leapath.region';
  const STORAGE_DISMISS_KEY = 'leapath.region.dismissed';

  const REGIONS = [
    { code: 'IN', label: 'India',       flag: '🇮🇳', desc: 'Default region · INR' },
    { code: 'EU', label: 'Europe',      flag: '🇪🇺', desc: 'GDPR-aligned · EUR' },
    { code: 'ME', label: 'Middle East', flag: '🌍', desc: 'GCC institutions · USD' }
  ];

  /* ---------- Storage helpers (defensive: localStorage can throw) ---------- */
  function safeGet(key) {
    try { return window.localStorage.getItem(key); } catch (_) { return null; }
  }
  function safeSet(key, value) {
    try { window.localStorage.setItem(key, value); return true; } catch (_) { return false; }
  }

  /* ---------- Subscriber registry ---------- */
  const subscribers = [];
  function notify(region) {
    subscribers.forEach((fn) => {
      try { fn(region); } catch (_) { /* isolate failures */ }
    });
  }

  /* ---------- Premium region transition ---------- */
  function playRegionTransition() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let wash = document.querySelector('.region-transition');
    if (!wash) {
      wash = document.createElement('div');
      wash.className = 'region-transition';
      wash.setAttribute('aria-hidden', 'true');
      document.body.appendChild(wash);
    }

    requestAnimationFrame(() => {
      wash.classList.add('is-active');
      setTimeout(() => {
        wash.classList.remove('is-active');
        setTimeout(() => wash.remove(), 600);
      }, 400);
    });
  }

  /* ---------- Confirmation banner ---------- */
  function showBanner(regionCode) {
    const region = REGIONS.find((r) => r.code === regionCode);
    if (!region) return;

    // Remove any existing banner
    const existing = document.querySelector('.region-banner');
    if (existing) existing.remove();

    const banner = document.createElement('div');
    banner.className = 'region-banner';
    banner.setAttribute('role', 'status');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML = `
      <span class="region-banner__icon" aria-hidden="true">✓</span>
      <span class="region-banner__text">
        Region set to <strong>${region.label}</strong>
      </span>
      <button type="button" class="region-banner__change" aria-label="Change region">Change</button>
      <button type="button" class="region-banner__close" aria-label="Dismiss notification">×</button>
    `;
    document.body.appendChild(banner);

    // Trigger transition
    requestAnimationFrame(() => banner.classList.add('is-visible'));

    const closeBanner = () => {
      banner.classList.remove('is-visible');
      setTimeout(() => banner.remove(), 400);
    };

    banner.querySelector('.region-banner__close').addEventListener('click', closeBanner);
    banner.querySelector('.region-banner__change').addEventListener('click', () => {
      closeBanner();
      openModal();
    });

    // Auto-dismiss after 5s
    setTimeout(closeBanner, 5000);
  }

  /* ---------- Modal ---------- */
  let modalEl = null;

  function buildModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement('div');
    modalEl.className = 'region-modal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-labelledby', 'region-modal-title');
    modalEl.setAttribute('aria-hidden', 'true');

    const buttons = REGIONS.map(
      (r) => `
      <li>
        <button type="button" class="region-modal__btn" data-region="${r.code}">
          <span class="region-modal__btn-flag" aria-hidden="true">${r.flag}</span>
          <span class="region-modal__btn-label">
            <span style="display:block;font-weight:600">${r.label}</span>
            <span style="display:block;font-size:0.78rem;color:var(--text-dim);margin-top:2px">${r.desc}</span>
          </span>
          <span class="region-modal__btn-arrow" aria-hidden="true">→</span>
        </button>
      </li>`
    ).join('');

    modalEl.innerHTML = `
      <div class="region-modal__panel">
        <div class="region-modal__logo">Leapath<span>.</span></div>
        <h2 class="region-modal__title" id="region-modal-title">Choose your region</h2>
        <p class="region-modal__sub">
          We'll tailor compliance, currency and regional contacts to where your institution is based.
        </p>
        <ul class="region-modal__list">${buttons}</ul>
        <div class="region-modal__foot">
          <button type="button" class="region-modal__skip" aria-label="Skip region selection">
            I'll decide later
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modalEl);

    // Wire up buttons
    modalEl.querySelectorAll('.region-modal__btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const code = btn.getAttribute('data-region');
        setRegion(code);
        closeModal();
        playRegionTransition();
        showBanner(code);
      });
    });

    // Skip
    modalEl.querySelector('.region-modal__skip').addEventListener('click', () => {
      safeSet(STORAGE_DISMISS_KEY, '1');
      closeModal();
    });

    // Backdrop click closes modal (treated as skip)
    modalEl.addEventListener('click', (e) => {
      if (e.target === modalEl) {
        safeSet(STORAGE_DISMISS_KEY, '1');
        closeModal();
      }
    });

    // Esc to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) {
        safeSet(STORAGE_DISMISS_KEY, '1');
        closeModal();
      }
    });

    return modalEl;
  }

  function openModal() {
    buildModal();
    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    // Focus first option
    setTimeout(() => {
      const firstBtn = modalEl.querySelector('.region-modal__btn');
      if (firstBtn) firstBtn.focus();
    }, 60);
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------- Public API ---------- */
  function setRegion(code) {
    const valid = REGIONS.some((r) => r.code === code);
    if (!valid) return false;
    safeSet(STORAGE_KEY, code);
    document.documentElement.setAttribute('data-region', code);
    notify(code);
    return true;
  }

  function getRegion() {
    return safeGet(STORAGE_KEY);
  }

  /* ---------- Boot ---------- */
  function boot() {
    const stored = getRegion();
    if (stored) {
      // Apply on every page load so future region-scoped CSS / JS can react.
      document.documentElement.setAttribute('data-region', stored);
      notify(stored);
      return;
    }

    // Don't re-prompt if user actively skipped on a previous visit.
    if (safeGet(STORAGE_DISMISS_KEY) === '1') return;

    // Slight delay so the page paints first
    setTimeout(openModal, 600);
  }

  // Expose minimal API for future region-scoped content modules.
  window.Leapath = window.Leapath || {};
  window.Leapath.region = {
    get: getRegion,
    set: setRegion,
    open: openModal,
    list: () => REGIONS.slice(),
    onChange: (fn) => { if (typeof fn === 'function') subscribers.push(fn); }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
