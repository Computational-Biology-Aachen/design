<!--
  @component

  A full-width page section with a coloured background band and a centred,
  max-width inner column. The primary building block for page layouts; stack
  several to compose a page.

  ### Props

  - `variant?: "light" | "surface" | "dark" | "primary" | "accent"`
    Background/foreground colour scheme. Defaults to `"light"`.
  - `width?: "full" | "narrow"`
    Inner column width — `"narrow"` caps at 100ch for readable prose. Defaults
    to `"full"`.
  - `gap?: "normal" | "large"`
    Vertical gap between children. Defaults to `"normal"`.
  - `pad?: "no" | "lg"`
    Vertical padding of the band. Defaults to `"lg"`.
  - `children: Snippet`
    The section content.

  ### Example

  ```svelte
  <Section variant="primary" width="narrow">
    <H2 color="light">About</H2>
    <Text color="light">…</Text>
  </Section>
  ```
-->
<script lang="ts">
  import type { Variant } from "$lib/variants";
  import type { Snippet } from "svelte";

  let {
    variant = "light",
    width = "full",
    gap = "normal",
    pad = "lg",
    styleVars = {},
    children,
  }: {
    variant?: Variant;
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    pad?: "no" | "lg";
    styleVars?: {
      yPad?: string;
      innerMaxWidth?: string;
      innerGap?: string;
    };
    children: Snippet;
  } = $props();

  let sectionCssVars = $derived({
    ...(styleVars.yPad ? { "--section-ypad": styleVars.yPad } : {}),
  });
  let innerCssVars = $derived({
    ...(styleVars.innerMaxWidth
      ? { "--section-inner-max-width": styleVars.innerMaxWidth }
      : {}),
    ...(styleVars.innerGap
      ? { "--section-inner-gap": styleVars.innerGap }
      : {}),
  });
</script>

<section
  class={variant}
  style={Object.entries(sectionCssVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  <div
    class="inner max-width-{width} gap-{gap} pad-{pad}"
    style={Object.entries(innerCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0 var(--space-4);
    padding-top: var(--section-ypad);
    padding-bottom: var(--section-ypad);
    width: 100%;
    min-height: 12rem;
  }
  /* section variants - Colors */
  .light {
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  .dark {
    background-color: var(--color-text);
    color: var(--color-text-inverse);
  }
  .surface {
    background-color: var(--color-surface);
    color: var(--color-text);
  }
  .primary {
    background-color: var(--color-primary);
    color: var(--color-text-inverse);
  }
  .accent {
    background-color: var(--color-accent);
    color: var(--color-text);
  }
  /* section variants - Padding */
  .pad-no {
    --section-ypad: 0;
  }
  .pad-lg {
    --section-ypad: var(--space-12);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--section-inner-gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--section-inner-max-width);
  }

  /* inner variants - Width */
  .max-width-full {
    padding-right: 1rem;
    padding-left: 1rem;
    --section-inner-max-width: var(--max-width);
  }
  .max-width-narrow {
    --section-inner-max-width: 100ch;
  }

  /* inner variants - Gap */
  .gap-sm {
    --section-inner-gap: var(--gap-sm);
  }
  .gap-normal {
    --section-inner-gap: var(--gap);
  }
  .gap-large {
    --section-inner-gap: var(--gap-lg);
  }
</style>
