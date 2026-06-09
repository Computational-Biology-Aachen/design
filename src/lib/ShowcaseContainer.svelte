<!--
  @component

  A vertical container with generous (double-gap) spacing that wraps the
  [[ShowcaseSection]]s of the design-system showcase/docs pages.

  ### Props

  - `children: Snippet`
    The showcase sections.

  ### Example

  ```svelte
  <ShowcaseContainer>
    <ShowcaseSection id="buttons" title="Buttons">…</ShowcaseSection>
  </ShowcaseContainer>
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
    gap: calc(var(--gap) * 2);
  }
</style>
