<!--
  @component

  Renders keyboard input with monospaced, padded styling to denote a key or
  shortcut the user should press.

  ### Props

  - `children: Snippet`
    The key or key combination to display.
  - `styleVars?: { padding?: string; fontSize?: string }`
    Override the default padding and font-size via CSS custom properties.

  ### Example

  ```svelte
  <p>Press <Keyboard>Ctrl</Keyboard> + <Keyboard>C</Keyboard> to copy.</p>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
  }: {
    children: Snippet;
    styleVars?: { padding?: string; fontSize?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.padding ? { "--kb-padding": styleVars.padding } : {}),
    ...(styleVars.fontSize ? { "--kb-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<kdb style={inlineStyle}>
  {@render children()}
</kdb>

<style>
  kdb {
    --kb-padding: 0.375rem;
    --kb-font-size: 0.875em;
    vertical-align: baseline;
    padding: var(--kb-padding);
    font-size: var(--kb-font-size);
    font-family: monospace;
  }
</style>
