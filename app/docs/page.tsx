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
      <h1>
        Everything you need to run a defensible collection.
      </h1>
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
        index="01"
      />

      <h2 id="setup">Setup</h2>
      <DocCard
        href="/docs/personal-setup"
        title="Personal setup"
        body="For solo operators collecting their own correspondence. Sign in, scope a collection, and ship."
        index="02"
      />
      <DocCard
        href="/docs/enterprise-setup"
        title="Enterprise setup"
        body="For operators collecting from another custodian in their tenant. Includes the admin consent flow and the Add-MailboxPermission step."
        index="03"
      />

      <h2 id="understand-the-output">Understand the output</h2>
      <DocCard
        href="/docs/output"
        title="Seven-folder export structure"
        body="What lands in each of the seven folders, in the order a reviewer should open them."
        index="04"
      />
      <DocCard
        href="/docs/chain-of-custody"
        title="Verify a collection"
        body="The step-by-step for re-hashing files and re-validating the RFC 3161 timestamp — no Krellix license required."
        index="05"
      />

      <h2 id="operate">Operate</h2>
      <DocCard
        href="/docs/troubleshooting"
        title="Troubleshooting"
        body="The errors operators actually hit: AADSTS90094, permission 403s, TSA timeouts, corrupted manifests, and how to resolve each."
        index="06"
      />
    </>
  );
}

function DocCard({
  href,
  title,
  body,
  index,
}: {
  href: string;
  title: string;
  body: string;
  index: string;
}) {
  return (
    <div className="not-prose my-5 border border-[var(--color-rule)] bg-[var(--color-bg)] transition-colors hover:border-[var(--color-ink)]">
      <Link href={href} className="group flex items-baseline gap-5 px-5 py-5 md:px-6 md:py-6">
        <span className="font-mono text-[length:var(--text-mono-sm)] tabular text-[color:var(--color-ink-subtle)]">
          §&nbsp;{index}
        </span>
        <div className="flex-1">
          <h3 className="font-display text-[1.25rem] leading-[1.25] tracking-[-0.008em] text-[color:var(--color-ink)] group-hover:text-[color:var(--color-accent)]">
            {title}
            <span aria-hidden="true" className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </h3>
          <p className="mt-1.5 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink-muted)]">
            {body}
          </p>
        </div>
      </Link>
    </div>
  );
}
