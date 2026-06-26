<!--
  @component

  Table header cell (`<th>`) with surface background and bold, left-aligned,
  non-wrapping text. Use inside a header [[Tr]].

  ### Props

  - `children: Snippet`
    The header label.
  - `styleVars?: { padding?: string }`
    Override CSS custom properties for the cell.
  - `...rest`
    Additional attributes (e.g. `colspan`, `scope`) spread onto the `<th>`.
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
    ...rest
  }: {
    children: Snippet;
    styleVars?: { padding?: string };
    [key: string]: unknown;
  } = $props();

  let cssVars = $derived({
    ...(styleVars.padding ? { "--th-padding": styleVars.padding } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<th
  {...rest}
  style={inlineStyle}
>
  {@render children()}
</th>

<style>
  th {
    --th-padding: 0.5rem 0.75rem;

    background: var(--color-surface);
    padding: var(--th-padding);
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
  }
</style>
