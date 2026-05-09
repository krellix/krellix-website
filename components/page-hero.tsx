import { Container } from "./container";
import { Eyebrow } from "./eyebrow";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  eyebrowNumber,
  title,
  lede,
  className,
  children,
  meta,
}: {
  eyebrow?: string;
  eyebrowNumber?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  /** Optional meta line shown opposite the eyebrow, like a folio header. */
  meta?: React.ReactNode;
}) {
  return (
    <section className={cn("relative pt-28 pb-16 md:pt-36 md:pb-24", className)}>
      <Container width="wide">
        {/* Folio header — eyebrow on the left, meta on the right */}
        <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-baseline">
          {eyebrow ? (
            <Reveal>
              <Eyebrow number={eyebrowNumber}>{eyebrow}</Eyebrow>
            </Reveal>
          ) : <span />}
          {meta ? (
            <Reveal delay={0.05}>
              <div className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.16em] text-[color:var(--color-ink-subtle)]">
                {meta}
              </div>
            </Reveal>
          ) : null}
        </div>

        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12">
          <div className="md:col-span-10">
            <Reveal delay={0.05}>
              <h1 className="font-display text-[clamp(2.5rem,6.5vw,4.75rem)] leading-[1.04] tracking-[-0.022em] text-balance text-[color:var(--color-ink)]">
                {title}
              </h1>
            </Reveal>
            {lede ? (
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] text-[length:var(--text-body-lg)] leading-[1.62] text-[color:var(--color-ink-muted)]">
                  {lede}
                </p>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal delay={0.18}>
                <div className="mt-10">{children}</div>
              </Reveal>
            ) : null}
          </div>
        </div>

        {/* Bottom rule, signaling the end of the title page */}
        <Reveal delay={0.22}>
          <div className="mt-16 flex items-center gap-4">
            <span className="rule flex-1" />
            <span className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
              ↓ Continue
            </span>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
