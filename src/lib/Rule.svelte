<!--
  @component

  A thin horizontal divider (`<hr>`) used to separate content sections. Takes no
  props.

  - `styleVars?: { [key: string]: string }`
    Optional CSS custom property overrides applied via inline style.

  ### Example

  ```svelte
  <section>…</section>
  <Rule />
  <section>…</section>
  ```
-->
<script lang="ts">
  let {
    styleVars = {},
  }: {
    styleVars?: { [key: string]: string };
  } = $props();

  let inlineStyle = $derived(
    Object.entries(styleVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";"),
  );
</script>

<hr style={inlineStyle} />

<style>
  hr {
    border: 1px solid #e7ecf1;
  }
</style>
