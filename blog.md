---
permalink: /blog/
layout: v2/default
title: "Insights & Blog — Leapath Placement Intelligence"
description: "Research, Career Services playbooks, case studies and tools from Leapath's Career Services desk."
canonical: "https://www.leapath.tech/blog/"
extra_css: /css/v2/blog.css
---

{% assign featured = site.v2_blog | where: "permalink", "/blog/university-strategies-employability-skill-gap/" | first %}
{% assign other_posts = site.v2_blog | where_exp: "p", "p.permalink != featured.permalink" | sort: "date" | reverse %}

{% include v2/sections/page-hero.html tone="photo" style="background-image:url('/assets/v2/images/insights/case-study.jpg')" eyebrow="Insights &amp; resources" title='For <em>Career Services teams</em> who think ahead.' sub="Research, playbooks, case studies, and tools, written by practitioners who've been inside Career Services teams, not consultants who observe from the outside." btn1_text="Request a Demo" btn1_href="/contact/" btn2_text="See Pricing" btn2_href="/pricing/" stat1_n="5" stat1_l="Articles &amp; guides" stat2_n="5" stat2_l="Institutions featured" stat3_n="3" stat3_l="Continents covered" %}

<section class="ip-section">
  <div class="container">
    <a href="{{ featured.url }}" class="bfeat">
      <img class="bfeat__img" src="/assets/v2/images/blogs/university-strategies-employability-skill-gap/hero.jpg" alt="University lecture hall with students, representing curriculum and employability strategy">
      <div class="bfeat__body">
        <span class="bfeat__tag">Featured · Guide</span>
        <div class="bfeat__t">{{ featured.title | remove: " — Leapath" }}</div>
        <p class="bfeat__d">{{ featured.description }}</p>
        <div class="bfeat__meta"><span>{{ featured.author }}</span><span>·</span><span>{{ featured.read_time }}</span><span>·</span><span>{{ featured.date | date: "%B %Y" }}</span></div>
        <span class="bfeat__cta">Read the full article <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M4.5 12h14.5M13 6l6.5 6-6.5 6"/></svg></span>
      </div>
    </a>
    <div class="bgrid ip-3col" style="margin-top:1.5rem">
      {% for post in other_posts %}
      <a href="{{ post.url }}" class="bc">
        <div class="bc__img" style="background-image:url('{{ post.og_image }}');background-size:cover;background-position:center"></div>
        <div class="bc__body">
          <div class="bc__tag">{{ post.eyebrow }}</div>
          <div class="bc__t">{{ post.h1 }}</div>
          <div class="bc__meta"><div class="bc__av">{{ post.mono }}</div><span>{{ post.author }}</span><span>·</span><span>{{ post.read_time }}</span></div>
        </div>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

{% include v2/sections/reviews.html %}

{% include v2/sections/cta.html bg_img="/assets/v2/images/roles/employers.jpg" accent="violet" eyebrow="Stay in the loop" title='Get the next article <em>before anyone else.</em>' sub="One email a month. Research, playbooks, and guides from the Leapath desk — no noise." btn1_text="Subscribe for Updates" btn1_href="/contact/" btn2_text="See Pricing" btn2_href="/pricing/" meta="No spam · Unsubscribe anytime" %}
