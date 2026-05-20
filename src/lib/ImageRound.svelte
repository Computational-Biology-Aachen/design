<script lang="ts">
  let {
    path,
    alt = "profile",
  }: {
    path: string;
    alt?: string;
  } = $props();

  let imageError = $state(false);

  function handleError() {
    imageError = true;
  }
</script>

{#if imageError}
  <div class="placeholder">
    <span>Image not found</span>
  </div>
{:else}
  <img
    src={path}
    alt={alt}
    onerror={handleError}
  />
{/if}

<style>
  img {
    border: 4px solid var(--color-bg);
    border-radius: 50%;
    width: 300px;
    height: 300px;
  }

  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border: 4px solid var(--color-bg);
    border-radius: 50%;
    background-color: var(--color-text);
    width: 300px;
    height: 300px;
    color: var(--color-bg);
  }
</style>
