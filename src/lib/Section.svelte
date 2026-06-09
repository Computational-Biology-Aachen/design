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
  import type { Snippet } from "svelte";

  let {
    variant = "light",
    width = "full",
    gap = "normal",
    pad = "lg",
    children,
  }: {
    variant?: "light" | "surface" | "dark" | "primary" | "accent";
    width?: "full" | "narrow";
    gap?: "normal" | "large";
    pad?: "no" | "lg";
    children: Snippet;
  } = $props();
</script>

<section class={variant}>
  <div class="inner width-{width} gap-{gap} pad-{pad}">
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
    width: 100%;
    min-height: 12rem;
  }

  .inner {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    margin: 0 auto;
    width: 100%;
    max-width: var(--max-width);
  }

  .width-full {
    padding-right: 1rem;
    padding-left: 1rem;
    max-width: var(--max-width);
  }

  .width-narrow {
    max-width: 100ch;
  }

  .pad-no {
    padding-top: 0;
    padding-bottom: 0;
  }

  .pad-lg {
    padding-top: var(--space-12);
    padding-bottom: var(--space-12);
  }

  .light {
    background-color: var(--color-bg);
    color: var(--color-text);
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

  .dark {
    background-color: var(--color-text);
    color: var(--color-text-inverse);
  }

  .gap-normal {
    gap: var(--gap);
  }

  .gap-large {
    gap: var(--gap-lg);
  }
</style>
