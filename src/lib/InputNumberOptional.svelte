<!--
  @component

  A numeric input gated by a checkbox: when the condition is checked the number
  field is hidden (e.g. "use default"); when unchecked the user can enter a
  value. Both `value` and `condition` are `$bindable`.

  ### Props

  - `id: string`
    Base element id (the checkbox uses `{id}-cond`).
  - `valueLabel: string`
    Label for the numeric value.
  - `condLabel: string`
    Label for the condition checkbox.
  - `value: number` (bindable)
    The numeric value (shown only when `condition` is false).
  - `condition: boolean` (bindable)
    When true, hides the number field.
  - `border?: "transparent" | "solid"`
    Border style. Defaults to `"solid"`.
  - `styleVars?: { borderRadius?: string; backgroundColor?: string; padding?: string; width?: string; fontSize?: string }`
    Override the default input styles via CSS custom properties.

  ### Example

  ```svelte
  <InputNumberOptional
    id="seed"
    valueLabel="Seed"
    condLabel="Random"
    bind:value={seed}
    bind:condition={random}
  />
  ```
-->
<script lang="ts">
  import InlineGrid from "./InlineGrid.svelte";
  import Row from "./Row.svelte";

  type Props = {
    id: string;
    valueLabel: string;
    condLabel: string;
    value: number;
    condition: boolean;
    border?: "transparent" | "solid";
    styleVars?: {
      borderRadius?: string;
      backgroundColor?: string;
      padding?: string;
      width?: string;
      fontSize?: string;
    };
  };
  let {
    id,
    valueLabel,
    condLabel,
    value = $bindable(),
    condition = $bindable(),
    border = "solid",
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
    ...(styleVars.width ? { "--input-width": styleVars.width } : {}),
    ...(styleVars.fontSize ? { "--input-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<InlineGrid cols={3}>
  <label for={id}>{valueLabel}</label>
  <Row
    stack
    gap="0.5rem"
  >
    <label for="{id}-cond">{condLabel}</label>
    <input
      id="{id}-cond"
      class={border}
      type="checkbox"
      bind:checked={condition}
      style={inlineStyle}
    />
  </Row>
  {#if !condition}
    <input
      id={id}
      class={border}
      type="number"
      bind:value={value}
      style={inlineStyle}
    />
  {/if}
</InlineGrid>

<style>
  input {
    --input-border-radius: var(--radius-lg);
    --input-background-color: transparent;
    --input-padding: 0.35rem 0.5rem;
    --input-width: 100%;
    --input-font-size: 0.875rem;
    border-radius: var(--input-border-radius);
    background-color: var(--input-background-color);
    padding: var(--input-padding);
    width: var(--input-width);
    font-size: var(--input-font-size);
  }
  .transparent {
    border: var(--border-transparent);
  }

  .solid {
    border: var(--border);
  }
</style>
