import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Projects by Prashant Agrawal: Cortex, a self-healing distributed system, WindowShop_AI, and a RAG medical chatbot.",
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <PageHeader
        eyebrow="projects"
        title="Things I've built"
        description="Systems I designed, built, tested, and shipped. Each one taught me something about reliability, latency, or what it takes to make ML useful. Click through for the engineering story behind each."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
