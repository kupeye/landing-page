# KupEye landing page

A static landing page: plain HTML, CSS and a little JavaScript. There is no build step and no framework, and the page makes no third-party requests (fonts are self-hosted).

## Layout

```
site/
├── index.html              the page
├── favicon.svg             adapts to light and dark browser chrome
├── assets/
│   ├── css/styles.css      design tokens, components, sections
│   ├── js/main.js          theme toggle and copy button
│   ├── fonts/              Unbounded 600, Geist, Geist Mono (woff2) + OFL licences
│   └── img/                logo mark in frost, slate and ink
└── README.md
.github/workflows/site.yml  deploys site/ to GitHub Pages
```

## Preview locally

```sh
python3 -m http.server --directory site 8080
# open http://localhost:8080
```

## Deploy

**GitHub Pages:** in the repository settings, open Pages and set the source to **GitHub Actions**. Every push to `main` that touches `site/` then publishes the page through `.github/workflows/site.yml`. You can also run the workflow by hand from the Actions tab.

**Anywhere else:** upload the contents of `site/` as they are. Any static host works.

## Before launch

Search `index.html` for `TODO` to find each of these:

- Links for Docs, GitHub, Knowledge base, Contact, the install guide and the waitlist (they point at `#` anchors for now).
- Prices for Pro and Cloud, shown as `[PRICE]`.
- `og:url`, `og:image` and a canonical link once the domain is known. The social preview image does not exist yet.

## Brand

| Use | Dark theme | Light theme |
|---|---|---|
| Accent (frost) | `#CFF4FF` | `#3B5B70` text, `#4C7088` large type and logo |
| Blockers (magenta) | `#FF7ADB` | `#B3189A` |
| Warnings (amber) | `#FFC766` | `#8A5300` |
| Background | `#06080F` | `#F4F6FB` |
| Primary button | frost with `#04121A` text | `#0A0E1A` with `#F4F6FB` text |

All colours live as CSS custom properties at the top of `styles.css`; the light theme overrides them under `[data-theme="light"]`.

- **Type:** Unbounded 600 for headings and the wordmark, Geist for body text, Geist Mono for labels and code. All three are under the SIL Open Font License; the licence files sit next to the fonts and must stay with them.
- **Logo:** a seven-sided eye with a round pupil under an up-arrow brow, always in one colour. Use `kupeye-mark-frost.svg` on dark backgrounds, `kupeye-mark-slate.svg` on light ones and `kupeye-mark-ink.svg` for single-colour print. The wordmark is "KupEye" set in Unbounded 600.

## Behaviour

- The theme follows the visitor's system setting until they use the toggle; their choice is then remembered in `localStorage` under `kupeye-theme`.
- A small inline script in `<head>` sets the theme before first paint, so there is no flash of the wrong theme.
- Animations (the rotating rings, the pulse, the signal on the attribution rail) stop when the visitor prefers reduced motion.

## Checked

- HTML passes `html-validate` with its recommended rules.
- Rendered in both themes at 1440, 1180, 900 and 390 pixels wide: no horizontal scrolling, no console errors, no failed requests.
- The theme toggle, the saved preference and the copy button work, and the copy button announces itself to screen readers.
