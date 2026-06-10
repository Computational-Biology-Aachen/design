<!--
  @component

  A linked sponsor/logo tile that displays a contained background image and
  scales up slightly on hover. Typically placed in a [[GridSponsor]].

  ### Props

  - `href: string`
    Destination link (the sponsor's website).
  - `img: string`
    Logo image URL (rendered as a contained background image).
  - `name: string`
    Sponsor name (currently used for identification/accessibility context).

  ### Example

  ```svelte
  <CardSponsor href="https://rwth-aachen.de" img="/rwth.svg" name="RWTH" />
  ```
-->
<script lang="ts">
  import Link from "./Link.svelte";

  let {
    href,
    img,
    // public prop, reserved for identification/accessibility (not yet used)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
