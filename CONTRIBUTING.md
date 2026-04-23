# Contributing to Dorkbase

Thanks for taking the time to contribute. This document covers everything you need to get started.

---

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Branch Naming](#branch-naming)
- [Commit Conventions](#commit-conventions)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Suggesting Features](#suggesting-features)

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally
3. Create a new branch for your change
4. Make your changes
5. Open a pull request against `main`

For significant changes, open an issue first to discuss the approach before writing code.

---

## Development Setup

**Prerequisites:** Node.js 18+ and npm

```sh
git clone https://github.com/mfscpayload-690/dorkbase.git
cd dorkbase
npm install
npm run dev
```

The dev server runs at [http://localhost:5173](http://localhost:5173).

### Useful commands

```sh
npm run dev       # Start development server with HMR
npm run build     # Production build → /dist
npm run preview   # Preview the production build locally
```

---

## Project Structure

```
dorkbase/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── DorkForm.jsx       # Main query builder form
│   │   ├── DorkHistory.jsx    # Query history panel
│   │   ├── DorkPreview.jsx    # Live query preview
│   │   ├── DorkTemplates.jsx  # Template library browser
│   │   ├── Footer.jsx
│   │   ├── GridBackground.jsx
│   │   ├── GitHubIcon.jsx
│   │   └── ReconAnalyzer.jsx  # Domain recon dork generator
│   ├── data/
│   │   ├── templates.js       # General dork template library
│   │   └── reconTemplates.js  # Recon analyzer templates with risk ratings
│   ├── hooks/
│   │   ├── useHistory.js      # localStorage query history
│   │   ├── useToast.js        # Toast notification state
│   │   └── useUrlState.js     # URL query param sync
│   ├── pages/
│   │   ├── AppPage.jsx        # /app — main tool
│   │   ├── LandingPage.jsx    # / — marketing landing page
│   │   └── NotFoundPage.jsx   # 404
│   ├── index.css
│   └── main.jsx
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── CHANGELOG.md
├── netlify.toml
└── README.md
```

---

## Branch Naming

Use the following prefixes:

| Prefix | Use for |
|---|---|
| `feat/` | New features |
| `fix/` | Bug fixes |
| `docs/` | Documentation only |
| `chore/` | Tooling, config, dependencies |
| `refactor/` | Code changes with no behavior change |

Examples:
```
feat/keyboard-shortcuts
fix/recon-domain-validation
docs/update-contributing
```

---

## Commit Conventions

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>: <short description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `style`, `test`

Examples:
```
feat: add keyboard shortcut Ctrl+Enter to run query
fix: domain validation stripping trailing slashes
docs: update README with new features
chore: upgrade vite to v7
```

---

## Pull Request Process

1. Make sure `npm run build` passes with no errors before opening a PR
2. Keep PRs focused — one feature or fix per PR
3. Fill in the PR template completely
4. Link any related issues using `Closes #123` in the PR description
5. PRs require at least one review before merging

---

## Reporting Bugs

Use the [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) issue template. Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS

---

## Suggesting Features

Use the [Feature Request](.github/ISSUE_TEMPLATE/feature_request.md) issue template. For larger ideas, start a [Discussion](https://github.com/mfscpayload-690/dorkbase/discussions) first.
