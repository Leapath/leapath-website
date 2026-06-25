---
permalink: /partnership/
layout: default
title: "Partner with Leapath — Institutional Programme"
description: "Partner with Leapath — onboard your college or university to a co-built placement readiness layer. Apply for the institutional partnership programme."
keywords: "leapath partnership, institutional partnership, college partnership, placement intelligence, TPO collaboration"
robots: "index, follow"
canonical: "https://www.leapath.tech/partnership/"
og_title: "Partner with Leapath — Institutional Programme"
og_description: "Join a small, hand-picked cohort of partner institutions building the next layer of placement intelligence."
og_site_name: "Leapath"
og_locale: "en_IN"
twitter_title: "Partner with Leapath — Institutional Programme"
twitter_description: "Join a hand-picked cohort of colleges building the next layer of placement intelligence. Apply for the institutional partnership programme."
author: "Leapath Technology"
favicon_end_color: "%23F042FF"
nav_cta_text: "Apply Now"
nav_cta_href: "#partnership-form"
---


  <!-- ============================================================
       PAGE HERO
  ============================================================ -->
  <section class="page-hero" aria-labelledby="partnership-title">
    <div class="container">
      <div class="page-hero__inner">
        <div class="page-hero__eyebrow">Institutional Partnership Programme</div>
        <h1 class="page-hero__title" id="partnership-title">
          Build the next layer of placement readiness — with us.
        </h1>
        <p class="page-hero__sub">
          We partner with a small, hand-picked cohort of colleges and universities each semester. Partner institutions receive full platform access, priority support, and a direct line into the product roadmap.
        </p>
      </div>
    </div>
  </section>


  <!-- ============================================================
       BANNER IMAGE
  ============================================================ -->
  <div class="container">
    <div class="partnership-banner reveal">
      <img src="/assets/images/partnership-banner.jpg"
           alt="A historic university campus building framed by autumn leaves — representing the institutional partners Leapath works with."
           loading="lazy" />
      <div class="partnership-banner__caption">
        <strong>Currently onboarding</strong> &middot; Pilot cohort · Spring 2026
      </div>
    </div>
  </div>


  <!-- ============================================================
       INTRO + PILLARS
  ============================================================ -->
  <section class="section section--mid">
    <div class="container">

      <div class="partnership-intro reveal">
        <h2>Welcome, partner institutions.</h2>
        <p>
          Placement readiness has long been measured after the fact — once recruiters arrive, once offers are made, once the cohort has either succeeded or fallen short. Leapath flips that order. We give your TPO cell a continuous, structured view of where each student stands, what gap is in the way, and what it takes to close it before the season starts.
        </p>
        <p>
          The partnership programme is how forward-thinking institutions co-build that view with us. You get the platform at no cost during pilot. We get the rigour and feedback only a real placement cell can offer. The result is a tool that fits the way your institution actually runs — not a generic SaaS retrofit.
        </p>
      </div>

      <div class="partnership-pillars">
        <div class="partnership-pillar reveal">
          <span class="partnership-pillar__num">01 / Access</span>
          <h3>Full platform, zero cost</h3>
          <p>Pilot partners receive complete access to skill assessments, readiness scoring, recruiter matching, and the TPO dashboard — for the entire cohort.</p>
        </div>
        <div class="partnership-pillar reveal reveal-delay-1">
          <span class="partnership-pillar__num">02 / Voice</span>
          <h3>A seat in the roadmap</h3>
          <p>Quarterly partner reviews where your TPO team directly shapes what we build next. Features that move the needle for your institution get prioritised.</p>
        </div>
        <div class="partnership-pillar reveal reveal-delay-2">
          <span class="partnership-pillar__num">03 / Support</span>
          <h3>Priority onboarding</h3>
          <p>A dedicated implementation lead, hands-on training for your placement cell, and a direct support channel — not a ticket queue.</p>
        </div>
        <div class="partnership-pillar reveal reveal-delay-3">
          <span class="partnership-pillar__num">04 / Recognition</span>
          <h3>Founding partner status</h3>
          <p>Co-published case studies, benchmark inclusion in our annual placement-readiness report, and preferred terms when the platform graduates from pilot.</p>
        </div>
      </div>

    </div>
  </section>


  <!-- ============================================================
       PARTNERSHIP FORM
  ============================================================ -->
  <section class="section section--mid" id="partnership-form-wrap">
    <div class="container">

      <div class="partnership-form-wrap reveal" id="partnership-form-wrap-inner">
        <h2>Apply to partner with Leapath</h2>
        <p class="partnership-form-wrap__sub">
          Tell us about your institution. We review every application personally and respond within one business day. No forms vanish into a void.
        </p>

        <form id="partnership-form"
              class="contact-form"
              action="https://formspree.io/f/xnjwvwdq"
              method="POST"
              aria-labelledby="partnership-form-heading"
              data-leapath-form>

          <h3 id="partnership-form-heading" class="contact-form__heading" style="margin-bottom: 1.5rem;">Partnership enquiry</h3>

          <!-- Hidden field tags Formspree submissions by source so we can route them. -->
          <input type="hidden" name="form_source" value="partnership" />
          <input type="hidden" name="_subject" value="New partnership enquiry — Leapath" />

          <div class="form-row">
            <div class="form-field">
              <label for="pf-institution">Institution name <span aria-hidden="true">*</span></label>
              <input type="text" id="pf-institution" name="institution_name" required autocomplete="organization" />
            </div>
            <div class="form-field">
              <label for="pf-contact">Contact person <span aria-hidden="true">*</span></label>
              <input type="text" id="pf-contact" name="contact_person" required autocomplete="name" />
            </div>
          </div>

          <div class="form-row">
            <div class="form-field">
              <label for="pf-email">Email <span aria-hidden="true">*</span></label>
              <input type="email" id="pf-email" name="email" required autocomplete="email" />
            </div>
            <div class="form-field">
              <label for="pf-role">Role <span aria-hidden="true">*</span></label>
              <select id="pf-role" name="role" required>
                <option value="">Select your role</option>
                <option>TPO / Placement Head</option>
                <option>Principal / Director</option>
                <option>Dean / Vice-Chancellor</option>
                <option>Department Head</option>
                <option>Faculty</option>
                <option>Administration</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div class="form-field">
            <label for="pf-size">Institution size <span aria-hidden="true">*</span></label>
            <select id="pf-size" name="institution_size" required>
              <option value="">Select cohort size</option>
              <option>Under 500 students</option>
              <option>500 – 1,500</option>
              <option>1,500 – 5,000</option>
              <option>5,000 – 10,000</option>
              <option>10,000+</option>
            </select>
          </div>

          <div class="form-field">
            <label for="pf-message">Message</label>
            <textarea id="pf-message" name="message" rows="4" placeholder="Tell us about your placement cell, what you're hoping to solve, and any timeline constraints."></textarea>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary btn-lg">Submit partnership enquiry →</button>
            <p class="form-note">Reviewed personally. We respond within one business day.</p>
          </div>

          <div class="form-trust-strip">
            <span class="form-trust-item">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 1l5 2v4c0 3.5-2 6-5 8-3-2-5-4.5-5-8V3l5-2z"/></svg>
              Your details stay confidential
            </span>
            <span class="form-trust-item">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 8l4 4 8-8"/></svg>
              Used only to evaluate this enquiry
            </span>
            <span class="form-trust-item">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="8" cy="8" r="6"/><path d="M8 4v4l2 2"/></svg>
              Reply within 1 business day
            </span>
          </div>

          <div class="form-success" id="pf-success" role="status" aria-live="polite" hidden>
            Thank you — your partnership enquiry has been received. Our team will reach out within one business day.
          </div>
        </form>
      </div>

    </div>
  </section>