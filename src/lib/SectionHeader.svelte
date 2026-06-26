<!--
  @component

  A page header band on the primary colour with a centred, max-width inner
  column. Use at the top of a page for a title/intro. See [[SectionHeaderPerson]]
  for the team-member variant.

  ### Props

  - `variant?: "light" | "surface" | "dark" | "primary" | "accent"`
    Colour scheme. Defaults to `"light"`.
  - `width?: "full" | "narrow"`
    Inner column width. Defaults to `"full"`.
  - `gap?: "normal" | "large"`
    Vertical gap between children. Defaults to `"normal"`.
  - `styleVars?: { innerMaxWidth?: string; innerGap?: string }`
    Override CSS custom properties on the inner element.
  - `children: Snippet`
    The header content.

  ### Example

  ```svelte
  <SectionHeader>
    <H1 color="light">Publications</H1>
  </SectionHeader>
  ```
-->
<script lang="ts">
  import type { Variant } from "$lib/variants";
  import type { Snippet } from "svelte";

  let {
    variant = "light",
    width = "full",
    gap = "normal",
    styleVars = {},
    children,
  }: {
    variant?: Variant;
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    styleVars?: {
      innerMaxWidth?: string;
      innerGap?: string;
    };
    children: Snippet;
  } = $props();

  let innerCssVars = $derived({
    ...(styleVars.innerMaxWidth
      ? { "--section-inner-max-width": styleVars.innerMaxWidth }
      : {}),
    ...(styleVars.innerGap
      ? { "--section-inner-gap": styleVars.innerGap }
      : {}),
  });
</script>

<header>
  <div
    class="inner max-width-{width} gap-{gap}"
    style={Object.entries(innerCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    background-color: var(--color-primary);
    padding: var(--space-8) var(--space-4);
    min-height: 12rem;
  }
  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--section-inner-gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--section-inner-max-width);
  }

  .gap-normal {
    --section-inner-gap: var(--gap);
  }

  .gap-large {
    --section-inner-gap: var(--gap-lg);
  }

  .max-width-full {
    --section-inner-max-width: var(--max-width);
  }

  .max-width-narrow {
    --section-inner-max-width: 100ch;
  }
</style>
