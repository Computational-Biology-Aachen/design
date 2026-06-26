<!--
  @component

  A styled `<table>` wrapped in a horizontally scrollable container so wide
  tables stay usable on small screens. Compose with [[Thead]], [[Tbody]],
  [[Tr]], [[Th]] and [[Td]].

  ### Props

  - `children: Snippet`
    The table rows/sections.
  - `styleVars?: { fontSize?: string }`
    Override CSS custom properties for the table element.
  - `...rest`
    Any additional attributes are spread onto the `<table>` element.

  ### Example

  ```svelte
  <Table>
    <Thead><Tr><Th>Gene</Th><Th>Function</Th></Tr></Thead>
    <Tbody><Tr><Td>RBCS</Td><Td>Rubisco small subunit</Td></Tr></Tbody>
  </Table>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
    ...rest
  }: {
    children: Snippet;
    styleVars?: { fontSize?: string };
    [key: string]: unknown;
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--table-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div class="table-wrap">
  <table
    {...rest}
    style={inlineStyle}
  >
    {@render children()}
  </table>
</div>

<style>
  .table-wrap {
    margin-bottom: var(--space-4);
    overflow-x: auto;
  }

  table {
    --table-font-size: 0.9rem;

    border-collapse: collapse;
    width: 100%;
    font-size: var(--table-font-size);
    font-family: var(--font-sans);
    text-align: left;
    text-indent: 0;
  }
</style>
