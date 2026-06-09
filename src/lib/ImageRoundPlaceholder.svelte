<!--
  @component

  A circular 150×150 placeholder shown where a round avatar image is expected but
  not yet available. Takes no props.

  ### Example

  ```svelte
  <ImageRoundPlaceholder />
  ```
-->
<script lang="ts"></script>

<div>
  <span>Insert image</span>
</div>

<style>
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border-radius: 50%;
    background-color: var(--color);
    width: 150px;
    height: 150px;
    color: var(--background-color);
  }
</style>
