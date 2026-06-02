<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import Icon from "./Icon.svelte";

  let {
    icon,
    onclick,
    popovertarget,
    size = "sm",
  }: {
    icon: string;
    onclick?: MouseEventHandler<HTMLButtonElement>;
    popovertarget?: string;
    size?: "sm" | "md" | "lg";
  } = $props();
</script>

<button
  onclick={onclick}
  popovertarget={popovertarget}
  class="size-{size}"
>
  <Icon
    color="inherit"
    fontSize="inherit">{icon}</Icon
  >
</button>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--color-surface);
    color: var(--color-primary);
  }
  button:hover {
    background-color: lch(from var(--color-primary) calc(l - 10) c h);
    color: white;
  }
  .size-sm {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 0.75rem;
  }
  .size-md {
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1rem;
  }
  .size-lg {
    width: 2rem;
    height: 2rem;
    font-size: 1.5rem;
  }
</style>
