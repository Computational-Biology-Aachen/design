<!--
  @component

  A larger image tile that pairs a thumbnail with a name and short description,
  used to highlight a featured model or item. Falls back to a gradient "biotech"
  placeholder when no image is supplied.

  ### Props

  - `name: string`
    Heading shown in the label; also used in the image `alt` text.
  - `desc: string`
    Short description shown beneath the name.
  - `href: string`
    Destination the whole card links to.
  - `image?: string`
    Optional image URL; omitted shows the placeholder.

  ### Example

  ```svelte
  <CardImageHighlight
    name="Calvin cycle"
    desc="Carbon fixation in C3 plants"
    href="/models/calvin"
    image="/calvin.png"
  />
  ```
-->
<script lang="ts">
  let {
    name,
    desc,
    href,
    image,
  }: {
    name: string;
    desc: string;
    href: string;
    image?: string;
  } = $props();
</script>

<a
  href={href}
  class="card"
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
    <h2>{name}</h2>
    <p>{desc}</p>
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition:
      transform 150ms cubic-bezier(0.4, 0, 0.2, 1),
      box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0 auto;
    box-shadow: var(--shadow-md);
    border-radius: var(--radius-lg);
    background: var(--color-surface);
    width: 19rem;
    height: 17rem;
    overflow: hidden;
    color: var(--color-text);
    text-decoration: none;
  }

  .card:hover {
    transform: translateY(-3px);
    box-shadow:
      2px 5px 12px 0 rgba(0, 0, 0, 0.15),
      var(--shadow-primary);
    color: var(--color-primary);
  }

  .media {
    flex-shrink: 0;
    height: 160px;
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
    font-size: 3rem;
  }

  .label {
    padding: 0.75rem 1rem;
    font-size: var(--text-sm);

    h2 {
      margin: 0 0 0.25rem 0;
      padding: 0;
      font-size: var(--text-sm);
    }

    p {
      margin: 0;
      padding: 0;
      line-height: 1rem;
    }
  }
</style>
