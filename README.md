# سهيل — Suhail

Arabic, right-to-left web front-end that guides Syrian students through higher-education choices:
an academic-inclination quiz, a guide to Syrian universities, and the majors on offer.

Built with **React + plain HTML/CSS** (Vite). No UI framework, no CSS-in-JS.

**Live:** https://suhail-edu.github.io/suhail/ (GitHub Pages) · backup: https://suhail-edu.netlify.app

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Requires Node 18+.

## Where things live

| Path | What |
|---|---|
| `design colors.md` | The colour and layout law. Every rule in it is binding. |
| `assets/` | The only source of images: logo, university logos, major icon sheets. |
| `src/styles/tokens.css` | The six colour tokens (verbatim from `design colors.md` §7) plus spacing/type tokens. A raw hex anywhere else in `src/` is a bug. |
| `src/styles/base.css` | Reset, shared recipes: `.tap` (everything tappable), `.btn--primary`, `.panel`, `.meter`, `.field`, `.rail`. |
| `src/components/` | App bar, footer, layout, icons, meter. |
| `src/pages/` | Home, Login, Signup, Quiz (+ result), Branches (مجال), MajorsBranch (علمي / أدبي), MajorDetail, Universities, University, Search, ComingSoon, NotFound. |
| `src/data/` | Quiz questions & scoring, majors, universities, navigation. |

## Conventions

- **Mobile first.** Base styles are the 402px phone frame from Figma; `@media (min-width: 600px | 1024px | 1440px)` widen it.
- **RTL by default** (`<html lang="ar" dir="rtl">`). Only CSS logical properties — no `left`/`right`.
- **States.** Every tappable element has rest, hover (inside `@media (hover: hover)`), pressed, focus and disabled, all derived from `design colors.md` §6.
- **Accent budget.** One sand primary action per screen, at most three further sand marks.

## Deploying

- **GitHub Pages** — `.github/workflows/pages.yml` builds and publishes on every push to `main` of the
  `suhail-edu/suhail` repository. To ship a change from this repo: `git pull origin main && git push pages main`
  (where `pages` is a remote pointing at `https://github.com/suhail-edu/suhail.git`).
- **Netlify** — `netlify.toml` (build `npm run build`, publish `dist`, SPA redirect). Note the free plan charges
  credits per deploy.

Routing uses `BrowserRouter`; the Pages workflow copies `index.html` to `404.html` as the SPA fallback and sets
`VITE_BASE` so the build serves from `/<repo>/`. Any other static host needs the same fallback to `index.html`.
