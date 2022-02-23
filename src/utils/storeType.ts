import type { Readable, Writable } from "svelte/store";

export type StoreType<T> = T extends Writable<infer W>
  ? W
  : T extends Readable<infer R>
  ? R
  : never;
