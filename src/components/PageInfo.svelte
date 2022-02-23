<script lang="ts">
  import { page_num, per_page, search_results, total_count } from "stores/.";
  import { groupDigits } from "../utils";

  let numShownRecords: number;
  $: Array.isArray($search_results) &&
    (numShownRecords = $search_results.length);

  let low: number;
  $: low = ($page_num - 1) * $per_page;
</script>

<div class="page-info">
  <div class="result-count" class:hide={!numShownRecords || !$total_count}>
    Showing {low + 1} &ndash;
    {low + numShownRecords} of
    {groupDigits.format($total_count)}
  </div>
  <label>
    Results per page:
    <!-- <input type="number" min="1" max="100" step="10" value={$per_page} /> -->
    <select bind:value={$per_page}>
      <option value={10}>10</option>
      <option value={20}>20</option>
      <option value={30}>30</option>
      <option value={50}>50</option>
      <option value={100}>100</option>
    </select>
  </label>
</div>

<style lang="scss">
  .page-info {
    font-size: 0.8em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 0.5em;
  }

  .hide {
    display: none;
  }

  select {
    border-color: transparent;
    background-color: transparent;
    padding: initial;

    &:hover,
    &:focus {
      border-color: revert;
      background-color: revert;
    }
  }
</style>
