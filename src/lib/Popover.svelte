<!--
  @component

  A dialog overlay built on `<dialog popover>` (native popover API: top layer,
  light dismiss, `Esc`), sized via presets and dimmed with a backdrop. Open/close it by pointing a [[Button]] (or
  [[ButtonIcon]]) `popovertarget` at this popover's id. The element is `$bindable`
  via `el` for imperative control.

  ### Props

  - `size: "xs" | "sm" | "md" | "lg"`
    Size/position preset, from a small centred dialog (`xs`) to near-fullscreen
    (`lg`).
  - `popovertarget: string`
    The popover's id; a trigger's `popovertarget` must match this.
  - `label?: string`
    Accessible name of the dialog (`aria-label`). Set it unless the content
    starts with a heading that already names it.
  - `el?: HTMLDialogElement | null` (bindable)
    Reference to the popover element for imperative `showPopover()` /
    `hidePopover()` calls.
  - `children: Snippet`
    The popover content.
  - `styleVars?: { gap?: string; padding?: string }`
    Optional CSS custom property overrides applied via inline style.

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
    label,
    el = $bindable<HTMLDialogElement | null | undefined>(),
    styleVars = {},
  }: {
    size: "xs" | "sm" | "md" | "lg";
    popovertarget: string;
    children: Snippet;
    label?: string;
    el?: HTMLDialogElement | null;
    styleVars?: { gap?: string; padding?: string };
  } = $props();

  let inlineStyle = $derived(
    [
      ...(styleVars.gap ? ["--popover-gap", styleVars.gap] : []),
      ...(styleVars.padding ? ["--popover-padding", styleVars.padding] : []),
    ]
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<dialog
  popover
  bind:this={el}
  id={popovertarget}
  aria-label={label}
  class={size}
>
  <section style={inlineStyle}>
    {@render children()}
  </section>
</dialog>

<style>
  dialog {
    position: fixed;
    /* Closed/exit state; display + overlay keep it in the top layer while
       fading out. Firefox/Safari don't transition display yet, so there the
       exit is instant (entry still fades). */
    opacity: 0;
    transition-behavior: allow-discrete;
    transition-duration: 0.5s;
    transition-property: opacity, display, overlay;
    transition-timing-function: ease-out;
    margin: 0;
    inset: unset;
    box-shadow: var(--shadow-md);
    border: var(--border-heavy);
    border-radius: var(--radius-lg);
    background: var(--color-bg);
    padding: 0;
    max-width: none;
    max-height: 100dvh; /* Fallback, should be set in xs/sm/md/lg */
    overflow-y: auto;
    overscroll-behavior: contain;
    color: var(--color-text);

    @media (prefers-reduced-motion: reduce) {
      transition-duration: 0.1s;
    }
  }

  dialog:popover-open {
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }

  dialog::backdrop {
    transition-behavior: allow-discrete;
    transition-duration: 0.5s;
    transition-property: background-color, display, overlay;
    transition-timing-function: ease-out;
    background-color: transparent;

    @media (prefers-reduced-motion: reduce) {
      transition-duration: 0.1s;
    }
  }

  dialog:popover-open::backdrop {
    background-color: var(--scrim-backdrop);

    @starting-style {
      background-color: transparent;
    }
  }

  .xs {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: min(22rem, calc(100dvw - 2rem));
  }

  .sm {
    --width: 60rem;
    --dist: max(0px, (100dvw - var(--width)) / 2);
    top: clamp(1rem, var(--dist), 10rem);
    left: var(--dist);
    width: calc(100% - 2 * var(--dist));
    height: calc(100dvh - 2 * clamp(1rem, var(--dist), 10rem));
  }

  .md {
    --dist: 0rem;
    top: var(--dist);
    left: var(--dist);

    @media (min-width: 768px) {
      --dist: 4rem;
      width: calc(100% - 2 * var(--dist));
      height: calc(100dvh - 2 * var(--dist));
    }
  }

  .lg {
    --dist: 0;
    top: var(--dist);
    left: var(--dist);
    width: 100%;
    height: calc(100dvh - 2 * var(--dist));

    @media (min-width: 768px) {
      --dist: 2rem;
      width: calc(100dvw - 2 * var(--dist));
      height: calc(100dvh - 2 * var(--dist));
    }
  }

  section {
    --popover-gap: 1rem;
    --popover-padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: var(--popover-gap);
    padding: var(--popover-padding);
  }
</style>
