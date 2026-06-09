# @computational-biology-aachen/design

Shared CPBL (Computational and Plant Biology Lab) design system. Ships the RWTH-derived design tokens and a small set of Svelte 5 components that all lab sites build on. SvelteKit library packaged with `svelte-package`.

**What it ships:**

- `@computational-biology-aachen/design/tokens.css` — all CSS custom properties: RWTH palette, semantic colors, spacing, typography, shadows, radii
- `@computational-biology-aachen/design` — a Svelte 5 component library (~100 components): layout primitives (`Section`, `Row`, `Grid`, `Box`, `Card`), navigation (`Navbar`, `NavItem`, `Sidebar`), typography (`H1`–`H6`, `Text`, `Link`, inline marks), form controls (`Button`, `Input*`, `Slider*`), data display (`Table*`, `LineChart`, `SimChart`, `Math`), content cards (`Card*`), and more

Every component carries an [`@component`](https://svelte.dev/docs/svelte/faq#How-do-I-document-my-components) doc comment (description, props, usage example), so editors surface its API on hover and the `src/routes` showcase can render it.

**Key tokens:**

- Primary: `--color-primary` = RWTH petrol `rgb(0, 97, 101)`
- Accent: `--color-accent` = RWTH orange `rgb(246, 168, 0)`
- Font: `--font-sans` = Space Grotesk (loaded separately via Google Fonts in each site's `app.html`)
- Spacing scale: `--space-1` (4px) through `--space-16` (64px)

## Dev

```bash
npm install
npm run dev          # dev server on :5173 (src/routes is a preview/showcase app)
npm run watch        # svelte-package in watch mode (for live editing while a consumer runs)
npm run build        # vite build + prepack → dist/
npm run preview      # preview the build
npm run check        # TypeScript + Svelte type checking
```

Everything inside `src/lib` is the published library; `src/routes` is a local preview app.

## Consuming a site

Sites pull this package directly from GitHub (`"@computational-biology-aachen/design": "github:Computational-Biology-Aachen/design"`).

In `app.html`:

```html
<link
  rel="preconnect"
  href="https://fonts.googleapis.com"
/>
<link
  href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

In `app.css`:

```css
@import "@computational-biology-aachen/design/tokens.css";
```

## Consumers

- [cpbl](https://github.com/Computational-Biology-Aachen/Computational-Biology-Aachen.github.io) — main lab website
- [mxl-web](https://github.com/Computational-Biology-Aachen/mxl-web) — browser-side ODE model explorer
- [comphot](https://github.com/Computational-Biology-Aachen/comphot) — educational photosynthesis site
- [GreenSloth](https://github.com/Computational-Biology-Aachen/green-sloth) — photosynthesis model explorer
- the 2022/2023/2026 hackathon and 2027 photosynthesis-school sites
