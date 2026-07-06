import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { GitHubActivity } from "@/components/github-activity";
import { FadeIn } from "@/components/motion";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

const stats = [
  { value: "2", label: "internships" },
  { value: "4+", label: "shipped projects" },
  { value: "1B+", label: "deliveries impacted" },
  { value: "1000+", label: "problems solved" },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden />

      <section className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-6 py-24">
        <FadeIn>
          <p className="font-mono text-sm text-accent">
            hey, I&apos;m
          </p>
        </FadeIn>

        <FadeIn delay={1}>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight sm:text-7xl">
            Prashant Agrawal
          </h1>
        </FadeIn>

        <FadeIn delay={2}>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">
            Software Engineer building{" "}
            <span className="text-foreground">distributed systems</span>,{" "}
            <span className="text-foreground">GenAI infrastructure</span>, and
            things that scale.
          </p>
        </FadeIn>

        <FadeIn delay={3}>
          <p className="mt-6 max-w-xl leading-relaxed text-muted">
            Final-year B.Tech student at IIIT Allahabad, currently interning at
            Locus.sh where my code touches a platform that has handled over a
            billion deliveries. I like backend problems, reliability engineering,
            and making LLMs actually useful in production.
          </p>
        </FadeIn>

        <FadeIn delay={4}>
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl font-semibold text-accent">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs uppercase tracking-wider text-muted">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </FadeIn>

        <FadeIn delay={5}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:text-zinc-950"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/50 hover:bg-card-hover"
            >
              Get in Touch
            </Link>

            <div className="ml-2 flex items-center gap-4">
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-muted transition-colors hover:text-accent"
              >
                <GitHubIcon className="size-5" />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-muted transition-colors hover:text-accent"
              >
                <LinkedInIcon className="size-5" />
              </a>
              <a
                href={`mailto:${site.email}`}
                aria-label="Email"
                className="text-muted transition-colors hover:text-accent"
              >
                <Mail className="size-5" />
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      <Suspense fallback={null}>
        <GitHubActivity />
      </Suspense>
    </div>
  );
}
