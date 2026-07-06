import { site } from "@/data/site";
import { featuredRepos } from "@/data/featured-repos";

// All fetchers revalidate hourly and fail soft: a dead external API
// should never take a page down, so every function returns null on error.

const REVALIDATE = { next: { revalidate: 3600 } } as const;

export interface GitHubRepo {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  pushedAt: string;
}

export interface GitHubStats {
  totalStars: number;
  publicRepos: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
  recentRepos: GitHubRepo[];
}

export async function getGitHubStats(): Promise<GitHubStats | null> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${site.githubUsername}`, {
        headers,
        ...REVALIDATE,
      }),
      fetch(
        `https://api.github.com/users/${site.githubUsername}/repos?per_page=100&sort=pushed`,
        { headers, ...REVALIDATE }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos: {
      name: string;
      description: string | null;
      html_url: string;
      stargazers_count: number;
      language: string | null;
      pushed_at: string;
      fork: boolean;
    }[] = await reposRes.json();

    const ownRepos = repos.filter((r) => !r.fork);
    const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);

    const langCounts = new Map<string, number>();
    for (const repo of ownRepos) {
      if (repo.language) {
        langCounts.set(repo.language, (langCounts.get(repo.language) ?? 0) + 1);
      }
    }
    const topLanguages = [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const featured = new Set<string>(featuredRepos.map((n) => n.toLowerCase()));
    const recentRepos: GitHubRepo[] = ownRepos
      .filter((r) => featured.has(r.name.toLowerCase()))
      .slice(0, 4)
      .map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        pushedAt: r.pushed_at,
      }));

    return {
      totalStars,
      publicRepos: user.public_repos ?? ownRepos.length,
      followers: user.followers ?? 0,
      topLanguages,
      recentRepos,
    };
  } catch {
    return null;
  }
}

export interface LeetCodeStats {
  totalSolved: number;
  contestRating: number | null;
  topPercentage: number | null;
}

export async function getLeetCodeStats(): Promise<LeetCodeStats | null> {
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: "https://leetcode.com",
      },
      body: JSON.stringify({
        query: `
          query stats($username: String!) {
            matchedUser(username: $username) {
              submitStatsGlobal { acSubmissionNum { difficulty count } }
            }
            userContestRanking(username: $username) { rating topPercentage }
          }
        `,
        variables: { username: site.leetcode.handle },
      }),
      ...REVALIDATE,
    });

    if (!res.ok) return null;
    const json = await res.json();
    const solvedAll = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.find(
      (s: { difficulty: string; count: number }) => s.difficulty === "All"
    );
    if (!solvedAll) return null;

    const ranking = json?.data?.userContestRanking;
    return {
      totalSolved: solvedAll.count,
      contestRating: ranking?.rating ? Math.round(ranking.rating) : null,
      topPercentage: ranking?.topPercentage ?? null,
    };
  } catch {
    return null;
  }
}

export interface CodeforcesStats {
  rating: number;
  maxRating: number;
  rank: string;
}

export async function getCodeforcesStats(): Promise<CodeforcesStats | null> {
  try {
    const res = await fetch(
      `https://codeforces.com/api/user.info?handles=${site.codeforces.handle}`,
      REVALIDATE
    );
    if (!res.ok) return null;
    const json = await res.json();
    const user = json?.result?.[0];
    if (!user?.rating) return null;
    return {
      rating: user.rating,
      maxRating: user.maxRating,
      rank: user.rank,
    };
  } catch {
    return null;
  }
}
