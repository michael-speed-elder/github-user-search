import type { Endpoints } from "@octokit/types";
import { request } from "@octokit/request";
import { get } from "svelte/store";
import { per_page } from "stores/per_page";
import { total_count } from "stores/total_count";
import { getUserRecord } from "./getUserRecord";
import rate_limit_alert from "stores/rate_limit_alert";

export type UserSearchResult =
  Endpoints["GET /users/{username}"]["response"]["data"];

const isFulfilled = <T>(
  prom: PromiseSettledResult<T>
): prom is PromiseFulfilledResult<T> => prom.status === "fulfilled";

export const handleSearch = async (search: string, page: number) => {
  const { data } = await request("GET /search/users", {
    headers: { accept: "application/vnd.github.v3+json" },
    q: search,
    page,
    per_page: get(per_page),
  });

  total_count.set(data.total_count);

  try {
    const responses = await Promise.allSettled(
      data.items.map((user) => getUserRecord(user.login))
    );

    let users: UserSearchResult[] = [];

    for (const res of responses) {
      if (isFulfilled(res)) {
        users.push(res.value.data);
      }
    }

    const { reason } = (responses.find((res) => res.status === "rejected") ??
      {}) as PromiseRejectedResult;
    if (reason) rate_limit_alert.set(reason);

    return users;
  } catch (err) {
    console.error(err);
    return [];
  }
};
