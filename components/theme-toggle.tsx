"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const emptySubscribe = () => () => {};

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // True after hydration; false during SSR so server and client HTML match.
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!mounted) {
    return <div className="size-9 rounded-md border border-border" aria-hidden />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex size-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/50 hover:text-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
