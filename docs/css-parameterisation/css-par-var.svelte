<!--
 @component

  Very little compiler help

  Calling conventions
  <Element />                  // default width
  <Element --width="200px" />  // custom width

-->

<script lang="ts">
</script>

<div></div>

<style>
  div {
    width: var(--width, 100px);
  }
</style>
