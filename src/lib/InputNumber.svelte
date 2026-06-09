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

  ### Example

  ```svelte
  <InputNumber id="tend" label="t end" bind:value={tEnd} />
  ```
-->
<script lang="ts">
  import InlineGrid from "./InlineGrid.svelte";
  import Row from "./Row.svelte";

  type Props = {
    id: string;
    label?: string;
    value: number;
    border?: "transparent" | "solid";
    width?: "full" | "auto";
  };
  let {
    id,
    label,
    value = $bindable(),
    border = "solid",
    width = "full",
  }: Props = $props();
</script>

{#if label}
  <InlineGrid>
    <label for={id}>{label}</label>
    <input
      id={id}
      class={border}
      type="number"
      bind:value={value}
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
      type="number"
      bind:value={value}
    />
  </Row>
{/if}

<style>
  input {
    border-radius: var(--radius-lg);
    background-color: transparent;
    padding: 0.35rem 0.5rem;
    font-size: 0.875rem;
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
</style>
