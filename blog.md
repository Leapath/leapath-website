---
permalink: /blog/
layout: v2/default
title: "Insights & Blog — Leapath Placement Intelligence"
description: "Research, Career Services playbooks, case studies and guides from Leapath's Career Services desk."
canonical: "https://www.leapath.tech/blog/"
extra_css: /css/v2/blog.css
---

{% assign featured = site.v2_posts | where: "featured", true | first %}
{% assign posts = site.v2_posts | where_exp: "p", "p.featured != true" | sort: "date" | reverse %}

<div class="ph ph--purple" style="padding-bottom:3rem">
  <div class="container" style="position:relative;z-index:1">
    <div class="ph__eyebrow">Insights &amp; resources</div>
    <h1 class="ph__h1">For <em>Career Services teams</em> who think ahead.</h1>
    <p class="ph__sub">Research, playbooks, case studies, and tools, written by practitioners who've been inside Career Services teams, not consultants who observe from the outside.</p>
    <div class="blog-hero-grid">
      <div class="blog-hero-pill"><div class="blog-hero-pill__n">{{ site.v2_posts.size }}</div><div class="blog-hero-pill__l">Articles &amp; case studies</div></div>
      <div class="blog-hero-pill"><div class="blog-hero-pill__n">5</div><div class="blog-hero-pill__l">Institutions featured</div></div>
      <div class="blog-hero-pill"><div class="blog-hero-pill__n">3</div><div class="blog-hero-pill__l">Continents covered</div></div>
    </div>
  </div>
</div>

<section class="ip-section" style="padding-top:0">
  <div class="container">
    <a href="{{ featured.url }}" class="bfeat">
      <div class="bfeat__img"><svg class="icon" aria-hidden="true"><use href="#{{ featured.blog_img_icon | default: 'ic-bar-chart' }}"></use></svg></div>
      <div class="bfeat__body">
        <span class="bfeat__tag">Featured · 2026 Report</span>
        <div class="bfeat__t">{{ featured.title | remove: " — Leapath" }}</div>
        <p class="bfeat__d">{{ featured.description }}</p>
        <div class="bfeat__meta"><span>{{ featured.author }}</span><span>·</span><span>{{ featured.read_time }}</span><span>·</span><span>{{ featured.date | date: "%B %Y" }}</span></div>
        <span class="bfeat__cta">Read the full report <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4.5 12h14.5M13 6l6.5 6-6.5 6"/></svg></span>
      </div>
    </a>
  </div>
</section>

<section class="ip-section" style="padding-top:0">
  <div class="container">
    <div class="cs-filters" style="margin:0 0 0">
      <span class="cs-tab on" data-filter="all">All</span>
      <span class="cs-tab" data-filter="research">Research</span>
      <span class="cs-tab" data-filter="case-study">Case Studies</span>
      <span class="cs-tab" data-filter="playbook">TPO Playbooks</span>
      <span class="cs-tab" data-filter="guide">Student Guides</span>
      <span class="cs-tab" data-filter="recruiter">Recruiter Insights</span>
    </div>

    <div class="bgrid" id="blogGrid">
      {% for post in posts %}
      <a href="{{ post.url }}" class="bc" data-cat="{{ post.category }}">
        {% if post.category == "case-study" %}
        <div class="bc__img" style="background:{{ post.blog_cover_style }}"></div>
        {% else %}
        <div class="bc__img {{ post.blog_img_class }}"><svg class="icon" aria-hidden="true"><use href="#{{ post.blog_img_icon }}"></use></svg></div>
        {% endif %}
        <div class="bc__body">
          <div class="bc__tag">
            {% case post.category %}
            {% when "case-study" %}Case Study
            {% when "playbook" %}TPO Playbook
            {% when "guide" %}Student Guide
            {% when "recruiter" %}Recruiter Insights
            {% when "research" %}Research
            {% endcase %}
          </div>
          <div class="bc__t">{{ post.title | split: " — " | first }}</div>
          <div class="bc__meta"><div class="bc__av">{{ post.mono }}</div><span>{{ post.author }}</span><span>·</span><span>{{ post.read_time }}</span></div>
        </div>
      </a>
      {% endfor %}
    </div>
    <p class="cs-empty" style="display:none;text-align:center;color:var(--txt3);font-weight:600;padding:3rem 0">No articles in this category yet.</p>

    <div class="bnews">
      <div>
        <div class="bnews__t">Get the next report before anyone else.</div>
        <div class="bnews__sub">One email a month. Research, playbooks, and case studies from the Leapath desk — no noise.</div>
      </div>
      <form class="bnews__form" onsubmit="return false">
        <input type="email" placeholder="you@institution.edu" required>
        <button type="submit" class="btn btn-out" style="background:#fff;border-color:#fff">Subscribe</button>
      </form>
    </div>
  </div>
</section>

{% include v2/sections/reviews.html %}

<script>
(function(){
  var tabs = document.querySelectorAll('.cs-tab');
  var cards = document.querySelectorAll('#blogGrid .bc');
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
