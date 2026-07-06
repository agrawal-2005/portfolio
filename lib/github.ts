import { site } from "@/data/site";

// GitHub fetchers. Same contract as lib/stats.ts: revalidate hourly,
// fail soft (return null) so a dead API never takes the page down.

const REVALIDATE = { next: { revalidate: 3600 } } as const;

function authHeaders(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export interface GitHubProfile {
  repos: number;
  stars: number;
  followers: number;
}

export async function getGitHubProfile(): Promise<GitHubProfile | null> {
  try {
    const username = site.githubUsername;
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: authHeaders(),
        ...REVALIDATE,
      }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&type=owner`,
        { headers: authHeaders(), ...REVALIDATE }
      ),
    ]);
    if (!userRes.ok || !reposRes.ok) return null;

    const user = await userRes.json();
    const repos = await reposRes.json();
    if (typeof user?.public_repos !== "number" || !Array.isArray(repos)) {
      return null;
    }

    const stars = repos.reduce(
      (sum: number, r: { stargazers_count?: number }) =>
        sum + (r.stargazers_count ?? 0),
      0
    );
    return { repos: user.public_repos, stars, followers: user.followers ?? 0 };
  } catch {
    return null;
  }
}

export interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
}

/** Last ~90 days of daily contributions. Requires GITHUB_TOKEN (GraphQL
 *  has no unauthenticated access); returns null without one. */
export async function getGitHubContributions(): Promise<
  ContributionDay[][] | null
> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

  try {
    const to = new Date();
    const from = new Date(to.getTime() - 90 * 24 * 60 * 60 * 1000);

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: `
          query contributions($login: String!, $from: DateTime!, $to: DateTime!) {
            user(login: $login) {
              contributionsCollection(from: $from, to: $to) {
                contributionCalendar {
                  weeks {
                    contributionDays { date contributionCount }
                  }
                }
              }
            }
          }
        `,
        variables: {
          login: site.githubUsername,
          from: from.toISOString(),
          to: to.toISOString(),
        },
      }),
      ...REVALIDATE,
    });
    if (!res.ok) return null;

    const json = await res.json();
    const weeks =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
    if (!Array.isArray(weeks) || weeks.length === 0) return null;

    return weeks.map(
      (w: { contributionDays: { date: string; contributionCount: number }[] }) =>
        w.contributionDays.map((d) => ({
          date: d.date,
          count: d.contributionCount,
        }))
    );
  } catch {
    return null;
  }
}
