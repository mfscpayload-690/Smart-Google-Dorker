# Dorkbase

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7b6e013-1ffe-40d8-b21a-9e73f7e480b1/deploy-status)](https://app.netlify.com/sites/dorkbase/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev)

An open-source OSINT dork query builder for security researchers and penetration testers. Craft, preview, and launch advanced search queries across multiple search engines from a single interface.

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
| Netlify | Deployment |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```sh
git clone https://github.com/mfscpayload-690/dorkbase.git
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```sh
npm run dev       # Start development server
npm run build     # Build for production (outputs to /dist)
npm run preview   # Preview the production build locally
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
