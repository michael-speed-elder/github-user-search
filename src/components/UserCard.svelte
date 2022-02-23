<script lang="ts">
  import { groupDigits } from "../utils";
  import type { Endpoints } from "@octokit/types";
  type User = Endpoints["GET /users/{username}"]["response"]["data"];

  export let user: User;

  const followers = user.followers as number;
  const following = user.following as number;
</script>

<div class="user-card">
  <div class="avatar" style={`background-image: url(${user.avatar_url})`} />

  <a class="name" href={`${user.html_url}`}>
    {user.name ?? user.login}
    {user.name ? ` (${user.login})` : ""}
  </a>

  {#if user.location}
    <div class="location">{user.location}</div>
  {/if}

  {#if user.bio}<p class="bio">{user.bio}</p>{/if}

  <div class="follow-stats">
    Following: <strong>{groupDigits.format(following)}</strong>
    — Followers: <strong>{groupDigits.format(followers)}</strong>
  </div>
</div>

<style lang="scss">
  @import "../styles/variables";

  .user-card {
    background-color: #fff;
    box-shadow: 5px 5px 5px #ccc;
    border-left: 2px $github-dark solid;
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 0.67em;
    padding: 1em;
    width: calc(100% - 1em);

    :global(& + &) {
      // & + & {
      margin-top: 1em;
    }

    * {
      font-size: 0.85em;
      grid-column: 2;
    }

    .name {
      font-size: 1em;
    }
  }

  .avatar {
    background-size: contain;
    border-radius: 999px;
    grid-column: 1;
    grid-row: span 4;
    overflow: hidden;
    height: 100px;
    width: 100px;
  }

  .bio {
    line-height: 1.25;
    margin: 0;
  }
</style>
