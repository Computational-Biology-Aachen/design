<!--
 @component

  Here we have typed, compiler assisted default with an untyped escape hatch.
  Make sure to scope the css variable name to the component, as they WILL
  get passed down to children otherwise
  Maybe even use `_--section-width` to indicate a private name

  Fully typed
  <Element variant="wide" />


  Weakly typed escape hatch
  <Element variant="wide" styleVars={{ width: "700px" }} />

-->

<script lang="ts">
  let {
    variant = "normal",
    styleVars = {},
  }: {
    variant?: "normal" | "wide";
    styleVars?: {
      width?: string;
    };
  } = $props();

  let cssVars = $derived({
    ...(styleVars.width ? { "--section-width": styleVars.width } : {}),
  });
</script>

<div
  class="size-{variant}"
  style={Object.entries(cssVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
></div>

<style>
  div {
    width: var(--section-width);
  }
  .size-normal {
    --section-width: 120px;
  }

  .size-wide {
    --section-width: 240px;
  }
</style>
