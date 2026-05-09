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
        <span className="font-display text-[1.125rem] tracking-[-0.012em] text-[color:var(--color-ink)]">
          Krellix
        </span>
      ) : null}
    </span>
  );

  if (!href) return inner;
  return (
    <Link href={href} aria-label="Krellix home" className="group inline-flex items-center">
      {inner}
    </Link>
  );
}

/**
 * Krellix mark. A serif K cradled inside a rule-edged plate, with
 * a small antique-gold seal dot in the lower-right — the semantic
 * signature that says "this output has been sealed."
 */
function Mark() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      aria-hidden="true"
      className="text-[color:var(--color-ink)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-2deg]"
    >
      {/* Outer plate */}
      <rect x="0.5" y="0.5" width="25" height="25" rx="2" stroke="currentColor" strokeOpacity="0.85" />
      {/* Inner rule — a typeset margin */}
      <rect x="2.5" y="2.5" width="21" height="21" rx="1" stroke="currentColor" strokeOpacity="0.18" />
      {/* Serif K — a deliberate display K, not a stick K */}
      <path
        d="M8.4 6.5v13M8.4 13l5.6-6.5M8.4 13l6.2 6.5"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Top serif */}
      <path d="M7 6.5h2.8" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="square" />
      {/* Bottom serif */}
      <path d="M7 19.5h2.8" stroke="var(--color-accent)" strokeWidth="1.4" strokeLinecap="square" />
      {/* Seal dot */}
      <circle cx="19" cy="18.5" r="1.6" fill="var(--color-seal)" />
      <circle cx="19" cy="18.5" r="2.6" stroke="var(--color-seal)" strokeOpacity="0.32" strokeDasharray="0.5 1" />
    </svg>
  );
}
