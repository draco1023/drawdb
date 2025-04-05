import { octokit } from "../data/octokit";

const filename = "share.json";
const description = "drawDB diagram";

export async function create(content) {
  const res = await octokit.request("POST /gists", {
    description,
    public: false,
    files: {
      [filename]: { content },
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return res.data.id;
}

export async function update(gistId, content) {
  await octokit.request(`PATCH /gists/${gistId}`, {
    gist_id: gistId,
    description,
    files: {
      [filename]: { content },
    },
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function remove(gistId) {
  await octokit.request(`DELETE /gists/${gistId}`, {
    gist_id: gistId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
}

export async function get(gistId) {
  const res = await octokit.request(`GET /gists/${gistId}`, {
    gist_id: gistId,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return res.data;
}

export async function getCommits(gistId, perPage = 20, page = 1) {
  const res = await octokit.request(
    `GET /gists/${gistId}/commits?per_page=${perPage}&page=${page}`,
    {
      gist_id: gistId,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  return res.data;
}
