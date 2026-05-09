import { cn } from "@/lib/utils";

/**
 * Wax-seal badge — flags a claim as cryptographically backed
 * elsewhere on the page (e.g. "RFC 3161 timestamped", "SHA-256
 * verified"). The gold tint is load-bearing visual signal for
 * what the product can prove. Decorative use dilutes it.
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
        "inline-flex items-center gap-2 rounded-[2px] border border-[var(--color-seal-soft)] bg-[var(--color-seal-paper)] px-2.5 py-1 font-mono text-[length:var(--text-mono-sm)] tracking-[0.02em] text-[color:var(--color-seal-deep)]",
        className,
      )}
    >
      <span aria-hidden="true" className="relative inline-flex h-2 w-2 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-[var(--color-seal)]" />
        <span className="absolute inset-[-2px] rounded-full border border-[var(--color-seal)] opacity-30" />
      </span>
      {children}
    </span>
  );
}
