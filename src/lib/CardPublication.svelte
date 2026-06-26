<!--
  @component

  A card for a publication or software project: a title and slot content over a
  watermark image, with optional GitHub/GitLab, website and DOI links rendered
  as labelled icons. See [[CardPublicationMain]] (identical) for the headline
  variant.

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
  - `styleVars?: { borderRadius?: string; borderTopWidth?: string; backgroundSize?: string; innerPadding?: string; fixedSize?: string }`
    Optional overrides for CSS custom properties.

  ### Example

  ```svelte
  <CardPublication title="mxlpy" github="https://github.com/..." doi="10.1/x">
    A Python package for metabolic modelling.
  </CardPublication>
  ```
-->
<script lang="ts">
  import H2 from "./H2.svelte";
  import Link from "./Link.svelte";
  import { faGithub, faGitlab } from "@fortawesome/free-brands-svg-icons";
  import { faHome, faNewspaper } from "@fortawesome/free-solid-svg-icons";
  import type { Snippet } from "svelte";
  import Fa from "svelte-fa";

  let {
    children,
    title,
    img,
    github = null,
    gitlab = null,
    href = null,
    doi = null,
    format = "full",
    color = "light",
    styleVars = {},
  }: {
    children: Snippet;
    title: string;
    img?: string | null;
    github?: string | null;
    gitlab?: string | null;
    doi?: string | null;
    href?: string | null;
    format?: "full" | "fixed";
    color?: "dark" | "light" | "primary" | "secondary";
    styleVars?: {
      borderRadius?: string;
      borderTopWidth?: string;
      backgroundSize?: string;
      innerPadding?: string;
      fixedSize?: string;
    };
  } = $props();

  let cardCssVars = $derived({
    ...(styleVars.borderRadius ? { "--card-publication-border-radius": styleVars.borderRadius } : {}),
    ...(styleVars.borderTopWidth ? { "--card-publication-border-top-width": styleVars.borderTopWidth } : {}),
    ...(styleVars.backgroundSize ? { "--card-publication-background-size": styleVars.backgroundSize } : {}),
    ...(styleVars.innerPadding ? { "--card-publication-inner-padding": styleVars.innerPadding } : {}),
    ...(styleVars.fixedSize ? { "--card-publication-fixed-size": styleVars.fixedSize } : {}),
  });
</script>

<div
  class={`card ${color} ${format}`}
  style={Object.entries(cardCssVars).map(([k, v]) => `${k}:${v}`).join(";")}
>
  <div
    class="inner"
    style:background-image={`url(${img})`}
  >
    <H2>{title}</H2>
    {@render children()}
    {#if github != null}
      <Link href={github}><Fa icon={faGithub} /> Check me out at Github</Link>
    {:else if gitlab != null}
      <Link href={gitlab}><Fa icon={faGitlab} /> Check me out at GitLab</Link>
    {/if}
    {#if href != null}
      <Link href={href}><Fa icon={faHome} />Website</Link>
    {/if}
    {#if doi != null}
      <Link href="https://doi.org/{doi}"
        ><Fa icon={faNewspaper} />Publication</Link
      >
    {/if}
  </div>
</div>

<style>
  .card {
    --card-publication-border-radius: 8px;
    --card-publication-border-top-width: 8px;
    --card-publication-background-size: 250px;
    --card-publication-inner-padding: 2.5rem 2.5rem;
    --card-publication-fixed-size: 26rem;
    transform: scale(1);
    transition: transform 0.3s ease;
    box-shadow:
      0px 18px 36px -18px rgba(0, 0, 0, 0.1),
      0px 30px 45px -30px rgba(50, 50, 93, 0.25);
    border-top: var(--card-publication-border-top-width) var(--color-primary) solid;
    border-radius: var(--card-publication-border-radius);
    padding: 0;
  }
  .card:hover {
    transform: scale(1.03);
    box-shadow:
      0px 18px 36px -18px rgba(0, 0, 0, 0.4),
      0px 30px 45px -30px rgba(50, 50, 93, 0.4);
  }
  .inner {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-position-x: 98%;
    background-position-y: 90%;

    background-size: var(--card-publication-background-size);
    background-repeat: no-repeat;
    background-color: color-mix(in srgb, var(--color-bg) 75%, transparent);
    background-blend-mode: lighten;
    padding: var(--card-publication-inner-padding);
    width: 100%;
    height: 100%;
  }

  .full {
    width: 100%;
  }
  .fixed {
    width: var(--card-publication-fixed-size);
    height: var(--card-publication-fixed-size);
  }
  .dark {
    background-color: var(--color-text);
  }
  .light {
    background-color: color-mix(in srgb, var(--color-bg), white 10%);
  }
  .primary {
    background-color: var(--color-surface);
  }
  .secondary {
    background-color: var(--color-accent);
  }
</style>
