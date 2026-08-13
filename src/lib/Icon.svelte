<!--
  @component

  Renders a Material Symbols (Outlined) icon from its ligature name. The icon
  font must be loaded separately by the consuming app. Colour and size are
  selected via props, with extra `style`/`klass` escape hatches.

  ### Props

  - `children: Snippet`
    The Material Symbols ligature name, e.g. `arrow_drop_down`.
  - `color?: "primary" | "inherit" | "c1" | "c2" | "c3" | "c4"`
    Icon colour; `c1`–`c4` map to RWTH palette accents. Defaults to `"primary"`.
  - `fontSize?: "inherit" | "sm" | "md" | "lg"`
    Icon size. Defaults to `"inherit"`.
  - `style?: string`
    Inline style passthrough. Defaults to `""`.
  - `klass?: string`
    Extra class names. Defaults to `""`.
  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <Icon color="c2" fontSize="lg">science</Icon>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    children: Snippet;
    color?: "primary" | "inherit" | "c1" | "c2" | "c3" | "c4";
    fontSize?: "inherit" | "sm" | "md" | "lg";
    style?: string;
    klass?: string;
    styleVars?: { [key: string]: string };
  }

  let {
    children,
    color = "primary",
    fontSize = "inherit",
    style = "",
    klass = "",
    styleVars = {},
  }: Props = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<span
  class="material-symbols-outlined col-{color} ft-{fontSize} {klass}"
  style="{inlineStyle}{inlineStyle && style ? ';' : ''}{style}"
>
  {@render children()}
</span>

<style>
  .col-inherit {
    color: inherit;
  }
  .col-primary {
    color: var(--color-primary);
  }

  .col-c1 {
    color: var(--rwth-petrol);
  }
  .col-c2 {
    color: var(--rwth-violet);
  }
  .col-c3 {
    color: var(--rwth-blue);
  }
  .col-c4 {
    color: var(--rwth-magenta);
  }

  .ft-inherit {
    font-size: inherit;
  }
  .ft-sm {
    font-size: 0.875rem;
  }
  .ft-md {
    font-size: 0.925rem;
  }
  .ft-lg {
    font-size: 1rem;
  }
</style>
