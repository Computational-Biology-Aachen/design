<!--
  @component

  A preformatted block (`<pre>`) for code or fixed-width text, rendered on a
  dark surface with a monospaced font and horizontal scrolling for long lines.

  ### Props

  - `children: Snippet`
    The preformatted content; whitespace is preserved verbatim.
  - `styleVars?: { padding?: string; fontSize?: string; fontFamily?: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Pre>npm run build</Pre>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
  }: {
    children: Snippet;
    styleVars?: { padding?: string; fontSize?: string; fontFamily?: string };
  } = $props();

  let inlineStyle = $derived(
    [
      ...(styleVars.padding ? ["--pre-padding", styleVars.padding] : []),
      ...(styleVars.fontSize ? ["--pre-font-size", styleVars.fontSize] : []),
      ...(styleVars.fontFamily
        ? ["--pre-font-family", styleVars.fontFamily]
        : []),
    ]
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<pre style={inlineStyle}>{@render children()}</pre>

<style>
  pre {
    --pre-padding: var(--space-4);
    --pre-font-size: 0.8125rem;
    --pre-font-family: var(--font-mono);
    margin: 0;
    border-radius: var(--radius-md);
    background-color: var(--color-text);
    padding: var(--pre-padding);
    width: 100%;
    overflow-x: auto;
    color: var(--color-text-inverse);
    font-size: var(--pre-font-size);
    font-family: var(--pre-font-family);
  }
</style>
