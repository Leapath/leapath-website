/* ============================================================
   CAREERS PAGE — careers.js
   Handles: filters, role drawer, multi-step form,
            file upload drag-drop, form submission
============================================================ */

(function () {
  'use strict';

  /* ── Role data from Jekyll ────────────────────────────── */
  let ROLES = [];
  try {
    const el = document.getElementById('careers-json');
    if (el) ROLES = JSON.parse(el.textContent);
  } catch (e) { /* safe fallback */ }

  /* ── State ────────────────────────────────────────────── */
  const state = {
    activeDept: 'all',
    activeType: 'all',
    currentRole: null,
    formStep: 1,
    totalSteps: 3,
  };

  /* ── DOM refs ─────────────────────────────────────────── */
  const grid        = document.getElementById('roles-grid');
  const emptyState  = document.getElementById('roles-empty');
  const overlay     = document.getElementById('careers-overlay');
  const drawer      = document.getElementById('careers-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBody  = document.getElementById('drawer-body');

  /* Drawer header */
  const drawerBadges = document.getElementById('drawer-badges');
  const drawerTitle  = document.getElementById('drawer-title');
  const drawerMeta   = document.getElementById('drawer-meta');

  /* Drawer detail panel */
  const drawerDetail      = document.getElementById('drawer-detail');
  const drawerDesc        = document.getElementById('drawer-description');
  const drawerNinetyText  = document.getElementById('drawer-ninety-text');
  const drawerResp        = document.getElementById('drawer-responsibilities');
  const drawerReq         = document.getElementById('drawer-requirements');
  const drawerNice        = document.getElementById('drawer-niceToHave');
  const drawerStartApply  = document.getElementById('drawer-start-apply');

  /* Drawer form panel */
  const drawerFormWrap   = document.getElementById('drawer-form-wrap');
  const questionsWrap    = document.getElementById('drawer-questions-wrap');
  const progressFill     = document.getElementById('form-progress-fill');
  const progressSteps    = document.querySelectorAll('.careers-form-progress__step');
  const formSteps        = document.querySelectorAll('.careers-form-step');
  const formSubject      = document.getElementById('form-subject');
  const formRoleId       = document.getElementById('form-role-id');
  const formRoleTitle    = document.getElementById('form-role-title');
  const formSuccess      = document.getElementById('form-success');

  /* Drawer footer */
  const drawerFooter     = document.getElementById('drawer-footer');
  const drawerBack       = document.getElementById('drawer-back');
  const drawerNext       = document.getElementById('drawer-next');
  const drawerSubmit     = document.getElementById('drawer-submit');
  const drawerFooterNote = document.getElementById('drawer-footer-note');

  /* App form */
  const appForm = document.getElementById('careers-app-form');

  /* ── Helpers ──────────────────────────────────────────── */
  function show(el) { if (el) { el.hidden = false; el.removeAttribute('hidden'); } }
  function hide(el) { if (el) el.hidden = true; }

  function makeList(items) {
    return items.map(i => `<li>${escHtml(i)}</li>`).join('');
  }

  function escHtml(str) {
    const d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }

  /* ── 1. FILTER LOGIC ──────────────────────────────────── */
  function initFilters() {
    const pills = document.querySelectorAll('.careers-filter-pill');
    if (!pills.length) return;

    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filterGroup = pill.dataset.filter;   // 'dept' or 'type'
        const value       = pill.dataset.value;

        /* Update active pill within this group */
        document.querySelectorAll(`.careers-filter-pill[data-filter="${filterGroup}"]`)
          .forEach(p => {
            p.classList.remove('active');
            p.setAttribute('aria-pressed', 'false');
          });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');

        if (filterGroup === 'dept') state.activeDept = value;
        if (filterGroup === 'type') state.activeType = value;

        applyFilters();
      });
    });

    /* Clear filters button in empty state */
    const clearBtn = document.getElementById('roles-clear-filters');
    if (clearBtn) clearBtn.addEventListener('click', resetFilters);

    /* Reset button in filter bar footer */
    const resetBtn = document.getElementById('roles-reset-filters');
    if (resetBtn) resetBtn.addEventListener('click', resetFilters);
  }

  function applyFilters() {
    if (!grid) return;
    const cards = grid.querySelectorAll('.careers-role-card');
    let visible = 0;

    cards.forEach(card => {
      const dept = card.dataset.dept;
      const type = card.dataset.type;
      const showDept = state.activeDept === 'all' || dept === state.activeDept;
      const showType = state.activeType === 'all' || type === state.activeType;
      const show = showDept && showType;
      card.hidden = !show;
      if (show) visible++;
    });

    /* Toggle empty state */
    if (emptyState) emptyState.hidden = visible > 0;

    /* Update heading count label */
    const countEl = document.getElementById('roles-count');
    if (countEl) countEl.textContent = visible;

    /* Update filter footer result text */
    const resultEl = document.getElementById('filter-result-text');
    if (resultEl) {
      const isFiltered = state.activeDept !== 'all' || state.activeType !== 'all';
      resultEl.innerHTML = isFiltered
        ? `Showing <strong>${visible}</strong> of ${cards.length} role${cards.length !== 1 ? 's' : ''}`
        : `Showing all <strong>${visible}</strong> open role${visible !== 1 ? 's' : ''}`;
    }

    /* Show/hide reset button */
    const resetBtn = document.getElementById('roles-reset-filters');
    if (resetBtn) {
      const isFiltered = state.activeDept !== 'all' || state.activeType !== 'all';
      resetBtn.hidden = !isFiltered;
    }
  }

  function resetFilters() {
    state.activeDept = 'all';
    state.activeType = 'all';
    document.querySelectorAll('.careers-filter-pill').forEach(p => {
      p.classList.remove('active');
      p.setAttribute('aria-pressed', 'false');
    });
    document.querySelectorAll('.careers-filter-pill[data-value="all"]').forEach(p => {
      p.classList.add('active');
      p.setAttribute('aria-pressed', 'true');
    });
    applyFilters();
  }

  /* ── 2. ROLE DRAWER ───────────────────────────────────── */
  function initDrawer() {
    if (!drawer) return;

    /* Open via card CTA buttons */
    document.querySelectorAll('[data-role-id]').forEach(btn => {
      if (!btn.classList.contains('careers-role-card')) {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          const roleId = btn.dataset.roleId;
          openDrawer(roleId);
        });
      }
    });

    /* Close */
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
    if (overlay)     overlay.addEventListener('click', closeDrawer);

    /* Keyboard: Escape closes */
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && !drawer.hidden) closeDrawer();
    });

    /* "Apply for this role" button in detail panel */
    if (drawerStartApply) {
      drawerStartApply.addEventListener('click', showFormPanel);
    }
  }

  function openDrawer(roleId) {
    const role = ROLES.find(r => r.id === roleId);
    if (!role) return;
    state.currentRole = role;

    /* Populate drawer */
    populateDrawerHeader(role);
    populateDrawerDetail(role);
    populateQuestions(role);
    resetFormState();

    /* Show detail panel, hide form panel */
    if (drawerDetail) show(drawerDetail);
    if (drawerFormWrap) hide(drawerFormWrap);

    /* Update footer to show only the Apply button */
    updateDrawerFooter('detail');

    /* Open animation */
    drawer.removeAttribute('hidden');
    drawer.hidden = false;
    requestAnimationFrame(() => {
      drawer.classList.add('open');
      overlay.classList.add('active');
      overlay.setAttribute('aria-hidden', 'false');
    });

    /* Focus management */
    drawer.focus();
    drawerBody.scrollTop = 0;
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('open');
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      drawer.hidden = true;
      state.currentRole = null;
    }, 360);
  }

  function populateDrawerHeader(role) {
    if (!drawerBadges || !drawerTitle || !drawerMeta) return;

    drawerBadges.innerHTML = `
      <span class="careers-drawer__badge careers-drawer__badge--dept">${escHtml(role.department)}</span>
      <span class="careers-drawer__badge careers-drawer__badge--type">${escHtml(role.type)}</span>
      <span class="careers-drawer__badge careers-drawer__badge--comp">${escHtml(role.comp)}</span>
    `;

    drawerTitle.textContent = role.title;

    drawerMeta.innerHTML = `
      <span class="careers-drawer__meta-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        ${escHtml(role.location)}
      </span>
      <span class="careers-drawer__meta-item">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${escHtml(role.exp)} experience
      </span>
    `;
  }

  function populateDrawerDetail(role) {
    if (drawerDesc)      drawerDesc.textContent  = role.description;
    if (drawerNinetyText) drawerNinetyText.textContent = role.ninety_days;
    if (drawerResp)      drawerResp.innerHTML    = makeList(role.responsibilities);
    if (drawerReq)       drawerReq.innerHTML     = makeList(role.requirements);
    if (drawerNice)      drawerNice.innerHTML    = makeList(role.nice_to_have);
  }

  function populateQuestions(role) {
    if (!questionsWrap) return;
    questionsWrap.innerHTML = '';
    if (!role.questions || !role.questions.length) return;

    const heading = document.createElement('div');
    heading.className = 'careers-drawer__section-title';
    heading.style.marginTop = '1.25rem';
    heading.textContent = 'A couple of questions';
    questionsWrap.appendChild(heading);

    role.questions.forEach((q, i) => {
      const wrap = document.createElement('div');
      wrap.className = 'careers-form-question';
      const id = `app-q-${i}`;
      wrap.innerHTML = `
        <label for="${id}">${escHtml(q)}</label>
        <input type="hidden" name="question_${i + 1}_text" value="${escHtml(q)}" />
        <textarea id="${id}" name="question_${i + 1}_answer" rows="3" placeholder="Your answer…"></textarea>
      `;
      questionsWrap.appendChild(wrap);
    });
  }

  function showFormPanel() {
    if (drawerDetail) hide(drawerDetail);
    if (drawerFormWrap) {
      show(drawerFormWrap);
    }
    state.formStep = 1;
    setFormStep(1);
    drawerBody.scrollTop = 0;
    drawerBack.hidden = true;
    show(drawerNext);
    hide(drawerSubmit);

    /* Pre-fill hidden role fields */
    const role = state.currentRole;
    if (!role) return;
    if (formSubject)    formSubject.value    = `Application: ${role.title}`;
    if (formRoleId)     formRoleId.value     = role.id;
    if (formRoleTitle)  formRoleTitle.value  = role.title;
  }

  /* ── 3. MULTI-STEP FORM ───────────────────────────────── */
  function initMultiStepForm() {
    if (!drawerNext || !drawerBack || !drawerSubmit) return;

    drawerNext.addEventListener('click', () => {
      if (!validateStep(state.formStep)) return;
      if (state.formStep < state.totalSteps) {
        state.formStep++;
        setFormStep(state.formStep);
        drawerBody.scrollTop = 0;
      }
    });

    drawerBack.addEventListener('click', () => {
      if (state.formStep > 1) {
        state.formStep--;
        setFormStep(state.formStep);
        drawerBody.scrollTop = 0;
      } else {
        /* Back from step 1 → return to detail view */
        if (drawerFormWrap) hide(drawerFormWrap);
        if (drawerDetail) show(drawerDetail);
        updateDrawerFooter('detail');
        drawerBody.scrollTop = 0;
      }
    });
  }

  function setFormStep(step) {
    formSteps.forEach(fs => {
      const isActive = parseInt(fs.dataset.step) === step;
      fs.hidden = !isActive;
    });

    /* Progress bar */
    const pct = (step / state.totalSteps) * 100;
    if (progressFill) progressFill.style.width = `${pct}%`;

    progressSteps.forEach(ps => {
      const n = parseInt(ps.dataset.step);
      ps.classList.toggle('active', n === step);
      ps.classList.toggle('done',   n < step);
    });

    /* Footer buttons */
    show(drawerBack);
    drawerNext.hidden  = step >= state.totalSteps;
    drawerSubmit.hidden = step < state.totalSteps;

    /* Footer note */
    if (drawerFooterNote) {
      drawerFooterNote.textContent = step < state.totalSteps
        ? `Step ${step} of ${state.totalSteps}`
        : '';
    }
  }

  function resetFormState() {
    state.formStep = 1;
    if (appForm) appForm.reset();
    if (formSuccess) hide(formSuccess);
    if (progressFill) progressFill.style.width = '33.33%';
    progressSteps.forEach(ps => {
      ps.classList.remove('active', 'done');
      if (ps.dataset.step === '1') ps.classList.add('active');
    });
    formSteps.forEach(fs => {
      fs.hidden = parseInt(fs.dataset.step) !== 1;
    });
    /* Reset upload zones */
    resetUploadZone('upload-zone', 'upload-inner', 'upload-preview', 'upload-filename', 'app-resume');
  }

  function updateDrawerFooter(mode) {
    if (mode === 'detail') {
      hide(drawerBack);
      hide(drawerNext);
      hide(drawerSubmit);
      if (drawerFooterNote) drawerFooterNote.textContent = '';
    }
  }

  function validateStep(step) {
    if (!appForm) return true;
    const fs = appForm.querySelector(`.careers-form-step[data-step="${step}"]`);
    if (!fs) return true;

    const required = fs.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      field.classList.remove('careers-field-error');
      if (field.type === 'checkbox') {
        if (!field.checked) {
          field.closest('.careers-form-consent')?.classList.add('careers-field-error');
          valid = false;
        } else {
          field.closest('.careers-form-consent')?.classList.remove('careers-field-error');
        }
      } else if (!field.value.trim()) {
        field.classList.add('careers-field-error');
        valid = false;
        field.addEventListener('input', () => field.classList.remove('careers-field-error'), { once: true });
      } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
        field.classList.add('careers-field-error');
        valid = false;
      }
    });

    if (!valid) {
      const firstError = fs.querySelector('.careers-field-error, [required]:invalid');
      firstError?.focus();
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return valid;
  }

  /* ── 4. FORM SUBMISSION ───────────────────────────────── */
  function initFormSubmit() {
    /* Main application form */
    if (appForm) {
      appForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateStep(3)) return;

        const submitBtn = drawerSubmit;
        submitBtn?.classList.add('loading');

        try {
          const data = new FormData(appForm);
          const res  = await fetch(appForm.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });

          if (res.ok) {
            hide(document.querySelector('.careers-form-step[data-step="3"]'));
            hide(progressFill?.parentElement?.parentElement);
            if (formSuccess) show(formSuccess);
            if (drawerBack) hide(drawerBack);
            if (drawerNext) hide(drawerNext);
            if (drawerSubmit) hide(drawerSubmit);
            if (drawerFooterNote) drawerFooterNote.textContent = 'Application sent ✓';
          } else {
            alert('Something went wrong. Please try again or email us at info@leapath.tech');
          }
        } catch (err) {
          alert('Network error. Please check your connection and try again.');
        } finally {
          submitBtn?.classList.remove('loading');
        }
      });
    }

    /* Open application form */
    const oaForm = document.getElementById('open-apply-form');
    const oaSuccess = document.getElementById('oa-success');
    if (oaForm) {
      oaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        /* Validate required fields */
        let valid = true;
        oaForm.querySelectorAll('[required]').forEach(field => {
          field.classList.remove('careers-field-error');
          if (field.type === 'checkbox') {
            if (!field.checked) {
              field.closest('.careers-form-consent')?.classList.add('careers-field-error');
              valid = false;
            } else {
              field.closest('.careers-form-consent')?.classList.remove('careers-field-error');
            }
          } else if (!field.value.trim()) {
            field.classList.add('careers-field-error');
            valid = false;
            field.addEventListener('input', () => field.classList.remove('careers-field-error'), { once: true });
          } else if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
            field.classList.add('careers-field-error');
            valid = false;
          }
        });
        if (!valid) {
          const firstError = oaForm.querySelector('.careers-field-error, [required]:invalid');
          firstError?.focus();
          firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          return;
        }

        const btn = oaForm.querySelector('[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

        try {
          const data = new FormData(oaForm);
          const res  = await fetch(oaForm.action, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });
          if (res.ok) {
            oaForm.querySelectorAll('input, textarea, select, button').forEach(f => { f.disabled = true; });
            if (oaSuccess) show(oaSuccess);
            if (btn) hide(btn);
          } else {
            alert('Something went wrong. Please email us at info@leapath.tech');
            if (btn) { btn.disabled = false; btn.textContent = 'Send my application →'; }
          }
        } catch {
          alert('Network error. Please check your connection.');
          if (btn) { btn.disabled = false; btn.textContent = 'Send my application →'; }
        }
      });
    }
  }

  /* ── 5. FILE UPLOAD DRAG-DROP ─────────────────────────── */
  function initFileUpload() {
    setupUploadZone(
      'upload-zone',
      'upload-inner',
      'upload-preview',
      'upload-filename',
      'upload-remove',
      'app-resume'
    );
    setupUploadZone(
      'oa-upload-zone',
      'oa-upload-inner',
      'oa-upload-preview',
      'oa-upload-filename',
      'oa-upload-remove',
      'oa-resume'
    );
  }

  function setupUploadZone(zoneId, innerId, previewId, filenameId, removeId, inputId) {
    const zone     = document.getElementById(zoneId);
    const inner    = document.getElementById(innerId);
    const preview  = document.getElementById(previewId);
    const filename = document.getElementById(filenameId);
    const removeBtn= document.getElementById(removeId);
    const input    = document.getElementById(inputId);
    if (!zone || !input) return;

    function showFile(file) {
      if (!file) return;
      const MAX = 5 * 1024 * 1024;
      if (file.size > MAX) {
        alert('File is too large. Maximum size is 5 MB.');
        input.value = '';
        return;
      }
      if (filename) filename.textContent = file.name;
      if (inner)   inner.hidden = true;
      if (preview) show(preview);
    }

    function clearFile() {
      input.value = '';
      if (inner)   show(inner);
      if (preview) hide(preview);
    }

    /* Prevent input's own click from bubbling up and triggering zone handler again */
    input.addEventListener('click', (e) => e.stopPropagation());

    /* Click on zone triggers file input */
    zone.addEventListener('click', (e) => {
      if (e.target === removeBtn || removeBtn?.contains(e.target)) return;
      if (e.target === input) return;
      input.click();
    });

    /* Keyboard access */
    zone.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); input.click(); }
    });

    /* File selected via browser dialog */
    input.addEventListener('change', () => {
      if (input.files && input.files[0]) showFile(input.files[0]);
    });

    /* Drag over */
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('dragover');
    });
    zone.addEventListener('dragleave', () => zone.classList.remove('dragover'));

    /* Drop */
    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('dragover');
      const file = e.dataTransfer?.files?.[0];
      if (file) {
        const dt = new DataTransfer();
        dt.items.add(file);
        input.files = dt.files;
        showFile(file);
      }
    });

    /* Remove */
    if (removeBtn) removeBtn.addEventListener('click', (e) => { e.stopPropagation(); clearFile(); });
  }

  function resetUploadZone(zoneId, innerId, previewId, filenameId, inputId) {
    const inner   = document.getElementById(innerId);
    const preview = document.getElementById(previewId);
    const input   = document.getElementById(inputId);
    if (input)  input.value = '';
    if (inner)  show(inner);
    if (preview) hide(preview);
  }

  /* ── 6. SCROLL REVEAL ─────────────────────────────────── */
  function initReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(el => io.observe(el));
  }

  /* ── 7. ROLE CARD CLICK ───────────────────────────────── */
  function initRoleCards() {
    /* The card CTA buttons are already wired in initDrawer.
       This also handles any click on the card body itself. */
    if (!grid) return;
    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.careers-role-card');
      if (!card) return;
      const btn = e.target.closest('[data-role-id]');
      if (btn && btn !== card) return; /* handled by initDrawer */
      /* Clicking anywhere on card (outside the button) also opens drawer */
      const roleId = card.dataset.roleId;
      if (roleId) openDrawer(roleId);
    });
  }

  /* ── INLINE FIELD ERROR STYLE ─────────────────────────── */
  function injectErrorStyles() {
    if (document.getElementById('careers-error-css')) return;
    const style = document.createElement('style');
    style.id = 'careers-error-css';
    style.textContent = `
      .careers-field-error {
        border-color: #FF6B6B !important;
        box-shadow: 0 0 0 3px rgba(255,107,107,0.15) !important;
      }
      .careers-form-consent.careers-field-error {
        outline: 2px solid #FF6B6B;
        border-radius: 4px;
        padding: 4px;
      }
    `;
    document.head.appendChild(style);
  }

  /* ── INIT ─────────────────────────────────────────────── */
  function init() {
    injectErrorStyles();
    initReveal();
    initFilters();
    initDrawer();
    initMultiStepForm();
    initFormSubmit();
    initFileUpload();
    initRoleCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
