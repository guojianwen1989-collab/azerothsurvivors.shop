# Azeroth Survivors Guide

Static site for `azerothsurvivors.shop`. Publish the contents of `dist/` as the web root. The site is buildless; locale pages are regenerated with `node scripts/build-locales.mjs` (Node.js standard library only).

Locales: en-US, en-GB, en-CA, en-AU, de-DE, fr-FR, ja-JP, and zh-CN. Each locale has crawlable homepage, guide library, first-run, progression, and troubleshooting pages. English pages are complete; localized pages provide translated summaries and practical steps, with links to the full English articles.

SEO: self-canonical URLs, reciprocal `hreflang` (including `x-default`), localized titles and descriptions, Open Graph, JSON-LD, `robots.txt`, and an alternate-aware `sitemap.xml`.

Pages: home, guide library, first-run guide, builds and progression guide, and troubleshooting guide under `dist/`. The Play buttons open the game on its creator's website.

The supplied English editorial copy lives in `scripts/field-guide-copy.txt`. `scripts/build-field-guide.mjs`, called by the locale builder, generates the requested pages in order and checks each page before continuing. It includes nine independent class build URLs, trust pages, and the supporting official-entry-point page. The locale builder adds the same six trust links to every footer and includes all 69 pages in the sitemap. Update the editorial date in the field-guide renderer when revising the copy; the date is not a playtest or security-scan date.

For a local preview, run a static HTTP server from `dist/`, for example `python -m http.server 4173` if Python is installed, then visit `http://localhost:4173/`.

The site is an independent fan guide. Its two illustrations are original generated artwork and are labeled as illustrations, not gameplay screenshots.

Homepage body copy is maintained in `scripts/homepage-content.html`; its Title, description, H1 and intro are in the opening section of `scripts/field-guide-copy.txt`. The class finder filters static recommendations locally, with all approaches readable before interaction or without JavaScript. Run `node scripts/check-homepage.mjs` after generating pages to check homepage SEO and the finder behavior.
