<script lang="ts">
  import { Navbar, NavItem } from "@computational-biology-aachen/design";
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
    font-weight: 600;
    color: var(--color-primary);
    font-size: 1rem;
  }
</style>
