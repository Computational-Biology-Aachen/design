<script lang="ts">
  import { beforeNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { updated } from "$app/state";
  import favicon from "#lib/assets/cpbl-favicon.svg";
  import ButtonMenu from "#lib/ButtonMenu.svelte";
  import ButtonMenuItem from "#lib/ButtonMenuItem.svelte";
  import CollapseToBurger from "#lib/CollapseToBurger.svelte";
  import Imprint from "#lib/Imprint.svelte";
  import { Navbar, NavItem } from "#lib/index.js";
  import NavGH from "#lib/NavGH.svelte";
  import "../app.css";

  let { children } = $props();

  // A new deploy was detected while this tab was open: force a full reload on
  // the next navigation instead of client-side routing into a stale bundle.
  beforeNavigate(({ willUnload, to }) => {
    if (updated.current && !willUnload && to?.url) {
      location.href = to.url.href;
    }
  });
</script>

<!-- SEO -->
<svelte:head>
  <title>CPBL Design</title>
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
    <NavItem href={resolve("/")}>Overview</NavItem>
    <NavItem href={resolve("/tokens")}>Tokens</NavItem>
    <ButtonMenu
      href={resolve("/components")}
      label="Components"
    >
      <ButtonMenuItem href={resolve("/components/buttons")}
        >Buttons</ButtonMenuItem
      >
      <ButtonMenuItem href={resolve("/components/cards")}>Cards</ButtonMenuItem>
      <ButtonMenuItem href={resolve("/components/data")}>Data</ButtonMenuItem>
      <ButtonMenuItem href={resolve("/components/heroes")}
        >Heroes</ButtonMenuItem
      >
      <ButtonMenuItem href={resolve("/components/inputs")}
        >Inputs</ButtonMenuItem
      >
      <ButtonMenuItem href={resolve("/components/interactive")}
        >Interactive
      </ButtonMenuItem>
      <ButtonMenuItem href={resolve("/components/layout")}
        >Layout</ButtonMenuItem
      >
      <ButtonMenuItem href={resolve("/components/media")}>Media</ButtonMenuItem>
      <ButtonMenuItem href={resolve("/components/navigation")}
        >Nav</ButtonMenuItem
      >
      <ButtonMenuItem href={resolve("/components/typography")}
        >Typography
      </ButtonMenuItem>
      <ButtonMenuItem href={resolve("/components/utilities")}
        >Utilities
      </ButtonMenuItem>
    </ButtonMenu>
  </CollapseToBurger>

  <NavGH href="https://github.com/Computational-Biology-Aachen/design" />
</Navbar>
{@render children()}
<Imprint github="https://github.com/Computational-Biology-Aachen/design" />

<!-- </div> -->

<style>
  .brand {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
  }
</style>
