<!--
  @component

  A vertical container with generous (double-gap) spacing that wraps the
  [[ShowcaseSection]]s of the design-system showcase/docs pages.

  ### Props

  - `children: Snippet`
    The showcase sections.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

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
    styleVars = {},
  }: {
    children: Snippet;
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<div style={inlineStyle}>
  {@render children()}
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    gap: calc(var(--gap) * 2);
  }
</style>
