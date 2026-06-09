<!--
  @component

  A button that toggles the visibility of a video transcript panel, with a
  rotating arrow indicator. Transcript text preserves whitespace.

  ### Props

  - `message: string`
    The toggle button label (e.g. "Show transcript").
  - `transcript: string`
    The transcript text revealed when expanded.

  ### Example

  ```svelte
  <VideoTranscriptToggle message="Show transcript" transcript={text} />
  ```
-->
<script lang="ts">
  let {
    message,
    transcript,
  }: {
    message: string;
    transcript: string;
  } = $props();

  let showTranscript = $state(false);
</script>

<div class="transcript-toggle">
  <button
    type="button"
    class="transcript-btn"
    onclick={() => (showTranscript = !showTranscript)}
    aria-expanded={showTranscript}
  >
    {showTranscript ? "▼" : "▶"}
    {message}
  </button>
  {#if showTranscript}
    <div class="transcript-content">
      {transcript}
    </div>
  {/if}
</div>

<style>
  .transcript-btn {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition:
      background-color 0.15s,
      color 0.15s;
    cursor: pointer;
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: none;
    padding: var(--space-2) var(--space-4);
    color: var(--color-text-muted);
    font-size: 0.9rem;
  }

  .transcript-btn:hover {
    background-color: var(--color-surface);
    color: var(--color-text);
  }

  .transcript-content {
    margin-top: var(--space-3);
    border: 1px solid var(--color-border);
    border-radius: 6px;
    background: var(--color-surface);
    padding: var(--space-4);
    font-size: 0.9rem;
    line-height: var(--line-height-base);
    white-space: pre-wrap;
  }
</style>
