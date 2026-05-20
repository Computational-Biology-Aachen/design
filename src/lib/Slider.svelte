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

<label class="slider">
  <div class="slider-row">
    <span class="slider-name">{name}{desc ? ` (${desc})` : ""}</span>
    <span class="slider-value">{value}</span>
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
  .slider {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-2);
  }

  .slider-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: var(--text-sm, 0.875rem);
  }

  .slider-name {
    font-weight: 500;
  }

  .slider-value {
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
