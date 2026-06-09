<!--
  @component

  Headline variant of [[CardSoftware]]: a tall linked card with a contained
  background image and a dark info bar holding a title and slot content. Note the
  link prop here is named `url` (not `href`).

  ### Props

  - `title: string`
    Card heading shown in the info bar.
  - `url?: string`
    Destination link. Defaults to `"/"`.
  - `img?: string`
    Background image URL. Defaults to `"/placeholder.jpg"`.
  - `children: Snippet`
    Additional info-bar content.

  ### Example

  ```svelte
  <CardSoftwareMain title="Featured tool" url="/software/x" img="/x.png">
    A short tagline.
  </CardSoftwareMain>
  ```
-->
<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    title,
    url: href = "/",
    img = "/placeholder.jpg",
    children,
  }: {
    title: string;
    url?: string;
    img?: string;
    children: Snippet;
  } = $props();
</script>

<a href={href}>
  <div
    class="card"
    style:background-image={`url(${img})`}
  >
    <div class="bar">
      <h4>{title}</h4>
      {@render children()}
    </div>
  </div>
</a>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: end;
    transition: transform 0.3s ease;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100%;
    min-height: 400px;
  }
  .card:hover {
    transform: scale(1.01);
  }
  .bar {
    display: flex;
    flex-direction: column;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 1rem;
    width: 100%;
    color: var(--color-bg);
  }
  h4 {
    color: var(--color-bg);
  }
</style>
