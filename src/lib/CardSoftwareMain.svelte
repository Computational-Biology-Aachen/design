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
