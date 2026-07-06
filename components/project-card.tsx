"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import type { Project } from "@/data/types";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{ duration: 0.5, delay: (index % 2) * 0.08 }}
      className="group relative flex h-full flex-col rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card-hover"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight">
          <Link href={`/projects/${project.slug}`} className="focus:outline-none">
            {/* Stretched link covers the card */}
            <span className="absolute inset-0" aria-hidden />
            {project.name}
          </Link>
        </h2>
        <ArrowUpRight className="size-4 shrink-0 text-muted transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
      </div>

      <p className="mt-2 text-sm leading-relaxed text-muted">{project.oneLiner}</p>

      {/* Hover-revealed highlights */}
      <ul className="mt-3 hidden space-y-1.5 text-sm text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
        {project.highlights.slice(0, 2).map((h) => (
          <li key={h} className="flex gap-2">
            <span className="mt-[7px] size-1 shrink-0 rounded-full bg-accent" aria-hidden />
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((t) => (
            <span
              key={t}
              className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        <div className="relative z-10 mt-4 flex items-center gap-4 text-sm">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon className="size-3.5" /> Code
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-accent"
            >
              <ExternalLink className="size-3.5" /> Live demo
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
