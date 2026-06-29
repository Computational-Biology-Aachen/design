<!--
  @component

  A page footer with a dark background and a centred, max-width inner column.
  Sticks to the bottom of the layout via `margin-top: auto`.

  ### Props

  - `styleVars?: { innerMaxWidth?: string; innerGap?: string }`
    Override CSS custom properties on the inner element.
  - `children: Snippet`
    The footer content (links, imprint, copyright).

  ### Example

  ```svelte
  <SectionFooter>
    <Text color="light">© 2026 CPBL</Text>
  </SectionFooter>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { Variant } from "./variants";

  let {
    variant = "dark",
    width = "full",
    gap = "normal",
    pad = "no",
    styleVars = {},
    children,
  }: {
    variant?: Variant;
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    pad?: "no" | "lg";
    styleVars?: {
      sectionBackgroundColor?: string;
      sectionTextColor?: string;
      innerYPad?: string;
      innerMaxWidth?: string;
      innerGap?: string;
    };
    children: Snippet;
  } = $props();

  let sectionCssVars = $derived({
    ...(styleVars.sectionBackgroundColor
      ? { "--section-background-color": styleVars.sectionBackgroundColor }
      : {}),
    ...(styleVars.sectionTextColor
      ? { "--section-text-color": styleVars.sectionTextColor }
      : {}),
  });
  let innerCssVars = $derived({
    ...(styleVars.innerMaxWidth
      ? { "--section-inner-max-width": styleVars.innerMaxWidth }
      : {}),
    ...(styleVars.innerGap
      ? { "--section-inner-gap": styleVars.innerGap }
      : {}),
    ...(styleVars.innerYPad ? { "--section-ypad": styleVars.innerYPad } : {}),
  });
</script>

<footer
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
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: auto;
    background-color: var(--color-text);
    padding: var(--space-12) var(--space-4);
    width: 100%;
    min-height: 12rem;
    color: var(--color-text-inverse);
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--section-inner-gap);
    margin: 0 auto;
    padding-top: var(--section-ypad);
    padding-bottom: var(--section-ypad);
    width: 100%;
    max-width: var(--section-inner-max-width);
  }

  /* section variants - Colors */
  .light {
    --section-background-color: var(--color-bg);
    --section-text-color: var(--color-text);
  }
  .dark {
    --section-background-color: var(--color-text);
    --section-text-color: var(--color-text-inverse);
  }
  .surface {
    --section-background-color: var(--color-surface);
    --section-text-color: var(--color-text);
  }
  .primary {
    --section-background-color: var(--color-primary);
    --section-text-color: var(--color-text-inverse);
  }
  .accent {
    --section-background-color: var(--color-accent);
    --section-text-color: var(--color-text);
  }
  /* section variants - Padding */
  .pad-no {
    --section-ypad: 0;
  }
  .pad-lg {
    --section-ypad: var(--space-12);
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
