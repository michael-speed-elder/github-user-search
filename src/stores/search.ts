import { derived, writable, Writable } from "svelte/store";

export const search_string = writable("");

let timeout: ReturnType<typeof setTimeout>;

export const debounced_search_string = derived<Writable<string>, string>(
  search_string,
  (searchTerm, set) => {
    clearTimeout(timeout);
    timeout = setTimeout(set, 250, searchTerm);
  }
);
