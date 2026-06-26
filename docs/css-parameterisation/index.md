# CSS Parameterisation

A couple example of how one can CSS parameterisation of svelte components.

The approaches differ in whether

1. the customization is a closed set of choices or open
2. the compiler can help catch errors, i.e. passing CSS names that don't actually exist on the component


## Approaches - Closed set / variants

This approach is heavily compiler assisted, but doesn't allow customization beyond what the component provides

```svelte
<script lang="ts">
  let { choice = "normal" }: { choice?: "normal" | "wide" } = $props();
</script>

<div class="choice-{choice}"></div>

<style>
  .choice-normal {
    width: 100px;
  }
  .choice-wide {
    width: 200px;
  }
</style>
```

## Approaches - style prop

This approach let's consumers override the width the style & the compiler can catch name mismatches

```svelte
<script lang="ts">
  let { width = "100px" }: { width?: string } = $props();
</script>

<div style:width={width}></div>
```

## Approaches - Direct CSS variable

Call the component like `<Element --width="200px" /> `. This has absolutely no compiler support.

```svelte
<div></div>

<style>
  div {
    width: var(--width, 100px);
  }
</style>
```

## Approaches - hybrid variant + css variable

```svelte
<script lang="ts">
  let { size = "normal" }: { size?: "normal" | "wide" } = $props();
</script>

<div
  class="size-{size}"
  style="--div-width: var(--div-width)"
></div>

<style>
  div {
    width: var(--div-width);
  }

  .size-normal {
    --div-width: 120px;
  }

  .size-wide {
    --div-width: 240px;
  }
</style>

```

## Approaches - hybrid variant + style prop

Probably the best option. Gives compiler support for both variant and style prop and allows a custom escape hatch via the style prop.

Call as `<Element variant="wide" />` or
`<Element variant="wide" styleVars={{ width: "700px" }} />`

```svelte
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
```
