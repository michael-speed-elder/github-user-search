import { request } from "@octokit/request";

export const getUserRecord = (login: string) =>
  request(`GET /users/${login}`, {
    headers: { accept: "application/vnd.github.v3+json" },
  });
