<!--
  @component

  A circular 150×150 placeholder shown where a round avatar image is expected but
  not yet available.

  ### Props

  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <ImageRoundPlaceholder />
  ```
-->
<script lang="ts">
  import { toStyleString } from "./utils";
  interface Props {
    styleVars?: { [key: string]: string };
  }

  let { styleVars = {} }: Props = $props();

  let inlineStyle = $derived(toStyleString(styleVars));
</script>

<div style={inlineStyle}>
  <span>Insert image</span>
</div>

<style>
  div {
    --irp-size: 150px;
    --irp-margin-bottom: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: var(--irp-margin-bottom);
    border-radius: 50%;
    background-color: var(--slate-50);
    width: var(--irp-size);
    height: var(--irp-size);
    color: var(--color-text-muted);
  }
</style>
