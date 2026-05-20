<script lang="ts">
  import H1 from "./H1.svelte";
  import Link from "./Link.svelte";
  import Text from "./Text.svelte";
  import {
    faGithub,
    faGitlab,
    faOrcid,
  } from "@fortawesome/free-brands-svg-icons";
  import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";

  let {
    name,
    img,
    mail = null,
    github = null,
    gitlab = null,
    website = null,
    orcid = null,
  }: {
    name: string;
    img: string;
    mail?: string | null;
    github?: string | null;
    gitlab?: string | null;
    doi?: string | null;
    website?: string | null;
    orcid?: string | null;
  } = $props();

  let imageError = $state(false);

  function handleError() {
    imageError = true;
  }
</script>

<section>
  <div class="grid">
    <div class="info">
      <H1 color="light">{name}</H1>
      <Text color="light">Department of Biology</Text>
      <Text color="light"
        >Faculty of Mathematics, Computer Science and Natural Sciences</Text
      >
      <Text color="light">Worringerweg 1 52074 Aachen</Text>
      {#if mail != null}
        <Link
          color="light"
          href="mailto:{mail}"><Fa icon={faEnvelope} /></Link
        >
      {/if}
      {#if github != null}
        <Link
          color="light"
          href={github}><Fa icon={faGithub} /></Link
        >
      {/if}
      {#if gitlab != null}
        <Link
          color="light"
          href={gitlab}><Fa icon={faGitlab} /></Link
        >
      {/if}
      {#if orcid != null}
        <Link
          color="light"
          href={orcid}><Fa icon={faOrcid} /></Link
        >
      {/if}
      {#if website != null}
        <Link
          color="light"
          href={website}><Fa icon={faHome} /></Link
        >
      {/if}
    </div>
    {#if imageError}
      <div class="placeholder">
        <span>Image not found</span>
      </div>
    {:else}
      <img
        src={img}
        alt={name}
        onerror={handleError}
      />
    {/if}
  </div>
</section>

<style>
  section {
    background-color: var(--color-primary);
    padding: var(--space-8) 0;
    width: 100%;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    margin: 0 auto;
    padding: 0 1rem;
    width: 100%;
    max-width: var(--max-width);
  }

  @media (min-width: 768px) {
    .grid {
      grid-template-columns: 1fr 300px;
    }
  }

  img {
    margin: 0 auto;
    border: 4px solid var(--color-bg);
    border-radius: 50%;
    width: 300px;
    height: 300px;
  }

  .placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border: 4px solid var(--color-bg);
    border-radius: 50%;
    background-color: var(--color-text);
    width: 300px;
    height: 300px;
    color: var(--color-bg);
  }
</style>
