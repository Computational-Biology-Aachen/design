<script lang="ts">
  import Link from "./Link.svelte";

  const images = import.meta.glob(["$lib/assets/people/*"], {
    eager: true,
    query: "?url",
    import: "default",
  });

  let {
    title,
    slug,
  }: {
    title: string;
    slug: string;
  } = $props();

  // svelte-ignore state_referenced_locally
  let filename = `/src/lib/assets/people/${slug}.jpg`;
  let img = images[filename] ?? "/src/lib/assets/people/placeholder.jpg";
</script>

<Link
  color="light"
  href="team/{slug}"
>
  <div
    class="card"
    style:background-image="url({img})"
  >
    <div class="bar">
      <h4 class="white">{title}</h4>
    </div>
  </div>
</Link>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: end;
    transition: transform 0.3s ease;
    margin: 0 auto;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0;
    aspect-ratio: 4/3;
    width: 100%;
  }
  .card:hover {
    transform: scale(1.01);
  }
  .bar {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem;
    width: 75%;
    color: var(--color-bg);
  }
  h4 {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
</style>
