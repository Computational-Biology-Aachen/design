<script lang="ts">
  import Link from "./Link.svelte";
  import type { Snippet } from "svelte";

  let {
    title,
    href = "/",
    img = "/placeholder.jpg",
    children,
  }: {
    title: string;
    href?: string;
    img?: string;
    children: Snippet;
  } = $props();
</script>

<Link href={href}>
  <div
    class="card"
    style={`--card-image: url(${img})`}
  >
    <div class="bar">
      <h4>{title}</h4>
      {@render children()}
    </div>
  </div>
</Link>

<style>
  .card {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: end;
    transition: transform 0.3s ease;
    background-color: white;
    isolation: isolate;
    width: 100%;
    min-height: 400px;
    overflow: hidden;
  }

  .card::before {
    position: absolute;
    transform: scale(1.01);
    opacity: 0.8;
    z-index: 0;
    /* filter: grayscale(65%) saturate(55%) brightness(0.78) contrast(0.9); */
    inset: 0;
    background-image: var(--card-image);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    content: "";
  }

  .card::after {
    position: absolute;
    z-index: 0;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0.5) 100%
    );
    content: "";
  }

  .card:hover {
    transform: scale(1.01);
  }

  @media (min-width: 768px) {
    .card::before {
      background-position: center;
      background-size: 90%;
    }
  }
  .bar {
    display: flex;
    position: relative;
    flex-direction: column;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 1rem;
    width: 100%;
    color: var(--color-bg);
  }
  h4 {
    color: var(--color-bg);
  }
</style>
