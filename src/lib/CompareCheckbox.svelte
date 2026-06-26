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
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

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
    styleVars?: { [key: string]: string };
  }

  let {
    checked = $bindable(true),
    label = "Compare with last simulation",
    onchange,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<label class="compare-label" style={inlineStyle}>
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
    --cmp-gap: 0.5rem;
    --cmp-font-size: 0.95rem;
    display: inline-flex;
    align-items: center;
    gap: var(--cmp-gap);
    cursor: pointer;
    font-size: var(--cmp-font-size);
    user-select: none;
  }

  .compare-input {
    cursor: pointer;
    width: 1.1em;
    height: 1.1em;
    accent-color: var(--color-primary);
  }
</style>
