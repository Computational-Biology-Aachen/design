<!--
  @component

  A modal-style overlay built on the native HTML Popover API, sized via presets
  and dimmed with a backdrop. Open/close it by pointing a [[Button]] (or
  [[ButtonIcon]]) `popovertarget` at this popover's id. The element is `$bindable`
  via `el` for imperative control.

  ### Props

  - `size: "xs" | "sm" | "md" | "lg"`
    Size/position preset, from a small centred dialog (`xs`) to near-fullscreen
    (`lg`).
  - `popovertarget: string`
    The popover's id; a trigger's `popovertarget` must match this.
  - `el?: HTMLDivElement | null` (bindable)
    Reference to the popover element for imperative `showPopover()` /
    `hidePopover()` calls.
  - `children: Snippet`
    The popover content.

  ### Example

  ```svelte
  <Button popovertarget="settings" popovertargetaction="show">Settings</Button>
  <Popover size="sm" popovertarget="settings">
    <H3>Settings</H3>
  </Popover>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    size,
    children,
    popovertarget,
    el = $bindable<HTMLDivElement | null | undefined>(),
  }: {
    size: "xs" | "sm" | "md" | "lg";
    popovertarget: string;
    children: Snippet;
    el?: HTMLDivElement | null;
  } = $props();
</script>

<div
  popover
  bind:this={el}
  id={popovertarget}
  class={size}
>
  <section>
    {@render children()}
  </section>
</div>

<style>
  [popover] {
    position: fixed;
    inset: unset;
    box-shadow: var(--shadow);
    border: var(--border-heavy);
    border-radius: var(--radius-lg);
    max-height: 100vh; /* Fallback, should be set in xs/sm/md/lg */
    overflow-y: scroll;
  }
  [popover]::backdrop {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .xs {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(22rem, calc(100vw - 2rem));
  }
  .sm {
    --width: 60rem;
    --dist: max(0px, (100vw - var(--width)) / 2);
    top: clamp(1rem, var(--dist), 10rem);
    left: var(--dist);
    width: calc(100% - 2 * var(--dist));
    height: calc(100vh - 2 * clamp(1rem, var(--dist), 10rem));
  }
  .md {
    --dist: 0rem;
    top: var(--dist);
    left: var(--dist);

    @media (min-width: 768px) {
      --dist: 4rem;
      width: calc(100% - 2 * var(--dist));
      height: calc(100vh - 2 * var(--dist));
    }
  }
  .lg {
    --dist: 0;
    top: var(--dist);
    left: var(--dist);
    width: 100%;
    height: calc(100vh - 2 * var(--dist));

    @media (min-width: 768px) {
      --dist: 2rem;
      width: calc(100vw - 2 * var(--dist));
      height: calc(100vh - 2 * var(--dist));
    }
  }
  section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
  }
</style>
