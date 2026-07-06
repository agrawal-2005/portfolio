import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start justify-center px-6 py-32">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-3 text-muted">
        Maybe it moved, maybe it never existed. Either way, home is that way.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm transition-colors hover:border-accent/50 hover:bg-card-hover"
      >
        <ArrowLeft className="size-4" /> Back home
      </Link>
    </div>
  );
}
