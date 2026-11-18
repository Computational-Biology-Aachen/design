<!--
  @component

  A dropdown menu triggered by a [[Button]], built on a native `popover="auto"`
  (light dismiss, `Esc`, top layer). Opens on click/Enter/Space, and on hover on
  hover-capable devices (closing after a short delay on pointer-leave). The
  panel is tethered below the trigger with CSS anchor positioning, falling back
  to script placement where that is unsupported. Provides a `close` function via
  context so [[ButtonMenuItem]] children dismiss the menu when activated.

  ### Props

  - `label: string | Snippet`
    The trigger label. A string adds a dropdown arrow; a Snippet renders custom
    trigger content.
  - `variant?: "primary" | "secondary" | "inverted"`
    Trigger button variant. Defaults to `"secondary"`.
  - `children: Snippet`
    The menu contents, typically [[ButtonMenuItem]] entries.
  - `styleVars?: { gap?: string; padding?: string; minWidth?: string; topOffset?: string }`
    Override the menu's default CSS values.
  - `...rest`
    Any additional attributes (e.g. `aria-label`, needed when `label` is an
    icon-only Snippet with no visible text) are spread onto the trigger
    [[Button]].

  ### Example

  ```svelte
  <ButtonMenu label="Account">
    <ButtonMenuItem href="/profile">Profile</ButtonMenuItem>
    <ButtonMenuItem onclick={logout}>Log out</ButtonMenuItem>
  </ButtonMenu>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";
  import { isString, toStyleString } from "./utils";

  let {
    label,
    variant = "secondary",
    children,
    styleVars = {},
    ...rest
  }: {
    label: string | Snippet;
    variant?: "primary" | "secondary" | "inverted";
    children: Snippet;
    styleVars?: {
      gap?: string;
      padding?: string;
      minWidth?: string;
      topOffset?: string;
    };
    [key: string]: unknown;
  } = $props();

  const uid = $props.id();
  const menuId = `button-menu-${uid}`;

  let wrapEl = $state<HTMLDivElement | null>(null);
  let menuEl = $state<HTMLDivElement | null>(null);
  let closeTimeout: ReturnType<typeof setTimeout> | undefined;
  // "hover": opened by pointer hover, closes on leave.
  // "pinned": opened (or re-clicked) via click/keyboard, stays until dismissed.
  let openedBy: "hover" | "pinned" | null = null;

  function cancelClose() {
    clearTimeout(closeTimeout);
    closeTimeout = undefined;
  }

  function close() {
    cancelClose();
    menuEl?.hidePopover();
  }

  function canHover() {
    return matchMedia("(hover: hover)").matches;
  }

  function handlePointerEnter() {
    if (!canHover()) return;
    cancelClose();
    if (!menuEl?.matches(":popover-open")) {
      openedBy = "hover";
      menuEl?.showPopover();
    }
  }

  function handlePointerLeave() {
    if (!canHover() || openedBy !== "hover" || closeTimeout !== undefined)
      return;
    closeTimeout = setTimeout(close, 100);
  }

  // A click on a hover-opened menu pins it instead of letting the native
  // popovertarget toggle close it again.
  function handleTriggerClick(event: MouseEvent) {
    if (openedBy === "hover") {
      event.preventDefault();
      cancelClose();
    }
    openedBy = "pinned";
  }

  function handleToggle(event: ToggleEvent) {
    if (event.newState === "closed") openedBy = null;
    placeWithoutAnchor(event);
  }

  // Without CSS anchor positioning the popover would sit centred in the
  // viewport; place it below the trigger (right-aligned, flipped/clamped).
  function placeWithoutAnchor(event: ToggleEvent) {
    if (event.newState !== "open" || CSS.supports("position-area", "block-end"))
      return;
    const trigger = wrapEl?.querySelector("button");
    if (!trigger || !menuEl) return;
    const t = trigger.getBoundingClientRect();
    const m = menuEl.getBoundingClientRect();
    const offset = 4;
    let top = t.bottom + offset;
    if (top + m.height > innerHeight)
      top = Math.max(0, t.top - offset - m.height);
    const left = Math.min(Math.max(0, t.right - m.width), innerWidth - m.width);
    menuEl.style.top = `${top}px`;
    menuEl.style.left = `${Math.max(0, left)}px`;
  }

  setContext("buttonMenu", { close });

  let menuCssVars = $derived({
    ...(styleVars.gap ? { "--menu-gap": styleVars.gap } : {}),
    ...(styleVars.padding ? { "--menu-padding": styleVars.padding } : {}),
    ...(styleVars.minWidth ? { "--menu-min-width": styleVars.minWidth } : {}),
    ...(styleVars.topOffset
      ? { "--menu-top-offset": styleVars.topOffset }
      : {}),
  });
  let menuInlineStyle = $derived(toStyleString(menuCssVars));
</script>

<div
  class="wrap"
  role="presentation"
  style:--menu-anchor="--{menuId}"
  bind:this={wrapEl}
  onpointerenter={handlePointerEnter}
  onpointerleave={handlePointerLeave}
>
  <Button
    variant={variant}
    popovertarget={menuId}
    onclick={handleTriggerClick}
    {...rest}
  >
    {#if isString(label)}
      <span>{label}</span>
      <Icon>arrow_drop_down</Icon>
    {:else}
      {@render label()}
    {/if}
  </Button>
  <div
    id={menuId}
    class="menu"
    popover="auto"
    style={menuInlineStyle}
    bind:this={menuEl}
    ontoggle={handleToggle}
  >
    {@render children()}
  </div>
</div>

<style>
  .wrap {
    display: inline-block;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }

  .wrap > :global(button) {
    anchor-name: var(--menu-anchor);
  }

  .menu {
    --menu-gap: 0.25rem;
    --menu-padding: 0.35rem;
    --menu-min-width: 10rem;
    --menu-top-offset: 0.25rem;
    gap: var(--menu-gap);
    box-shadow: var(--shadow-md);
    border: var(--border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    padding: var(--menu-padding);
    min-width: var(--menu-min-width);
    color: var(--color-text);
  }

  .menu:popover-open {
    display: grid;
  }

  @supports (position-area: block-end) {
    .menu {
      position-anchor: var(--menu-anchor);
      position-area: block-end span-inline-start;
      position-try-fallbacks:
        flip-block,
        flip-inline,
        flip-block flip-inline;
      margin: var(--menu-top-offset) 0;
      inset: auto;
    }
  }

  @supports not (position-area: block-end) {
    .menu {
      position: fixed;
      margin: 0;
      inset: auto;
    }
  }
</style>
