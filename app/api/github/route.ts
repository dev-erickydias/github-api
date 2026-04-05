import { NextRequest } from "next/server";
import { getCached, setCached, buildCacheKey } from "../../../lib/cache";

export const dynamic = "force-dynamic";

const GITHUB_API = "https://api.github.com";
const MAX_PAGES = 10;
const VALID_SORTS = ["updated", "created", "pushed", "name", "stars", "forks", "size"] as const;
const VALID_ORDERS = ["asc", "desc"] as const;
const USERNAME_REGEX = /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;

type SortKey = (typeof VALID_SORTS)[number];

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  clone_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  default_branch: string;
  visibility: string;
  fork: boolean;
  archived: boolean;
  is_template: boolean;
  license: { key: string; name: string } | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  size: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  has_pages: boolean;
  has_wiki: boolean;
  has_issues: boolean;
  has_projects: boolean;
  has_discussions: boolean;
}

interface FormattedRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  url: string;
  clone_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  default_branch: string;
  visibility: string;
  is_fork: boolean;
  is_archived: boolean;
  is_template: boolean;
  is_pinned: boolean;
  license: { key: string; name: string } | null;
  stats: {
    stars: number;
    forks: number;
    watchers: number;
    open_issues: number;
    size_kb: number;
  };
  dates: {
    created_at: string;
    updated_at: string;
    pushed_at: string;
    days_since_update: number;
  };
  has: {
    pages: boolean;
    wiki: boolean;
    issues: boolean;
    projects: boolean;
    discussions: boolean;
  };
}

interface ApiError {
  status: number;
  message: string;
}

async function fetchPinnedRepos(username: string): Promise<string[]> {
  // Try GraphQL API first (requires token with read:user scope)
  if (process.env.GITHUB_TOKEN) {
    try {
      const query = `{ user(login: "${username}") { pinnedItems(first: 6, types: REPOSITORY) { nodes { ... on Repository { name } } } } }`;
      const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        },
        body: JSON.stringify({ query }),
        cache: "no-store",
      });

      if (res.ok) {
        const data = await res.json();
        const nodes = data?.data?.user?.pinnedItems?.nodes;
        if (Array.isArray(nodes) && nodes.length > 0) {
          return nodes.map((n: { name: string }) => n.name);
        }
      }
    } catch {
      // Fall through to HTML fallback
    }
  }

  // Fallback: parse pinned repos from the GitHub profile HTML
  try {
    const res = await fetch(`https://github.com/${encodeURIComponent(username)}`, {
      headers: { "User-Agent": "GitReposAPI/1.0" },
      cache: "no-store",
    });

    if (!res.ok) return [];
    const html = await res.text();
    const regex = new RegExp(`/${username}/([a-zA-Z0-9._-]+)"[^>]*class="[^"]*text-bold`, "g");
    const names: string[] = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      if (!names.includes(match[1])) names.push(match[1]);
    }
    return names;
  } catch {
    return [];
  }
}

async function fetchAllRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
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
        throw { status: 404, message: `User "${username}" not found` } satisfies ApiError;
      }
      if (res.status === 403) {
        throw { status: 429, message: "GitHub API rate limit exceeded. Try again later." } satisfies ApiError;
      }
      throw { status: res.status, message: `GitHub API error: ${res.status}` } satisfies ApiError;
    }

    const data: unknown = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    repos.push(...(data as GitHubRepo[]));
    if (data.length < 100) break;
    page++;
  }

  return repos;
}

function formatRepo(repo: GitHubRepo, pinnedNames: string[] = []): FormattedRepo {
  const updatedAt = new Date(repo.updated_at);
  const now = new Date();
  const daysSinceUpdate = Math.floor(
    (now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24)
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
    is_pinned: pinnedNames.includes(repo.name),
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

function extractStats(projects: FormattedRepo[]) {
  const languages: Record<string, number> = {};
  const topics: Record<string, number> = {};
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

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonResponse(data: unknown, status = 200): Response {
  return Response.json(data, { status, headers: corsHeaders });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, { status: 204, headers: corsHeaders });
}

export async function GET(request: NextRequest): Promise<Response> {
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
            pinned: "true | false — return only pinned/featured repos (default: false)",
          },
        },
        400
      );
    }

    if (!USERNAME_REGEX.test(user)) {
      return jsonResponse({ error: "Invalid GitHub username format" }, 400);
    }

    const sort = searchParams.get("sort") || "updated";
    if (!(VALID_SORTS as readonly string[]).includes(sort)) {
      return jsonResponse(
        { error: `Invalid sort value. Must be one of: ${VALID_SORTS.join(", ")}` },
        400
      );
    }

    const order = searchParams.get("order") || "desc";
    if (!(VALID_ORDERS as readonly string[]).includes(order)) {
      return jsonResponse({ error: "Invalid order value. Must be 'asc' or 'desc'" }, 400);
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
    const pinnedOnly = searchParams.get("pinned") === "true";

    const cacheKey = buildCacheKey(user);
    let allRepos = getCached<GitHubRepo[]>(cacheKey);
    let fromCache = false;

    if (allRepos) {
      fromCache = true;
    } else {
      allRepos = await fetchAllRepos(user);
      setCached(cacheKey, allRepos);
    }

    const pinnedNames = await fetchPinnedRepos(user);

    let projects = allRepos
      .filter((repo) => {
        if (!includeForks && repo.fork) return false;
        if (!includeArchived && repo.archived) return false;
        return true;
      })
      .map((repo) => formatRepo(repo, pinnedNames));

    if (pinnedOnly) {
      projects = projects.filter((p) => p.is_pinned);
    }

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
      return jsonResponse({ user, cache: { hit: fromCache, ttl: 600 }, stats });
    }

    const sortFns: Record<string, (a: FormattedRepo, b: FormattedRepo) => number> = {
      updated: (a, b) =>
        new Date(b.dates.updated_at).getTime() - new Date(a.dates.updated_at).getTime(),
      created: (a, b) =>
        new Date(b.dates.created_at).getTime() - new Date(a.dates.created_at).getTime(),
      pushed: (a, b) =>
        new Date(b.dates.pushed_at).getTime() - new Date(a.dates.pushed_at).getTime(),
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
      cache: { hit: fromCache, ttl: 600 },
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
  } catch (error: unknown) {
    const apiError = error as ApiError;
    if (apiError.status) {
      return jsonResponse({ error: apiError.message }, apiError.status);
    }
    console.error("GitHub API error:", error);
    return jsonResponse({ error: "Failed to fetch GitHub repositories" }, 502);
  }
}
