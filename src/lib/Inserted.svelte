<!--
  @component

  Marks inline content as inserted by wrapping its children in a semantic `<ins>`
  element. Pairs with [[Deleted]] to show edits.

  ### Props

  - `children: Snippet`
    The inline content to mark as added.

  ### Example

  ```svelte
  <p><Deleted>five</Deleted> <Inserted>six</Inserted> samples.</p>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
  }: {
    children: Snippet;
  } = $props();
</script>

<ins>
  {@render children()}
</ins>

<style>
  ins {
    color: var(--color-primary);
    text-decoration: underline var(--color-primary) solid 1px;
  }
</style>
