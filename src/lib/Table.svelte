<!--
  @component

  A styled `<table>` wrapped in a horizontally scrollable container so wide
  tables stay usable on small screens. Compose with [[Thead]], [[Tbody]],
  [[Tr]], [[Th]] and [[Td]].

  ### Props

  - `children: Snippet`
    The table rows/sections.
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
    ...rest
  }: {
    children: Snippet;
    [key: string]: unknown;
  } = $props();
</script>

<div class="table-wrap">
  <table {...rest}>
    {@render children()}
  </table>
</div>

<style>
  .table-wrap {
    margin-bottom: var(--space-4);
    overflow-x: auto;
  }

  table {
    border-collapse: collapse;
    width: 100%;
    font-family: var(--font-sans);
    font-size: 0.9rem;
    text-align: left;
    text-indent: 0;
  }
</style>
