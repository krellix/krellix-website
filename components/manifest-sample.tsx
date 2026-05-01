import { cn } from "@/lib/utils";

/**
 * Visual mock of a chain-of-custody manifest excerpt. Used on the
 * homepage as a concrete demonstration of the output — the single
 * most credibility-defining artifact Krellix produces. Not the real
 * file; the real file is a multi-kilobyte JSON document delivered
 * inside the export.
 *
 * Every value here is deliberately plausible: hashes are correct
 * length, TSA is a real public authority, KQL is the real query
 * shape Graph accepts, Graph message ID uses the real base64url
 * format Microsoft returns.
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
            ChainOfCustody.json
          </span>
        </div>
        <span className="text-[0.75rem] text-[color:var(--color-ink-subtle)]">excerpt</span>
      </div>
      <pre className="overflow-x-auto px-5 py-5 text-[color:var(--color-ink)]">
        <code>
{`{
  "manifestVersion":  "3.1",
  "product":          "Krellix Mail 3.1.0",
  "collectionId":     "krx-2026-0418-a41c9e",
  "startedUtc":       "2026-04-18T13:22:41Z",
  "completedUtc":     "2026-04-18T13:47:05Z",
  "operator": {
    "upn":            "j.rourke@millerscottlaw.com",
    "displayName":    "Jordan Rourke",
    "oid":            "f8a1d6c2-7b39-4d5e-a0f2-3c71b2e94a6d"
  },
  "tenant": {
    "tenantId":       "c1d7f2b0-9a3e-4b5c-8d71-2e4f60a81c93",
    "tenantDomain":   "millerscottlaw.onmicrosoft.com"
  },
  "custodian": {
    "upn":            "d.marquez@millerscottlaw.com",
    "displayName":    "Diana Marquez",
    "mailboxType":    "UserMailbox"
  },
  "query": {
    "mode":           "Enterprise",
    "endpoint":       "/users/d.marquez@millerscottlaw.com/messages",
    "kqlFilter":      "receivedDateTime ge 2025-09-01T00:00:00Z and receivedDateTime lt 2026-03-01T00:00:00Z"
  },
  "counts": {
    "messages":       4182,
    "attachments":    1776,
    "deduplicated":   312
  },
  "firstItem": {
    "graphId":        "AAMkAGRhYzkyMTk4LWY4OWMtNDA3OC1hY2UxLTA0ZWUzMjE1ZTRjMABGAAAAAAD",
    "subject":        "Re: Q3 renewal — revised terms",
    "receivedUtc":    "2025-09-03T14:08:22Z",
    "sha256":         "9f2a5c3b0e8d4f1726a9b4e7d0c8f391a2b5e6c8d9f0a1b2c3d4e5f6a7b8c9d0",
    "md5":            "b4a7c1e2f3d4a5b6c7d8e9f0a1b2c3d4"
  },
  "timestamp": {
    "tsa":            "http://timestamp.digicert.com",
    "policyOid":      "2.16.840.1.114412.7.1",
    "serialNumber":   "07:8e:3a:4c:92:5d:11:f0:c8:6a:2b:41:9e:5d:03:88",
    "timestampedUtc": "2026-04-18T13:47:18Z",
    "tokenPath":      "07_TimestampMaterials/manifest.tsr",
    "hashAlgorithm":  "SHA-256",
    "manifestDigest": "2b9e07f1a4c8d6b5e3f0921a74c6d8b9e1f0a2b3c4d5e6f7a8b9c0d1e2f3a4b5"
  }
}`}
        </code>
      </pre>
    </div>
  );
}
