<script lang="ts">
  import { base } from "$app/paths";
  import {
    Aside,
    Blockquote,
    Bold,
    Code,
    Deleted,
    H1,
    H2,
    H3,
    H4,
    H5,
    H6,
    Highlight,
    Inserted,
    Italic,
    Keyboard,
    Li,
    Link,
    PageNav,
    Pre,
    Rule,
    Small,
    Strikethrough,
    Sub,
    Sup,
    Text,
    Ul,
    Underline,
  } from "$lib/index.js";
  import ShowcaseContainer from "$lib/ShowcaseContainer.svelte";
  import ShowcaseSection from "$lib/ShowcaseSection.svelte";
  import ShowcaseSidebar from "$lib/ShowcaseSidebar.svelte";

  const links = [
    { label: "H1–H6", id: "headings" },
    { label: "Text", id: "text" },
    { label: "Bold / Italic / Small", id: "inline-weight" },
    { label: "Code / Pre / Keyboard", id: "code" },
    { label: "Link", id: "link" },
    { label: "Li / Ul", id: "list" },
    { label: "Blockquote", id: "blockquote" },
    { label: "Aside", id: "aside" },
    { label: "Rule", id: "rule" },
    { label: "Inline marks", id: "marks" },
    { label: "Sub / Sup", id: "subsup" },
  ];
</script>

<svelte:head><title>Typography - CPBL Design</title></svelte:head>

<div class="showcase-page">
  <ShowcaseSidebar links={links} />
  <ShowcaseContainer>
    <ShowcaseSection
      id="headings"
      title="H1 – H6"
      subtitle="Color variants: dark (default), light, primary, secondary"
    >
      <div class="preview">
        <H1>Heading 1</H1>
        <H2>Heading 2</H2>
        <H3>Heading 3</H3>
        <H4>Heading 4</H4>
        <H5>Heading 5</H5>
        <H6>Heading 6</H6>
      </div>
      <pre><code
          >{`<H1>Heading 1</H1>
<H2>Heading 2</H2>
<H3>Heading 3</H3>
<H4>Heading 4</H4>
<H5>Heading 5</H5>
<H6>Heading 6</H6>`}</code
        ></pre>
      <div class="preview-primary">
        <H1 color="light">Heading 1 - light</H1>
        <H2 color="light">Heading 2 - light</H2>
      </div>
      <pre><code
          >{`<H1 color="light">Heading 1 - light</H1>
<H2 color="light">Heading 2 - light</H2>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="text"
      title="Text"
    >
      <h3>Color variants</h3>
      <div class="preview">
        <Text>Default text - color="dark"</Text>
        <Text color="primary">Primary colored text</Text>
        <Text color="secondary">Secondary colored text</Text>
      </div>
      <div class="preview-primary">
        <Text color="light">Light text on dark background</Text>
      </div>
      <pre><code
          >{`<Text>Default text</Text>
<Text color="light">Light text</Text>
<Text color="primary">Primary colored text</Text>
<Text color="secondary">Secondary colored text</Text>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="inline-weight"
      title="Bold / Italic / Small"
    >
      <div class="preview">
        <p><Bold>Bold text component</Bold></p>
        <p><Italic>Italic text component</Italic></p>
        <p><Small>Small text component</Small></p>
        <p><Bold><Italic>Bold and italic combined</Italic></Bold></p>
      </div>
      <pre><code
          >{`<Bold>Bold text</Bold>
<Italic>Italic text</Italic>
<Small>Small text</Small>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="code"
      title="Code / Pre / Keyboard"
    >
      <div class="preview">
        <p>Inline <Code>code snippet</Code> inside a sentence.</p>
        <Pre
          >const x = 42; const msg = `value is ${"{"}x}`; console.log(msg);</Pre
        >
        <p>
          Press <Keyboard>Ctrl</Keyboard> + <Keyboard>K</Keyboard> to open the command
          palette.
        </p>
      </div>
      <pre><code
          >{`<Code>inline code</Code>
<Pre>multi-line
preformatted block</Pre>
<Keyboard>Ctrl</Keyboard> + <Keyboard>K</Keyboard>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="link"
      title="Link"
    >
      <h3>Color variants</h3>
      <div class="preview">
        <p><Link href="{base}/">Primary link (default)</Link></p>
        <p>
          <Link
            href="{base}/"
            color="secondary">Secondary link</Link
          >
        </p>
        <p>
          <Link
            href="{base}/"
            color="dark">Dark link</Link
          >
        </p>
      </div>
      <div class="preview-primary">
        <p>
          <Link
            href="{base}/"
            color="light">Light link on dark background</Link
          >
        </p>
      </div>
      <pre><code
          >{`<Link href="/path">Primary link</Link>
<Link href="/path" color="light">Light link</Link>
<Link href="/path" color="dark">Dark link</Link>
<Link href="/path" color="secondary">Secondary link</Link>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="list"
      title="Li / Ul"
    >
      <div class="preview">
        <Ul>
          <Li>First list item</Li>
          <Li
            >Second list item with more text to demonstrate wrapping behavior</Li
          >
          <Li>Third list item</Li>
        </Ul>
      </div>
      <pre><code
          >{`<Ul>
  <Li>First item</Li>
  <Li>Second item</Li>
  <Li>Third item</Li>
</Ul>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="blockquote"
      title="Blockquote"
    >
      <div class="preview">
        <Blockquote>
          Life is what happens when you're busy making other plans.
        </Blockquote>
      </div>
      <pre><code
          >{`<Blockquote>
  Life is what happens when you're busy making other plans.
</Blockquote>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="aside"
      title="Aside"
    >
      <div class="preview">
        <Aside>
          This is an aside - supplementary content that relates to the main text
          but sits outside its flow.
        </Aside>
      </div>
      <pre><code
          >{`<Aside>
  Supplementary content outside the main flow.
</Aside>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="rule"
      title="Rule"
    >
      <h3>Horizontal divider</h3>
      <div class="preview">
        <p>Content above the rule</p>
        <Rule />
        <p>Content below the rule</p>
      </div>
      <pre><code>&lt;Rule /&gt;</code></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="marks"
      title="Inline marks"
    >
      <h3>Strikethrough / Deleted / Inserted / Highlight / Underline</h3>
      <div class="preview">
        <p><Strikethrough>Strikethrough text</Strikethrough></p>
        <p><Deleted>Deleted text (semantic del)</Deleted></p>
        <p><Inserted>Inserted text (semantic ins)</Inserted></p>
        <p><Highlight>Highlighted text</Highlight></p>
        <p><Underline>Underlined text</Underline></p>
      </div>
      <pre><code
          >{`<Strikethrough>Strikethrough</Strikethrough>
<Deleted>Deleted (del)</Deleted>
<Inserted>Inserted (ins)</Inserted>
<Highlight>Highlighted</Highlight>
<Underline>Underlined</Underline>`}</code
        ></pre>
    </ShowcaseSection>

    <ShowcaseSection
      id="subsup"
      title="Sub / Sup"
    >
      <div class="preview">
        <p>H<Sub>2</Sub>O - water molecule</p>
        <p>E = mc<Sup>2</Sup> - mass–energy equivalence</p>
        <p>CO<Sub>2</Sub> + H<Sub>2</Sub>O → glucose + O<Sub>2</Sub></p>
      </div>
      <pre><code
          >{`H<Sub>2</Sub>O
E = mc<Sup>2</Sup>
CO<Sub>2</Sub> + H<Sub>2</Sub>O → glucose + O<Sub>2</Sub>`}</code
        ></pre>
    </ShowcaseSection>

    <PageNav next={{ href: "/components/cards", label: "Cards" }} />
  </ShowcaseContainer>
</div>
