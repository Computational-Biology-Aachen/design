<!--
 @component

  Here we have typed, compiler assisted default with an untyped escape hatch.
  Make sure to scope the css variable name to the component, as they WILL
  get passed down to children otherwise
  Maybe even use `_--section-width` to indicate a private name

  Fully typed
  <Element  />
  <Element size="normal" />
  <Element size="wide" />

  Weakly typed escape hatch
  <Card
    style="--div-width: 700px"
  />

-->

<script lang="ts">
  type Size = "normal" | "wide";

  let {
    size = "normal",
  }: {
    size?: Size;
  } = $props();

  const sizeClasses = {
    normal: "size-normal",
    wide: "size-wide",
  } as const;
</script>

<div
  class={sizeClasses[size]}
  style="--div-width: var(--div-width)"
></div>

<style>
  div {
    width: var(--div-width, 120px); /* fallback default */
  }

  .size-normal {
    --div-width: 120px;
  }

  .size-wide {
    --div-width: 240px;
  }
</style>
