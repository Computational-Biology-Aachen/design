<!--
  @component

  A numeric input whose value is bound as a `string` (useful when the raw text,
  including in-progress/empty states, must be preserved). Renders a label/control
  pair in an [[InlineGrid]]; `label` is optional. See [[InputNumber]] for the
  number-typed variant.

  ### Props

  - `id: string`
    Element id linking the label to the input.
  - `label?: string`
    Optional field label.
  - `value: string` (bindable)
    The value as a string.
  - `border?: "transparent" | "solid"`
    Border style. Defaults to `"solid"`.

  ### Example

  ```svelte
  <InputNumberStr id="k" label="k" bind:value={kStr} />
  ```
-->
<script lang="ts">
  import InlineGrid from "./InlineGrid.svelte";

  type Props = {
    id: string;
    label?: string;
    value: string;
    border?: "transparent" | "solid";
  };
  let { id, label, value = $bindable(), border = "solid" }: Props = $props();
</script>

<InlineGrid>
  {#if label}
    <label for={id}>{label}</label>
  {/if}
  <input
    id={id}
    class={border}
    type="number"
    bind:value={value}
  />
</InlineGrid>

<style>
  input {
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
