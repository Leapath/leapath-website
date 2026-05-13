# Leapath — Static Site

Modular static architecture, deployable to Vercel / Netlify / any static host.

## Structure

```
/index.html                       — Home page (light theme, premium SaaS)
/css/
  styles.css                      — Design system + components + new modules
  responsive.css                  — Page-level breakpoint refinements
/js/
  main.js                         — Sticky nav, hamburger, scroll-reveal
  forms.js                        — Formspree handler for all forms
  animations.js                   — Hero intro orchestration + parallax
  auth.js                         — Login dropdown + auth modal (UI only)
  region-selector.js              — First-visit region modal + banner
/pages/
  partnership.html                — Institutional partnership form
  privacy-policy.html
  terms-of-service.html
  data-processing.html
/components/
  navbar.html                     — Reference partial (copy/paste source)
  footer.html                     — Reference partial (copy/paste source)
/assets/
  images/
    product-preview.png           — Hero/showcase product photo
    partnership-banner.jpg
  logos/
    leapath-logo.png
```

## Theme tokens (re-skinning)

The whole site is themed via CSS variables in `css/styles.css` `:root`.
Three layers — **raw palette → semantic tokens → legacy aliases**.

To re-skin, edit semantic tokens only:

```css
--bg:             #FBFAFD;         /* page background */
--surface:        #FFFFFF;         /* cards, panels */
--surface-soft:   #F7F3FC;         /* secondary panels */
--surface-dark:   var(--c-navy);   /* dark bands (footer, CTA strips) */

--text:           #15102E;         /* primary readable text */
--text-muted:     #4A4663;         /* secondary text */
--text-dim:       #7A7691;         /* tertiary / metadata */
--text-on-dark:   #FFFFFF;         /* text inside dark bands */

--accent:         var(--c-mid-purple);
--accent-strong:  var(--c-magenta);
--gradient-brand: linear-gradient(135deg, #5B2D9E 0%, #F042FF 100%);
--gradient-page:  linear-gradient(160deg, #FBFAFD 0%, #F4EFFB 50%, #EDE6F7 100%);
```

Component CSS only references semantic tokens (`--accent`, `--surface`,
`--gradient-brand`, etc.) — never raw hex. Legacy aliases (`--navy`,
`--lavender`, `--teal`, `--warm-white`) are re-pointed at the semantic
tokens, so older component CSS keeps working when the theme flips.

## Hero intro animation

Body starts with `class="preload"`. `animations.js` waits for fonts to be
ready (capped at 1.2s), then strips the class. The CSS cascade plays:

```
intro-anim--logo  →  intro-anim--1 → ... → intro-anim--6
   logo                  eyebrow         CTAs / audience tiles
```

Each step uses a different `transition-delay` so the reveal is staggered.
Respects `prefers-reduced-motion: reduce`.

## Region selector

First-visit modal stores the user's choice in `localStorage` under
`leapath.region` (`IN`, `EU`, `ME`). The selection mirrors to
`<html data-region="…">` so future region-scoped CSS / JS can react
with attribute selectors.

A premium gradient transition wash plays after selection, then a
confirmation banner slides in from the bottom.

JS API for future region-aware content:

```js
window.Leapath.region.get()              // → 'IN' | 'EU' | 'ME' | null
window.Leapath.region.set('EU')          // programmatic change
window.Leapath.region.open()             // re-open the modal
window.Leapath.region.onChange(fn)       // subscribe to changes
window.Leapath.region.list()             // available regions
```

CSS placeholder system for region-specific content:

```html
<div data-region-content="IN">India-specific copy</div>
<div data-region-content="EU">EU-specific copy</div>
```

These start hidden; the matching block appears based on
`html[data-region]` attribute selectors in `styles.css`.

## Auth (Login → Student / TPO)

Navbar Login is a dropdown with two options. Each opens an auth modal:

- Modes: login | signup | forgot password
- Roles: student | tpo (tab switcher inside the modal)
- Fields: conditionally shown per mode (name + institution only on signup)
- Banner: clearly discloses pre-launch / pilot status

UI only — no backend wiring. JS API for later integration:

```js
window.Leapath.auth.open({ role: 'student', mode: 'login' })
window.Leapath.auth.onSubmit((payload) => {
  // payload: { role, mode, email, password, name?, institution?, timestamp }
  // Wire to Supabase / Firebase / your auth provider here.
})
```

Trigger the modal from anywhere with markup attributes:

```html
<button data-auth-role="student" data-auth-mode="login">Student Login</button>
<button data-auth-role="tpo"     data-auth-mode="signup">Create TPO Account</button>
```

## Product showcase

A modular section below the hero CTAs. Drop in any image:

```html
<div class="product-showcase__image-wrap" data-showcase-image>
  <img src="assets/images/your-image.png" alt="…" />
</div>
```

Includes built-in halo glow, soft shadow frame, hover lift, and parallax
on scroll (via `data-parallax` attribute).

## Forms

All forms POST to Formspree. `forms.js` auto-binds to:

- `#contact-form` (home)
- `#partnership-form` (partnership page)
- Any element with `data-leapath-form`

Validates client-side, submits via fetch with JSON Accept header (so
Formspree returns JSON instead of redirecting), shows inline success
state, falls back to native form submission on network failure.

## Components: navbar & footer

`components/navbar.html` and `components/footer.html` are copy/paste
reference partials. To keep deployment dead-simple (no build step), each
page has an inline copy. If you add a build step later (Eleventy, Astro,
11ty), these partials become real includes with one edit each.

## Local preview

```bash
cd /path/to/leapath
python3 -m http.server 8000
# visit http://localhost:8000
```

## v4 changelog (this release)

- Light theme with soft purple/blue gradient wash; full token rebuild
- Hero intro animation (logo → headline → sub → CTAs stagger)
- Product showcase section with photo frame, halo glow, parallax
- Premium region transition (gradient wash before banner)
- Card redesign: soft shadows, larger radii, accent-soft hover borders
- Removed fake metrics; replaced with research-framed credibility content
- Removed fabricated testimonials; replaced with design-principle cards
- Login → Student / TPO dropdown + auth modal (UI only)
- Footer kept as dark band for visual rhythm against light page
