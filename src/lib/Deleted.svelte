<!--
  @component

  Marks inline content as deleted by wrapping its children in a semantic `<del>`
  element. Pairs with [[Inserted]] to show edits.

  ### Props

  - `children: Snippet`
    The inline content to mark as removed.

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

<del>
  {@render children()}
</del>

<style>
</style>
