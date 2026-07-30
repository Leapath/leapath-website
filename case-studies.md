---
permalink: /case-studies/
layout: v2/default
title: "Case Studies — Leapath Placement Intelligence"
description: "How public universities, private universities, multi-campus networks, and specialized institutes used Leapath to lift job readiness outcomes — in their own numbers."
canonical: "https://www.leapath.tech/case-studies/"
---

{% assign case_studies = site.v2_posts | where: "category", "case-study" | sort: "date" | reverse %}

<div class="cs-hero">
  <div class="container cs-hero__inner">
    <div class="cs-hero__eyebrow">Customer stories</div>
    <h1 class="cs-hero__h1">Real institutions.<br><em>Real job readiness outcomes.</em></h1>
    <p class="cs-hero__sub">Universities, colleges, and multi-campus networks. Every case study here is a Career Services team that moved a real number, in one hiring cycle.</p>
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

    <div class="ip-cta" style="margin-top:5rem">
      <div class="ip-cta__t">Want to be our <em>next case study?</em></div>
      <div class="ip-cta__sub">Join the current pilot cohort and we'll build your placement season's numbers together.</div>
      <div class="ip-cta__btns"><a href="/partnership/" class="btn btn-grad btn-xl">Apply for the pilot →</a></div>
    </div>
  </div>
</section>

<script>
(function(){
  var tabs = document.querySelectorAll('.cs-tab');
  var cards = document.querySelectorAll('.cs-grid .cs-card');
  var empty = document.querySelector('.cs-empty');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('on'); });
      tab.classList.add('on');
      var filter = tab.getAttribute('data-filter');
      var visible = 0;
      cards.forEach(function(card){
        var show = filter === 'all' || card.getAttribute('data-cat') === filter;
        card.style.display = show ? '' : 'none';
        if(show) visible++;
      });
      empty.style.display = visible === 0 ? 'block' : 'none';
    });
  });
})();
</script>
