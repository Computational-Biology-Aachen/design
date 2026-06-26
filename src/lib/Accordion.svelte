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
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

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
    styleVars?: { [key: string]: string };
  }

  let {
    title,
    header,
    open = false,
    children,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<details open={open} style={inlineStyle}>
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
    --acc-gap: var(--gap);
    --acc-summary-gap: var(--space-2);
    --acc-summary-padding: var(--space-3) var(--space-4);
    --acc-summary-font-weight: 500;
    --acc-summary-chevron-size: 0.65em;
    --acc-content-gap: var(--gap);
    --acc-content-padding: var(--space-4);
    border: var(--border);
    border-radius: var(--radius-md);
    background: var(--color-surface);
    width: 100%;
  }

  .accordion-summary {
    display: flex;
    align-items: center;
    gap: var(--acc-summary-gap);
    transition: background-color var(--transition);
    cursor: pointer;
    border-radius: var(--radius-md);
    padding: var(--acc-summary-padding);
    font-weight: var(--acc-summary-font-weight);
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
    font-size: var(--acc-summary-chevron-size);
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
    gap: var(--acc-content-gap);
    border-top: var(--border);
    border-radius: 0 0 var(--radius-md) var(--radius-md);
    background: var(--color-bg);
    padding: var(--acc-content-padding);
  }
</style>
