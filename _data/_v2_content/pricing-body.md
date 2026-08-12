---
slug: "pricing-body"
---
<section class="ip-section">
  <div class="container">
    <div class="ip-eyebrow" style="text-align:center">Choose your plan</div>
    <h1 class="ip-h2" style="text-align:center;margin-bottom:3.5rem">Pricing that scales <em>with your students, not your headcount.</em></h1>
    <div class="ip-3col" style="align-items:stretch">
      {% for tier in site.v2_pricing_tiers %}
      <div class="feat-card pt-card{% if tier.featured %} pt-card--featured{% endif %}">
        {% if tier.badge %}<div class="pt-badge">{{ tier.badge }}</div>{% endif %}
        <div class="ip-eyebrow pt-name">{{ tier.name }}</div>
        <div class="pt-price">{{ tier.price }}{% if tier.price_suffix %}<span class="pt-price-suffix">{{ tier.price_suffix }}</span>{% endif %}</div>
        <div class="pt-tagline">{{ tier.tagline }}</div>
        <div class="pt-features">
          {% for f in tier.features %}<div class="how__bullet"><div class="how__bico">✓</div>{{ f }}</div>
          {% endfor %}
        </div>
        <a href="{{ tier.cta_href }}" class="btn btn-{{ tier.cta_style }} btn-lg" style="width:100%;justify-content:center">{{ tier.cta_text }}</a>
      </div>
      {% endfor %}
    </div>
  </div>
</section>

<section class="ip-section ip-section--soft">
  <div class="container">
    <div class="ip-eyebrow" style="text-align:center">Common questions</div>
    <h2 class="ip-h2" style="text-align:center;margin-bottom:3rem">Pricing, <em>clarified.</em></h2>
    <div style="max-width:680px;margin:0 auto;background:var(--surf);border:1.5px solid var(--bd);border-radius:18px;padding:1.75rem 2rem">
      <div class="acc-item"><div class="acc-q">Is the pilot really free? <span>+</span></div><div class="acc-a">Yes. Full platform access at no cost for your first semester. No credit card, no limits.</div></div>
      <div class="acc-item"><div class="acc-q">How is the Growth plan billed? <span>+</span></div><div class="acc-a">Billed per 100 active students per month, with a discount if you pay yearly. No setup fees, no hidden add-ons.</div></div>
      <div class="acc-item"><div class="acc-q">What counts as an "active student"? <span>+</span></div><div class="acc-a">Any student with an active profile this term. Students who've graduated are removed automatically.</div></div>
      <div class="acc-item"><div class="acc-q">Can we switch plans later? <span>+</span></div><div class="acc-a">Yes, anytime. Start on Pilot, move to Growth, then Enterprise as your student numbers grow.</div></div>
      <div class="acc-item"><div class="acc-q">Do you offer discounts for public or non-profit institutions? <span>+</span></div><div class="acc-a">Yes. We offer reduced Growth pricing for government and non-profit institutions.</div></div>
    </div>
  </div>
</section>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is the pilot really free?","acceptedAnswer":{"@type":"Answer","text":"Yes. Full platform access at no cost for your first semester. No credit card, no limits."}},{"@type":"Question","name":"How is the Growth plan billed?","acceptedAnswer":{"@type":"Answer","text":"Billed per 100 active students per month, with a discount if you pay yearly. No setup fees, no hidden add-ons."}},{"@type":"Question","name":"What counts as an \"active student\"?","acceptedAnswer":{"@type":"Answer","text":"Any student with an active profile this term. Students who've graduated are removed automatically."}},{"@type":"Question","name":"Can we switch plans later?","acceptedAnswer":{"@type":"Answer","text":"Yes, anytime. Start on Pilot, move to Growth, then Enterprise as your student numbers grow."}},{"@type":"Question","name":"Do you offer discounts for public or non-profit institutions?","acceptedAnswer":{"@type":"Answer","text":"Yes. We offer reduced Growth pricing for government and non-profit institutions."}}]}</script>
