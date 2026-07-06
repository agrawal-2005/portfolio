"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });

      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please email me directly.");
        setStatus("error");
      }
    } catch {
      setError("Network error. Please email me directly.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent-soft p-6 text-center">
        <p className="font-medium">Message sent!</p>
        <p className="mt-1 text-sm text-muted">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  const inputClasses =
    "w-full rounded-md border border-border bg-card px-3.5 py-2.5 text-sm placeholder:text-muted/60 focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            name="name"
            required
            maxLength={100}
            placeholder="Your name"
            className={inputClasses}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="What's on your mind?"
          className={inputClasses}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-60 dark:text-zinc-950"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="size-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="size-4" /> Send message
          </>
        )}
      </button>
    </form>
  );
}
