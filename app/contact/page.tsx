import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { FadeInOnScroll } from "@/components/motion";
import { ContactForm } from "@/components/contact-form";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prashant Agrawal for roles, collaborations, or interesting problems.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <PageHeader
        eyebrow="contact"
        title="Get in touch"
        description="Whether it's a role, a collaboration, or just an interesting systems problem, my inbox is open. I usually reply within a day."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-5">
        <FadeInOnScroll className="lg:col-span-3">
          <ContactForm />
        </FadeInOnScroll>

        <FadeInOnScroll delay={1} className="lg:col-span-2">
          <div className="space-y-5 rounded-lg border border-border bg-card p-6">
            <a
              href={`mailto:${site.email}`}
              className="group flex items-center gap-3 text-sm"
            >
              <Mail className="size-4 text-accent" />
              <span className="text-muted transition-colors group-hover:text-accent">
                {site.email}
              </span>
            </a>
            <a href={`tel:${site.phone}`} className="group flex items-center gap-3 text-sm">
              <Phone className="size-4 text-accent" />
              <span className="text-muted transition-colors group-hover:text-accent">
                {site.phone}
              </span>
            </a>
            <p className="flex items-center gap-3 text-sm">
              <MapPin className="size-4 text-accent" />
              <span className="text-muted">{site.location}</span>
            </p>

            <div className="border-t border-border pt-5">
              <p className="text-xs uppercase tracking-wider text-muted">
                Elsewhere
              </p>
              <div className="mt-3 flex items-center gap-4">
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
              </div>
            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </div>
  );
}
