/* ============================================================
   forms.js
   --------------------------------------------------------------
   Handles client-side validation + submission for any form that
   opts in by carrying the `data-leapath-form` attribute. Existing
   inline form ids (contact-form, partnership-form) are also
   recognised, so this drops in without HTML changes.
   --------------------------------------------------------------
   Behaviour:
     - On submit: run native validation; bail on invalid.
     - If valid: POST to the form's `action` via fetch with JSON
       Accept header so the API returns JSON instead of redirecting.
       Show inline success state on 200; fall back to native submit
       on network error.
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
    form.reset();
    const successEl = form.querySelector('.form-success');
    const message = (successEl && successEl.textContent.trim()) || 'Your submission has been received.';

    if (window.Leapath && window.Leapath.thankYou) {
      window.Leapath.thankYou.open({ message });
    } else if (successEl) {
      // Fallback for the (unexpected) case the shared modal isn't on the page.
      successEl.hidden = false;
      successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    // Leave the form itself interactive so another submission (e.g. a second
    // enquiry) doesn't require a page refresh — only the button's transient
    // "sending" state needs resetting, handled in handleSubmit's finally path.
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
    const originalLabel = submitBtn ? submitBtn.dataset.originalLabel || submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.classList.add('is-loading');
      submitBtn.textContent = 'Sending…';
    }

    function resetButton() {
      if (!submitBtn) return;
      submitBtn.disabled = false;
      submitBtn.classList.remove('is-loading');
      submitBtn.textContent = originalLabel;
    }

    try {
      const response = await fetch(form.action, {
        method: form.method || 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      let json = null;
      try { json = await response.json(); } catch (_) { /* ignore */ }

      if (response.ok) {
        showSuccess(form);
        resetButton();
      } else {
        let msg = 'Something went wrong. Please try again or email us directly.';
        if (json) {
          if (json.error) {
            msg = json.error;
            // Highlight the specific field named by the API (422 responses)
            if (json.field) {
              const fieldEl = form.querySelector(`[name="${json.field}"]`);
              if (fieldEl) {
                fieldEl.style.borderColor = '#FF6B6B';
                fieldEl.style.boxShadow = '0 0 0 3px rgba(255,107,107,0.15)';
                fieldEl.focus();
                fieldEl.addEventListener('input', () => {
                  fieldEl.style.borderColor = '';
                  fieldEl.style.boxShadow = '';
                }, { once: true });
              }
            }
          } else if (json.errors && json.errors.length) {
            msg = json.errors.map((err) => err.message).join(' ');
          }
        }
        showError(form, msg);
        resetButton();
      }
    } catch (err) {
      showError(form, 'Something went wrong. Please try again or email us directly.');
      resetButton();
    }
  }

  function init() {
    const forms = findForms();
    forms.forEach((form) => {
      form.setAttribute('novalidate', 'novalidate');
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) submitBtn.dataset.originalLabel = submitBtn.textContent;
      form.addEventListener('submit', (e) => handleSubmit(e, form));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
