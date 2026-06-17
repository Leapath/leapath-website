# Leapath — Marketing Website

Production site: **https://www.leapath.tech**

Jekyll 4.3 static site. All content lives in `.md` files under `_data/`. Each page section is an isolated `_includes/sections/` partial. Zero build tooling beyond Jekyll itself.

---

## Quick start

```bash
sh start.sh   # installs deps, starts Jekyll with live-reload at http://localhost:4000
sh stop.sh    # kills the server
```

Requires Ruby ≥ 3.0. Bundler is installed automatically if missing.

---

## Project structure

```
leapath-website/
├── index.html                    ← home page (18 section includes)
├── privacy-policy.md             ← legal pages — edit these for copy changes
├── terms-of-service.md
├── data-processing.md
├── partnership.html              ← kept as HTML (contains a form + custom layout)
├── 404.html
│
├── _layouts/
│   ├── default.html              ← thin shell: head + nav + content + footer + scripts
│   └── legal.html                ← wraps legal pages: container + section header + {{ content }}
│
├── _includes/
│   ├── head.html                 ← <head> block (meta, OG, SEO, fonts, CSS)
│   ├── nav.html                  ← sticky navbar + mobile drawer
│   ├── footer.html               ← site footer + legal links
│   ├── scripts.html              ← deferred JS tags
│   └── sections/                 ← one file per page section
│       ├── hero.html
│       ├── product-showcase.html
│       ├── credibility.html
│       ├── colleges.html
│       ├── students.html
│       ├── employers.html
│       ├── product.html
│       ├── training.html
│       ├── analytics.html
│       ├── transformation.html
│       ├── powers.html
│       ├── how-it-works.html
│       ├── testimonials.html
│       ├── onboarding.html
│       ├── insights.html
│       ├── marquee.html
│       ├── why-now.html
│       └── cta.html
│
├── _data/                        ← all content + collections live here
│   ├── _content/                 ← section content (.md, one per section)
│   ├── _product_cards/
│   ├── _steps/
│   ├── _training_cards/
│   ├── _powers_cards/
│   ├── _insight_cards/
│   ├── _testimonial_cards/
│   └── _onboarding_steps/
│
├── css/
│   ├── styles.css                ← design system + all component styles
│   └── responsive.css            ← breakpoint overrides
│
├── js/
│   ├── main.js                   ← sticky nav, hamburger, scroll-reveal
│   ├── forms.js                  ← Formspree handler + client validation
│   ├── animations.js             ← hero intro stagger + parallax
│   ├── auth.js                   ← login dropdown + auth modal (UI only)
│   └── region-selector.js        ← first-visit region modal + banner
│
├── assets/images/                ← product screenshots, banners
├── _config.yml
├── Gemfile
├── robots.txt
├── _headers                      ← Netlify/Cloudflare HTTP headers
├── _redirects                    ← Netlify redirects
├── humans.txt
├── SECURITY.md
└── LICENSE
```

---

## Editing content

All copy lives in `_data/_content/<section>.md` as YAML front matter. No HTML to touch for copy changes.

```yaml
# _data/_content/hero.md
---
slug: "hero"
heading: "Your headline here"
subheading: "Supporting copy"
---
```

Card collections (training, insights, etc.) are individual `.md` files in their collection folder. Add a file → section picks it up automatically.

---

## Design system

CSS variables are defined in `css/styles.css` `:root` in three layers:

| Layer | Purpose |
|---|---|
| Raw palette (`--c-*`) | Exact hex values, never used directly in components |
| Semantic tokens | `--text`, `--surface`, `--accent`, `--gradient-brand`, etc. |
| Legacy aliases | `--navy`, `--teal`, `--lavender` — re-pointed at semantic tokens |

To re-skin the site, edit semantic tokens only:

```css
--accent:          #5B2D9E;
--gradient-brand:  linear-gradient(135deg, #5B2D9E 0%, #F042FF 100%);
--bg:              #FBFAFD;
--surface:         #FFFFFF;
```

---

## Auth (UI only)

The Login dropdown opens a modal for Student / TPO login. No backend is wired.

```js
// Wire to your auth provider here:
window.Leapath.auth.onSubmit((payload) => {
  // payload: { role, mode, email, password, name?, institution? }
})

// Open programmatically:
window.Leapath.auth.open({ role: 'student', mode: 'login' })
```

Trigger from any element with data attributes:

```html
<button data-auth-role="student" data-auth-mode="login">Student Login</button>
```

---

## Forms

All forms POST to Formspree. `forms.js` auto-binds to `#contact-form`, `#partnership-form`, and any `[data-leapath-form]` element. Validates client-side, submits via `fetch`, shows inline success state, falls back to native submit on error.

---

## Region selector

First-visit modal stores the user's region in `localStorage` under `leapath.region` (`IN`, `EU`, `ME`). Sets `<html data-region="…">` for region-scoped CSS/JS.

```js
window.Leapath.region.get()        // → 'IN' | 'EU' | 'ME' | null
window.Leapath.region.set('EU')
window.Leapath.region.onChange(fn)
```

---

## Deployment

Deploys as a standard Jekyll static site. Compatible with Netlify, Vercel, Cloudflare Pages, or any static host.

- `_headers` — HTTP security + cache headers (Netlify/Cloudflare)
- `_redirects` — www redirect rule
- `robots.txt` — blocks AI training crawlers; crawl-delay for all others
- `sitemap.xml` — auto-generated by `jekyll-sitemap`

Build command: `bundle exec jekyll build`  
Output directory: `_site/`
