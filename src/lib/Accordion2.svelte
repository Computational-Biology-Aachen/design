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
  - `styleVars?: { gap?: string; iconSize?: string; triggerPadding?: string; contentMaxHeight?: string }`
    Override the accordion's default CSS values.

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
    styleVars = {},
  }: {
    header: Snippet;
    children: Snippet;
    open?: boolean;
    styleVars?: {
      gap?: string;
      iconSize?: string;
      triggerPadding?: string;
      contentMaxHeight?: string;
    };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.gap ? { "--accordion-gap": styleVars.gap } : {}),
    ...(styleVars.iconSize
      ? { "--accordion-icon-size": styleVars.iconSize }
      : {}),
    ...(styleVars.triggerPadding
      ? { "--accordion-trigger-padding": styleVars.triggerPadding }
      : {}),
    ...(styleVars.contentMaxHeight
      ? { "--accordion-content-max-height": styleVars.contentMaxHeight }
      : {}),
  });
  let accordionInlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
  let triggerInlineStyle = $derived(
    [cssVars["--accordion-gap"], cssVars["--accordion-trigger-padding"]]
      .filter(Boolean)
      .map((v) => v).length
      ? Object.entries({
          ...(cssVars["--accordion-gap"]
            ? { "--accordion-gap": cssVars["--accordion-gap"] }
            : {}),
          ...(cssVars["--accordion-trigger-padding"]
            ? {
                "--accordion-trigger-padding":
                  cssVars["--accordion-trigger-padding"],
              }
            : {}),
        })
          .map(([k, v]) => `${k}:${v}`)
          .join(";")
      : "",
  );
  let contentInlineStyle = $derived(
    cssVars["--accordion-content-max-height"]
      ? `--accordion-content-max-height:${cssVars["--accordion-content-max-height"]}`
      : "",
  );
  let iconInlineStyle = $derived(
    cssVars["--accordion-icon-size"]
      ? `--accordion-icon-size:${cssVars["--accordion-icon-size"]}`
      : "",
  );
</script>

<div
  class="accordion"
  style={accordionInlineStyle}
>
  <button
    class="trigger"
    onclick={() => (open = !open)}
    style={triggerInlineStyle}
  >
    {@render header()}
    <span style={iconInlineStyle}>
      <Icon
        color="inherit"
        fontSize="inherit"
      >
        {open ? "expand_less" : "expand_more"}</Icon
      >
    </span>
  </button>
  {#if open}
    <div
      class="content"
      style={contentInlineStyle}
    >
      {@render children()}
    </div>
  {/if}
</div>

<style>
  span {
    --accordion-icon-size: 1.8rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: none;
    border-radius: var(--radius-full);
    background-color: var(--color-primary);
    width: var(--accordion-icon-size);
    height: var(--accordion-icon-size);
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
    --accordion-gap: 0.5rem;
    --accordion-trigger-padding: 0.25rem 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--accordion-gap);
    cursor: pointer;
    border: none;
    background: none;
    padding: var(--accordion-trigger-padding);
    width: 100%;
    color: inherit;
    font: inherit;
    text-align: left;
  }

  .trigger :global(h3) {
    flex: 1;
  }

  .content {
    --accordion-content-max-height: 40vh;
    padding: 1rem 0;
    max-height: var(--accordion-content-max-height);
    overflow: auto;
  }
</style>
