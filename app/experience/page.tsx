import type { Metadata } from "next";
import { PageHeader } from "@/components/page-header";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { experience } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience of Prashant Agrawal: Software Engineer Intern at Locus.sh and Bindisa Agritech.",
};

export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <PageHeader
        eyebrow="experience"
        title="Where I've worked"
        description="Two internships so far, both spent building infrastructure that removes humans from repetitive loops. Click an entry to expand the details."
      />

      <div className="mt-12">
        <ExperienceTimeline entries={experience} />
      </div>
    </div>
  );
}
