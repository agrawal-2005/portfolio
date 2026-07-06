import type { ContributionDay, GitHubProfile } from "@/lib/github";

// Server-rendered GitHub stats + 3-month contribution heatmap.
// Tooltips are pure CSS (group-hover), no client JS needed.

const WEEK_COLUMNS = 12;

/** 5 intensity levels: empty uses the card-hover tone, the rest are
 *  shades of the site's green accent from muted to bright. */
function levelClass(count: number, max: number): string {
  if (count === 0) return "bg-card-hover";
  const ratio = count / Math.max(max, 1);
  if (ratio <= 0.25) return "bg-accent/25";
  if (ratio <= 0.5) return "bg-accent/50";
  if (ratio <= 0.75) return "bg-accent/75";
  return "bg-accent";
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function Heatmap({ weeks }: { weeks: ContributionDay[][] }) {
  const visible = weeks.slice(-WEEK_COLUMNS);
  const max = Math.max(
    1,
    ...visible.flat().map((d) => d.count)
  );

  return (
    <div>
      <div className="flex gap-[2px]">
        {visible.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-[2px]">
            {week.map((day) => (
              <div key={day.date} className="group relative">
                <div
                  className={`size-[10px] rounded-[2px] ${levelClass(day.count, max)}`}
                />
                <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 font-mono text-[11px] text-foreground shadow-sm group-hover:block">
                  {formatDate(day.date)}: {day.count}{" "}
                  {day.count === 1 ? "contribution" : "contributions"}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-1.5 font-mono text-[11px] text-muted">
        <span>Less</span>
        <span className="size-[10px] rounded-[2px] bg-card-hover" />
        <span className="size-[10px] rounded-[2px] bg-accent/25" />
        <span className="size-[10px] rounded-[2px] bg-accent/50" />
        <span className="size-[10px] rounded-[2px] bg-accent/75" />
        <span className="size-[10px] rounded-[2px] bg-accent" />
        <span>More</span>
      </div>
    </div>
  );
}

export function GitHubActivity({
  profile,
  contributions,
}: {
  profile: GitHubProfile | null;
  contributions: ContributionDay[][] | null;
}) {
  // Fail soft: nothing to show means no section at all.
  if (!profile && !contributions) return null;

  return (
    <section
      aria-label="GitHub activity"
      className="rounded-lg border border-border bg-card p-6"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          github activity
        </h2>
        {profile && (
          <p className="font-mono text-xs text-muted">
            {profile.repos} repos&ensp;&middot;&ensp;{profile.stars} stars
            &ensp;&middot;&ensp;{profile.followers} followers
          </p>
        )}
      </div>

      {contributions && (
        <div className="mt-5 overflow-x-auto">
          <p className="mb-3 text-sm text-muted">Last 3 months of commits</p>
          <Heatmap weeks={contributions} />
        </div>
      )}
    </section>
  );
}
