<!--
  @component

  Table data cell (`<td>`), left-aligned and vertically centred. Use inside a
  body [[Tr]].

  ### Props

  - `children: Snippet`
    The cell content.
  - `styleVars?: { padding?: string }`
    Override CSS custom properties for the cell.
  - `...rest`
    Additional attributes (e.g. `colspan`) spread onto the `<td>`.
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
    ...(styleVars.padding ? { "--td-padding": styleVars.padding } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<td
  {...rest}
  style={inlineStyle}
>
  {@render children()}
</td>

<style>
  td {
    --td-padding: 0.5rem 0.75rem;

    vertical-align: middle;
    padding: var(--td-padding);
    text-align: left;
  }
</style>
