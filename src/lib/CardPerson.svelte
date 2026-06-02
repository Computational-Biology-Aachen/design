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
    href = `team/${slug}`,
    img,
  }: {
    title: string;
    slug: string;
    href?: string;
    img?: string;
  } = $props();

  let resolvedImg = $derived(
    img ??
      images[`/src/lib/assets/people/${slug}.jpg`] ??
      "/src/lib/assets/people/placeholder.jpg",
  ) as string;
</script>

<Link
  color="light"
  href={href}
>
  <div class="card">
    <img
      src={resolvedImg}
      alt={title}
    />
    <div class="bar">
      <h4 class="white">{title}</h4>
    </div>
  </div>
</Link>

<style>
  .card {
    display: inline-flex;
    position: relative;
    flex-direction: column;
    justify-content: end;
    transition: transform 0.3s ease;
    margin: 0 auto;
    padding: 0;
    width: 100%;
    height: 300px;
    overflow: hidden;
  }
  .card:hover {
    transform: scale(1.02);
  }
  .card img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
  .bar {
    display: flex;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    flex-direction: column;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 0.5rem;
    color: var(--white);
  }
  h4 {
    margin: 0;
    padding: 0;
    font-size: 14px;
  }
</style>
