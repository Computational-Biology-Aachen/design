<script lang="ts">
  interface Props {
    activationIdx: number;
    deactivationIdx: number;
    activationMultiplier: number;
    deactivationMultiplier: number;
    activationLabel: string;
    deactivationLabel: string;
  }

  let {
    activationIdx = $bindable(),
    deactivationIdx = $bindable(),
    activationLabel,
    deactivationLabel,
    activationMultiplier,
    deactivationMultiplier,
  }: Props = $props();
</script>

<label class="slider-label">
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
