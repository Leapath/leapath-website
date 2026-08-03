---
permalink: /contact/
layout: v2/default
title: "Contact Us — Leapath"
description: "Get in touch with Leapath. We respond within one business day, every time."
canonical: "https://www.leapath.tech/contact/"
---

{% include v2/sections/page-hero.html tone="photo" style="background-image:url('/assets/images/partnership-banner.jpg');padding-bottom:3.5rem" eyebrow="Get in touch" title='We respond within <em>one business day.</em><br>Every time.' sub="No forms that vanish into a void. No automated reply sequences. When you write to us, a real person reads it and responds — usually the same day." btn1_text="Request a Demo" btn1_href="#contact-form" btn2_text="See Pricing" btn2_href="/pricing/" %}

<section class="ip-section">
  <div class="container">
    <div class="ip-2col" style="gap:4rem;align-items:flex-start">
      <div>
        <div class="ip-eyebrow">Send us a message</div>
        <h2 class="ip-h2" style="margin-bottom:2rem">Tell us what you <em>need.</em></h2>
        <form id="contact-form" class="cf" action="https://info.leapath.tech/api/contact" method="POST" enctype="multipart/form-data" aria-labelledby="contact-form-heading" data-leapath-form>
          <div class="cf-row">
            <div class="cf-field"><label for="cf-name">Your name *</label><input type="text" id="cf-name" name="tpo_name" placeholder="Dr. Ramesh Kumar" required autocomplete="name"/></div>
            <div class="cf-field"><label for="cf-email">Work email *</label><input type="email" id="cf-email" name="email" placeholder="tpo@institution.edu.in" required autocomplete="email"/></div>
          </div>
          <div class="cf-row">
            <div class="cf-field"><label for="cf-org">Institution / Organisation *</label><input type="text" id="cf-org" name="college" placeholder="PSG Tech, Coimbatore" required autocomplete="organization"/></div>
            <div class="cf-field"><label for="cf-mobile">Mobile *</label><input type="tel" id="cf-mobile" name="mobile" placeholder="+91 98765 43210" required autocomplete="tel" pattern="[0-9+\-\s]{7,}"/></div>
          </div>
          <div class="cf-row">
            <div class="cf-field"><label for="cf-students">No. of students</label><input type="text" id="cf-students" name="student_count" placeholder="e.g. 1,200"/></div>
            <div class="cf-field"><label for="cf-role">Your role</label><select id="cf-role" name="role"><option value="">Select role</option><option>TPO / Placement Head</option><option>Principal / Director</option><option>Dean</option><option>Faculty</option><option>Student</option><option>Employer / Recruiter</option><option>Other</option></select></div>
          </div>
          <div class="cf-field"><label for="cf-message">How can we help?</label><textarea id="cf-message" name="requirement" placeholder="Tell us about your institution, what you're looking to solve, or any questions about the platform..."></textarea></div>
          <button type="submit" class="btn btn-grad btn-xl" style="width:100%">Send message →</button>
          <p style="font-size:.75rem;color:var(--txt3);text-align:center;margin-top:.875rem;font-weight:600">We respond within 1 business day · Your data stays confidential</p>
          <div class="form-success" id="cf-success" role="status" aria-live="polite" hidden>Thank you — your message has been received. We'll respond within one business day.</div>
        </form>
      </div>
      <div style="display:flex;flex-direction:column;gap:1.25rem">
        <div class="ip-eyebrow">Other ways to reach us</div>
        <div class="ci-card"><div class="ci-card__ico"><svg class="icon" aria-hidden="true"><use href="#ic-mail"></use></svg></div><div class="ci-card__t">Email us directly</div><div class="ci-card__d"><a href="mailto:info@leapath.tech" style="color:var(--purple);font-weight:700;text-decoration:none">info@leapath.tech</a><br>For general enquiries, partnerships, and media.</div></div>
        <div class="ci-card"><div class="ci-card__ico"><svg class="icon" aria-hidden="true"><use href="#ic-phone"></use></svg></div><div class="ci-card__t">Book a call</div><div class="ci-card__d">30-minute product walkthroughs are available Mon–Fri, 10am–6pm IST. Use the form to request a slot.</div></div>
        <div style="background:var(--bgsoft);border:1.5px solid var(--bd);border-radius:18px;padding:1.75rem;margin-top:.5rem">
          <div style="font-size:.8rem;font-weight:800;color:var(--navy);margin-bottom:1.25rem">Common questions</div>
          <div class="acc-item"><div class="acc-q">How long does onboarding take? <span>+</span></div><div class="acc-a">Most institutions go live within 48 hours. We handle the full setup — you just confirm your recruiter list and batch details.</div></div>
          <div class="acc-item"><div class="acc-q">Is Leapath free for institutions? <span>+</span></div><div class="acc-a">Pilot institutions get full platform access at no cost for the first semester. Pricing for subsequent semesters is shared during the walkthrough.</div></div>
          <div class="acc-item"><div class="acc-q">Does it work with existing LMS systems? <span>+</span></div><div class="acc-a">Yes. Leapath integrates with most common LMS platforms via our API. Our team handles all integration work during onboarding.</div></div>
        </div>
      </div>
    </div>
  </div>
</section>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How long does onboarding take?","acceptedAnswer":{"@type":"Answer","text":"Most institutions go live within 48 hours. We handle the full setup, you just confirm your recruiter list and batch details."}},{"@type":"Question","name":"Is Leapath free for institutions?","acceptedAnswer":{"@type":"Answer","text":"Pilot institutions get full platform access at no cost for the first semester. Pricing for subsequent semesters is shared during the walkthrough."}},{"@type":"Question","name":"Does it work with existing LMS systems?","acceptedAnswer":{"@type":"Answer","text":"Yes. Leapath integrates with most common LMS platforms via our API. Our team handles all integration work during onboarding."}}]}</script>

{% include v2/sections/reviews.html %}

{% include v2/sections/cta.html bg_img="/assets/v2/images/insights/case-study.jpg" accent="violet" eyebrow="Still have questions?" title='Talk to a real person, <em>not a chatbot.</em>' sub="Book a 30-minute walkthrough and we'll answer every question live, no automated sequences, no waiting." btn1_text="Request a Demo" btn1_href="#contact-form" btn2_text="See Pricing" btn2_href="/pricing/" meta="Response within 1 business day · No commitment required" %}
