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
  };
  let {
    id,
    valueLabel,
    condLabel,
    value = $bindable(),
    condition = $bindable(),
    border = "solid",
  }: Props = $props();
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
    />
  </Row>
  {#if !condition}
    <input
      id={id}
      class={border}
      type="number"
      bind:value={value}
    />
  {/if}
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
