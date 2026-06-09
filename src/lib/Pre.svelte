<!--
  @component

  A preformatted block (`<pre>`) for code or fixed-width text, rendered on a
  dark surface with a monospaced font and horizontal scrolling for long lines.

  ### Props

  - `children: Snippet`
    The preformatted content; whitespace is preserved verbatim.

  ### Example

  ```svelte
  <Pre>npm run build</Pre>
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

<pre>{@render children()}</pre>

<style>
  pre {
    margin: 0;
    border-radius: var(--radius-md);
    background-color: var(--color-text);
    padding: var(--space-4);
    width: 100%;
    overflow-x: auto;
    color: var(--color-text-inverse);
    font-size: 0.8125rem;
    font-family: var(--font-mono);
  }
</style>
