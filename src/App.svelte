<script lang="ts">
  import Search from "./components/Search.svelte";
  import rate_limit_alert from "stores/rate_limit_alert";
</script>

<main>
  <header class:alert={$rate_limit_alert}>{$rate_limit_alert}</header>
  <div class="content">
    <Search />
  </div>
</main>

<style lang="scss">
  @import "./styles/variables";

  main {
    border-bottom: 3em solid transparent;
    display: flex;
    flex-direction: column;
    height: 100vh;

    header {
      padding: 1.5em;
      background-color: $github-dark;

      &.alert {
        transition: background-color 333ms;
        background-color: #d44;
        color: white;
        line-height: 1.5;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      margin: 0 auto;
      max-width: calc(800px + 4em);
      width: 100%;
      overflow: hidden;
      padding: 0 2em;
    }
  }
</style>
