<!--
  @component

  A minimal vertical flex container that stacks its children in a column with the
  design-system `--gap` spacing. The simplest layout primitive.

  ### Props

  - `children: Snippet`
    The content to stack vertically.

  ### Example

  ```svelte
  <Box>
    <H2>Title</H2>
    <Text>Body copy.</Text>
  </Box>
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

<div>
  {@render children()}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    width: 100%;
  }
</style>
