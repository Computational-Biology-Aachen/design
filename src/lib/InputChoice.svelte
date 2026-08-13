<!--
  @component

  A labelled `<select>` dropdown laid out as a label/control pair in an
  [[InlineGrid]]. Provide `<option>` elements as children. The `value` is
  `$bindable`.

  ### Props

  - `id: string`
    Element id linking the label to the select.
  - `label: string`
    The field label text.
  - `value: T | undefined` (bindable)
    The selected option value (generic — matches the `<option>` value type).
  - `border?: "transparent" | "solid"`
    Border style of the control. Defaults to `"solid"`.
  - `children: Snippet`
    The `<option>` elements.
  - `styleVars?: { borderRadius?: string; backgroundColor?: string; padding?: string; width?: string; fontSize?: string }`
    Override the default select styles via CSS custom properties.

  ### Example

  ```svelte
  <InputChoice id="method" label="Integrator" bind:value={method}>
    <option value="rk45">RK45</option>
    <option value="tsit5">Tsit5</option>
  </InputChoice>
  ```
-->
<script
  lang="ts"
  generics="T"
>
  import InlineGrid from "./InlineGrid.svelte";
  import type { Snippet } from "svelte";

  type Props = {
    id: string;
    label: string;
    value: T | undefined;
    border?: "transparent" | "solid";
    children: Snippet;
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
    children,
    styleVars = {},
  }: Props = $props();

  let cssVars = $derived({
    ...(styleVars.borderRadius
      ? { "--select-border-radius": styleVars.borderRadius }
      : {}),
    ...(styleVars.backgroundColor
      ? { "--select-background-color": styleVars.backgroundColor }
      : {}),
    ...(styleVars.padding ? { "--select-padding": styleVars.padding } : {}),
    ...(styleVars.width ? { "--select-width": styleVars.width } : {}),
    ...(styleVars.fontSize ? { "--select-font-size": styleVars.fontSize } : {}),
  });
  let inlineStyle = $derived(
    Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<InlineGrid>
  <label for={id}>{name}</label>
  <select
    id={id}
    class={border}
    bind:value={value}
    style={inlineStyle}
  >
    {@render children()}
  </select>
</InlineGrid>

<style>
  select {
    --select-border-radius: var(--radius-lg);
    --select-background-color: transparent;
    --select-padding: 0.35rem 0.5rem;
    --select-width: 100%;
    --select-font-size: 0.875rem;
    border-radius: var(--select-border-radius);
    background-color: var(--select-background-color);
    padding: var(--select-padding);
    width: var(--select-width);
    font-size: var(--select-font-size);
  }
  .transparent {
    border: var(--border-transparent);
  }

  .solid {
    border: var(--border);
  }
</style>
