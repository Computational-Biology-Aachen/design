<script lang="ts">
  import { Button, Row, Section } from "@computational-biology-aachen/design";
</script>

<svelte:head>
  <title>CPBL Design System</title>
</svelte:head>

<Section variant="primary">
  <h1>CPBL Design System</h1>
  <p>Shared tokens and components for CPBL lab websites.</p>
  <div style="margin-top: var(--space-6)"><Row gap="var(--space-3)">
    <a href="/tokens"><Button>Browse tokens</Button></a>
    <a href="/components"
      ><Button variant="secondary">Browse components</Button></a
    >
  </Row></div>
</Section>

<Section>
  <div class="grid">
    <div class="card">
      <h3>Design tokens</h3>
      <p>
        CSS custom properties for color, typography, spacing, shadows, and
        borders — all anchored to the RWTH institutional palette.
      </p>
      <a href="/tokens">View tokens →</a>
    </div>
    <div class="card">
      <h3>Svelte components</h3>
      <p>
        Six layout primitives: <code>Navbar</code>, <code>NavItem</code>,
        <code>Button</code>, <code>Section</code>, <code>Row</code>,
        <code>Footer</code>.
      </p>
      <a href="/components">View components →</a>
    </div>
    <div class="card">
      <h3>Package</h3>
      <p>
        Published to GitHub Packages as <code
          >@computational-biology-aachen/design</code
        >. Built with <code>@sveltejs/package</code>.
      </p>
      <a href="https://github.com/Computational-Biology-Aachen">GitHub →</a>
    </div>
  </div>
</Section>

<style>
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: var(--space-3);
    color: var(--color-text-inverse);
  }

  p {
    color: var(--color-text-inverse);
    opacity: 0.85;
    font-size: 1.125rem;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: var(--space-6);
  }

  .card {
    background-color: var(--color-surface);
    border: var(--border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .card h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .card p {
    color: var(--color-text-muted);
    font-size: 0.9rem;
    margin: 0;
  }

  .card a {
    font-size: 0.9rem;
    font-weight: 500;
  }

  a {
    text-decoration: none;
  }
</style>
