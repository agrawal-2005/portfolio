"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MapPin } from "lucide-react";
import type { ExperienceEntry } from "@/data/types";

export function ExperienceTimeline({ entries }: { entries: ExperienceEntry[] }) {
  const [expanded, setExpanded] = useState<string | null>(entries[0]?.company ?? null);

  return (
    <ol className="border-l border-border">
      {entries.map((entry, i) => {
        const isOpen = expanded === entry.company;
        return (
          <motion.li
            key={entry.company}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-64px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="relative pb-10 pl-8 last:pb-0"
          >
            <span
              className="absolute -left-[7px] top-2 size-3.5 rounded-full border-2 border-accent bg-background"
              aria-hidden
            />

            <button
              type="button"
              onClick={() => setExpanded(isOpen ? null : entry.company)}
              aria-expanded={isOpen}
              className="group w-full rounded-lg border border-border bg-card p-5 text-left transition-colors hover:border-accent/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-xs text-muted">{entry.period}</p>
                  <h2 className="mt-1 text-lg font-semibold tracking-tight">
                    {entry.company}
                  </h2>
                  <p className="text-sm text-accent">{entry.role}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted">
                    <MapPin className="size-3" /> {entry.location}
                  </p>
                </div>
                <ChevronDown
                  className={`mt-1 size-4 shrink-0 text-muted transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>

              <p className="mt-3 text-sm leading-relaxed text-muted">
                {entry.summary}
              </p>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <ul className="mt-4 space-y-2.5 border-t border-border pt-4">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex gap-2.5 text-sm leading-relaxed text-muted">
                          <span
                            className="mt-[8px] size-1 shrink-0 rounded-full bg-accent"
                            aria-hidden
                          />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {entry.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-md border border-border px-2 py-0.5 font-mono text-[11px] text-muted"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.li>
        );
      })}
    </ol>
  );
}
