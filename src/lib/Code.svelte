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
    pad = "0",
  }: {
    children: Snippet;
    pad?: "0" | "1";
  } = $props();
</script>

<code class="pad-{pad}">
  {@render children()}
</code>

<style>
  code {
    font-family: monospace;
  }

  .pad-0 {
    padding: 0;
  }

  .pad-1 {
    padding: 1rem;
  }
</style>
