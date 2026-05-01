import { cn } from "@/lib/utils";

/**
 * Visual mock of a chain-of-custody manifest excerpt. Used on the
 * homepage as a concrete demonstration of the output — the single
 * most credibility-defining artifact Krellix produces. Not the real
 * file; the real file is a multi-kilobyte plain-text document
 * delivered inside the export.
 *
 * Every value here is deliberately plausible: TSA is a real public
 * authority, OData filter is the real query shape Graph accepts,
 * tenant ID uses the real GUID format Microsoft returns.
 */
export function ManifestSample({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] font-mono text-[length:var(--text-mono)] leading-[1.65]",
        "hairline-seal",
        className,
      )}
      aria-label="Example chain-of-custody manifest excerpt"
      role="img"
    >
      <div className="flex items-center justify-between border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--color-seal)]" aria-hidden="true" />
          <span className="text-[0.75rem] tracking-[0.08em] uppercase text-[color:var(--color-ink-muted)]">
            ChainOfCustody.txt
          </span>
        </div>
        <span className="text-[0.75rem] text-[color:var(--color-ink-subtle)]">excerpt</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-[color:var(--color-ink)]">
        <code>
{`═══════════════════════════════════════════════════════════════════════
  KRELLIX MAIL — CHAIN-OF-CUSTODY MANIFEST
═══════════════════════════════════════════════════════════════════════

OPERATOR & ENVIRONMENT
───────────────────────────────────────────────────────────────────────
  Operator Account:  j.rourke@millerscottlaw.com
  Operator Name:     Jordan Rourke
  Organization:      Miller Scott Law
  Tenant ID:         c1d7f2b0-9a3e-4b5c-8d71-2e4f60a81c93
  Machine Name:      ROURKE-DESKTOP
  Windows User:      jrourke
  Krellix Version:   3.1.0
  Collection Mode:   Enterprise

COLLECTION SCOPE
───────────────────────────────────────────────────────────────────────
  Custodian:         d.marquez@millerscottlaw.com (Diana Marquez)
  Date Range:        2025-09-01 — 2026-03-01 (UTC)
  Search Terms:      receivedDateTime ge 2025-09-01T00:00:00Z
                     and receivedDateTime lt 2026-03-01T00:00:00Z

  Total Messages:    4,182
  Attachments:       1,776
  Deduplicated:      312

  Started UTC:       2026-04-18T13:22:41Z
  Completed UTC:     2026-04-18T13:47:05Z

INTEGRITY
───────────────────────────────────────────────────────────────────────
  Hash Algorithm:    SHA-256 (primary), MD5 (compatibility)
  Files Hashed:      6,294 (every file in the export)
  Master Manifest:   See FileHashes.txt for the complete list

  This manifest will be SHA-256 hashed and submitted to a public
  RFC 3161 timestamp authority. The signed response is stored at
  ../07_TimestampMaterials/TimestampProof.tsr`}
        </code>
      </pre>
    </div>
  );
}
