import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          © {new Date().getFullYear()} {site.name}. Built with Next.js, deployed on
          Vercel.
        </p>
        <div className="flex items-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <GitHubIcon className="size-4" />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <LinkedInIcon className="size-4" />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail className="size-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
