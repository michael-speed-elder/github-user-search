import type { Endpoints } from "@octokit/types";
import { writable } from "svelte/store";

export const total_count =
  writable<Endpoints["GET /search/users"]["response"]["data"]["total_count"]>();
