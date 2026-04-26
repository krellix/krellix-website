import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Set up Krellix, run a collection, understand the output, and verify a chain of custody. Full product documentation.",
  alternates: { canonical: "/docs" },
};

export default function DocsIndexPage() {
  return (
    <>
      <p className="eyebrow">Documentation</p>
      <h1>Everything you need to run a defensible collection.</h1>
      <p>
        These pages cover the full life of a Krellix collection: signing in, scoping the
        query, running the export, understanding what lands on disk, and verifying the
        chain of custody. If something is missing,{" "}
        <a href="mailto:support@krellix.app">tell us</a> — documentation gaps are a bug.
      </p>

      <h2 id="start-here">Start here</h2>
      <DocCard
        href="/docs/getting-started"
        title="Getting started"
        body="What Krellix does, what the two modes are, and the fifteen-minute path from download to first export."
      />

      <h2 id="setup">Setup</h2>
      <DocCard
        href="/docs/personal-setup"
        title="Personal setup"
        body="For solo operators collecting their own correspondence. Sign in, scope a collection, and ship."
      />
      <DocCard
        href="/docs/enterprise-setup"
        title="Enterprise setup"
        body="For operators collecting from another custodian in their tenant. Includes the admin consent flow and the Add-MailboxPermission step."
      />

      <h2 id="understand-the-output">Understand the output</h2>
      <DocCard
        href="/docs/output"
        title="Seven-folder export structure"
        body="What lands in each of the seven folders, in the order a reviewer should open them."
      />
      <DocCard
        href="/docs/chain-of-custody"
        title="Verify a collection"
        body="The step-by-step for re-hashing files and re-validating the RFC 3161 timestamp — no Krellix license required."
      />

      <h2 id="operate">Operate</h2>
      <DocCard
        href="/docs/troubleshooting"
        title="Troubleshooting"
        body="The errors operators actually hit: AADSTS90094, permission 403s, TSA timeouts, corrupted manifests, and how to resolve each."
      />
    </>
  );
}

function DocCard({ href, title, body }: { href: string; title: string; body: string }) {
  return (
    <div className="not-prose my-5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-6 transition-colors hover:border-[var(--color-border-strong)]">
      <Link href={href} className="group block">
        <h3 className="font-display text-[1.25rem] leading-[1.25] tracking-[-0.008em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)]">
          {title}
          <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-0.5">→</span>
        </h3>
        <p className="mt-2 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink-muted)]">
          {body}
        </p>
      </Link>
    </div>
  );
}
