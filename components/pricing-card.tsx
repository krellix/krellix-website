import { Button } from "./button";
import { cn } from "@/lib/utils";

/**
 * Plan card for /pricing. The seal variant uses the gold tint to
 * single out the recommended tier — load-bearing visual signal.
 */
export function PricingCard({
  name,
  price,
  period = "/year",
  priceLabel,
  lede,
  bullets,
  ctaLabel,
  ctaHref,
  variant = "default",
  badge,
  footnote,
  className,
}: {
  name: string;
  price: string;
  period?: string;
  priceLabel?: string;
  lede: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  variant?: "default" | "seal";
  badge?: string;
  footnote?: string;
  className?: string;
}) {
  const isSeal = variant === "seal";
  return (
    <div
      className={cn(
        "relative flex h-full flex-col border p-7 md:p-8",
        isSeal
          ? "border-[var(--color-seal-soft)] bg-[var(--color-seal-paper)] shadow-[0_18px_40px_-32px_rgba(155,111,34,0.45)]"
          : "border-[var(--color-rule)] bg-[var(--color-bg)]",
        className,
      )}
    >
      {/* Folio mark — top-right corner */}
      <span
        aria-hidden="true"
        className="absolute right-5 top-4 font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.16em] text-[color:var(--color-ink-subtle)]"
      >
        Tier {name === "Solo" ? "I" : name === "Firm" ? "II" : "III"}
      </span>

      {badge ? (
        <span
          className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-[2px] border border-[var(--color-seal-deep)] bg-[var(--color-seal)] px-2.5 py-0.5 text-[length:var(--text-mono-sm)] font-mono uppercase tracking-[0.14em] text-[color:var(--color-bg)]"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-seal-paper)]" />
          {badge}
        </span>
      ) : null}

      <div>
        <h3 className="font-display text-[2rem] leading-[1.05] tracking-[-0.018em] text-[color:var(--color-ink)]">
          {name}
        </h3>

        <p className="mt-3 max-w-[28ch] text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink-muted)]">
          {lede}
        </p>

        <div className="mt-7 flex items-baseline gap-2 border-t border-[color:color-mix(in_srgb,var(--color-rule)_60%,transparent)] pt-6">
          <span className="font-display text-[clamp(2.5rem,3.6vw,3rem)] leading-none tracking-[-0.022em] text-[color:var(--color-ink)]">
            {price}
          </span>
          <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
            {period}
          </span>
        </div>
        {priceLabel ? (
          <p className="mt-2 text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)]">
            {priceLabel}
          </p>
        ) : null}
      </div>

      <ul className="mt-8 flex-1 space-y-3.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink)]">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              aria-hidden="true"
              className="mt-[0.35rem] flex-shrink-0"
            >
              <path
                d="M2 7.5l3.5 3.5L12 3.5"
                stroke={isSeal ? "var(--color-seal-deep)" : "var(--color-accent)"}
                strokeWidth="1.6"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-[color:color-mix(in_srgb,var(--color-rule)_60%,transparent)] pt-6">
        <Button
          href={ctaHref}
          variant={isSeal ? "seal" : "primary"}
          size="md"
          arrow
          className="w-full"
        >
          {ctaLabel}
        </Button>
        {footnote ? (
          <p className="mt-4 text-[length:var(--text-body-sm)] leading-[1.5] text-[color:var(--color-ink-muted)]">
            {footnote}
          </p>
        ) : null}
      </div>
    </div>
  );
}
