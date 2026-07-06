import { FadeIn } from "@/components/motion";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <FadeIn>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 max-w-2xl leading-relaxed text-muted">{description}</p>
      )}
    </FadeIn>
  );
}
