import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  href = "/",
  showWordmark = true,
}: {
  className?: string;
  href?: string;
  showWordmark?: boolean;
}) {
  const inner = (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Mark />
      {showWordmark ? (
        <span className="font-display text-[1.0625rem] tracking-[-0.01em]">
          Krellix
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Krellix home" className="group">
      {inner}
    </Link>
  );
}

/**
 * Krellix mark. A rounded square (same silhouette family as CCS)
 * containing a serif-esque K in deep ink navy, with a small
 * antique-gold seal dot in the lower-right. The dot is the semantic
 * signature of Krellix — it says "this output has been sealed."
 * Deliberately NOT a shield (too on-the-nose for a legal product)
 * and NOT a padlock (wrong metaphor — the product doesn't lock
 * anything, it proves what happened).
 */
function Mark() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="text-[color:var(--color-ink)]"
    >
      <rect x="0.5" y="0.5" width="23" height="23" rx="3.5" stroke="currentColor" />
      <path
        d="M7.5 6v12M7.5 12l5.5-6M7.5 12l6 6"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      <circle cx="17.5" cy="16.5" r="1.6" fill="var(--color-seal)" />
    </svg>
  );
}
