# Leapath — Marketing Website

Production site: **https://www.leapath.tech**

Jekyll 4.3 static site, "v2" design system. All pages use `layout: v2/default` (or `layout: legal` for policy pages). Content lives in `.md` files at the repo root plus namespaced `_data/_v2_*` collections. Zero build tooling beyond Jekyll itself.

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
├── index.md                      ← home page
├── pricing.md
├── careers.md
├── case-studies.md
├── blog.md
├── how-it-works.md
├── partnership.md
├── contact.md
├── privacy-policy.md             ← legal pages (layout: legal)
├── terms-of-service.md
├── data-processing.md
├── cookies.md
├── 404.md
│
├── _layouts/
│   ├── v2/default.html           ← thin shell: head + nav + content + footer + scripts
│   ├── v2/post.html              ← blog post / case study layout
│   └── legal.html                ← wraps legal pages: container + section header + {{ content }}
│
├── _includes/v2/
│   ├── head.html                 ← <head> block (meta, OG, SEO, fonts, CSS)
│   ├── nav.html                  ← sticky navbar + mobile drawer
│   ├── footer.html                ← site footer + legal links
│   ├── scripts.html               ← deferred JS tags
│   ├── icons.html                ← inline SVG sprite defs
│   └── sections/                  ← one file per reusable page section
│       ├── page-hero.html         ← shared hero used by careers/how-it-works/blog/partnership/contact
│       ├── hero.html              ← homepage hero
│       ├── capabilities.html
│       ├── reviews.html
│       ├── how-steps.html
│       ├── careers-values.html
│       ├── careers-process.html
│       ├── careers-roles.html
│       ├── careers-drawer.html
│       ├── careers-open-apply.html
│       └── cta.html
│
├── _data/                        ← namespaced content collections
│   ├── _v2_content/               ← page-level copy blocks (hero, reviews, insights, pricing-body, ...)
│   ├── _v2_capabilities/
│   ├── _v2_careers_process/
│   ├── _v2_careers_values/
│   ├── _v2_how_steps/
│   ├── _v2_open_roles/
│   ├── _v2_blog/                  ← blog posts
│   ├── _v2_case_studies/          ← case studies
│   ├── _v2_roles/
│   ├── _v2_testimonials/
│   └── _v2_views/
│
├── css/v2/
│   ├── theme.css                  ← design tokens (--navy/--purple/--txt/... ) + shared components
│   ├── home.css                   ← homepage-only styles (loaded via page.extra_css)
│   ├── careers.css                ← careers-only styles
│   ├── case-studies.css
│   ├── blog.css / blog-post.css
│   └── legal.css
│
├── js/v2/
│   ├── main.js                    ← sticky nav, hamburger, scroll-reveal (site-wide)
│   ├── home.js                    ← homepage-only JS
│   └── careers.js                 ← careers-only JS (application drawer, etc.)
├── js/forms.js                    ← form submission handler + client validation (site-wide)
│
├── assets/v2/                     ← v2 images, favicons, og-image
├── assets/images/, assets/logos/  ← a handful of legacy-path images still referenced by live v2 pages
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

Page-level copy blocks live in `_data/_v2_content/<name>.md` as YAML front matter, referenced from `_includes/v2/sections/*.html` via `site.data.v2_content.<name>`.

Card/list collections (roles, testimonials, posts, capabilities, etc.) are individual `.md` files under their `_data/_v2_*` folder — add a file and the section picks it up automatically (usually sorted by a `num` or `date` field).

Per-page CSS/JS is opted into via front matter, not loaded globally:

```yaml
extra_css: /css/v2/careers.css
extra_js: /js/v2/careers.js
```

Only `css/v2/theme.css`, `case-studies.css`, and `blog-post.css` are loaded on every page (see `_includes/v2/head.html`); everything else is per-page.

---

## Design system

CSS variables are defined in `css/v2/theme.css` `:root`:

| Layer | Purpose |
|---|---|
| Brand palette (`--navy`, `--purple`, `--magenta`, `--violet`, `--gold`, ...) | Raw hex values |
| Semantic tokens (`--bg`, `--surf`, `--txt`, `--txt2`/`--txt3`/`--txt4`, `--bd`, `--grad`, `--gradbtn`) | What components actually use |

`--txt3`/`--txt4` and `--gradbtn` are tuned specifically to pass WCAG AA contrast — don't reintroduce lighter grays for body copy or use the decorative `--grad` under normal-weight button text without checking contrast.

`.d1` is the canonical section-heading class (aliased by `.ip-h2`) — don't fork a third heading size.

---

## Forms

Forms POST to the Leapath API (`info.leapath.tech`). `js/forms.js` auto-binds to `#contact-form`, `#partnership-form`, and any `[data-leapath-form]` element. Validates client-side, submits via `fetch`, shows inline success state, falls back to native submit on error.

---

## Deployment

Deploys as a standard Jekyll static site. Compatible with Netlify, Vercel, Cloudflare Pages, or any static host.

- `_headers` — HTTP security + cache headers (Netlify/Cloudflare)
- `_redirects` — www redirect rule
- `robots.txt` — blocks AI training crawlers; crawl-delay for all others
- `sitemap.xml` — auto-generated by `jekyll-sitemap`

Build command: `bundle exec jekyll build`
Output directory: `_site/`
