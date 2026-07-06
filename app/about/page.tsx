import type { Metadata } from "next";
import { GraduationCap, Briefcase } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FadeInOnScroll } from "@/components/motion";
import { timeline } from "@/data/experience";
import { skills } from "@/data/skills";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Prashant Agrawal: backend engineer, distributed systems and GenAI enthusiast, final-year B.Tech student at IIIT Allahabad.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <PageHeader
        eyebrow="about"
        title="A bit about me"
        description="Backend engineer by instinct, systems person by curiosity."
      />

      {/* Bio */}
      <FadeInOnScroll className="mt-10 max-w-3xl space-y-5 leading-relaxed text-muted">
        <p>
          I&apos;m currently a Software Engineer Intern at{" "}
          <span className="text-foreground">Locus.sh</span> in Bengaluru, where I
          own a config-driven automation pipeline for client onboarding on a
          platform that has powered over a billion deliveries. The pipeline took
          a 4+ hour manual workflow and turned it into a single API call, and I
          spent a good chunk of time making it fast: parallel entity migration,
          dependency-grouped execution, and idempotent upserts pushed throughput
          up by roughly 90%. I also built the real-time monitoring dashboard
          that watches it all, streaming live pipeline activity over
          Server-Sent Events.
        </p>
        <p>
          Before that, I interned at{" "}
          <span className="text-foreground">Bindisa Agritech</span>, building a
          real-time observability platform with Python, Streamlit, and
          Prometheus. Watching latency and error metrics across microservices
          cut debugging cycles by about 25%, and a self-service tool I designed
          let engineers manage service mesh policies from a UI instead of
          filing tickets to the platform team. That internship taught me how
          much leverage there is in tooling that removes humans from repetitive
          loops, a theme that keeps showing up in my work.
        </p>
        <p>
          My technical center of gravity is{" "}
          <span className="text-foreground">backend engineering</span> and{" "}
          <span className="text-foreground">distributed systems</span>, with a
          growing pull toward{" "}
          <span className="text-foreground">GenAI infrastructure</span>. The
          projects I&apos;m proudest of sit at that intersection: a self-healing
          system that recovers failed microservices in seconds, and Cortex, a
          knowledge extraction platform that turns scattered company data into
          workflows AI agents can safely execute. I care a lot about the
          unglamorous parts: idempotency, test coverage, failure modes, and
          what happens when things break at 3am.
        </p>
        <p>
          Outside of building things, I compete. I&apos;m a Knight on LeetCode,
          an Expert on Codeforces, and a 5-star coder on CodeChef, with 1000+
          problems solved across platforms. Competitive programming is where I
          first learned to reason carefully about complexity and edge cases,
          and it still sharpens how I write production code. I&apos;m in my
          final year of B.Tech at IIIT Allahabad (CGPA 8.57), and I was
          selected nationwide for Amazon ML Summer School 2024.
        </p>
      </FadeInOnScroll>

      {/* Timeline */}
      <section className="mt-20">
        <FadeInOnScroll>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            journey
          </h2>
        </FadeInOnScroll>
        <ol className="mt-8 space-y-0 border-l border-border">
          {timeline.map((item, i) => (
            <li key={item.title} className="relative pb-10 pl-8 last:pb-0">
              <FadeInOnScroll delay={i}>
                <span className="absolute -left-[13px] top-1 flex size-6 items-center justify-center rounded-full border border-border bg-card">
                  {item.kind === "work" ? (
                    <Briefcase className="size-3 text-accent" />
                  ) : (
                    <GraduationCap className="size-3 text-accent" />
                  )}
                </span>
                <p className="font-mono text-xs text-muted">{item.period}</p>
                <h3 className="mt-1 font-medium">{item.title}</h3>
                <p className="text-sm text-muted">{item.place}</p>
                {item.note && (
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                )}
              </FadeInOnScroll>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="mt-20">
        <FadeInOnScroll>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
            skills
          </h2>
        </FadeInOnScroll>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <FadeInOnScroll key={group.category} delay={i}>
              <div className="h-full rounded-lg border border-border bg-card p-5 transition-colors hover:border-accent/30">
                <h3 className="font-mono text-sm font-medium">{group.category}</h3>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md bg-accent-soft px-2 py-0.5 text-xs text-foreground/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeInOnScroll>
          ))}
        </div>
      </section>
    </div>
  );
}
