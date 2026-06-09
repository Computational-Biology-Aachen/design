<!--
  @component

  Inline code span (`<code>`) for short snippets such as identifiers or
  commands. For multi-line code blocks use [[Pre]].

  ### Props

  - `children: Snippet`
    The code content.

  ### Example

  ```svelte
  <p>Run <Code>npm install</Code> first.</p>
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

<code>
  {@render children()}
</code>

<style>
  code {
    padding: 1rem;
  }
</style>
