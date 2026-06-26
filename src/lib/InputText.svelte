<!--
  @component

  A labelled text input laid out as a label/control pair in an [[InlineGrid]].
  The `value` is `$bindable`.

  ### Props

  - `id: string`
    Element id linking the label to the input.
  - `label: string`
    The field label text.
  - `value: string | undefined` (bindable)
    The text value.
  - `border?: "transparent" | "solid"`
    Border style. Defaults to `"solid"`.
  - `styleVars?: { borderRadius?: string; backgroundColor?: string; padding?: string; width?: string; fontSize?: string }`
    Override the default input styles via CSS custom properties.

  ### Example

  ```svelte
  <InputText id="name" label="Model name" bind:value={name} />
  ```
-->
<script lang="ts">
  import InlineGrid from "./InlineGrid.svelte";

  type Props = {
    id: string;
    label: string;
    value: string | undefined;
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
    value = $bindable(),
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
    type="text"
    bind:value={value}
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
