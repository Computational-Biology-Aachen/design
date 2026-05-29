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
