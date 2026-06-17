# BNZN.dev — Setup Guide

> Portfolio-as-a-Social-App · @benzon · Built with React 18 + Vite

---

## Prerequisites

| Tool | Version | Check |
|------|---------|-------|
| Node.js | 18+ | `node --version` |
| npm | 9+ | `npm --version` |

---

## Getting Started

```bash
# 1. Install all dependencies
npm install

# 2. Start the dev server
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## Available Scripts

```bash
npm run dev       # Start dev server with HMR
npm run build     # Production build → /dist
npm run preview   # Preview the production build locally
npm run lint      # ESLint check
```

---

## What's Included in Phase 0

| File/Folder | Purpose |
|-------------|---------|
| `src/styles/tokens.css` | **The design system** — all CSS custom properties |
| `src/styles/global.css` | Reset, base styles, layout classes, nav styles |
| `src/styles/animations.css` | Full keyframe animation library |
| `src/components/layout/AppShell.jsx` | Root layout (sidebar + main) |
| `src/components/layout/Sidebar.jsx` | Branded left nav with BNZN logo |
| `src/components/ui/PagePlaceholder.jsx` | Branded placeholder for all pages |
| `src/router/index.jsx` | React Router v6 — 5 routes wired |
| `src/pages/` | Home · Profile · Explore · Notifications · Contact |
| `src/data/` | Empty JSON stubs — filled in Phase 3–5 |
| `public/favicon.svg` | BNZN brand favicon |

---

## Project Structure

```
bnzn-dev/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.jsx       ← Root layout wrapper
│   │   │   └── Sidebar.jsx        ← Left nav
│   │   └── ui/
│   │       └── PagePlaceholder.jsx ← Phase 0 page placeholder
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Profile.jsx
│   │   ├── Explore.jsx
│   │   ├── Notifications.jsx
│   │   └── Contact.jsx
│   ├── router/
│   │   └── index.jsx              ← All route definitions
│   ├── styles/
│   │   ├── tokens.css             ← CSS design tokens (edit this first)
│   │   ├── global.css             ← Reset + base + layout classes
│   │   └── animations.css         ← Keyframe library
│   ├── data/
│   │   ├── projects.json          ← Your projects (filled in Phase 3)
│   │   ├── skills.json            ← Skills + market data (Phase 4)
│   │   └── timeline.json          ← Career events for candlestick (Phase 5)
│   └── main.jsx                   ← App entry point
├── index.html
├── vite.config.js                 ← @ path alias configured
├── jsconfig.json                  ← VS Code path intellisense
├── .eslintrc.cjs
├── .prettierrc
└── package.json
```

---

## Path Alias

Use `@/` instead of relative paths:

```jsx
// Instead of:
import Sidebar from '../../components/layout/Sidebar'

// Use:
import Sidebar from '@/components/layout/Sidebar'
```

---

## Customizing the Design System

All visual decisions live in `src/styles/tokens.css`.

```css
/* Change the brand purple */
--purple: #A855F7;

/* Widen the feed */
--feed-max-width: 700px;

/* Swap fonts */
--font-display: 'Clash Display', 'Syne', system-ui, sans-serif;
```

> **Clash Display** (better than Syne for the display font): download free from
> [fontshare.com/fonts/clash-display](https://www.fontshare.com/fonts/clash-display)
> and self-host in `public/fonts/` — instructions in Phase 1.

---

## Phase Roadmap

| # | Phase | Status | ETA |
|---|-------|--------|-----|
| **0** | Foundation — scaffold, tokens, router | ✅ **Done** | — |
| **1** | Design System — Button, Card, Badge, Avatar, Input | ⏳ Next | 2–3 days |
| **2** | App Shell — right panel, mobile nav, header | ⏳ | 2–3 days |
| **3** | Profile + Feed | ⏳ | 3–4 days |
| **4** | Explore + Contact + Notifications | ⏳ | 2 days |
| **5** | Innovation Layer — candlestick, market cap skills, bull/bear | ⏳ | 3–5 days |
| **6** | Polish + Deploy to Vercel | ⏳ | 2–3 days |

---

## Deploy (when ready)

```bash
# Build for production
npm run build

# Deploy to Vercel (one-time setup)
npx vercel --prod
```

Add `VITE_APP_URL=https://bnzn.dev` in Vercel environment variables.

---

*BNZN.dev — Built with Claude.ai · Phase 0 complete*
