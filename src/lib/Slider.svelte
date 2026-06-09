<!--
  @component

  A labelled range slider that shows the current value next to its name and
  updates live as it is dragged. The `value` is `$bindable`. See [[Slider2]] for
  a variant that only commits on release.

  ### Props

  - `name: string`
    The slider label.
  - `desc?: string`
    Optional descriptor shown in parentheses after the name. Defaults to `""`.
  - `value: number` (bindable)
    The current value.
  - `min: number | string`, `max: number | string`
    The range bounds.
  - `step?: number | string`
    Step increment. Defaults to `"any"`.
  - `disabled?: boolean`
    Disables the slider. Defaults to `false`.
  - `onchange?: () => void`
    Called when the value changes.

  ### Example

  ```svelte
  <Slider name="Light intensity" value={i} min={0} max={1000} bind:value={i} />
  ```
-->
<script lang="ts">
  interface Props {
    name: string;
    desc?: string;
    value: number;
    min: number | string;
    max: number | string;
    step?: number | string;
    disabled?: boolean;
    onchange?: () => void;
  }

  let {
    name,
    desc = "",
    value = $bindable(),
    min,
    max,
    step = "any",
    disabled = false,
    onchange,
  }: Props = $props();
</script>

<label>
  <div class="row">
    <span class="name">{name}{desc ? ` (${desc})` : ""}</span>
    <span class="value">{value}</span>
  </div>
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    disabled={disabled}
    bind:value={value}
    onchange={onchange}
  />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-2);
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm);
  }
  span.name {
    font-weight: var(--weight-medium);
  }
  span.value {
    color: var(--color-primary);
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  input[type="range"] {
    cursor: pointer;
    width: 100%;
    accent-color: var(--color-primary);
  }
  input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
</style>
