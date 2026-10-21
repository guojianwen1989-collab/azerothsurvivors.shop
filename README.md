# Azeroth Survivors Guide

Static site for `azerothsurvivors.shop`. Publish the contents of `dist/` as the web root. The site is buildless; locale pages are regenerated with `node scripts/build-locales.mjs` (Node.js standard library only).

Locales: en-US, en-GB, en-CA, en-AU, de-DE, fr-FR, ja-JP, and zh-CN. Each locale has crawlable homepage, guide library, first-run, progression, and troubleshooting pages. English pages are complete; localized pages provide translated summaries and practical steps, with links to the full English articles.

SEO: self-canonical URLs, reciprocal `hreflang` (including `x-default`), localized titles and descriptions, Open Graph, JSON-LD, `robots.txt`, and an alternate-aware `sitemap.xml`.

Pages: home, guide library, first-run guide, builds and progression guide, and troubleshooting guide under `dist/`. The Play buttons open the game on its creator's website.

For a local preview, run a static HTTP server from `dist/`, for example `python -m http.server 4173` if Python is installed, then visit `http://localhost:4173/`.

The site is an independent fan guide. Its two illustrations are original generated artwork and are labeled as illustrations, not gameplay screenshots.
