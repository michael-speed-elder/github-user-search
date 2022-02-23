import type { Endpoints } from "@octokit/types";
import { writable } from "svelte/store";

export const per_page =
  writable<Endpoints["GET /search/users"]["parameters"]["per_page"]>(10);
