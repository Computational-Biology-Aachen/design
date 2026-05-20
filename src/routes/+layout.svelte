<script lang="ts">
  import { Navbar, NavItem } from "$lib/index.js";
  import "../app.css";

  let { children } = $props();
</script>

<Navbar>
  {#snippet brand()}
    <span class="brand">CPBL Design</span>
  {/snippet}
  <NavItem href="/">Overview</NavItem>
  <NavItem href="/tokens">Tokens</NavItem>
  <NavItem href="/components">Components</NavItem>
</Navbar>

{@render children()}

<style>
  .brand {
    color: var(--color-primary);
    font-weight: 600;
    font-size: 1rem;
  }
</style>
