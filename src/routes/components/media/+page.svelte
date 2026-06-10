<script lang="ts">
  import {
    Image,
    ImageRound,
    ImageRoundPlaceholder,
    PageNav,
    YouTubeEmbed,
  } from "$lib/index.js";
  import ShowcaseContainer from "$lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "Image", id: "image" },
    { label: "ImageRound", id: "imageround" },
    { label: "ImageRoundPlaceholder", id: "imageroundplaceholder" },
    { label: "YouTubeEmbed", id: "youtubeembed" },
  ];
</script>

<svelte:head><title>Media - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="image"
      title="Image"
    >
      <h3>Responsive image with alt text</h3>
      <div class="preview">
        <div style="max-width: 320px">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Bilateria_collage.jpg/320px-Bilateria_collage.jpg"
            alt="Biology collage"
          />
        </div>
      </div>
      <pre><code
          >{`import myImage from "$lib/assets/photo.jpg";
<Image src={myImage} alt="Description of image" />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="imageround"
      title="ImageRound"
    >
      <h3>Circular profile image with error fallback</h3>
      <div class="preview">
        <div
          style="display: flex; gap: var(--space-4); align-items: center; flex-wrap: wrap"
        >
          <ImageRound
            path="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Mandelbrot_sequence_new.gif/200px-Mandelbrot_sequence_new.gif"
            alt="Demo"
          />
          <ImageRound
            path="/does-not-exist.jpg"
            alt="Missing image - shows placeholder"
          />
        </div>
      </div>
      <pre><code
          >{`<!-- path can be relative or absolute URL -->
<ImageRound path={teamMember.photo} alt={teamMember.name} />
<!-- Falls back to ImageRoundPlaceholder if the image fails to load -->`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="imageroundplaceholder"
      title="ImageRoundPlaceholder"
    >
      <h3>SVG silhouette placeholder - shown when no photo is available</h3>
      <div
        class="preview"
        style="display: flex; gap: var(--space-4)"
      >
        <ImageRoundPlaceholder />
        <ImageRoundPlaceholder />
        <ImageRoundPlaceholder />
      </div>
      <pre><code
          >{`<!-- No props - renders a generic circular silhouette -->
<ImageRoundPlaceholder />`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="youtubeembed"
      title="YouTubeEmbed"
    >
      <h3>Privacy-safe 16:9 iframe - uses youtube-nocookie.com</h3>
      <div class="preview">
        <YouTubeEmbed
          videoId="KvyjIWLD8rU"
          title="ComPhot introduction"
        />
      </div>
      <pre><code
          >&lt;YouTubeEmbed videoId="KvyjIWLD8rU" title="Introduction to ComPhot" /&gt;</code
        ></pre>
    </ShowcaseSection>

    <PageNav
      prev={{ href: "/components/buttons", label: "Buttons" }}
      next={{ href: "/components/utilities", label: "Utilities" }}
    />
  </ShowcaseContainer>
</div>
