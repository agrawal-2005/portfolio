import type { SkillCategory } from "./types";

export const skills: SkillCategory[] = [
  {
    category: "Languages",
    skills: ["C++", "Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "WebSockets"],
  },
  {
    category: "GenAI & ML",
    skills: ["PyTorch", "LangChain", "RAG", "LLMs", "HuggingFace", "Pinecone", "ChromaDB", "Prompt Engineering"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite"],
  },
  {
    category: "DevOps & Infra",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux", "Prometheus", "New Relic"],
  },
  {
    category: "Core",
    skills: ["DSA", "System Design", "OS", "Computer Networks", "OOP"],
  },
];
