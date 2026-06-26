<!--
  @component

  A labelled checkbox laid out as a label/control pair in an [[InlineGrid]]. The
  `checked` state is `$bindable`.

  ### Props

  - `id: string`
    Element id linking the label to the input.
  - `label: string`
    The checkbox label text.
  - `checked: boolean` (bindable)
    Whether the box is checked.
  - `border?: "transparent" | "solid"`
    Border style of the control. Defaults to `"solid"`.
  - `styleVars?: { borderRadius?: string; backgroundColor?: string; padding?: string; width?: string; fontSize?: string }`
    Override the default input styles via CSS custom properties.

  ### Example

  ```svelte
  <InputCheckbox id="agree" label="I agree" bind:checked={agreed} />
  ```
-->
<script lang="ts">
  import InlineGrid from "./InlineGrid.svelte";

  type Props = {
    id: string;
    label: string;
    checked: boolean;
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
    label: name,
    checked = $bindable(),
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

<InlineGrid>
  <label for={id}>{name}</label>
  <input
    id={id}
    class={border}
    type="checkbox"
    bind:checked={checked}
    style={inlineStyle}
  />
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
