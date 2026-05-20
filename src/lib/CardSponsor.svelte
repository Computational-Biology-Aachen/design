<script lang="ts">
  import { Link } from "@computational-biology-aachen/design";

  let {
    href,
    img,
    name,
  }: {
    href: string;
    name: string;
    img: string;
  } = $props();
</script>

<Link href={href}>
  <div
    class="card"
    style="background-image: url({img})"
  ></div>
</Link>

<style>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: end;
    transition: all 0.5s ease;
    margin: 0 auto;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    padding: 0;
    width: 100%;
    max-width: 300px;
    max-width: 500px;
    min-height: 200px;
  }
  .card:hover {
    transform: scale(1.07);
  }
</style>
