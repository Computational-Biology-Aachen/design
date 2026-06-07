<script lang="ts">
  import Icon from "./Icon.svelte";
  import Row from "./Row.svelte";

  interface Props {
    color: "c1" | "c2" | "c3" | "c4";
    icon: string;
    header: string;
    body: string;
  }

  let { color, icon, header, body }: Props = $props();
  let colorVar = $derived(`var(--color-${color})`);
</script>

<div
  class="box"
  style="--color: {colorVar}"
>
  <Row>
    <Icon style="font-size: 2rem; color: var(--color)">{icon}</Icon>
    <h2
      class="box-header"
      style="color: var(--color)"
    >
      {header}
    </h2>
  </Row>
  <p>{body}</p>
</div>

<style>
  .box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition:
      border-color 0.5s ease,
      background 0.5s ease;
    margin: 0 auto;
    border: 1px solid rgba(from var(--color) r g b / 0.5);
    border-radius: 20px;
    background: linear-gradient(
      135deg,
      rgba(from var(--color) r g b / 0.01),
      rgba(from var(--color) r g b / 0.05)
    );
    padding: 1rem;
    width: 19rem;
    height: 10rem;
    overflow-y: hidden;
  }

  .box:hover {
    border-color: rgba(from var(--color) r g b / 0.8);
    background: linear-gradient(
      135deg,
      rgba(from var(--color) r g b / 0.04),
      rgba(from var(--color) r g b / 0.12)
    );
  }

  .box-header {
    font-size: 1rem;
  }
</style>
