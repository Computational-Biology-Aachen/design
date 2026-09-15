# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers building CPBL (Computational and Plant Biology Lab) / mxl-family sites, all within this meta-repo. Their job is assembling pages for a lab site (main lab site, mxl-web ODE explorer, comphot photosynthesis education site, GreenSloth simulation explorer, hackathon and photosynthesis-school microsites) using a shared, ready-made Svelte 5 component set instead of rebuilding layout, typography, and chart/data-display primitives per site. Scope is internal: consumed exclusively by sites in this meta-repo, not published for outside/other-lab reuse.

## Product Purpose

`@computational-biology-aachen/design` is the shared design system for the lab's web properties: CSS custom-property tokens (palette, spacing, typography, shadows, radii) plus ~100 Svelte 5 components (layout primitives, navigation, typography, form controls, data display, content cards) published to GitHub Packages and pulled by every consuming site as a git dependency. It exists so the ~7 sites in the family look and behave coherently and so a fix or improvement lands once and propagates, rather than being re-implemented per site. Success is a consuming site importing tokens + components and getting a coherent, on-brand, accessible page with minimal custom CSS.

## Positioning

Purpose-built for this lab's actual content, not a generic UI kit: components exist specifically for scientific/academic material a neighboring generic design system (MUI, Shadcn, etc.) wouldn't ship out of the box — `Math` (KaTeX), `LineChart`/`SimChart` (model output), `ParameterTable`, `CardPublication`/`CardSoftware`/`CardPerson`/`CardSponsor` (lab-site content types), `AudienceToggle`, i18n-friendly primitives. It is also the single place the RWTH-derived visual identity (petrol/orange palette, Space Grotesk) lives, so every consuming site inherits the same look without redefining it.

## Operating Context

- Distributed as a GitHub Packages npm dependency (`@computational-biology-aachen:registry=https://npm.pkg.github.com`), consumed via `github:Computational-Biology-Aachen/design` git dependency in each site's `package.json`/lockfile.
- Consuming sites are SvelteKit 5 (runes) + adapter-static; they import `tokens.css` in `app.css` and load Space Grotesk via Google Fonts `<link>` tags in `app.html`.
- `src/lib` is the published library; `src/routes` is a local preview/showcase app (also the reference for how each component should look/behave) with dedicated sections per component category (buttons, layout, heroes, inputs, media, utilities, interactive, cards, data, navigation, typography) plus a `tokens` page.
- Package version bumps ("chore: bump design") ripple through `sync.sh`, which re-pins the `design` git-dependency SHA + integrity hash in every consumer's lockfile — so component API changes are felt lab-wide on the next sync, not opt-in per site.
- `docs/css-parameterisation` documents the token/CSS parameterisation approach.

## Capabilities and Constraints

- Svelte 5 (runes mode) + SvelteKit 2 as peer dependencies; components must stay compatible with that stack across all consumers.
- Ships both compiled (`dist/`, via `svelte-package`) and source (`src/lib`) exports; `tokens.css` is a separate importable entry point independent of the component JS.
- Every component carries an `@component` doc comment (description, props, usage example) — editors surface it on hover, and the showcase renders from it; this is the de facto component documentation, not a separate docs site.
- Dependencies already committed to: FontAwesome (icons), `svelte-fa`, KaTeX (math rendering), Chart.js (charts), `@inlang/paraglide-js` (i18n support for consumers).
- RWTH-derived visual identity (petrol/orange, Space Grotesk) is a loose starting aesthetic, not a binding corporate-design compliance requirement — the lab can diverge from official RWTH guidelines where it improves the sites.
- Breaking component API changes affect every consuming site at once (propagated via `sync.sh`'s lockfile re-pin), so API stability across the ~7 consumers is a real constraint on change.

## Brand Commitments

- Primary: `--color-primary` = RWTH petrol `rgb(0, 97, 101)`.
- Accent: `--color-accent` = RWTH orange `rgb(246, 168, 0)`.
- Typeface: Space Grotesk (`--font-sans`), loaded via Google Fonts by each consuming site.
- Spacing scale: `--space-1` (4px) through `--space-16` (64px).

## Evidence on Hand

- Full token set and ~100 existing components in `src/lib`, each self-documented via `@component` doc comments.
- Live showcase app (`src/routes`) demonstrating every component category and the token set — the working reference for current visual state.
- `docs/css-parameterisation` for the token/CSS approach.
- No user research, usage analytics, or external testimonials exist or apply — this is an internal shared package, not a customer-facing product.

## Product Principles

- One shared surface, not per-site reinvention: a fix, token, or component change should land once here and propagate to every consuming site via the normal sync/re-pin flow.
- Built for this lab's actual content (scientific data, publications, people, model output), not generic marketing UI — new components should keep earning their place by serving a real content type in a consuming site.
- RWTH-derived identity is the aesthetic default, held loosely — it can flex where it serves the sites better, since it isn't a compliance obligation.
- Showcase-as-documentation: every component change should keep the `src/routes` showcase and its `@component` doc comment accurate, since that's the only spec consumers have.
- API stability matters more here than in a typical single-site component: a breaking change is felt by every consumer on the next sync, not opt-in.

## Accessibility & Inclusion

WCAG AA baseline expected across components (color contrast, keyboard navigation, semantic markup), since several consuming sites are public-facing academic/teaching properties (e.g. comphot, which ships i18n for en/de/fr).
