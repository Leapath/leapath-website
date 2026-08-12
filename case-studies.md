---
permalink: /case-studies/
layout: v2/default
title: "Case Studies — Leapath Placement Intelligence"
description: "How public universities, private universities, multi-campus networks, and specialized institutes used Leapath to lift job readiness outcomes."
canonical: "https://www.leapath.tech/case-studies/"
---

{% assign case_studies = site.v2_case_studies | sort: "date" | reverse %}

<div class="cs-hero">
  <div class="container cs-hero__inner">
    <div class="cs-hero__eyebrow"><svg class="icon" aria-hidden="true"><use href="#ic-trophy"></use></svg>Customer stories</div>
    <h1 class="cs-hero__h1">Real institutions. <em>Real job readiness outcomes.</em></h1>
    <p class="cs-hero__sub">Universities, colleges, and multi-campus networks. Every case study here is a Career Services team that moved a real number, in one hiring cycle.</p>
    <div class="cs-hero__ctas">
      <a href="/contact/" class="btn btn-grad btn-xl">Book a Free Demo →</a>
      <a href="/partnership/" class="btn btn-out btn-xl">Apply for the Pilot</a>
    </div>
    <div class="cs-hero__stats">
      <div><div class="cs-hero__stat-n"><span>{{ case_studies.size }}</span></div><div class="cs-hero__stat-l">Featured institutions</div></div>
      <div><div class="cs-hero__stat-n"><span>+34%</span></div><div class="cs-hero__stat-l">Average job readiness uplift</div></div>
      <div><div class="cs-hero__stat-n"><span>90d</span></div><div class="cs-hero__stat-l">Median early-warning lead</div></div>
    </div>
  </div>
</div>

<section class="ip-section">
  <div class="container">
    <div class="cs-filters">
      <span class="cs-tab on" data-filter="all">All</span>
      <span class="cs-tab" data-filter="public">Public Universities</span>
      <span class="cs-tab" data-filter="private">Private Universities</span>
      <span class="cs-tab" data-filter="multi-campus">Multi-Campus Networks</span>
      <span class="cs-tab" data-filter="specialized">Specialized Institutes</span>
    </div>

    <div class="cs-grid">
      {% for cs in case_studies %}
      <a href="{{ cs.url }}" class="cs-card" data-cat="{{ cs.cs_category }}">
        <div class="cs-card__cover {{ cs.cs_cover_class }}">
          <span class="cs-card__badge">{{ cs.cs_badge }}</span>
          <div class="cs-card__mono">{{ cs.mono }}</div>
        </div>
        <div class="cs-card__body">
          <div class="cs-card__inst">{{ cs.institution }}</div>
          <div class="cs-card__t">{{ cs.title | split: " — " | first }}</div>
          <div class="cs-card__stat"><span class="cs-card__stat-n">{{ cs.cs_stat_n }}</span><span class="cs-card__stat-l">{{ cs.cs_stat_l }}</span></div>
          <div class="cs-card__cta">Read the story →</div>
        </div>
      </a>
      {% endfor %}
    </div>
    <p class="cs-empty" style="display:none;text-align:center;color:var(--txt3);font-weight:600;padding:3rem 0">No case studies in this category yet.</p>
    <nav class="cs-pagination" id="csPagination" aria-label="Case studies pages"></nav>
  </div>
</section>

{% include v2/sections/reviews.html %}

<section class="ip-section">
  <div class="container">
    <div class="ip-cta ip-cta--photo" style="--cta-img:url('/assets/images/role.webp');--cta-em-grad:linear-gradient(90deg,var(--lavender),#7C3AED);--cta-btn-grad:linear-gradient(135deg,#5B2D9E 0%,#4C1D95 100%);--cta-btn-grad-h:linear-gradient(135deg,#6B3AB8 0%,#5B21B6 100%);--cta-btn-shadow:rgba(76,29,149,.45);--cta-glow1:rgba(124,58,237,.20);--cta-glow2:rgba(91,45,158,.20);">
      <div class="ip-cta__eyebrow">Ready when you are</div>
      <div class="ip-cta__t">Want to be our <em>next case study?</em></div>
      <div class="ip-cta__sub">Join the current pilot cohort and we'll build your placement season's numbers together.</div>
      <div class="ip-cta__btns"><a href="/partnership/" class="btn btn-grad btn-xl">Apply for the pilot →</a></div>
    <div class="ip-cta__meta">No commitment required · Response within 1 business day</div>
    </div>
  </div>
</section>

<script>
(function(){
  var PAGE_SIZE = 6;
  var tabs = document.querySelectorAll('.cs-tab');
  var cards = Array.prototype.slice.call(document.querySelectorAll('.cs-grid .cs-card'));
  var empty = document.querySelector('.cs-empty');
  var pagination = document.getElementById('csPagination');
  var currentFilter = 'all';
  var currentPage = 1;

  function matching(){
    return cards.filter(function(card){
      return currentFilter === 'all' || card.getAttribute('data-cat') === currentFilter;
    });
  }

  function render(){
    var visible = matching();
    var totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
    if(currentPage > totalPages) currentPage = totalPages;

    cards.forEach(function(card){ card.style.display = 'none'; });
    visible.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE).forEach(function(card){
      card.style.display = '';
    });
    empty.style.display = visible.length === 0 ? 'block' : 'none';
    renderPagination(totalPages);
  }

  function renderPagination(totalPages){
    pagination.innerHTML = '';
    if(totalPages <= 1) return;

    function makeBtn(label, page, opts){
      opts = opts || {};
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cs-page' + (opts.active ? ' is-active' : '') + (opts.nav ? ' cs-page--nav' : '');
      btn.textContent = label;
      if(opts.disabled){ btn.disabled = true; }
      else{
        btn.addEventListener('click', function(){
          currentPage = page;
          render();
          document.querySelector('.cs-filters').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
      return btn;
    }

    pagination.appendChild(makeBtn('← Prev', currentPage - 1, { nav: true, disabled: currentPage === 1 }));
    for(var i = 1; i <= totalPages; i++){
      pagination.appendChild(makeBtn(String(i), i, { active: i === currentPage }));
    }
    pagination.appendChild(makeBtn('Next →', currentPage + 1, { nav: true, disabled: currentPage === totalPages }));
  }

  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('on'); });
      tab.classList.add('on');
      currentFilter = tab.getAttribute('data-filter');
      currentPage = 1;
      render();
    });
  });

  render();
})();
</script>
