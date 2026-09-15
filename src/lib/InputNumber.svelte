<!--
  @component

  A numeric input bound to a `number`. Renders as a label/control pair in an
  [[InlineGrid]] when `label` is given, otherwise as a bare input inside a
  [[Row]]. The `value` is `$bindable`. See [[InputNumberStr]] for a string-typed
  variant and [[InputNumberOptional]] for one gated by a checkbox.

  ### Props

  - `id: string`
    Element id linking the label to the input.
  - `label?: string`
    Optional field label.
  - `value: number` (bindable)
    The numeric value.
  - `border?: "transparent" | "solid"`
    Border style. Defaults to `"solid"`.
  - `error?: string`
    Validation message. When set, the border turns `--color-danger`, the
    message renders below the field, and `aria-invalid`/`aria-describedby`
    are wired up for assistive tech.
  - `styleVars?: { borderRadius?: string; backgroundColor?: string; padding?: string; fontSize?: string }`
    Override the default input styles via CSS custom properties.

  ### Example

  ```svelte
  <InputNumber id="tend" label="t end" bind:value={tEnd} />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  import InlineGrid from "./InlineGrid.svelte";
  import Row from "./Row.svelte";

  type Props = {
    id: string;
    label?: string;
    value: number;
    border?: "transparent" | "solid";
    width?: "full" | "auto";
    error?: string;
    styleVars?: {
      borderRadius?: string;
      backgroundColor?: string;
      padding?: string;
      fontSize?: string;
    };
  };
  let {
    id,
    label,
    value = $bindable(),
    border = "solid",
    width = "full",
    error,
    styleVars = {},
  }: Props = $props();

  let cssVars = $derived({
    ...(styleVars.borderRadius
      ? { "--input-border-radius": styleVars.borderRadius }
      : {}),
    ...(styleVars.backgroundColor
      ? { "--input-background-color": styleVars.backgroundColor }
      : {}),
    ...(styleVars.padding ? { "--input-padding": styleVars.padding } : {}),
    ...(styleVars.fontSize ? { "--input-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(toStyleString(cssVars));
</script>

{#if label}
  <InlineGrid>
    <label for={id}>{label}</label>
    <input
      id={id}
      class="border-{border}"
      class:error={Boolean(error)}
      type="number"
      bind:value={value}
      style={inlineStyle}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
    />
  </InlineGrid>
{:else}
  <Row
    stack
    gap="0.5rem"
  >
    <input
      id={id}
      class="border-{border} width-{width}"
      class:error={Boolean(error)}
      type="number"
      bind:value={value}
      style={inlineStyle}
      aria-invalid={error ? "true" : undefined}
      aria-describedby={error ? `${id}-error` : undefined}
    />
  </Row>
{/if}
{#if error}
  <p
    id="{id}-error"
    class="error-message"
  >
    {error}
  </p>
{/if}

<style>
  input {
    --input-border-radius: var(--radius-lg);
    --input-background-color: transparent;
    --input-padding: 0.35rem 0.5rem;
    --input-font-size: var(--text-sm);
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    padding: var(--input-padding);
    font-size: var(--input-font-size);
  }

  input:hover {
    border: var(--border-primary);
  }

  .border-transparent {
    border: var(--border-transparent);
  }

  .border-solid {
    border: var(--border);
  }

  .width-full {
    width: 100%;
  }

  .width-auto {
    width: auto;
  }

  .error {
    border-color: var(--color-danger);
  }

  .error-message {
    margin-top: var(--space-1);
    color: var(--color-danger);
    font-size: var(--text-callout);
  }
</style>
