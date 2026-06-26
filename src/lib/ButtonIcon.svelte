<!--
  @component

  A circular icon-only button rendering a single [[Icon]] (Material Symbols
  ligature name). Useful for compact actions in toolbars and cards.

  ### Props

  - `icon: string`
    Material Symbols ligature name (e.g. `"close"`, `"menu"`).
  - `onclick?: MouseEventHandler<HTMLButtonElement>`
    Click handler.
  - `popovertarget?: string`
    Native popover target id to toggle.
  - `size?: "sm" | "md" | "lg"`
    Button size. Defaults to `"sm"`.
  - `styleVars?: { width?: string; height?: string; fontSize?: string }`
    Override the button's default size values.

  ### Example

  ```svelte
  <ButtonIcon icon="close" size="md" onclick={dismiss} />
  ```
-->
<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import Icon from "./Icon.svelte";

  let {
    icon,
    onclick,
    popovertarget,
    size = "sm",
    styleVars = {},
  }: {
    icon: string;
    onclick?: MouseEventHandler<HTMLButtonElement>;
    popovertarget?: string;
    size?: "sm" | "md" | "lg";
    styleVars?: { width?: string; height?: string; fontSize?: string };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.width ? { "--btnicon-width": styleVars.width } : {}),
    ...(styleVars.height ? { "--btnicon-height": styleVars.height } : {}),
    ...(styleVars.fontSize ? { "--btnicon-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<button
  onclick={onclick}
  popovertarget={popovertarget}
  class="size-{size}"
  style={inlineStyle}
>
  <Icon
    color="inherit"
    fontSize="inherit">{icon}</Icon
  >
</button>

<style>
  button {
    --btnicon-width: 1.5rem;
    --btnicon-height: 1.5rem;
    --btnicon-font-size: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    color: var(--color-primary);
    white-space: nowrap;
    width: var(--btnicon-width);
    height: var(--btnicon-height);
    font-size: var(--btnicon-font-size);
  }
  button:hover {
    background-color: lch(from var(--color-primary) calc(l - 10) c h);
    color: white;
  }
  .size-sm {
    --btnicon-width: 1.5rem;
    --btnicon-height: 1.5rem;
    --btnicon-font-size: 0.75rem;
  }
  .size-md {
    --btnicon-width: 1.5rem;
    --btnicon-height: 1.5rem;
    --btnicon-font-size: 1rem;
  }
  .size-lg {
    --btnicon-width: 2rem;
    --btnicon-height: 2rem;
    --btnicon-font-size: 1.5rem;
  }
</style>
