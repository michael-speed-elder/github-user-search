<script lang="ts">
  import { page_num, total_count, per_page } from "stores/.";

  const prevPage = () => ($page_num = Math.max(1, $page_num - 1));

  const nextPage = () => {
    const maxPage = Math.floor($total_count / $per_page);
    $page_num = Math.min(maxPage, $page_num + 1);
  };
</script>

<div class="page-controls">
  <button on:click={prevPage}>&lsaquo;</button>
  {$page_num}
  <button on:click={nextPage}>&rsaquo;</button>
</div>

<style>
  .page-controls {
    text-align: center;
    margin-bottom: -1em;
  }

  button {
    cursor: pointer;
  }
</style>
