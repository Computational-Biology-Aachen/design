<!--
  @component

  A list item (`<li>`) with a selectable palette colour. Use inside [[Ul]] or
  [[Ol]].

  ### Props

  - `color?: "inherit" | "dark" | "light" | "primary" | "secondary"`
    Text colour. Defaults to `"inherit"`.
  - `children: Snippet`
    The list-item content.

  ### Example

  ```svelte
  <Ul>
    <Li>First item</Li>
    <Li>Second item</Li>
  </Ul>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    color = "inherit",
    children,
  }: {
    color?: "inherit" | "dark" | "light" | "primary" | "secondary";
    children: Snippet;
  } = $props();
</script>

<li class={`${color}`}>
  {@render children()}
</li>

<style>
  .inherit {
    color: inherit;
  }
  .dark {
    color: var(--color-text);
  }
  .light {
    color: var(--color-bg);
  }
  .primary {
    color: var(--color-surface);
  }
  .secondary {
    color: var(--color-accent);
  }
</style>
