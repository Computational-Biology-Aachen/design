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
  - `styleVars?: { maxWidth?: string; minHeight?: string }`
    Optional overrides for CSS custom properties.

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
    styleVars = {},
  }: {
    href: string;
    name: string;
    img: string;
    styleVars?: {
      maxWidth?: string;
      minHeight?: string;
    };
  } = $props();

  let cardCssVars = $derived({
    ...(styleVars.maxWidth ? { "--card-sponsor-max-width": styleVars.maxWidth } : {}),
    ...(styleVars.minHeight ? { "--card-sponsor-min-height": styleVars.minHeight } : {}),
  });
</script>

<Link href={href}>
  <div
    class="card"
    style="background-image: url({img});{Object.entries(cardCssVars).map(([k, v]) => `${k}:${v}`).join(";")}"
  ></div>
</Link>

<style>
  .card {
    --card-sponsor-max-width: 500px;
    --card-sponsor-min-height: 200px;
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
    max-width: var(--card-sponsor-max-width);
    min-height: var(--card-sponsor-min-height);
  }
  .card:hover {
    transform: scale(1.07);
  }
</style>
