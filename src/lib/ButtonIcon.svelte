<!--
  @component

  A circular icon-only button rendering a single [[Icon]] (Material Symbols
  ligature name). Useful for compact actions in toolbars and cards.

  ### Props

  - `icon: string`
    Material Symbols ligature name (e.g. `"close"`, `"menu"`).
  - `label?: string`
    Accessible name (`aria-label` + tooltip). Always set it: the icon
    ligature alone is read out as e.g. "close" or "edit_note".
  - `onclick?: MouseEventHandler<HTMLButtonElement>`
    Click handler.
  - `popovertarget?: string`
    Native popover target id to toggle.
  - `size?: "sm" | "md" | "lg"`
    Button size. Defaults to `"sm"`.
  - `styleVars?: { width?: string; height?: string; fontSize?: string }`
    Override the button's default size values.
  - `...rest`
    Spread onto the `<button>` (e.g. `command`/`commandfor` invokers).

  ### Example

  ```svelte
  <ButtonIcon icon="close" label="Close" size="md" onclick={dismiss} />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { MouseEventHandler } from "svelte/elements";
  import Icon from "./Icon.svelte";

  let {
    icon,
    label,
    onclick,
    popovertarget,
    size = "sm",
    styleVars = {},
    ...rest
  }: {
    icon: string;
    label?: string;
    onclick?: MouseEventHandler<HTMLButtonElement>;
    popovertarget?: string;
    size?: "sm" | "md" | "lg";
    styleVars?: { width?: string; height?: string; fontSize?: string };
    [key: string]: unknown;
  } = $props();

  let cssVars = $derived({
    ...(styleVars.width ? { "--btnicon-width": styleVars.width } : {}),
    ...(styleVars.height ? { "--btnicon-height": styleVars.height } : {}),
    ...(styleVars.fontSize
      ? { "--btnicon-font-size": styleVars.fontSize }
      : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

<button
  type="button"
  aria-label={label}
  title={label}
  onclick={onclick}
  popovertarget={popovertarget}
  class="size-{size}"
  style={inlineStyle}
  {...rest}
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
    --btnicon-font-size: var(--text-callout);
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    width: var(--btnicon-width);
    height: var(--btnicon-height);
    color: var(--color-primary);
    font-size: var(--btnicon-font-size);
    white-space: nowrap;
  }
  button:hover {
    background-color: lch(from var(--color-primary) calc(l - 10) c h);
    color: white;
  }
  .size-sm {
    --btnicon-width: 1.5rem;
    --btnicon-height: 1.5rem;
    --btnicon-font-size: var(--text-callout);
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
