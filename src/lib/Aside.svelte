<!--
  @component

  A semantic `<aside>` wrapper for tangential content such as sidebars or notes.

  ### Props

  - `children: Snippet`
    The aside content.

  ### Example

  ```svelte
  <Aside>Related: see our publications.</Aside>
  ```
-->
<script lang="ts">
  let { children } = $props();
</script>

<aside>
  {@render children()}
</aside>
