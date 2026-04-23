# Dorkbase

[![Netlify Status](https://api.netlify.com/api/v1/badges/c7b6e013-1ffe-40d8-b21a-9e73f7e480b1/deploy-status)](https://app.netlify.com/sites/dorkbase/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)](https://vitejs.dev)
[![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg)](./CONTRIBUTING.md)
[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-support-yellow?logo=buy-me-a-coffee)](https://buymeacoffee.com/mfscpayload690)

An open-source OSINT dork query builder for penetration testers and security researchers. Compose, preview, and launch advanced Google dork queries — with a template library, domain recon analyzer, query history, and shareable links.

**Live:** [dorkbase.netlify.app](https://dorkbase.netlify.app)

---

## Features

**Query Builder**
Compose dork queries field by field — `site:`, `filetype:`, `inurl:`, `intitle:`, `intext:`, and free-text — with a live preview. Every query state is encoded in the URL so you can share a pre-filled link with a teammate.

**Template Library**
275+ pre-built dorks across 10 attack surface categories: Exposed Files, Login Panels, Exposed Directories, Credentials & Secrets, Network/IoT Devices, Cloud Storage, Vulnerability Hunting, CMS & Frameworks, Bug Bounty & Disclosure, and Shodan Queries. Searchable and filterable.

**Recon Analyzer**
Enter a target domain and generate a full recon dork set in one click — categorized by attack surface with Critical / High / Medium risk ratings. Export as `.txt`, copy all, or run all in tabs.

**Query History**
Every query you run is saved to localStorage (last 50, deduplicated). Restore any past query into the builder with one click.

**Multi-engine support**
Launch queries on Google, DuckDuckGo, Startpage, or Shodan.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 | UI framework |
| React Router | Client-side routing (`/` landing, `/app` tool) |
| Vite | Build tool and dev server |
| Tailwind CSS | Styling |
| lucide-react | Icons |
| Netlify | Deployment |

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm

```sh
git clone https://github.com/mfscpayload-690/dorkbase.git
cd dorkbase
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Scripts

```sh
npm run dev       # Development server
npm run build     # Production build → /dist
npm run preview   # Preview production build locally
```

---

## Disclaimer

For **authorized security research and educational use only**. Do not use against systems you do not own or have explicit permission to test. The author assumes no liability for misuse.

---

## Contributing

Issues and pull requests are welcome. For significant changes, open an issue first.

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup instructions, branch naming, commit conventions, and the PR process.

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](./CODE_OF_CONDUCT.md).

---

## License

[MIT](./LICENSE)
