<script lang="ts">
  import { base } from "$app/paths";
  import favicon from "$lib/assets/cpbl-favicon.svg";
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

<Navbar>
  {#snippet brand()}
    <span class="brand">CPBL Design</span>
  {/snippet}

  <CollapseToBurger collapseAt="512px">
    <NavItem href="{base}/">Overview</NavItem>
    <NavItem href="{base}/tokens">Tokens</NavItem>
    <NavItem href="{base}/components">Components</NavItem>
  </CollapseToBurger>

  <NavGH href="https://github.com/Computational-Biology-Aachen/design" />
</Navbar>

{@render children()}

<style>
  .brand {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
  }
</style>
