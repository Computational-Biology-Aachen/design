<!--
  @component

  A responsive CSS grid that is single-column on mobile and expands to the
  requested column count at wider breakpoints (2 cols ≥640px, 3 cols ≥768px,
  4 cols ramps 2→4 from 768px to 1024px).

  ### Props

  - `columns?: number`
    Target column count on wide viewports (1–4). Defaults to `1`.
  - `gap?: string`
    CSS grid gap. Defaults to `"var(--gap)"`.
  - `children: Snippet`
    The grid items.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Grid columns={3}>
    <Card>…</Card>
    <Card>…</Card>
    <Card>…</Card>
  </Grid>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    columns?: number;
    gap?: string;
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let {
    columns = 1,
    gap = "var(--gap)",
    children,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div
  class="grid cols-{columns}"
  style:gap={gap}
  style={inlineStyle}
>
  {@render children()}
</div>

<style>
  .grid {
    display: grid;
    align-items: start;
    width: 100%;
  }

  /* All variants are 1-column on mobile */
  .cols-1 {
    grid-template-columns: 1fr;
  }
  .cols-2 {
    grid-template-columns: 1fr;
  }
  .cols-3 {
    grid-template-columns: 1fr;
  }
  .cols-4 {
    grid-template-columns: 1fr;
  }

  @media (min-width: 640px) {
    .cols-2 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 768px) {
    .cols-3 {
      grid-template-columns: repeat(3, 1fr);
    }
    .cols-4 {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (min-width: 1024px) {
    .cols-4 {
      grid-template-columns: repeat(4, 1fr);
    }
  }
</style>
