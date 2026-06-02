<script lang="ts">
  import { base } from "$app/paths";
  import favicon from "$lib/assets/cpbl-favicon.svg";
  import ButtonMenu from "$lib/ButtonMenu.svelte";
  import ButtonMenuItem from "$lib/ButtonMenuItem.svelte";
  import CollapseToBurger from "$lib/CollapseToBurger.svelte";
  import { Navbar, NavItem } from "$lib/index.js";
  import NavGH from "$lib/NavGH.svelte";
  import "../app.css";

  let { children } = $props();
</script>

<!-- SEO -->
<svelte:head>
  <link
    rel="icon"
    href={favicon}
  />
</svelte:head>

<!-- <div id="page"> -->
<Navbar>
  {#snippet brand()}
    <span class="brand">CPBL Design</span>
  {/snippet}

  <CollapseToBurger collapseAt="512px">
    <NavItem href="{base}/">Overview</NavItem>
    <NavItem href="{base}/tokens">Tokens</NavItem>
    <ButtonMenu
      href="{base}/components"
      label="Components"
    >
      <ButtonMenuItem href="{base}/components/buttons">Buttons</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/cards">Cards</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/data">Data</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/heroes">Heroes</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/inputs">Inputs</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/interactive"
        >Interactive
      </ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/layout">Layout</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/media">Media</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/navigation">Nav</ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/typography"
        >Typography
      </ButtonMenuItem>
      <ButtonMenuItem href="{base}/components/utilities"
        >Utilities
      </ButtonMenuItem>
    </ButtonMenu>
  </CollapseToBurger>

  <NavGH href="https://github.com/Computational-Biology-Aachen/design" />
</Navbar>
{@render children()}

<!-- </div> -->

<style>
  .brand {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
  }
</style>
