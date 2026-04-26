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
}: {
  eyebrow?: string;
  eyebrowNumber?: string;
  title: React.ReactNode;
  lede?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className={cn("relative pt-28 pb-16 md:pt-36 md:pb-24", className)}>
      <Container width="wide">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-9">
            {eyebrow ? (
              <Reveal>
                <Eyebrow number={eyebrowNumber}>{eyebrow}</Eyebrow>
              </Reveal>
            ) : null}
            <Reveal delay={0.05}>
              <h1 className="mt-5 font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[1.04] tracking-[-0.02em] text-balance text-[color:var(--color-ink)]">
                {title}
              </h1>
            </Reveal>
            {lede ? (
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  {lede}
                </p>
              </Reveal>
            ) : null}
            {children ? (
              <Reveal delay={0.18}>
                <div className="mt-8">{children}</div>
              </Reveal>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
