<!--
  @component

  A paired control with two 0–20 index sliders for activation and deactivation
  factors, each showing its resolved multiplier value. Both indices are
  `$bindable`; the multipliers are computed by the parent and passed in for
  display.

  ### Props

  - `activationIdx: number` (bindable)
    Index (0–20) of the activation slider.
  - `deactivationIdx: number` (bindable)
    Index (0–20) of the deactivation slider.
  - `activationMultiplier: number`, `deactivationMultiplier: number`
    The resolved multiplier values shown next to each label.
  - `activationLabel: string`, `deactivationLabel: string`
    Labels for the two sliders.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <SliderActivation
    bind:activationIdx={aIdx}
    bind:deactivationIdx={dIdx}
    activationMultiplier={aMul}
    deactivationMultiplier={dMul}
    activationLabel="Activation"
    deactivationLabel="Deactivation"
  />
  ```
-->
<script lang="ts">
  interface Props {
    activationIdx: number;
    deactivationIdx: number;
    activationMultiplier: number;
    deactivationMultiplier: number;
    activationLabel: string;
    deactivationLabel: string;
    styleVars?: { [key: string]: string };
  }

  let {
    activationIdx = $bindable(),
    deactivationIdx = $bindable(),
    activationLabel,
    deactivationLabel,
    activationMultiplier,
    deactivationMultiplier,
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<label class="slider-label" style={inlineStyle}>
  {activationLabel}:
  <strong>{activationMultiplier}</strong>
  <input
    type="range"
    min="0"
    max="20"
    step="1"
    bind:value={activationIdx}
  />
</label>
<label class="slider-label">
  {deactivationLabel}:
  <strong>{deactivationMultiplier}</strong>
  <input
    type="range"
    min="0"
    max="20"
    step="1"
    bind:value={deactivationIdx}
  />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-2);
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
