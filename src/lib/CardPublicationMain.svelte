<!--
  @component

  Headline variant of [[CardPublication]] for featuring a primary publication or
  software project. Same props and behaviour: a title and slot content over a
  watermark image, with optional GitHub/GitLab, website and DOI links.

  ### Props

  - `title: string`
    Card heading.
  - `children: Snippet`
    Body content (e.g. authors, abstract).
  - `img?: string | null`
    Watermark/background image URL.
  - `github?: string | null`, `gitlab?: string | null`
    Repository links (GitHub takes precedence if both set).
  - `href?: string | null`
    Project website link.
  - `doi?: string | null`
    DOI; rendered as a `https://doi.org/{doi}` publication link.
  - `format?: "full" | "fixed"`
    `"fixed"` renders a 26rem square; `"full"` fills the width. Defaults to
    `"full"`.
  - `color?: "dark" | "light" | "primary" | "secondary"`
    Background colour. Defaults to `"light"`.
  - `styleVars?: { minHeight?: string; barPadding?: string }`
    Optional overrides for CSS custom properties.

  ### Example

  ```svelte
  <CardPublicationMain title="Featured paper" doi="10.1234/example">
    Authors et al., 2026.
  </CardPublicationMain>
  ```
-->
<script lang="ts">
  import Link from "./Link.svelte";
  import type { Snippet } from "svelte";

  let {
    title,
    href = "/",
    img = "/placeholder.jpg",
    children,
    styleVars = {},
  }: {
    title: string;
    href?: string;
    img?: string;
    children: Snippet;
    styleVars?: {
      minHeight?: string;
      barPadding?: string;
    };
  } = $props();

  let cardCssVars = $derived({
    ...(styleVars.minHeight
      ? { "--card-publication-main-min-height": styleVars.minHeight }
      : {}),
    ...(styleVars.barPadding
      ? { "--card-publication-main-bar-padding": styleVars.barPadding }
      : {}),
  });
</script>

<Link href={href}>
  <div
    class="card"
    style={`--card-image: url(${img});${Object.entries(cardCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}`}
  >
    <div class="bar">
      <h4>{title}</h4>
      {@render children()}
    </div>
  </div>
</Link>

<style>
  .card {
    --card-publication-main-min-height: 400px;
    --card-publication-main-bar-padding: 1rem;
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: end;
    transition: transform 0.3s ease;
    background-color: white;
    isolation: isolate;
    width: 100%;
    min-height: var(--card-publication-main-min-height);
    overflow: hidden;
  }

  .card::before {
    position: absolute;
    transform: scale(1.01);
    opacity: 0.8;
    z-index: 0;
    /* filter: grayscale(65%) saturate(55%) brightness(0.78) contrast(0.9); */
    inset: 0;
    background-image: var(--card-image);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    content: "";
  }

  .card::after {
    position: absolute;
    z-index: 0;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.5) 100%
    );
    content: "";
  }

  .card:hover {
    transform: scale(1.01);
  }

  @media (min-width: 768px) {
    .card::before {
      background-position: center;
      background-size: 90%;
    }
  }
  .bar {
    display: flex;
    position: relative;
    flex-direction: column;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
    padding: var(--card-publication-main-bar-padding);
    width: 100%;
    color: var(--color-bg);
  }
  h4 {
    color: var(--color-bg);
  }
</style>
