<!--
  @component

  A collapsible disclosure section built on the native `<details>`/`<summary>`
  elements (keyboard, find-in-page and screen-reader support for free), with an
  open/close slide animation where `interpolate-size` is supported and motion
  is allowed.

  ### Props

  - `title?: string`
    Plain-text summary label (used when `header` is not provided).
  - `header?: Snippet`
    Custom summary content, overriding `title`.
  - `open?: boolean` (bindable)
    Whether the section is expanded. Defaults to `false`.
  - `variant?: "card" | "plain"`
    `"card"` (default): bordered surface with a rotating ▶ marker.
    `"plain"`: borderless, with a round expand icon on the right and a
    scroll-capped content area (`--acc-content-max-height`, default `40vh`).
  - `children: Snippet`
    The collapsible content.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style
    (e.g. `--acc-icon-size`, `--acc-content-max-height`).

  ### Example

  ```svelte
  <Accordion title="Details" open>
    <Text>Expanded content.</Text>
  </Accordion>

  <Accordion variant="plain" bind:open={equationsOpen}>
    {#snippet header()}<h3>Model Equations</h3>{/snippet}
    ...
  </Accordion>
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import type { Snippet } from "svelte";
  import Icon from "./Icon.svelte";

  interface Props {
    title?: string;
    header?: Snippet;
    open?: boolean;
    variant?: "card" | "plain";
    children: Snippet;
    styleVars?: { [key: string]: string };
  }

  let {
    title,
    header,
    open = $bindable(false),
    variant = "card",
    children,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
</script>

<details
  class={variant}
  bind:open={open}
  style={inlineStyle}
>
  <summary class="accordion-summary">
    {#if header}
      {@render header()}
    {:else}
      {title ?? ""}
    {/if}
    {#if variant === "plain"}
      <span
        class="icon"
        aria-hidden="true"
      >
        <Icon
          color="inherit"
          fontSize="inherit">{open ? "expand_less" : "expand_more"}</Icon
        >
      </span>
    {/if}
  </summary>
  <div class="accordion-content">
    {@render children()}
  </div>
</details>

<style>
  details {
    --acc-gap: var(--gap);
    --acc-summary-gap: var(--space-2);
    --acc-summary-padding: var(--space-3) var(--space-4);
    --acc-summary-font-weight: 500;
    --acc-summary-chevron-size: 0.65em;
    --acc-content-gap: var(--gap);
    --acc-content-padding: var(--space-4);
    --acc-icon-size: 1.8rem;
    --acc-content-max-height: 40vh;
    width: 100%;
  }

  details::details-content {
    interpolate-size: allow-keywords;
    contain: layout;
    overflow: clip;
  }

  details:not([open])::details-content {
    block-size: 0;
  }

  @media (prefers-reduced-motion: no-preference) {
    details::details-content {
      transition:
        block-size 0.25s ease-in-out,
        content-visibility 0.25s ease-in-out allow-discrete;
    }
  }

  .accordion-summary {
    display: flex;
    align-items: center;
    gap: var(--acc-summary-gap);
    transition: background-color var(--transition);
    cursor: pointer;
    font-weight: var(--acc-summary-font-weight);
    list-style: none;
    user-select: none;
  }

  .accordion-summary::-webkit-details-marker {
    display: none;
  }

  /* ── card ─────────────────────────────────────────────────── */

  .card {
    border: var(--border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
  }

  .card > .accordion-summary {
    border-radius: var(--radius-md);
    padding: var(--acc-summary-padding);
  }

  .card > .accordion-summary::before {
    display: inline-block;
    flex-shrink: 0;
    content: "▶" / "";
    font-size: var(--acc-summary-chevron-size);

    @media (prefers-reduced-motion: no-preference) {
      transition: transform 0.2s;
    }
  }

  .card[open] > .accordion-summary {
    border-radius: var(--radius-md) var(--radius-md) 0 0;
  }

  .card[open] > .accordion-summary::before {
    transform: rotate(90deg);
  }

  .card > .accordion-summary:hover {
    background-color: color-mix(in srgb, var(--color-border) 60%, transparent);
  }

  .card .accordion-content {
    display: flex;
    flex-direction: column;
    gap: var(--acc-content-gap);
    border-top: var(--border);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    background: var(--color-bg);
    padding: var(--acc-content-padding);
  }

  /* ── plain ────────────────────────────────────────────────── */

  .plain > .accordion-summary {
    gap: var(--space-2);
    padding: var(--space-1) 0;
  }

  .plain > .accordion-summary :global(h3) {
    flex: 1;
  }

  .icon {
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    margin-left: auto;
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    width: var(--acc-icon-size);
    height: var(--acc-icon-size);
    color: white;
    font-size: 1.33rem;
  }

  .plain > .accordion-summary:hover .icon {
    background-color: lch(from var(--color-surface) calc(l - 10) c h);
    color: var(--color-primary);
  }

  .plain .accordion-content {
    padding: 1rem 0;
    max-height: var(--acc-content-max-height);
    overflow: auto;
  }
</style>
