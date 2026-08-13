<!--
  @component

  A fixed-height (10rem) linked image tile with a name label, used in galleries
  (e.g. model thumbnails). Falls back to a gradient "biotech" placeholder when no
  image is supplied. See [[CardImageFlex]] for a width-flexible variant.

  ### Props

  - `name: string`
    Label shown beneath the image; also used in the image `alt` text.
  - `href: string`
    Destination the whole card links to.
  - `image?: string`
    Optional image URL; omitted shows the placeholder.
  - `styleVars?: { height?: string; mediaHeight?: string; fallbackIconSize?: string }`
    Optional overrides for CSS custom properties.

  ### Example

  ```svelte
  <CardImageFixed name="Lotka–Volterra" href="/models/lv" image="/lv.png" />
  ```
-->
<script lang="ts">
  let {
    name,
    href,
    image,
    styleVars = {},
  }: {
    name: string;
    href: string;
    image?: string;
    styleVars?: {
      height?: string;
      mediaHeight?: string;
      fallbackIconSize?: string;
    };
  } = $props();

  let cardCssVars = $derived({
    ...(styleVars.height
      ? { "--card-image-fixed-height": styleVars.height }
      : {}),
    ...(styleVars.mediaHeight
      ? { "--card-image-fixed-media-height": styleVars.mediaHeight }
      : {}),
    ...(styleVars.fallbackIconSize
      ? { "--card-image-fixed-fallback-icon-size": styleVars.fallbackIconSize }
      : {}),
  });
</script>

<a
  href={href}
  class="card"
  style={Object.entries(cardCssVars)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")}
>
  <div class="media">
    {#if image}
      <img
        src={image}
        alt="{name} scheme"
      />
    {:else}
      <div class="fallback">
        <span class="material-symbols-outlined">biotech</span>
      </div>
    {/if}
  </div>
  <div class="label">
    <span>{name}</span>
  </div>
</a>

<style>
  .card {
    --card-image-fixed-height: 10rem;
    --card-image-fixed-media-height: 160px;
    --card-image-fixed-fallback-icon-size: 3rem;
    display: flex;
    flex-direction: column;
    transition:
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: var(--shadow-md);
    border-radius: var(--radius-lg);
    background: var(--color-bg);
    min-width: 10rem;
    height: var(--card-image-fixed-height);
    overflow: hidden;
    color: var(--color-text);
    text-decoration: none;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow:
      2px 5px 12px 0 rgba(0, 0, 0, 0.15),
      var(--shadow-md);
    color: var(--color-primary);

    .fallback {
      background: linear-gradient(
        135deg,
        rgba(from var(--slate-500) r g b / 1) 0%,
        rgba(from var(--slate) r g b / 1) 100%
      );
    }
  }

  .media {
    flex-shrink: 0;
    height: var(--card-image-fixed-media-height);
    overflow: hidden;
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .fallback {
    --alpha: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    transition:
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    background: linear-gradient(
      135deg,
      rgba(from var(--color-text) r g b / var(--alpha)) 0%,
      rgba(from var(--color-text-muted) r g b / var(--alpha)) 100%
    );
    width: 100%;
    height: 100%;
  }

  .fallback span {
    color: rgba(255, 255, 255, 0.85);
    font-size: var(--card-image-fixed-fallback-icon-size);
  }

  .label {
    padding: 0.75rem 1rem;
    font-weight: var(--weight-medium);
    font-size: var(--text-sm);
  }
</style>
