<!--
  @component

  Renders smaller, secondary inline text (e.g. fine print or captions) in a
  semantic `<small>` element at `0.875rem`.

  ### Props

  - `children: Snippet`
    The inline content to render at reduced size.
  - `styleVars?: { fontSize?: string }`
    CSS custom property overrides. Maps to `--small-font-size`.

  ### Example

  ```svelte
  <Small>Last updated June 2026.</Small>
  <Small styleVars={{ fontSize: "var(--text-callout)" }}>Tiny text</Small>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";

  let {
    children,
    styleVars = {},
  }: {
    children: Snippet;
    styleVars?: { fontSize?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.fontSize ? { "--small-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<small style={inlineStyle}>
  {@render children()}
</small>

<style>
  small {
    --small-font-size: var(--text-sm);
    font-size: var(--small-font-size);
  }
</style>
