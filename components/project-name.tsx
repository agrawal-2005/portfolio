/**
 * Renders a project's display name. "Cortex" gets its brand wordmark:
 * lowercase "cortex", medium weight, -1.5px tracking, final "x" in
 * Cortex purple (#6C5CE7). Everything else renders as plain text.
 * Mirrors Cortex/website/src/components/Wordmark.jsx.
 */
export function ProjectName({ name }: { name: string }) {
  if (name !== "Cortex") return <>{name}</>;
  return (
    <span className="font-medium" style={{ letterSpacing: "-1.5px" }}>
      corte<span style={{ color: "#6C5CE7" }}>x</span>
    </span>
  );
}
