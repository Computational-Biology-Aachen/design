<!--
  @component

  A JS-controlled collapsible section with a custom header row and an
  expand/collapse [[Icon]] toggle. The `open` state is `$bindable`. See
  [[Accordion]] for a native `<details>`-based variant.

  ### Props

  - `header: Snippet`
    The always-visible header content (e.g. an [[H3]]).
  - `children: Snippet`
    The collapsible content (scrolls past 40vh).
  - `open?: boolean` (bindable)
    Whether the section is expanded. Defaults to `false`.

  ### Example

  ```svelte
  <Accordion2 bind:open>
    {#snippet header()}<H3>Section</H3>{/snippet}
    <Text>Body…</Text>
  </Accordion2>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";

  let {
    header,
    children,
    open = $bindable(false),
  }: {
    header: Snippet;
    children: Snippet;
    open?: boolean;
  } = $props();
</script>

<div class="accordion">
  <button
    class="trigger"
    onclick={() => (open = !open)}
  >
    {@render header()}
    <span>
      <Icon
        color="inherit"
        fontSize="inherit"
      >
        {open ? "expand_less" : "expand_more"}</Icon
      >
    </span>
  </button>
  {#if open}
    <div class="content">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  span {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    width: 1.8rem;
    height: 1.8rem;
    color: white;
    font-size: 1.33rem;
  }
  span:hover {
    background-color: lch(from var(--color-surface) calc(l - 10) c h);
    color: var(--color-primary);
  }
  .accordion {
    width: 100%;
  }

  .trigger {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    border: none;
    background: none;
    padding: 0.25rem 0;
    width: 100%;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .trigger :global(h3) {
    flex: 1;
  }

  .content {
    padding: 1rem 0;
    max-height: 40vh;
    overflow: auto;
  }
</style>
