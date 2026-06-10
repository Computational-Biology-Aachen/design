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

  ### Example

  ```svelte
  <InputChoice id="method" label="Integrator" bind:value={method}>
    <option value="rk45">RK45</option>
    <option value="tsit5">Tsit5</option>
  </InputChoice>
  ```
-->
<script lang="ts" generics="T">
  import InlineGrid from "./InlineGrid.svelte";
  import type { Snippet } from "svelte";

  type Props = {
    id: string;
    label: string;
    value: T | undefined;
    border?: "transparent" | "solid";
    children: Snippet;
  };
  let {
    id,
    label: name,
    value = $bindable(),
    border = "solid",
    children,
  }: Props = $props();
</script>

<InlineGrid>
  <label for={id}>{name}</label>
  <select
    id={id}
    class={border}
    bind:value={value}
  >
    {@render children()}
  </select>
</InlineGrid>

<style>
  select {
    border-radius: var(--radius-lg);
    background-color: transparent;
    padding: 0.35rem 0.5rem;
    width: 100%;
    font-size: 0.875rem;
  }
  .transparent {
    border: var(--border-transparent);
  }

  .solid {
    border: var(--border);
  }
</style>
