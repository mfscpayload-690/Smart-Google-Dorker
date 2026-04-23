# Dorkbase

An open-source OSINT dork query builder for security researchers and penetration testers. Craft, preview, and launch advanced search queries across multiple search engines from a single interface.

**Live demo:** [mfscpayload-690.github.io/Smart-Google-Dorker](https://mfscpayload-690.github.io/Smart-Google-Dorker/)

---

## Features

- **Live query builder** — compose dork queries using `site:`, `filetype:`, `inurl:`, `intitle:`, `intext:`, and free-text fields with real-time preview
- **Multi-engine support** — launch queries directly on Google, DuckDuckGo, Startpage, or Shodan
- **Security Analyzer** — generate a set of common reconnaissance dorks for a target domain in one click
- **Copy to clipboard** — grab any query without leaving the page
- **Responsive layout** — works on desktop and mobile

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| gh-pages | GitHub Pages deployment |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```sh
git clone https://github.com/mfscpayload-690/Smart-Google-Dorker.git
cd Smart-Google-Dorker
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```sh
npm run dev       # Start development server
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
npm run deploy    # Deploy to GitHub Pages
```

---

## Usage

1. Fill in one or more fields — only non-empty fields are included in the query.
2. Select a target search engine from the radio options.
3. Click **DORK** to open the search in a new tab, or **COPY** to copy the raw query string.

For domain-wide reconnaissance, use the **Security Analyzer** — enter a domain and it generates a set of pre-built dorks covering common exposure patterns (admin panels, exposed files, backup directories, etc.).

---

## Disclaimer

This tool is intended for **educational purposes and authorized security research only**. Google dorking can surface sensitive or unintentionally exposed information. Do not use this tool against systems you do not own or have explicit permission to test. The author assumes no liability for misuse.

---

## Contributing

Issues and pull requests are welcome. For significant changes, open an issue first to discuss what you'd like to change.

---

## License

[MIT](./LICENSE)
