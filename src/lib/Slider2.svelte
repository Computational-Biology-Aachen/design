<!--
  @component

  A range slider that shows the value live while dragging but only commits the
  bound `val` (and fires `callback`) on release — useful when each committed
  change triggers an expensive recomputation. External updates (e.g. reset) sync
  back in when not dragging. See [[Slider]] for the commit-on-every-change
  variant.

  ### Props

  - `name: string`
    The slider label.
  - `desc?: string`
    Optional descriptor shown in parentheses. Defaults to `""`.
  - `val: number` (bindable)
    The committed value (updated on release).
  - `min: string`, `max: string`, `step: string`
    The range bounds and step.
  - `disabled?: boolean`
    Disables the slider. Defaults to `false`.
  - `callback?: () => void`
    Called once when dragging ends.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Slider2 name="k_cat" bind:val={kcat} min="0" max="10" step="0.1" callback={rerun} />
  ```
-->
<script lang="ts">
  let {
    name,
    desc = "",
    val: finalValue = $bindable(),
    min,
    max,
    step,
    disabled = false,
    callback,
    styleVars = {},
  }: {
    val: number;
    desc?: string;
    min: string;
    max: string;
    step: string;
    name: string;
    disabled?: boolean;
    callback?: () => void;
    styleVars?: { [key: string]: string };
  } = $props();

  let liveVal = $state(finalValue);
  let dragging = false;

  // Sync liveVal with finalValue when not dragging (external updates like reset)
  $effect(() => {
    if (!dragging) {
      liveVal = finalValue;
    }
  });

  function startDrag() {
    dragging = true;
  }

  function stopDrag() {
    dragging = false;
    finalValue = liveVal;
    if (callback) callback();
  }

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<label style={inlineStyle}>
  <div class="row">
    <span class="name">{name}{desc ? ` (${desc})` : ""}</span>
    <span class="value">{liveVal}</span>
  </div>
  <input
    type="range"
    min={min}
    max={max}
    step={step}
    bind:value={liveVal}
    onmousedown={startDrag}
    onmouseup={stopDrag}
    ontouchstart={startDrag}
    ontouchend={stopDrag}
    disabled={disabled}
  />
</label>

<style>
  label {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding: 0 var(--space-2);
    width: 100%;
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
    font-weight: var(--weight-bold);
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
