<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";
  import Button from "./Button.svelte";
  import Icon from "./Icon.svelte";

  interface Props {
    label: string;
    variant?: "primary" | "secondary";
    children: Snippet;
  }

  let { label, variant = "secondary", children }: Props = $props();

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
    variant={variant}
    onclick={toggle}
  >
    <span>{label}</span>
    <Icon>arrow_drop_down</Icon>
  </Button>
  {#if open}
    <div class="menu">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .wrap {
    display: inline-block;
    position: relative;
  }
  .menu {
    display: grid;
    position: absolute;
    top: calc(100% + 0.25rem);
    right: 0;
    gap: 0.25rem;
    z-index: 20;
    box-shadow: var(--shadow);
    border: var(--border);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    padding: 0.35rem;
    min-width: 10rem;
  }
</style>
