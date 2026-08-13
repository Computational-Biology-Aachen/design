<!--
  @component

  A callout box with a coloured left border, status icon and bold header, for
  info/warning/success/error notes.

  ### Props

  - `header: string`
    The callout heading (rendered bold next to the status icon).
  - `variant?: "info" | "warning" | "success" | "error"`
    Colour scheme and icon. Defaults to `"info"`.
  - `styleVars?: { infoGap?: string; infoPadding?: string }`
    Override CSS custom properties for gap and padding.
  - `children?: Snippet`
    Optional body content.

  ### Example

  ```svelte
  <InfoBox header="Heads up" variant="warning">
    <Text>This model is experimental.</Text>
  </InfoBox>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";
  import Bold from "./Bold.svelte";

  type Variant = "info" | "warning" | "success" | "error";

  let {
    header,
    variant = "info",
    styleVars = {},
    children,
  }: {
    header: string;
    variant?: Variant;
    styleVars?: {
      infoGap?: string;
      infoPadding?: string;
    };
    children?: Snippet;
  } = $props();

  let infoBoxCssVars = $derived({
    ...(styleVars.infoGap ? { "--infobox-gap": styleVars.infoGap } : {}),
    ...(styleVars.infoPadding
      ? { "--infobox-padding": styleVars.infoPadding }
      : {}),
  });
</script>

<div
  class="info-box {variant}"
  role="note"
  style={Object.entries(infoBoxCssVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  <div class="header">
    <span
      class="info-icon"
      aria-hidden="true"
    >
      {#if variant === "warning"}⚠{:else if variant === "success"}✓{:else if variant === "error"}✕{:else}ℹ{/if}
    </span>
    <Bold>{header}</Bold>
  </div>

  {#if children}
    <div class="info-content">
      {@render children()}
    </div>
  {/if}
</div>

<style>
  .info-box {
    --infobox-gap: var(--gap);
    --infobox-padding: var(--space-4);

    display: flex;
    flex-direction: column;
    gap: var(--infobox-gap);
    border-left: 4px solid var(--color-primary);
    border: 1px solid color-mix(in srgb, var(--color-primary) 25%, transparent);
    border-left-width: 4px;
    border-radius: var(--radius-md);
    background: color-mix(in srgb, var(--color-primary) 8%, var(--color-bg));
    padding: var(--infobox-padding);
    width: 100%;
    color: var(--color-text);
  }

  .header {
    display: inline-flex;
    gap: var(--gap);
    width: 100%;
  }

  .info-content {
    display: flex;
    flex-direction: column;
    gap: var(--gap);
    padding: 0 var(--space-4);
    width: 100%;
    line-height: var(--line-height-base);
  }

  .warning {
    border-color: color-mix(in srgb, var(--color-accent) 25%, transparent);
    border-left-color: var(--color-accent);
    background: color-mix(in srgb, var(--color-accent) 8%, var(--color-bg));
  }

  .success {
    --success: var(--rwth-green);
    border-color: color-mix(in srgb, var(--success) 25%, transparent);
    border-left-color: var(--success);
    background: color-mix(in srgb, var(--success) 8%, var(--color-bg));
  }

  .error {
    --_err: #c0392b;
    border-color: color-mix(in srgb, var(--_err) 25%, transparent);
    border-left-color: var(--_err);
    background: color-mix(in srgb, var(--_err) 8%, var(--color-bg));
  }

  .info-icon {
    flex-shrink: 0;
    color: var(--color-primary);
    font-size: 1.1rem;
    line-height: 1.5;
  }

  .warning .info-icon {
    color: var(--color-accent);
  }
  .success .info-icon {
    color: var(--rwth-green);
  }
  .error .info-icon {
    color: #c0392b;
  }
</style>
