/* ============================================================
   auth.js
   --------------------------------------------------------------
   UI-only auth experience for Leapath. Provides:
     - Login dropdown (Student vs TPO) attached to .login-dropdown
     - Auth modal with three modes: login | signup | forgot
     - Role context preserved across mode switches
   --------------------------------------------------------------
   No backend wiring on purpose. The submit handler shows a
   "pre-launch" notice and exposes a small API for a future
   Supabase / Firebase integration:

     window.Leapath.auth.open({ role: 'student', mode: 'login' })
     window.Leapath.auth.onSubmit((payload) => { ... })

   When the real backend lands, replace the noop in handleSubmit
   with the actual call. Nothing else needs to change.
============================================================ */
(function () {
  'use strict';

  const ROLES = {
    student: { label: 'Student',          context: 'Access your placement readiness profile and assessments.' },
    tpo:     { label: 'TPO / Placement',  context: 'Open the institutional dashboard and cohort intelligence.' }
  };

  const MODES = {
    login:  { title: 'Welcome back',           cta: 'Log in',         alt: { copy: "Don't have an account?", action: 'Create one', target: 'signup' } },
    signup: { title: 'Create your account',    cta: 'Create account', alt: { copy: 'Already registered?',     action: 'Log in',     target: 'login'  } },
    forgot: { title: 'Reset your password',    cta: 'Send reset link',alt: { copy: 'Remembered it?',          action: 'Back to log in', target: 'login' } }
  };

  /* ---------- Subscriber registry (future Supabase/Firebase hook) ---------- */
  const submitListeners = [];
  function notifySubmit(payload) {
    submitListeners.forEach((fn) => { try { fn(payload); } catch (_) {} });
  }

  /* ---------- Modal state ---------- */
  let modalEl = null;
  let currentRole = 'student';
  let currentMode = 'login';

  function buildModal() {
    if (modalEl) return modalEl;

    modalEl = document.createElement('div');
    modalEl.className = 'auth-modal';
    modalEl.setAttribute('role', 'dialog');
    modalEl.setAttribute('aria-modal', 'true');
    modalEl.setAttribute('aria-labelledby', 'auth-modal-title');
    modalEl.setAttribute('aria-hidden', 'true');
    modalEl.innerHTML = `
      <div class="auth-modal__panel">
        <button type="button" class="auth-modal__close" aria-label="Close">×</button>

        <div class="auth-tabs" role="tablist" aria-label="Choose role">
          <button type="button" class="auth-tab" role="tab" data-role="student">Student</button>
          <button type="button" class="auth-tab" role="tab" data-role="tpo">TPO</button>
        </div>

        <h2 class="auth-modal__title" id="auth-modal-title">Welcome back</h2>
        <p class="auth-modal__sub" data-context></p>

        <div class="auth-modal__banner">
          <strong>Coming soon —</strong> authentication launches with the pilot. Use this form to register interest; we'll send sign-in details when your institution is onboarded.
        </div>

        <form class="auth-form" novalidate>

          <div class="auth-field" data-field="name">
            <label for="auth-name">Full name</label>
            <input type="text" id="auth-name" name="name" autocomplete="name" />
          </div>

          <div class="auth-field" data-field="institution">
            <label for="auth-institution">Institution</label>
            <input type="text" id="auth-institution" name="institution" autocomplete="organization" />
          </div>

          <div class="auth-field">
            <label for="auth-email">Email</label>
            <input type="email" id="auth-email" name="email" autocomplete="email" required />
          </div>

          <div class="auth-field" data-field="password">
            <label for="auth-password">Password</label>
            <input type="password" id="auth-password" name="password" autocomplete="current-password" />
          </div>

          <div class="auth-form__row-between" data-field="row-between">
            <label>
              <input type="checkbox" name="remember" /> Remember me
            </label>
            <button type="button" class="auth-form__forgot" data-mode-switch="forgot" style="background:none;border:none;color:var(--accent);font:inherit;cursor:pointer;font-weight:600;">Forgot password?</button>
          </div>

          <button type="submit" class="auth-form__submit">Log in</button>

          <div class="auth-form__footer">
            <span data-alt-copy>Don't have an account?</span>
            <button type="button" data-mode-switch="signup" data-alt-action>Create one</button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modalEl);

    // Close handlers
    modalEl.querySelector('.auth-modal__close').addEventListener('click', closeModal);
    modalEl.addEventListener('click', (e) => { if (e.target === modalEl) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalEl.classList.contains('is-open')) closeModal();
    });

    // Role tabs
    modalEl.querySelectorAll('.auth-tab').forEach((tab) => {
      tab.addEventListener('click', () => setRole(tab.dataset.role));
    });

    // Mode switchers
    modalEl.addEventListener('click', (e) => {
      const switcher = e.target.closest('[data-mode-switch]');
      if (switcher) {
        e.preventDefault();
        setMode(switcher.dataset.modeSwitch);
      }
    });

    // Submit
    modalEl.querySelector('form').addEventListener('submit', handleSubmit);

    return modalEl;
  }

  function syncUI() {
    if (!modalEl) return;

    // Role tabs active state
    modalEl.querySelectorAll('.auth-tab').forEach((tab) => {
      tab.classList.toggle('is-active', tab.dataset.role === currentRole);
      tab.setAttribute('aria-selected', tab.dataset.role === currentRole);
    });

    // Title + context line
    const mode = MODES[currentMode];
    const role = ROLES[currentRole];
    modalEl.querySelector('#auth-modal-title').textContent =
      currentMode === 'login'  ? `Welcome back, ${role.label}` :
      currentMode === 'signup' ? `Create your ${role.label} account` :
      'Reset your password';

    modalEl.querySelector('[data-context]').textContent = role.context;

    // Submit label
    modalEl.querySelector('.auth-form__submit').textContent = mode.cta;

    // Alt footer
    modalEl.querySelector('[data-alt-copy]').textContent = mode.alt.copy;
    const altBtn = modalEl.querySelector('[data-alt-action]');
    altBtn.textContent = mode.alt.action;
    altBtn.dataset.modeSwitch = mode.alt.target;

    // Field visibility per mode
    const fields = {
      name:          currentMode === 'signup',
      institution:   currentMode === 'signup',
      password:      currentMode !== 'forgot',
      'row-between': currentMode === 'login'
    };
    Object.entries(fields).forEach(([key, show]) => {
      const el = modalEl.querySelector(`[data-field="${key}"]`);
      if (el) el.style.display = show ? '' : 'none';
    });

    // Required attrs
    const passwordInput = modalEl.querySelector('#auth-password');
    if (passwordInput) {
      passwordInput.required = currentMode !== 'forgot';
      passwordInput.autocomplete = currentMode === 'signup' ? 'new-password' : 'current-password';
    }
    const nameInput = modalEl.querySelector('#auth-name');
    if (nameInput) nameInput.required = currentMode === 'signup';
    const instInput = modalEl.querySelector('#auth-institution');
    if (instInput) instInput.required = currentMode === 'signup';
  }

  function setRole(role) {
    if (!ROLES[role]) return;
    currentRole = role;
    syncUI();
  }
  function setMode(mode) {
    if (!MODES[mode]) return;
    currentMode = mode;
    syncUI();
  }

  function openModal({ role = 'student', mode = 'login' } = {}) {
    buildModal();
    currentRole = ROLES[role] ? role : 'student';
    currentMode = MODES[mode] ? mode : 'login';
    syncUI();

    modalEl.classList.add('is-open');
    modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Focus first visible input
    setTimeout(() => {
      const firstInput = modalEl.querySelector('input:not([type="hidden"]):not([type="checkbox"])');
      if (firstInput) firstInput.focus();
    }, 60);
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.classList.remove('is-open');
    modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    const payload = {
      role: currentRole,
      mode: currentMode,
      ...data,
      timestamp: new Date().toISOString()
    };

    // Hand off to any registered listener (future backend hook).
    notifySubmit(payload);

    // UI feedback — replace banner with a success message
    const banner = modalEl.querySelector('.auth-modal__banner');
    banner.innerHTML = `
      <strong>Thank you.</strong> Your details have been recorded for the pilot rollout. We'll be in touch when sign-in opens for your institution.
    `;
    form.style.display = 'none';
  }

  /* ---------- Login dropdown ---------- */
  function initDropdown() {
    const dropdown = document.getElementById('login-dropdown');
    if (!dropdown) return;
    const trigger = dropdown.querySelector('#login-trigger');
    const items   = dropdown.querySelectorAll('.login-dropdown__item');

    if (!trigger) return;

    const close = () => {
      dropdown.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };
    const toggle = () => {
      const willOpen = !dropdown.classList.contains('is-open');
      dropdown.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded', willOpen);
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });
    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) close();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    items.forEach((item) => {
      item.addEventListener('click', () => {
        close();
        openModal({ role: item.dataset.authRole, mode: item.dataset.authMode || 'login' });
      });
    });
  }

  /* ---------- Inline auth triggers (mobile menu, anywhere) ---------- */
  function initInlineTriggers() {
    document.querySelectorAll('[data-auth-role]').forEach((el) => {
      // Skip dropdown items — they're already wired
      if (el.closest('.login-dropdown__menu')) return;
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openModal({ role: el.dataset.authRole, mode: el.dataset.authMode || 'login' });
      });
    });
  }

  /* ---------- Public API ---------- */
  window.Leapath = window.Leapath || {};
  window.Leapath.auth = {
    open: openModal,
    close: closeModal,
    setRole,
    setMode,
    onSubmit: (fn) => { if (typeof fn === 'function') submitListeners.push(fn); }
  };

  /* ---------- Boot ---------- */
  function boot() {
    initDropdown();
    initInlineTriggers();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
