<!--
  @component

  A collapsible disclosure section built on the native `<details>`/`<summary>`
  elements, with a rotating chevron marker. See [[Accordion2]] for a
  JS-controlled, bindable variant.

  ### Props

  - `title?: string`
    Plain-text summary label (used when `header` is not provided).
  - `header?: Snippet`
    Custom summary content, overriding `title`.
  - `open?: boolean`
    Whether the section starts expanded. Defaults to `false`.
  - `children: Snippet`
    The collapsible content.

  ### Example

  ```svelte
  <Accordion title="Details" open>
    <Text>Expanded content.</Text>
  </Accordion>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title?: string;
    header?: Snippet;
    open?: boolean;
    children: Snippet;
  }

  let { title, header, open = false, children }: Props = $props();
</script>

<details open={open}>
  <summary class="accordion-summary">
    {#if header}
      {@render header()}
    {:else}
      {title ?? ""}
    {/if}
  </summary>
  <div class="accordion-content">
    {@render children()}
  </div>
</details>

<style>
  details {
    border: var(--border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    width: 100%;
  }

  .accordion-summary {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: background-color var(--transition);
    cursor: pointer;
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    font-weight: 500;
    list-style: none;
    user-select: none;
  }

  .accordion-summary::-webkit-details-marker {
    display: none;
  }

  .accordion-summary::before {
    display: inline-block;
    flex-shrink: 0;
    transition: transform 0.2s;
    content: "▶";
    font-size: 0.65em;
  }

  details[open] .accordion-summary {
    border-radius: var(--radius-md) var(--radius-md) 0 0;
  }

  details[open] .accordion-summary::before {
    transform: rotate(90deg);
  }

  .accordion-summary:hover {
    background-color: color-mix(in srgb, var(--color-border) 60%, transparent);
  }

  .accordion-content {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    border-top: var(--border);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    background: var(--color-bg);
    padding: var(--space-4);
  }
</style>
