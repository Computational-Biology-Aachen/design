<script lang="ts">
  let { children } = $props();
</script>

<div>
  {@render children()}
</div>

<style>
  div {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    justify-content: center;
    align-items: center;
    grid-gap: 10px;
  }
</style>
