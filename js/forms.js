/* ============================================================
   forms.js
   --------------------------------------------------------------
   Handles client-side validation + Formspree submission for any
   form that opts in by carrying the `data-leapath-form` attribute.
   Existing inline form ids (contact-form, partnership-form) are
   also recognised, so this drops in without HTML changes.
   --------------------------------------------------------------
   Behaviour:
     - On submit: run native validation; bail on invalid.
     - If valid: POST to the form's `action` (Formspree) via fetch
       with JSON Accept header so Formspree returns JSON instead
       of redirecting. Show inline success state on 200; fall back
       to native submit on network error.
============================================================ */
(function () {
  'use strict';

  function findForms() {
    const explicit = Array.from(document.querySelectorAll('[data-leapath-form]'));
    const byId = ['contact-form', 'partnership-form']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    // Dedupe
    const seen = new Set();
    return [...explicit, ...byId].filter((el) => {
      if (seen.has(el)) return false;
      seen.add(el);
      return true;
    });
  }

  function showSuccess(form) {
    const successEl = form.querySelector('.form-success');
    if (successEl) {
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // Disable the form to prevent re-submission
    Array.from(form.elements).forEach((el) => {
      if (el.tagName !== 'BUTTON' && !el.disabled) el.setAttribute('readonly', 'readonly');
    });
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = '✓ Received';
    }
  }

  function showError(form, message) {
    let errorEl = form.querySelector('.form-error');
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'form-error';
      errorEl.setAttribute('role', 'alert');
      errorEl.style.cssText =
        'margin-top:1rem;padding:0.85rem 1rem;background:rgba(255,107,107,0.1);' +
        'border:1px solid rgba(255,107,107,0.3);border-radius:8px;color:#FFB3B3;font-size:0.9rem;';
      form.appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  async function handleSubmit(e, form) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
    }

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (response.ok) {
        showSuccess(form);
      } else {
        // Try to surface a useful error from Formspree
        let msg = 'Something went wrong. Please try again or email us directly.';
        try {
          const data = await response.json();
          if (data && data.errors && data.errors.length) {
            msg = data.errors.map((err) => err.message).join(' ');
          }
        } catch (_) { /* ignore */ }
        showError(form, msg);
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalLabel;
        }
      }
    } catch (err) {
      // Network failure — fall back to native form submission
      showError(form, 'Network issue — retrying via standard submission.');
      if (submitBtn) submitBtn.disabled = false;
      // Allow standard submit as fallback
      setTimeout(() => form.submit(), 250);
    }
  }

  function init() {
    const forms = findForms();
    forms.forEach((form) => {
      form.setAttribute('novalidate', 'novalidate');
      form.addEventListener('submit', (e) => handleSubmit(e, form));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
