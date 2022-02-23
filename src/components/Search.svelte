<script lang="ts">
  import { page_num, search_results, search_string } from "stores/.";
  import PageInfo from "./PageInfo.svelte";
  import Pagination from "./Pagination.svelte";
  import Results from "./Results.svelte";

  let value: string;
  const handleSubmit = async () => {
    $search_string = value;
    $page_num = 1;
  };
</script>

<h1>Search GitHub users</h1>
<div class="search-container">
  <form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value />
    <input type="submit" value="▶" />
  </form>
  {#if $search_results.length}
    <PageInfo />
    <Results />
    <Pagination />
  {/if}
</div>

<style lang="scss">
  @import "../styles/variables";

  .search-container {
    background-color: $form-bg-color;
    border: 1px solid lightgray;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    overflow: hidden;
    padding: 2em;
    width: 100%;
  }

  form {
    border: none;
    display: flex;
  }

  input {
    margin-bottom: 0;
  }

  [type="text"] {
    border-radius: 4px 0 0 4px;
    border: 1px solid darkgray;
    border-right: none;
    box-shadow: 0 0 5px transparent;
    flex: 4;
    outline: none;
    transition: border-color 100ms linear, box-shadow 100ms linear;

    &:focus {
      border-color: steelblue;
      box-shadow: 0 0 5px steelblue;
    }
  }

  [type="submit"] {
    border-radius: 0 4px 4px 0;
    border: none;
    background-color: #396;
    color: white;
    cursor: pointer;
    min-width: 3em;
  }
</style>
