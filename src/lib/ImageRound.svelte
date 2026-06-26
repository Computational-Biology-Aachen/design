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
  - `styleVars?: { size?: string; borderWidth?: string }`
    Override CSS custom properties. All optional.

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
    styleVars = {},
  }: {
    path: string;
    alt?: string;
    objectFit?: "unset" | "cover";
    objectPosition?: "unset" | "top";
    styleVars?: {
      size?: string;
      borderWidth?: string;
    };
  } = $props();

  let imageError = $state(false);

  function handleError() {
    imageError = true;
  }

  let cssVars = $derived({
    ...(styleVars.size ? { "--image-round-size": styleVars.size } : {}),
    ...(styleVars.borderWidth ? { "--image-round-border-width": styleVars.borderWidth } : {}),
  });
</script>

{#if imageError}
  <div
    class="placeholder"
    style={Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  >
    <span>Image not found</span>
  </div>
{:else}
  <img
    src={path}
    alt={alt}
    onerror={handleError}
    style:object-fit={objectFit}
    style:object-position={objectPosition}
    style={Object.entries(cssVars)
      .map(([k, v]) => `${k}:${v}`)
      .join(";")}
  />
{/if}

<style>
  img {
    --image-round-size: 300px;
    --image-round-border-width: 4px;
    border: var(--image-round-border-width) solid var(--color-bg);
    border-radius: 50%;
    width: var(--image-round-size);
    height: var(--image-round-size);
  }

  .placeholder {
    --image-round-size: 300px;
    --image-round-border-width: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border: var(--image-round-border-width) solid var(--color-bg);
    border-radius: 50%;
    background-color: var(--color-text);
    width: var(--image-round-size);
    height: var(--image-round-size);
    color: var(--color-bg);
  }
</style>
