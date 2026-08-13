<!--
  @component

  The main content region (`<main>`) of a page: a centred, max-width column with
  configurable width, padding, gap and alignment.

  ### Props

  - `width?: "full" | "narrow" | "90ch"`
    Inner column width. Defaults to `"full"`.
  - `pad?: "full" | "tight"`
    Vertical padding (`"full"` scales up at wider breakpoints). Defaults to
    `"full"`.
  - `gap?: "normal" | "large"`
    Vertical gap between children. Defaults to `"normal"`.
  - `align?: "center" | "start"`
    Cross-axis alignment. Defaults to `"center"`.
  - `styleVars?: { innerMaxWidth?: string; innerGap?: string; innerPad?: string; innerAlign?: string }`
    Override CSS custom properties on the inner element.
  - `children: Snippet`
    The page content.

  ### Example

  ```svelte
  <SectionMain width="90ch" align="start">
    <H1>Tutorial</H1>
    <Text>…</Text>
  </SectionMain>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    width = "full",
    pad = "full",
    gap = "normal",
    align = "center",
    styleVars = {},
    children,
  }: {
    width?: "full" | "narrow" | "90ch";
    pad?: "full" | "tight";
    gap?: "normal" | "large";
    align?: "center" | "start";
    styleVars?: {
      innerMaxWidth?: string;
      innerGap?: string;
      innerPad?: string;
      innerAlign?: string;
    };
    children: Snippet;
  } = $props();

  let innerCssVars = $derived({
    ...(styleVars.innerMaxWidth
      ? { "--sectionmain-inner-max-width": styleVars.innerMaxWidth }
      : {}),
    ...(styleVars.innerGap
      ? { "--sectionmain-inner-gap": styleVars.innerGap }
      : {}),
    ...(styleVars.innerPad
      ? { "--sectionmain-inner-pad": styleVars.innerPad }
      : {}),
    ...(styleVars.innerAlign
      ? { "--sectionmain-inner-align": styleVars.innerAlign }
      : {}),
  });
</script>

<main>
  <div
    class="inner max-width-{width} pad-{pad} gap-{gap} align-{align}"
    style={Object.entries(innerCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    {@render children()}
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0 var(--space-4);
    width: 100%;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: var(--sectionmain-inner-align);
    gap: var(--sectionmain-inner-gap);
    margin: 0 auto;
    padding: var(--sectionmain-inner-pad);
    width: 100%;
    max-width: var(--sectionmain-inner-max-width);
  }

  .pad-tight {
    --sectionmain-inner-pad: 1rem;
  }

  .pad-full {
    --sectionmain-inner-pad: 1rem;

    @media (min-width: 50rem) {
      --sectionmain-inner-pad: 3rem 1rem;
    }

    @media (min-width: 75rem) {
      --sectionmain-inner-pad: 5rem 1rem;
    }
  }

  .gap-normal {
    --sectionmain-inner-gap: var(--gap);
  }
  .gap-large {
    --sectionmain-inner-gap: var(--gap-lg);
  }

  .max-width-full {
    --sectionmain-inner-max-width: var(--max-width);
  }
  .max-width-narrow {
    --sectionmain-inner-max-width: 100ch;
  }
  .max-width-90ch {
    --sectionmain-inner-max-width: 90ch;
  }

  .align-center {
    --sectionmain-inner-align: center;
  }
  .align-start {
    --sectionmain-inner-align: start;
  }
</style>
