import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, ImageIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { FadeIn, FadeInOnScroll } from "@/components/motion";
import { getProject, projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <FadeIn>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="size-4" /> All projects
        </Link>

        <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {project.tagline}
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          {project.name}
        </h1>
        <p className="mt-4 leading-relaxed text-muted">{project.oneLiner}</p>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:bg-card-hover"
          >
            <GitHubIcon className="size-4" /> View source
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 text-sm font-medium text-white transition-transform hover:scale-[1.02] dark:text-zinc-950"
            >
              <ExternalLink className="size-4" /> Live demo
            </a>
          )}
        </div>
      </FadeIn>

      {/* Metrics strip */}
      <FadeInOnScroll className="mt-12">
        <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
          {project.detail.metrics.map((m) => (
            <div key={m.label} className="bg-card p-4">
              <dt className="text-xs uppercase tracking-wider text-muted">
                {m.label}
              </dt>
              <dd className="mt-1 font-mono text-lg font-semibold text-accent">
                {m.value}
              </dd>
            </div>
          ))}
        </dl>
      </FadeInOnScroll>

      {/* Screenshot placeholder */}
      <FadeInOnScroll className="mt-12">
        <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-card">
          <div className="text-center text-muted">
            <ImageIcon className="mx-auto size-8" />
            <p className="mt-2 text-sm">Screenshots and demo GIFs coming soon</p>
          </div>
        </div>
      </FadeInOnScroll>

      <FadeInOnScroll className="mt-14">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          the problem
        </h2>
        <p className="mt-4 leading-relaxed text-muted">{project.detail.problem}</p>
      </FadeInOnScroll>

      <FadeInOnScroll className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          the solution
        </h2>
        <p className="mt-4 leading-relaxed text-muted">{project.detail.solution}</p>
      </FadeInOnScroll>

      <FadeInOnScroll className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          tech stack
        </h2>
        <ul className="mt-4 divide-y divide-border rounded-lg border border-border bg-card">
          {project.detail.stack.map((item) => (
            <li key={item.name} className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="w-44 shrink-0 font-mono text-sm font-medium">
                {item.name}
              </span>
              <span className="text-sm text-muted">{item.role}</span>
            </li>
          ))}
        </ul>
      </FadeInOnScroll>

      <FadeInOnScroll className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          key engineering decisions
        </h2>
        <div className="mt-4 space-y-6">
          {project.detail.decisions.map((d) => (
            <div key={d.title}>
              <h3 className="font-medium">{d.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d.body}</p>
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </div>
  );
}
