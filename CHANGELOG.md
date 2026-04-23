# Changelog

All notable changes to Dorkbase are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [Unreleased]

### Added
- Proper empty states for History and Templates panels
- Domain validation in Recon Analyzer (regex check, strips `http://` prefix)
- Dynamic page title — tab shows `Dorkbase — {query}` when a query is active
- 404 page for unknown routes
- Action buttons (Search, Copy, Load) always visible on mobile in Recon Analyzer and Templates
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `CHANGELOG.md`
- GitHub issue and PR templates, `FUNDING.yml`

---

## [2.0.0] — 2026-04-23

Major rebuild. New landing page, full app shell redesign, and brand rename.

### Added
- Landing page at `/` with hero, animated typewriter terminal, features, how-it-works, use cases, and CTA
- React Router — `/` landing page, `/app` tool, `*` 404
- Two-panel app shell with persistent sidebar navigation (desktop)
- Mobile bottom tab bar (Builder / Templates / Recon / History)
- Toast notification system (slide-in, bottom-right)
- Dork Templates library — 50+ templates across 7 attack surface categories, searchable
- Query History — localStorage, max 50 entries, deduplicated, restore/remove
- Share via URL — form state encoded in URL query params, shareable pre-filled links
- Recon Analyzer rebuilt — 50+ domain-targeted dorks, 6 attack surface categories, risk ratings (Critical/High/Medium), Export .txt, Run All, Copy All, Load into Builder
- `useHistory`, `useUrlState`, `useToast` custom hooks
- Dynamic page title when shared URL is opened
- Netlify deployment with `netlify.toml` SPA redirect

### Changed
- **Renamed** from "Smart Google Dorker" to **Dorkbase**
- Full theme overhaul — dark navy palette, Inter + JetBrains Mono typography, CSS grid background
- Replaced Matrix rain canvas with static CSS grid + radial vignette
- Replaced all emoji icons with lucide-react SVG icons
- App layout moved to two-panel sidebar design
- Removed GitHub Pages deployment — Netlify only
- `vite.config.js` base path simplified to `/`

### Removed
- `gh-pages` dependency and deploy scripts
- Matrix/cyberpunk theme
- Old inline Security Analyzer (replaced by full Recon Analyzer)

---

## [1.1.0] — 2025-07-08

### Added
- Multi-engine support: Google, DuckDuckGo, Startpage, Shodan
- Security Analyzer — basic domain dork set generator
- GitHub Actions CI workflow
- Netlify deploy workflow

### Changed
- SEO improvements: Open Graph, Twitter Card, JSON-LD structured data
- Removed accidentally committed empty `npm` file
- Cleaned up `.gitignore` to Vite/React essentials

---

## [1.0.0] — 2025-07-07

### Added
- Initial release
- Google dork query builder — site, filetype, inurl, intitle, intext, keyword fields
- Live query preview
- Copy to clipboard
- Matrix/cyberpunk theme with canvas rain animation
- GitHub Pages deployment
