<!--
  @component

  A single tab button with an underline indicator when selected. Drive several
  from parent state to build a tab bar; see [[Tabs]] for a higher-level wrapper.

  ### Props

  - `selected: boolean`
    Whether this tab is the active one (shows the underline).
  - `onclick: MouseEventHandler<HTMLButtonElement>`
    Handler that should set this tab as selected.
  - `children: Snippet`
    The tab label.
  - `styleVars?: { gap?: string; fontSize?: string; padding?: string }`
    Override the tab's default CSS values.

  ### Example

  ```svelte
  <ButtonTab selected={tab === "info"} onclick={() => (tab = "info")}>
    Info
  </ButtonTab>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";

  let {
    selected,
    onclick,
    children,
    styleVars = {},
  }: {
    selected: boolean;
    children: Snippet;
    onclick: MouseEventHandler<HTMLButtonElement>;
    styleVars?: { gap?: string; fontSize?: string; padding?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.gap ? { "--tab-gap": styleVars.gap } : {}),
    ...(styleVars.fontSize ? { "--tab-font-size": styleVars.fontSize } : {}),
    ...(styleVars.padding ? { "--tab-padding": styleVars.padding } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<button
  class:selected={selected}
  onclick={onclick}
  style={inlineStyle}
>
  {@render children()}
</button>

<style>
  button {
    --tab-gap: 0.5rem;
    --tab-font-size: 0.84rem;
    --tab-padding: 0;
    display: flex;
    align-items: center;
    gap: var(--tab-gap);
    cursor: pointer;
    margin: 0;
    border: none;
    background-color: transparent;
    padding: var(--tab-padding);
    color: var(--slate-500);
    font-weight: 700;
    font-size: var(--tab-font-size);
    white-space: nowrap;

    @media (min-width: 768px) {
      margin: 0 1rem;
      padding: 0.3rem 0.2rem;
    }
  }
  button:hover {
    color: var(--color-primary);
  }
  .selected {
    border-bottom: 2px solid var(--color-primary);
    color: var(--color-primary);
  }
</style>
