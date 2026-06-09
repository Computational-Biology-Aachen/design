<!--
  @component

  The lab's legal imprint (Impressum) rendered inside a [[SectionFooter]], with
  the statutory provider/contact details and a GitHub link. Content is specific
  to the CPBL site.

  ### Props

  - `github: string`
    URL of the maintainer's GitHub profile shown in the imprint.

  ### Example

  ```svelte
  <Imprint github="https://github.com/marvinvanaalst" />
  ```
-->
<script lang="ts">
  import { faGithub } from "@fortawesome/free-brands-svg-icons";
  import Fa from "svelte-fa";
  import H2 from "./H2.svelte";
  import Link from "./Link.svelte";
  import Footer from "./SectionFooter.svelte";
  import Text from "./Text.svelte";

  let {
    github,
  }: {
    github: string;
  } = $props();
</script>

<Footer>
  <H2 color="light">Imprint</H2>
  <Text color="light">
    Anbieter i.S.d. TDG/MDStV: Prof. Dr. Anna B. Matuszyńska <br />
    Worringerweg 1 52074 Aachen <br />
    Sammelbau Biologie, Bauteil 42 C, Erdgeschoss, Raum 041 <br />
    Work Phone: +49 241 80 25817 <br />

    Verantwortlich i.S.d. § 6 Abs. 2 MDStV: <br />
    Prof. Dr. Anna B. Matuszyńska <br />
    Design und Umsetzung Dr. Marvin van Aalst <Link
      color="light"
      href={github}><Fa icon={faGithub} /></Link
    ><br />
    (c) 2025 Prof. Dr. Anna B. Matuszyńska, Alle Rechte vorbehalten.
  </Text>
</Footer>
