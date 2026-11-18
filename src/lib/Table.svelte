<!--
  @component

  A styled `<table>` wrapped in a horizontally scrollable container so wide
  tables stay usable on small screens. Compose with [[Thead]], [[Tbody]],
  [[Tr]], [[Th]] and [[Td]].

  ### Props

  - `children: Snippet`
    The table rows/sections.
  - `label?: string`
    Accessible name. When set, the scroll container becomes a focusable
    `role="region"` so keyboard users can scroll wide tables (Safari doesn't
    make scrollers focusable on its own).
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
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  let {
    children,
    label,
    styleVars = {},
    ...rest
  }: {
    children: Snippet;
    label?: string;
    styleVars?: { fontSize?: string };
    [key: string]: unknown;
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--table-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<!-- A labelled, focusable scroll region is the keyboard-scrolling pattern. -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class="table-wrap"
  role={label ? "region" : undefined}
  aria-label={label}
  tabindex={label ? 0 : undefined}
>
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
    --table-font-size: var(--text-sm);

    border-collapse: collapse;
    width: 100%;
    font-size: var(--table-font-size);
    font-family: var(--font-sans);
    text-align: left;
    text-indent: 0;
  }
</style>
