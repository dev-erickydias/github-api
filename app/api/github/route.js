export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com";
const MAX_PAGES = 10;
const VALID_SORTS = ["updated", "created", "pushed", "name", "stars", "forks", "size"];
const VALID_ORDERS = ["asc", "desc"];
const USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

async function fetchAllRepos(username) {
  const repos = [];
  let page = 1;

  while (page <= MAX_PAGES) {
    const res = await fetch(
      `${GITHUB_API}/users/${encodeURIComponent(username)}/repos?per_page=100&page=${page}&type=public`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          ...(process.env.GITHUB_TOKEN && {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          }),
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      if (res.status === 404) {
        throw { status: 404, message: `User "${username}" not found` };
      }
      if (res.status === 403) {
        throw { status: 429, message: "GitHub API rate limit exceeded. Try again later." };
      }
      throw { status: res.status, message: `GitHub API error: ${res.status}` };
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    repos.push(...data);
    if (data.length < 100) break;
    page++;
  }

  return repos;
}

function formatRepo(repo) {
  const updatedAt = new Date(repo.updated_at);
  const now = new Date();
  const daysSinceUpdate = Math.floor(
    (now - updatedAt) / (1000 * 60 * 60 * 24)
  );

  return {
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    description: repo.description,
    url: repo.html_url,
    clone_url: repo.clone_url,
    homepage: repo.homepage || null,
    language: repo.language,
    topics: repo.topics || [],
    default_branch: repo.default_branch,
    visibility: repo.visibility,
    is_fork: repo.fork,
    is_archived: repo.archived,
    is_template: repo.is_template,
    license: repo.license
      ? { key: repo.license.key, name: repo.license.name }
      : null,
    stats: {
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count,
      open_issues: repo.open_issues_count,
      size_kb: repo.size,
    },
    dates: {
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      pushed_at: repo.pushed_at,
      days_since_update: daysSinceUpdate,
    },
    has: {
      pages: repo.has_pages,
      wiki: repo.has_wiki,
      issues: repo.has_issues,
      projects: repo.has_projects,
      discussions: repo.has_discussions,
    },
  };
}

function extractStats(projects) {
  const languages = {};
  const topics = {};
  let totalStars = 0;
  let totalForks = 0;

  for (const project of projects) {
    totalStars += project.stats.stars;
    totalForks += project.stats.forks;

    if (project.language) {
      languages[project.language] = (languages[project.language] || 0) + 1;
    }

    for (const topic of project.topics) {
      topics[topic] = (topics[topic] || 0) + 1;
    }
  }

  return {
    total_repos: projects.length,
    total_stars: totalStars,
    total_forks: totalForks,
    languages: Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count })),
    topics: Object.entries(topics)
      .sort(([, a], [, b]) => b - a)
      .map(([name, count]) => ({ name, count })),
  };
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data, status = 200) {
  return Response.json(data, { status, headers: corsHeaders });
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const user = searchParams.get("user")?.trim();
    if (!user) {
      return jsonResponse(
        {
          error: "Missing required parameter: user",
          usage: "/api/github?user=USERNAME",
          params: {
            user: "(required) GitHub username",
            language: "Filter by programming language",
            topic: "Filter by repository topic",
            search: "Search in name or description",
            sort: "updated | created | pushed | name | stars | forks | size",
            order: "desc | asc",
            page: "Page number (default: 1)",
            per_page: "Items per page, max 100 (default: 10)",
            include_forks: "true | false (default: false)",
            include_archived: "true | false (default: false)",
            stats_only: "true | false (default: false)",
          },
        },
        400
      );
    }

    if (!USERNAME_REGEX.test(user)) {
      return jsonResponse(
        { error: "Invalid GitHub username format" },
        400
      );
    }

    const sort = searchParams.get("sort") || "updated";
    if (!VALID_SORTS.includes(sort)) {
      return jsonResponse(
        { error: `Invalid sort value. Must be one of: ${VALID_SORTS.join(", ")}` },
        400
      );
    }

    const order = searchParams.get("order") || "desc";
    if (!VALID_ORDERS.includes(order)) {
      return jsonResponse(
        { error: "Invalid order value. Must be 'asc' or 'desc'" },
        400
      );
    }

    const language = searchParams.get("language");
    const topic = searchParams.get("topic");
    const search = searchParams.get("search");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
    const perPage = Math.min(
      100,
      Math.max(1, parseInt(searchParams.get("per_page") || "10", 10) || 10)
    );
    const includeForks = searchParams.get("include_forks") === "true";
    const includeArchived = searchParams.get("include_archived") === "true";
    const statsOnly = searchParams.get("stats_only") === "true";

    const allRepos = await fetchAllRepos(user);

    let projects = allRepos
      .filter((repo) => {
        if (!includeForks && repo.fork) return false;
        if (!includeArchived && repo.archived) return false;
        return true;
      })
      .map(formatRepo);

    if (language) {
      projects = projects.filter(
        (p) => p.language && p.language.toLowerCase() === language.toLowerCase()
      );
    }

    if (topic) {
      projects = projects.filter((p) =>
        p.topics.some((t) => t.toLowerCase() === topic.toLowerCase())
      );
    }

    if (search) {
      const q = search.toLowerCase().slice(0, 100);
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    const stats = extractStats(projects);

    if (statsOnly) {
      return jsonResponse({ user, stats });
    }

    const sortFns = {
      updated: (a, b) =>
        new Date(b.dates.updated_at) - new Date(a.dates.updated_at),
      created: (a, b) =>
        new Date(b.dates.created_at) - new Date(a.dates.created_at),
      pushed: (a, b) =>
        new Date(b.dates.pushed_at) - new Date(a.dates.pushed_at),
      name: (a, b) => a.name.localeCompare(b.name),
      stars: (a, b) => b.stats.stars - a.stats.stars,
      forks: (a, b) => b.stats.forks - a.stats.forks,
      size: (a, b) => b.stats.size_kb - a.stats.size_kb,
    };

    projects.sort(sortFns[sort]);

    if (order === "asc") {
      projects.reverse();
    }

    const totalItems = projects.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const startIndex = (page - 1) * perPage;
    const paginatedProjects = projects.slice(startIndex, startIndex + perPage);

    return jsonResponse({
      user,
      pagination: {
        page,
        per_page: perPage,
        total_items: totalItems,
        total_pages: totalPages,
        has_next: page < totalPages,
        has_prev: page > 1,
      },
      stats,
      projects: paginatedProjects,
    });
  } catch (error) {
    if (error.status) {
      return jsonResponse({ error: error.message }, error.status);
    }
    console.error("GitHub API error:", error);
    return jsonResponse(
      { error: "Failed to fetch GitHub repositories" },
      502
    );
  }
}
