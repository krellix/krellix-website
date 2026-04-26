"use client";

import * as React from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site-config";

/**
 * Trial signup form. Submits to an email endpoint (no backend wired
 * yet — falls back to a mailto: generated link). The first cut is
 * intentionally simple: one screen, no account creation. The
 * product is a desktop app, so a signup "account" is an artifact
 * of SaaS convention, not a requirement here. The operator gets a
 * download link and a license file by email.
 *
 * The form is honest about what's coming: the real build, not a
 * capability-limited demo. That honesty is part of the pitch.
 */
export function TrialForm({ className }: { className?: string }) {
  const [state, setState] = React.useState<"idle" | "submitting" | "done" | "error">("idle");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setState("submitting");
    setErrorMessage(null);

    const endpoint = process.env.NEXT_PUBLIC_TRIAL_ENDPOINT;
    if (!endpoint) {
      const subject = encodeURIComponent(`Krellix trial request — ${data.get("company") || "no company"}`);
      const body = encodeURIComponent(
        [
          `Name: ${data.get("name")}`,
          `Email: ${data.get("email")}`,
          `Company: ${data.get("company")}`,
          `Role: ${data.get("role")}`,
          `Mode of interest: ${data.get("mode")}`,
          ``,
          `Notes:`,
          `${data.get("notes") || "(none)"}`,
        ].join("\n"),
      );
      window.location.href = `mailto:${siteConfig.contact.salesEmail}?subject=${subject}&body=${body}`;
      setState("done");
      return;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setState("done");
      form.reset();
    } catch (err) {
      setState("error");
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    }
  }

  if (state === "done") {
    return (
      <div
        className={cn(
          "rounded-md border border-[var(--color-seal-soft)] bg-[var(--color-seal-tint)] p-6 md:p-8",
          className,
        )}
      >
        <p className="eyebrow">Received</p>
        <h3 className="mt-3 font-display text-[clamp(1.5rem,2.5vw,1.875rem)] leading-[1.15] tracking-[-0.015em] text-[color:var(--color-ink)]">
          Your trial link is on its way.
        </h3>
        <p className="mt-3 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
          You&apos;ll get a download link and a 14-day license file at the address
          you provided, usually within a business day. If you don&apos;t see it,
          check spam — and if it&apos;s still not there, email{" "}
          <a
            href={`mailto:${siteConfig.contact.salesEmail}`}
            className="text-[color:var(--color-ink)] underline decoration-[var(--color-border-strong)] underline-offset-2 hover:text-[color:var(--color-accent)]"
          >
            {siteConfig.contact.salesEmail}
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
          label="Work email"
          name="email"
          type="email"
          required
          autoComplete="email"
          hint="License file is sent here."
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Company or firm" name="company" autoComplete="organization" />
        <Field label="Your role" name="role" hint="Attorney, compliance, HR, IT." />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-[length:var(--text-body-sm)] font-medium text-[color:var(--color-ink)]">
          Which mode do you expect to use?
        </legend>
        <div className="grid gap-3 md:grid-cols-2">
          <RadioCard
            name="mode"
            value="Personal"
            label="Personal"
            description="Collecting my own correspondence with a named contact."
            defaultChecked
          />
          <RadioCard
            name="mode"
            value="Enterprise"
            label="Enterprise"
            description="Collecting from another user's mailbox, OneDrive, or SharePoint."
          />
        </div>
      </fieldset>

      <Field
        label="Anything you want to tell me about the matter?"
        name="notes"
        as="textarea"
        hint="Optional. A sentence on timing or volume helps me prioritize."
      />

      <div className="flex flex-col items-start gap-3 pt-2 md:flex-row md:items-center md:justify-between">
        <p className="text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)]">
          Free for {siteConfig.pricing.trialDays} days. No credit card. Real build — same
          binary trial users and paying users run.
        </p>
        <Button type="submit" variant="primary" size="lg" arrow disabled={state === "submitting"}>
          {state === "submitting" ? "Sending…" : "Request trial"}
        </Button>
      </div>

      {state === "error" ? (
        <p className="text-[length:var(--text-body-sm)] text-red-700">
          Something went wrong{errorMessage ? ` (${errorMessage})` : ""}. Email{" "}
          <a
            href={`mailto:${siteConfig.contact.salesEmail}`}
            className="underline underline-offset-2"
          >
            {siteConfig.contact.salesEmail}
          </a>{" "}
          and I&apos;ll send you a link directly.
        </p>
      ) : null}
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
  const id = `trial-${name}`;
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
        <textarea id={id} name={name} rows={3} className={common} />
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

function RadioCard({
  name,
  value,
  label,
  description,
  defaultChecked,
}: {
  name: string;
  value: string;
  label: string;
  description: string;
  defaultChecked?: boolean;
}) {
  const id = `${name}-${value}`;
  return (
    <label
      htmlFor={id}
      className="group cursor-pointer rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] p-4 transition-colors hover:border-[var(--color-border-strong)] has-[:checked]:border-[var(--color-accent)] has-[:checked]:bg-[var(--color-surface)]"
    >
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="radio"
          name={name}
          value={value}
          defaultChecked={defaultChecked}
          className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
        />
        <div>
          <p className="font-medium text-[color:var(--color-ink)]">{label}</p>
          <p className="mt-1 text-[length:var(--text-body-sm)] leading-[1.5] text-[color:var(--color-ink-muted)]">
            {description}
          </p>
        </div>
      </div>
    </label>
  );
}
