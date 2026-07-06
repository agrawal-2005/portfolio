import { Star } from "lucide-react";
import { FadeInOnScroll } from "@/components/motion";
import { GitHubIcon } from "@/components/icons";
import { getGitHubStats } from "@/lib/stats";
import { site } from "@/data/site";

function timeAgo(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export async function GitHubActivity() {
  const stats = await getGitHubStats();
  if (!stats) return null; // fail soft: no section if the API is down

  return (
    <section className="relative mx-auto max-w-5xl px-6 pb-24">
      <FadeInOnScroll>
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            live from github
          </h2>
          <div className="flex gap-6 font-mono text-xs text-muted">
            <span>{stats.publicRepos} repos</span>
            <span>{stats.totalStars} stars</span>
            <span>{stats.followers} followers</span>
          </div>
        </div>
      </FadeInOnScroll>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stats.recentRepos.map((repo, i) => (
          <FadeInOnScroll key={repo.name} delay={i}>
            <a
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-mono text-sm font-medium transition-colors group-hover:text-accent">
                  {repo.name}
                </span>
                <span className="shrink-0 font-mono text-xs text-muted">
                  {timeAgo(repo.pushedAt)}
                </span>
              </div>
              {repo.description && (
                <p className="mt-1.5 line-clamp-2 text-sm text-muted">
                  {repo.description}
                </p>
              )}
              <div className="mt-auto flex items-center gap-4 pt-3 text-xs text-muted">
                {repo.language && (
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-accent" aria-hidden />
                    {repo.language}
                  </span>
                )}
                <span className="inline-flex items-center gap-1">
                  <Star className="size-3" /> {repo.stars}
                </span>
              </div>
            </a>
          </FadeInOnScroll>
        ))}
      </div>

      <FadeInOnScroll delay={2}>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {stats.topLanguages.map((lang) => (
              <span
                key={lang.name}
                className="rounded-md bg-accent-soft px-2 py-0.5 font-mono text-[11px] text-foreground/80"
              >
                {lang.name} × {lang.count}
              </span>
            ))}
          </div>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon className="size-4" /> @{site.githubUsername}
          </a>
        </div>
      </FadeInOnScroll>
    </section>
  );
}
