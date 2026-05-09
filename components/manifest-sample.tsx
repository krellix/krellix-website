import { cn } from "@/lib/utils";

/**
 * Visual mock of a chain-of-custody manifest excerpt. Used on the
 * homepage as a concrete demonstration of the output — the single
 * most credibility-defining artifact Krellix produces.
 */
export function ManifestSample({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      {/* Top-right "Verified" stamp */}
      <div
        aria-hidden="true"
        className="absolute -top-3 -right-3 z-10 select-none"
      >
        <span className="stamp text-[color:var(--color-seal-deep)] bg-[var(--color-seal-paper)]/85">
          ✓ Sealed · 2026·V·09
        </span>
      </div>

      <div
        className={cn(
          "relative overflow-hidden border border-[var(--color-rule)] bg-[var(--color-bg)] font-mono text-[length:var(--text-mono)] leading-[1.62] shadow-[0_18px_40px_-28px_rgba(20,23,28,0.25)] grain",
        )}
        aria-label="Example chain-of-custody manifest excerpt"
        role="img"
      >
        {/* Title-bar with file name and seal dot */}
        <div className="flex items-center justify-between border-b border-[var(--color-border-strong)] bg-[var(--color-bg-deep)] px-5 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-[var(--color-seal)]" />
              <span className="absolute inset-[-2px] rounded-full border border-[var(--color-seal)] opacity-30" />
            </span>
            <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--color-ink)]">
              ChainOfCustody.txt
            </span>
          </div>
          <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
            Excerpt · folio 06 / 09
          </span>
        </div>

        {/* Sealed gold underline */}
        <div className="hairline-seal" />

        <pre className="overflow-x-auto px-6 py-6 text-[color:var(--color-ink)]">
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

        {/* Bottom credit line */}
        <div className="flex items-center justify-between border-t border-[var(--color-border-strong)] bg-[var(--color-bg-deep)] px-5 py-2.5">
          <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
            DigiCert TSA · RFC 3161
          </span>
          <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
            14:47:05Z
          </span>
        </div>
      </div>
    </div>
  );
}
