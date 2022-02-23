import type { UserSearchResult, StoreType } from "../utils/.";
import { derived } from "svelte/store";
import { debounced_search_string } from "stores/search";
import { page_num } from "stores/page_num";
import { per_page } from "stores/per_page";
import { handleSearch } from "../utils/handleSearch";

type PagesOfUsers = Record<StoreType<typeof page_num>, UserSearchResult[]>;

export const LOADING_SPINNER = "loading spinner";
let cachedResults: PagesOfUsers = [];
let lastCacheKey = "";

const cache_key = derived(
  [debounced_search_string, per_page],
  ([search, perPage]) => `${search}:${perPage}`
);

export const search_results = derived<
  [typeof debounced_search_string, typeof page_num, typeof cache_key],
  UserSearchResult[] | typeof LOADING_SPINNER
>(
  [debounced_search_string, page_num, cache_key],
  ([searchTerm, page, cacheKey], set) => {
    if (!searchTerm) return set([]);

    if (lastCacheKey !== cacheKey) {
      lastCacheKey = cacheKey;
      cachedResults = [];
    } else if (cachedResults[page]) {
      return set(cachedResults[page]);
    }

    set(LOADING_SPINNER);

    handleSearch(searchTerm, page).then((userJson) => {
      cachedResults[page] = userJson;
      set(userJson);
    });
  },
  []
);
