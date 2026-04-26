import { Button } from "./button";
import { cn } from "@/lib/utils";

/**
 * Plan card for /pricing. Two of these appear side-by-side. Prices
 * come from siteConfig, not hardcoded, so one source of truth.
 * The Enterprise card uses the seal tint to signal it's the richer
 * artifact — not because it's "premium" in a marketing sense, but
 * because it collects from others and produces cross-custodian
 * records, which is literally what most defensibility disputes
 * come down to.
 */
export function PricingCard({
  name,
  price,
  period = "/year",
  lede,
  bullets,
  ctaLabel,
  ctaHref,
  variant = "default",
  footnote,
  className,
}: {
  name: string;
  price: string;
  period?: string;
  lede: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  variant?: "default" | "seal";
  footnote?: string;
  className?: string;
}) {
  const isSeal = variant === "seal";
  return (
    <div
      className={cn(
        "relative flex h-full flex-col rounded-md border p-7 md:p-8",
        isSeal
          ? "border-[var(--color-seal-soft)] bg-[var(--color-seal-tint)]"
          : "border-[var(--color-border-strong)] bg-[var(--color-bg)]",
        className,
      )}
    >
      <div>
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-[1.75rem] leading-[1.1] tracking-[-0.015em] text-[color:var(--color-ink)]">
            {name}
          </h3>
          {isSeal ? (
            <span
              className="inline-block h-2 w-2 rounded-full bg-[var(--color-seal)]"
              aria-hidden="true"
            />
          ) : null}
        </div>
        <p className="mt-3 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink-muted)]">
          {lede}
        </p>
        <div className="mt-6 flex items-baseline gap-2">
          <span className="font-display text-[clamp(2.5rem,4vw,3rem)] leading-none tracking-[-0.02em] text-[color:var(--color-ink)]">
            {price}
          </span>
          <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
            {period}
          </span>
        </div>
      </div>

      <ul className="mt-8 flex-1 space-y-3.5">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink)]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="mt-[0.35rem] flex-shrink-0"
            >
              <path
                d="M3 8.5l3.5 3.5L13 4.5"
                stroke={isSeal ? "var(--color-seal)" : "var(--color-accent)"}
                strokeWidth="1.6"
                strokeLinecap="square"
                strokeLinejoin="miter"
              />
            </svg>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-[var(--color-border)] pt-6">
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
