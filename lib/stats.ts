import { site } from "@/data/site";

// All fetchers revalidate hourly and fail soft: a dead external API
// should never take a page down, so every function returns null on error.

const REVALIDATE = { next: { revalidate: 3600 } } as const;

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
