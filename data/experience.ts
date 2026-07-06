import type { ExperienceEntry, TimelineItem } from "./types";

export const experience: ExperienceEntry[] = [
  {
    company: "Locus.sh",
    logo: "/logos/locus.svg",
    role: "Software Engineer Intern",
    period: "Jan 2026 - Present",
    location: "Bengaluru, India",
    summary:
      "Building automation infrastructure for client onboarding on a logistics platform that has powered 1B+ deliveries.",
    bullets: [
      "Owned end-to-end a scalable, config-driven automation pipeline (Node.js, TypeScript, AWS) for client onboarding, cutting a 4+ hour manual workflow down to a single API call.",
      "Improved pipeline throughput by ~90% with a modular architecture: parallel entity migration, dependency-grouped execution, and idempotent upserts with change detection.",
      "Built a real-time monitoring dashboard using Server-Sent Events (SSE) with per-user log isolation, using telemetry and metrics to track live pipeline activity.",
    ],
    tech: ["Node.js", "TypeScript", "AWS", "SSE"],
  },
  {
    company: "Bindisa Agritech",
    logo: "/logos/bindisa.png",
    role: "Software Engineer Intern",
    period: "May 2025 - Jul 2025",
    location: "Remote",
    summary:
      "Built observability tooling that helped the platform team see into their microservices and stop configuring things by hand.",
    bullets: [
      "Developed a real-time observability platform using Python, Streamlit, and Prometheus to track latency and error metrics across microservices, reducing debugging cycles by 25%.",
      "Designed a self-service tool that lets engineers manage service mesh policies through a UI without writing code, eliminating manual configuration work for the platform team.",
    ],
    tech: ["Python", "Streamlit", "Prometheus"],
  },
];

export const timeline: TimelineItem[] = [
  {
    period: "Jan 2026 - Present",
    title: "Software Engineer Intern, Locus.sh",
    place: "Bengaluru, India",
    kind: "work",
    note: "Automation pipelines for a 1B+ deliveries logistics platform.",
  },
  {
    period: "May 2025 - Jul 2025",
    title: "Software Engineer Intern, Bindisa Agritech",
    place: "Remote",
    kind: "work",
    note: "Observability platform and self-service infra tooling.",
  },
  {
    period: "Nov 2022 - Present",
    title: "B.Tech, Electronics and Communication Engineering",
    place: "IIIT Allahabad, Prayagraj",
    kind: "education",
    note: "CGPA 8.57. Final year.",
  },
];
