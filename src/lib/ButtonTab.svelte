<script lang="ts">
  import type { Snippet } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";

  let {
    selected,
    onclick,
    children,
  }: {
    selected: boolean;
    children: Snippet;
    onclick: MouseEventHandler<HTMLButtonElement>;
  } = $props();
</script>

<button
  class:selected={selected}
  onclick={onclick}
>
  {@render children()}
</button>

<style>
  button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    margin: 0;
    border: none;
    background-color: transparent;
    padding: 0;
    color: var(--slate-500);
    font-weight: 700;
    font-size: 0.84rem;
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
