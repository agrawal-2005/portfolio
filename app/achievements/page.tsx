import type { Metadata } from "next";
import { Trophy, ExternalLink } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FadeInOnScroll } from "@/components/motion";
import { achievements, codingProfiles, problemsSolved } from "@/data/achievements";
import { getCodeforcesStats, getLeetCodeStats } from "@/lib/stats";

export const metadata: Metadata = {
  title: "Achievements",
  description:
    "Achievements of Prashant Agrawal: HackOn with Amazon Top 10, Flipkart Grid Top 30, LeetCode Knight, Codeforces Expert, CodeChef 5-star.",
};

export default async function AchievementsPage() {
  const [leetcode, codeforces] = await Promise.all([
    getLeetCodeStats(),
    getCodeforcesStats(),
  ]);

  const liveStats: Record<string, string[]> = {
    LeetCode: leetcode
      ? [
          `${leetcode.totalSolved} problems solved`,
          ...(leetcode.contestRating ? [`Contest rating ${leetcode.contestRating}`] : []),
        ]
      : [],
    Codeforces: codeforces
      ? [`Rating ${codeforces.rating} (peak ${codeforces.maxRating})`]
      : [],
  };

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <PageHeader
        eyebrow="achievements"
        title="Wins along the way"
        description={`Hackathons, national programs, and ${problemsSolved} coding problems solved across platforms.`}
      />

      {/* Hackathons & programs */}
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {achievements.map((a, i) => (
          <FadeInOnScroll key={a.title} delay={i}>
            <div className="flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/30">
              <div className="flex items-center gap-2">
                <Trophy className="size-4 text-accent" />
                {a.year && (
                  <span className="font-mono text-xs text-muted">{a.year}</span>
                )}
              </div>
              <h2 className="mt-3 font-semibold tracking-tight">{a.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{a.detail}</p>
            </div>
          </FadeInOnScroll>
        ))}
      </div>

      {/* Competitive programming */}
      <section className="mt-16">
        <FadeInOnScroll>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            competitive programming
          </h2>
        </FadeInOnScroll>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {codingProfiles.map((profile, i) => (
            <FadeInOnScroll key={profile.platform} delay={i}>
              <a
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full flex-col rounded-lg border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{profile.platform}</h3>
                  <ExternalLink className="size-3.5 text-muted transition-colors group-hover:text-accent" />
                </div>
                <p className="mt-1 font-mono text-xs text-muted">
                  @{profile.handle}
                </p>
                <p className="mt-3 inline-flex w-fit rounded-md bg-accent-soft px-2.5 py-1 font-mono text-sm font-semibold text-accent">
                  {profile.rank}
                </p>
                {(liveStats[profile.platform] ?? []).length > 0 && (
                  <p className="mt-2 font-mono text-xs text-muted">
                    <span className="mr-1.5 inline-block size-1.5 animate-pulse rounded-full bg-accent align-middle" aria-hidden />
                    {liveStats[profile.platform].join(" · ")}
                  </p>
                )}
                <ul className="mt-3 space-y-1.5">
                  {profile.highlights.map((h) => (
                    <li key={h} className="flex gap-2 text-sm text-muted">
                      <span
                        className="mt-[8px] size-1 shrink-0 rounded-full bg-accent"
                        aria-hidden
                      />
                      {h}
                    </li>
                  ))}
                </ul>
              </a>
            </FadeInOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
