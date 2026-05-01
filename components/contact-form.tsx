"use client";

import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Honest contact form for pilot inquiries. There is no backend
 * provisioning system; the form composes a mailto: link that opens
 * the user's email client with a prefilled message to support@.
 * That keeps the path between a prospect and the support inbox
 * direct and obvious — no submit-and-pray.
 */
export function ContactForm({ className }: { className?: string }) {
  const [submitted, setSubmitted] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const subject = "Krellix pilot inquiry";
    const body = [
      `Name: ${data.get("name") || ""}`,
      `Email: ${data.get("email") || ""}`,
      `Organization: ${data.get("organization") || ""}`,
      ``,
      `Use case:`,
      `${data.get("usecase") || ""}`,
    ].join("\n");

    const href = `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        className={cn(
          "rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-6 md:p-8",
          className,
        )}
      >
        <p className="eyebrow">Email opened</p>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] tracking-[-0.015em] text-[color:var(--color-ink)]">
          Send the message and I&apos;ll reply within one business day.
        </h3>
        <p className="mt-3 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
          If your email client didn&apos;t open, write to{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
          >
            {siteConfig.contact.email}
          </a>{" "}
          directly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("space-y-5", className)} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>
      <Field label="Organization" name="organization" autoComplete="organization" />
      <Field
        label="Briefly, what would you use Krellix for?"
        name="usecase"
        as="textarea"
        hint="A sentence or two about the matter or use case is enough."
      />
      <div className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)]">
          This opens your email client with a prefilled message to{" "}
          <span className="font-mono">{siteConfig.contact.email}</span>.
        </p>
        <Button type="submit" variant="primary" size="lg" arrow>
          Compose email
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  as,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  as?: "textarea";
  hint?: string;
}) {
  const id = `contact-${name}`;
  const common = cn(
    "block w-full rounded-sm border border-[var(--color-border-strong)] bg-[var(--color-bg)] px-3.5 py-2.5 text-[length:var(--text-body)] text-[color:var(--color-ink)] transition-colors",
    "placeholder:text-[color:var(--color-ink-subtle)]",
    "focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]",
  );
  return (
    <label htmlFor={id} className="block space-y-1.5">
      <span className="flex items-baseline justify-between text-[length:var(--text-body-sm)] font-medium text-[color:var(--color-ink)]">
        <span>
          {label}
          {required ? <span className="ml-1 text-[color:var(--color-accent)]">*</span> : null}
        </span>
        {hint ? (
          <span className="font-normal text-[color:var(--color-ink-subtle)]">{hint}</span>
        ) : null}
      </span>
      {as === "textarea" ? (
        <textarea id={id} name={name} rows={4} className={common} />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          className={common}
        />
      )}
    </label>
  );
}
