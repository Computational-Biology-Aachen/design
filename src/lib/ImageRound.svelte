<!--
  @component

  A circular 300×300 avatar image with a background-coloured ring. Falls back to
  an "Image not found" placeholder if the source fails to load. Used for team
  member photos.

  ### Props

  - `path: string`
    Image source URL.
  - `alt?: string`
    Alternative text. Defaults to `"profile"`.
  - `objectFit?: "unset" | "cover"`
    `object-fit` for the image. Defaults to `"unset"`.
  - `objectPosition?: "unset" | "top"`
    `object-position` for the image. Defaults to `"unset"`.

  ### Example

  ```svelte
  <ImageRound path="/team/jane.jpg" alt="Jane Doe" objectFit="cover" />
  ```
-->
<script lang="ts">
  let {
    path,
    alt = "profile",
    objectFit = "unset",
    objectPosition = "unset",
  }: {
    path: string;
    alt?: string;
    objectFit?: "unset" | "cover";
    objectPosition?: "unset" | "top";
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
    style:object-fit={objectFit}
    style:object-position={objectPosition}
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
