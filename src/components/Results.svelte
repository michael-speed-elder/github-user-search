<script lang="ts">
  import { LOADING_SPINNER, search_results } from "stores/.";
  import LoadingSpinner from "./LoadingSpinner.svelte";
  import UserCard from "./UserCard.svelte";

  let pageOfUsers: typeof $search_results;
  $: pageOfUsers = $search_results;
</script>

<div class="results-container">
  {#if pageOfUsers === LOADING_SPINNER}
    <LoadingSpinner />
  {:else}
    {#each pageOfUsers as user}
      <UserCard {user} />
    {/each}
  {/if}
</div>

<style lang="scss">
  @import "../styles/variables";
  $fade-out-height: 2em;

  .results-container {
    flex: 1;
    margin: 1em 0;
    overflow-y: scroll;
    padding-bottom: $fade-out-height;
    position: relative;

    &::after {
      content: "";
      display: block;
      height: $fade-out-height;
      position: sticky;
      bottom: -$fade-out-height;
      left: 0;
      right: 0;
      background-image: linear-gradient(
        to bottom,
        transparentize($form-bg-color, 1),
        $form-bg-color
      );
    }
  }
</style>
