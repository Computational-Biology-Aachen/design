<!--
  @component

  Renders keyboard input with monospaced, padded styling to denote a key or
  shortcut the user should press.

  ### Props

  - `children: Snippet`
    The key or key combination to display.

  ### Example

  ```svelte
  <p>Press <Keyboard>Ctrl</Keyboard> + <Keyboard>C</Keyboard> to copy.</p>
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

<kdb>
  {@render children()}
</kdb>

<style>
  kdb {
    vertical-align: baseline;
    padding: 0.375rem;
    font-size: 0.875em;
    font-family: monospace;
  }
</style>
