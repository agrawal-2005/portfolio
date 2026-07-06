"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-tight transition-colors hover:text-accent"
          onClick={() => setOpen(false)}
        >
          pa<span className="text-accent">.</span>dev
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-md border border-border text-muted hover:text-foreground"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-border px-6 pb-4 pt-2 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block rounded-md px-3 py-2 text-sm ${
                pathname.startsWith(link.href)
                  ? "bg-accent-soft text-accent"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
