<!--
  @component

  A team-member page header on the primary colour: name and lab address beside a
  round photo, with optional contact/profile icon links (email, GitHub, GitLab,
  ORCID, website). Falls back to a placeholder if the photo fails to load.

  ### Props

  - `name: string`
    The person's name.
  - `img: string`
    Photo URL.
  - `mail?: string | null`
    Email address (rendered as a `mailto:` link).
  - `github?: string | null`, `gitlab?: string | null`, `orcid?: string | null`, `website?: string | null`
    Optional profile links, each shown as an icon when provided.

  ### Example

  ```svelte
  <SectionHeaderPerson
    name="Jane Doe"
    img="/team/jane.jpg"
    mail="jane@example.org"
    orcid="https://orcid.org/0000-0000-0000-0000"
  />
  ```
-->
<script lang="ts">
  import {
    faGithub,
    faGitlab,
    faOrcid,
  } from "@fortawesome/free-brands-svg-icons";
  import { faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import H1 from "./H1.svelte";
  import Link from "./Link.svelte";
  import Text from "./Text.svelte";

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

<header>
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
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    background-color: var(--color-primary);
    padding: var(--space-8) var(--space-4);
    width: 100%;
    min-height: 12rem;
  }
  .grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--gap);
    margin: 0 auto;
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
