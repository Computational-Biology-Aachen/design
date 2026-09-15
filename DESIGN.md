---
name: CPBL Design System
description: Journal-figure precision for the lab's shared RWTH-derived component library
colors:
  primary: "rgb(0, 97, 101)"
  accent: "rgb(246, 168, 0)"
  chart-violet: "rgb(97, 33, 88)"
  chart-blue: "rgb(0, 84, 159)"
  chart-magenta: "rgb(227, 0, 102)"
  bg: "#f6f6f8"
  surface: "#ffffff"
  border: "#dde1e9"
  text: "#1a1d23"
  text-muted: "#727682"
  text-inverse: "#ffffff"
  ink: "rgb(15 23 42)"
  danger: "rgb(204, 7, 30)"
  scrim-caption: "rgba(0, 0, 0, 0.7)"
  scrim-backdrop: "rgba(0, 0, 0, 0.5)"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "2rem"
    fontWeight: 700
    lineHeight: "normal"
    letterSpacing: "normal"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: "normal"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: "normal"
  body:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 500
    letterSpacing: "normal"
rounded:
  sm: "0.25rem"
  md: "0.5rem"
  lg: "1rem"
  full: "9999px"
spacing:
  space-1: "0.25rem"
  space-2: "0.5rem"
  space-3: "0.75rem"
  space-4: "1rem"
  space-6: "1.5rem"
  space-8: "2rem"
  space-12: "3rem"
  space-16: "4rem"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-2} {spacing.space-6}"
  card-primary:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    padding: "2rem 2.5rem"
  input-text:
    backgroundColor: "transparent"
    rounded: "{rounded.lg}"
    padding: "0.35rem 0.5rem"
  nav-item:
    textColor: "{colors.text}"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "{spacing.space-2} {spacing.space-3}"
---

# Design System: CPBL Design System

## Overview

**Creative North Star: "The Journal Figure"**

The system reads like a well-typeset scientific figure: precise, credible, quietly technical, with data and content doing the talking rather than the chrome around them. Structure is institutional and flat — sections are solid color bands with no drop shadow, exactly the way a paper's sections sit on a page — while the one thing that gets to lift off the surface is a Card, which behaves like a figure panel: a colored top rule (the "caption bar"), a soft shadow, and a 3% scale-up on hover that says "this is a distinct, selectable unit" without any bounce or flourish. Everything else — buttons, inputs, nav — moves on a single fast 150ms ease and otherwise sits still.

The palette is RWTH's official university palette, held loosely rather than as a compliance obligation: Deep Petrol carries nearly every interactive and brand moment, Signal Orange is reserved for the rare highlight, and three more RWTH hues (violet, blue, magenta) exist specifically as an ordered chart-series palette, not as UI decoration. Confirmed anti-references: no playful/whimsical illustration, no brutalist or maximalist treatment, no marketing-agency gloss — this is a lab tool for researchers and students, not a campaign site.

**Key Characteristics:**

- Flat by default; lift is reserved for Card as a signal of "distinct, interactive content."
- One accent color (Signal Orange), used sparingly against a petrol-and-neutral base.
- Space Grotesk throughout, in one weight pairing (400 body / 700 headings / 500 labels) — no secondary display face.
- A fixed, unmodified 4-color ordered palette (petrol, violet, blue, magenta) reserved for chart/plot series, never for UI chrome.
- Fast, single-speed motion (150ms cubic-bezier(0.4,0,0.2,1)) everywhere; no per-component custom easing.

**Consumers.** This package is pulled in by 8 sites in this meta-repo, all under `pages/` (each via a `github:Computational-Biology-Aachen/design` git dependency, re-pinned lab-wide by `sync.sh`):

- `pages/2022-hackathon-watamu`
- `pages/2023-hackathon-embu`
- `pages/2026-photosynthesis-hackathon`
- `pages/2027`
- `pages/comphot`
- `pages/Computational-Biology-Aachen.github.io`
- `pages/green-sloth` — has one local fork, `src/lib/components/CardModel.svelte` (extends the shared `CardModel` with a `license` badge)
- `pages/mxl-web` — has one local fork, `src/lib/LineChart.svelte` (documented workaround for a Chart.js remount bug; intentionally not synced with upstream behavior changes)

(`pages/marvinvanaalst.github.io` does not depend on this package — skip it.) Any change to a token, component prop, exported name, or default value here is a change felt by all eight consumers on their next sync, not opt-in per site — grep each one for the pattern being touched before shipping, and check the two forks above by hand since they won't show up as a diff against this package.

## Colors

The palette pairs one dominant working color with one rare accent, plus a small, fixed ordered set reserved for data series.

### Primary

- **Deep Petrol** (`rgb(0, 97, 101)`): the system's ink. Buttons, links, active nav state, card top-border accents, primary section backgrounds, `Card` "primary" background, focus/brand moments. Appears on nearly every screen.

### Secondary (chart series — fixed order, data use only)

- **Chart Violet** (`rgb(97, 33, 88)`): plot/chart series 2.
- **Chart Blue** (`rgb(0, 84, 159)`): plot/chart series 3.
- **Chart Magenta** (`rgb(227, 0, 102)`): plot/chart series 4.

### Tertiary

- **Signal Orange** (`rgb(246, 168, 0)`): the system's one deliberate highlight. Used for `Card` "secondary" background, `H1`/`H2`/`H3` "secondary" text color, and accent section bands — never for body text, never as a second primary.

### Neutral

- **Off-White** (`#f6f6f8`): page background (`--color-bg`).
- **Paper White** (`#ffffff`): card/surface background, hover states on secondary buttons.
- **Hairline Border** (`#dde1e9`): default border color for inputs, dividers, nav bottom-border.
- **Ink Black** (`#1a1d23`): primary text color; also doubles as the "dark" background for `Section`/`Card`/heading variants.
- **Muted Grey** (`#727682`): secondary/muted text.
- **Deep Slate** (`rgb(15 23 42)`): heavy borders and a small number of emphasis accents (`--border-heavy`, `--slate`), distinct from the RWTH hue family — used sparingly.
- **Danger Red** (`rgb(204, 7, 30)`, `--color-danger`, aliases `--rwth-red`): the system's one semantic error/warning color — `InfoBox`'s error variant. Not used for anything else.
- **Caption Scrim** (`rgba(0, 0, 0, 0.7)`, `--scrim-caption`): translucent black overlay behind white text on a photo, for legibility — `CardPerson`, `CardSoftwareMain`, `CardPublicationMain` caption bars.
- **Backdrop Scrim** (`rgba(0, 0, 0, 0.5)`, `--scrim-backdrop`): the dimming layer behind a floating surface — `Popover`'s `::backdrop`.

### Named Rules

**The One Accent Rule.** Signal Orange appears in at most one place per view — a single highlighted card, a single accent section — never paired with itself twice on screen. Its rarity is what makes it register as a signal rather than decoration.

**The Series-Colors-Stay-In-Charts Rule.** The four ordered chart colors (petrol, violet, blue, magenta) are a fixed palette for plot/data series only. Never repurpose one as a UI accent color outside of `LineChart`/`SimChart` — doing so breaks the visual distinction between "this is chrome" and "this is data."

## Typography

**Display/Body Font:** Space Grotesk (with `system-ui, sans-serif` fallback) — the only typeface in the system; no serif or secondary display face.
**Mono Font:** `ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace` (code/parameter values only).

**Character:** One geometric sans doing every job — headings, body, labels, and nav — differentiated only by size and weight, never by a second family. That restraint is what keeps the "journal figure" feel: the type system reads as a single, consistent voice rather than a hierarchy of competing fonts.

### Hierarchy

- **Display** (700, 2rem, normal line-height): `H1` — page-level headings only.
- **Headline** (700, 1.75rem): `H2` — major section headings.
- **Title** (700, 1.5rem): `H3` — subsection headings. `H4`/`H5`/`H6` continue the same 700-weight step-down at 1.25rem / 1.125rem / 1rem for deeper nesting.
- **Body** (400, 1rem, line-height 1.6): `Text` — paragraph copy, justified with automatic hyphenation.
- **Label** (500, 0.9375rem): `Button`, `NavItem` — interactive/UI text. `Small` (`--text-sm`, 0.875rem) covers secondary inline text and dense UI chrome (inputs, icons, menu items, nav); `--text-callout` (0.75rem) is one step smaller for badges/meta text; `--text-body`/`--text-headline` (0.8125rem, same value under two names — treat `--text-body` as canonical) covers code/monospace blocks. All three are real, actively-referenced steps. `--text-title-large`, `--text-h1`/`--text-h2`/`--text-h3`, `--text-subheadline`, `--text-footnote`, and `--text-caption` remain genuinely unused — those are the reserved, not-active steps.

### Named Rules

**The Bold-Heading Rule.** Every heading level (`H1`–`H6`) uses the browser-default bold weight with no explicit `font-weight` override; body and label text stay at 400/500. Two weights only — bold for anything that is structurally a heading, regular/medium for everything else.

## Layout

Pages are built by stacking `Section` bands, each a full-width color band (`light` / `surface` / `dark` / `primary` / `accent`) with a centered inner column capped at `--max-width` (90rem / 1440px), or at 100ch when `width="narrow"` is used for reading-width prose. Section vertical padding defaults to `--space-12` (3rem) and can be removed entirely (`pad="no"`) for band-to-band stacking. `Navbar` is sticky at `--nav-height` (3.5rem) with the same centered max-width container and a single hairline bottom border — the only persistently-fixed chrome in the system.

The 4px-base spacing scale (`--space-1` through `--space-16`, i.e. 4px/8px/12px/16px/24px/32px/48px/64px) governs all padding, gaps, and margins; there is no ad-hoc pixel spacing outside this scale in the extracted components. Breakpoints are simple: `--sm` 640px, `--md` 768px, `--lg` 1024px — components like `Button` and `Section` widen or reflow at `--md`.

## Elevation & Depth

Hybrid, and deliberately so: the page structure (`Section`, `Navbar`, form inputs) is flat — no shadows at rest, separation comes from solid background-color bands and hairline borders. Depth is reserved for `Card`, which is the one component meant to read as a distinct, liftable, selectable unit: it carries a real two-layer shadow at rest and deepens + scales to 103% on hover. `Button` "primary" gets a small colored `--shadow-primary` glow (not a neutral shadow) to tie its elevation to the brand color rather than to generic depth.

### Shadow Vocabulary

- **Ambient small** (`box-shadow: 1px 1px 3px 0 rgba(0,0,0,0.08)`, `--shadow-sm`): minor separation, used sparingly (one observed use).
- **Ambient medium** (`box-shadow: 2px 2px 6px 0 rgba(0,0,0,0.1)`, `--shadow-md`): the general-purpose lifted-element shadow (popover, dropdown-like surfaces).
- **Brand glow** (`box-shadow: 2px 2px 6px 0 rgb(0 97 101 / 40%)`, `--shadow-primary`): primary buttons only — a colored shadow instead of a neutral one.
- **Card shadow (rest)**: `0px 18px 36px -18px rgba(0,0,0,0.1), 0px 30px 45px -30px rgba(50,50,93,0.25)` — a soft, diffuse two-layer shadow.
- **Card shadow (hover)**: the same two layers at higher opacity (`0.4`/`0.4`) paired with `transform: scale(1.03)`.

### Named Rules

**The Flat-Unless-Selectable Rule.** Nothing gets a shadow just for being a container. A shadow (or the colored button glow) only appears on an element the user is meant to notice as its own discrete, often-interactive unit — `Card`, primary `Button`, floating surfaces like `Popover`.

## Shapes

Corners are soft but restrained: `--radius-sm` (4px) is nearly unused, `--radius-md` (8px) is the default for buttons and cards, `--radius-lg` (16px) shows up on inputs and a handful of larger containers, and `--radius-full` (pill) is reserved for pill/tag-shaped controls. Card's signature form move is its 8px-solid colored top border (`border-top: 8px var(--color-primary) solid`) — a deliberate flat color bar, not a gradient or line accent — acting as the card's "caption bar" and its only non-neutral chrome besides its background. Borders elsewhere are 1px hairlines (`--border`) or, for a small set of heavier-emphasis elements, a 2px solid or dashed treatment (`--border-heavy`, `--border-dashed`).

**`InfoBox`'s side-tab** is the callout equivalent of Card's caption bar: a 1px hairline on all four sides (`color-mix(in srgb, <variant color> 25%, transparent)`) with a 4px solid accent on the left only, in the variant's full-strength color (petrol/orange/green/danger red). It's an intentional, variant-scoped pattern — not a stray inline override — so it's exempt from the "hairline borders elsewhere" default above; keep it to `InfoBox` rather than reusing a colored `border-left` as a generic callout/card treatment elsewhere in the system.

## Components

Buttons, cards, and inputs are all precise and unshowy: modest 150ms transitions, no scale/bounce flourish anywhere except Card's deliberate 3% hover lift, confident through consistency rather than performance.

### Buttons

- **Shape:** `border-radius: var(--radius-md)` (8px), full-width below `--md` (768px), auto-width above it.
- **Primary:** solid Deep Petrol background, inverse (white) text, brand-colored glow shadow (`--shadow-primary`); padding `--space-2 --space-6` (8px 24px).
- **Secondary:** transparent background, 1px Deep Petrol border, Deep Petrol text; hover fills to Paper White surface.
- **Inverted:** Paper White background, Deep Petrol text — for use on dark/primary section backgrounds.
- **Hover / Focus:** primary darkens via an inset black overlay (`inset 0 0 0 10em rgba(0,0,0,0.1)`); disabled state drops opacity to 0.5 and disables pointer events. A `loading` state swaps in a spinning ring built from `currentColor`.

### Cards

- **Corner Style:** `border-radius: 8px` (`--radius-md`).
- **Background:** `light` (default; near-white, `color-mix(in srgb, var(--color-bg), white 10%)`), `dark` (Ink Black), `primary` (Paper White), `secondary` (Signal Orange).
- **Shadow Strategy:** see Elevation & Depth — soft two-layer shadow at rest, deepens + 103% scale on hover.
- **Border:** none, except the signature 8px solid Deep Petrol top border.
- **Internal Padding:** `2rem 2.5rem` outer, `2rem 0` inner content area; two fixed formats — `fixed` (26rem × 26rem square) or `full` (fills container width).

### Inputs / Fields

- **Style:** transparent background, `border-radius: var(--radius-lg)` (16px — notably larger radius than buttons/cards), `solid` (1px hairline) or `transparent` border variant, laid out as a label/control pair via `InlineGrid`.
- **Focus:** no custom focus treatment observed beyond the browser default — a gap worth closing before shipping new input variants.
- **Padding:** `0.35rem 0.5rem`, font-size `0.875rem`.

### Navigation

- **Style:** `Navbar` is sticky, flat, hairline-bordered, fixed `--nav-height` (3.5rem), centered max-width inner row split between an optional brand slot and nav items.
- **NavItem:** `border-radius: var(--radius-md)`, Ink Black text at rest; hover fills Paper White surface and turns Deep Petrol; the active route is Deep Petrol text at weight 600 with no background change — color and weight alone signal "current page."

### Sections (signature component)

The page-composition primitive: a full-width solid-color band (`light`/`surface`/`dark`/`primary`/`accent`) with a centered, max-width-capped inner column. This is how every page in the system is built — vertical stacking of `Section`s, never a freeform canvas layout — and it's the clearest expression of the "flat, institutional, journal-page" structure the North Star describes.

## Do's and Don'ts

### Do:

- **Do** keep Signal Orange to one appearance per view (**The One Accent Rule**).
- **Do** reserve shadows for `Card`, primary `Button`, and genuinely floating surfaces — never for a static container (**The Flat-Unless-Selectable Rule**).
- **Do** use the four ordered chart colors (petrol/violet/blue/magenta) only inside `LineChart`/`SimChart`, in that order, for data series (**The Series-Colors-Stay-In-Charts Rule**).
- **Do** use bold weight exclusively for `H1`–`H6`; keep body/label text at 400/500 (**The Bold-Heading Rule**).
- **Do** compose pages as a vertical stack of `Section` bands rather than freeform layout.
- **Do** check every `pages/*` consumer listed in Overview for usage of whatever token, prop, default, or exported name is being changed, before shipping (**The Ripple-Check Rule**) — a breaking change here ships lab-wide on the next `sync.sh` re-pin, not opt-in per site.

### Don't:

- **Don't** introduce a second display typeface — Space Grotesk carries every role in this system.
- **Don't** give `Section`, `Navbar`, or form inputs a resting shadow; flat is the default state.
- **Don't** add bounce, spring, or multi-step easing to hover/transition states — the system uses one transition everywhere (`150ms cubic-bezier(0.4, 0, 0.2, 1)`).
- **Don't** treat RWTH-derived colors as a compliance boundary — the palette is a starting aesthetic the lab can diverge from, not an official corporate-design lock.
