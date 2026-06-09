<!--
  @component

  A standalone checkbox with an inline label and accent styling, used to toggle
  comparison against a previous simulation. The `checked` state is `$bindable`
  and an `onchange` callback receives the new value.

  ### Props

  - `checked?: boolean` (bindable)
    Whether comparison is enabled. Defaults to `true`.
  - `label?: string`
    The checkbox label. Defaults to `"Compare with last simulation"`.
  - `onchange?: (checked: boolean) => void`
    Called with the new checked value when toggled.

  ### Example

  ```svelte
  <CompareCheckbox bind:checked={compare} onchange={rerun} />
  ```
-->
<script lang="ts">
  interface Props {
    checked?: boolean;
    label?: string;
    onchange?: (checked: boolean) => void;
  }

  let {
    checked = $bindable(true),
    label = "Compare with last simulation",
    onchange,
  }: Props = $props();
</script>

<label class="compare-label">
  <input
    type="checkbox"
    bind:checked={checked}
    onchange={() => onchange?.(checked)}
    class="compare-input"
  />
  {label}
</label>

<style>
  .compare-label {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-size: 0.95rem;
    user-select: none;
  }

  .compare-input {
    cursor: pointer;
    width: 1.1em;
    height: 1.1em;
    accent-color: var(--color-primary);
  }
</style>
