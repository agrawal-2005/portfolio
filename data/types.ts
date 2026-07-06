export interface Project {
  slug: string;
  name: string;
  oneLiner: string;
  tagline: string;
  tech: string[];
  github: string;
  live?: string;
  highlights: string[];
  featured: boolean;
  detail: {
    problem: string;
    solution: string;
    stack: { name: string; role: string }[];
    decisions: { title: string; body: string }[];
    metrics: { label: string; value: string }[];
  };
}

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  tech: string[];
  logo?: string;
}

export interface TimelineItem {
  period: string;
  title: string;
  place: string;
  kind: "education" | "work";
  note?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Achievement {
  title: string;
  detail: string;
  year?: string;
  link?: string;
  logo?: string;
}

export interface CodingProfile {
  platform: string;
  handle: string;
  rank: string;
  url: string;
  highlights: string[];
}
