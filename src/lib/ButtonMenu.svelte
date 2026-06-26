<!--
  @component

  A dropdown menu triggered by a [[Button]]. Opens on hover or click and closes
  on mouse-leave (after a short delay) or an outside click. Provides a `close`
  function via context so [[ButtonMenuItem]] children dismiss the menu when
  activated.

  ### Props

  - `label: string | Snippet`
    The trigger label. A string adds a dropdown arrow; a Snippet renders custom
    trigger content.
  - `variant?: "primary" | "secondary"`
    Trigger button variant. Defaults to `"secondary"`.
  - `href?: string`
    Optional href for the trigger button.
  - `children: Snippet`
    The menu contents, typically [[ButtonMenuItem]] entries.
  - `styleVars?: { gap?: string; padding?: string; minWidth?: string; topOffset?: string }`
    Override the menu's default CSS values.

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
  import { isString } from "./utils";

  let {
    label,
    variant = "secondary",
    href,
    children,
    styleVars = {},
  }: {
    label: string | Snippet;
    variant?: "primary" | "secondary" | "inverted";
    href?: string;
    children: Snippet;
    styleVars?: { gap?: string; padding?: string; minWidth?: string; topOffset?: string };
  } = $props();

  let open = $state(false);
  let wrapEl = $state<HTMLDivElement | null>(null);
  let closeTimeout: ReturnType<typeof setTimeout> | undefined;

  function close() {
    if (closeTimeout !== undefined) {
      clearTimeout(closeTimeout);
      closeTimeout = undefined;
    }
    open = false;
  }

  function openMenu() {
    if (closeTimeout !== undefined) {
      clearTimeout(closeTimeout);
      closeTimeout = undefined;
    }
    open = true;
  }

  function scheduleClose() {
    if (closeTimeout !== undefined) return;
    closeTimeout = setTimeout(() => {
      closeTimeout = undefined;
      open = false;
    }, 100);
  }

  function toggle() {
    if (open) {
      close();
    } else {
      open = true;
    }
  }

  function handleDocumentClick(event: MouseEvent) {
    if (!open) return;
    const target = event.target as Node | null;
    if (target && !wrapEl?.contains(target)) {
      close();
    }
  }

  setContext("buttonMenu", { close });

  let menuCssVars = $derived({
    ...(styleVars.gap ? { "--menu-gap": styleVars.gap } : {}),
    ...(styleVars.padding ? { "--menu-padding": styleVars.padding } : {}),
    ...(styleVars.minWidth ? { "--menu-min-width": styleVars.minWidth } : {}),
    ...(styleVars.topOffset ? { "--menu-top-offset": styleVars.topOffset } : {}),
  });
  let menuInlineStyle = $derived(
    Object.entries(menuCssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<svelte:document onclick={handleDocumentClick} />

<div
  class="wrap"
  role="presentation"
  bind:this={wrapEl}
  onmouseenter={openMenu}
  onmouseleave={scheduleClose}
>
  <Button
    href={href}
    variant={variant}
    onclick={toggle}
  >
    {#if isString(label)}
      <span>{label}</span>
      <Icon>arrow_drop_down</Icon>
    {:else}
      {@render label()}
    {/if}
  </Button>
  {#if open}
    <div class="menu" style={menuInlineStyle}>
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
    width: 100%;

    @media (min-width: 768px) {
      width: auto;
    }
  }
  .menu {
    --menu-gap: 0.25rem;
    --menu-padding: 0.35rem;
    --menu-min-width: 10rem;
    --menu-top-offset: 0.25rem;
    display: grid;
    position: absolute;
    top: calc(100% + var(--menu-top-offset));
    right: 0;
    gap: var(--menu-gap);
    z-index: 20;
    box-shadow: var(--shadow);
    border: var(--border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    padding: var(--menu-padding);
    min-width: var(--menu-min-width);
  }
</style>
