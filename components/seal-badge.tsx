import { cn } from "@/lib/utils";

/**
 * Small pill-shaped badge with a gold seal dot, used to flag a claim
 * as cryptographically backed somewhere else on the page (e.g.
 * "RFC 3161 timestamped", "SHA-256 verified"). Keep usage rare —
 * the whole point of the seal tint is that it signals something
 * the product can actually prove. Decorative use dilutes it.
 */
export function SealBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-[var(--color-seal-soft)] bg-[var(--color-seal-tint)] px-3 py-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink)]",
        className,
      )}
    >
      <span
        className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-seal)]"
        aria-hidden="true"
      />
      {children}
    </span>
  );
}
