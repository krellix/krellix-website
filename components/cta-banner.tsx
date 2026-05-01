import { Container } from "./container";
import { Button } from "./button";
import { Reveal } from "./reveal";

export function CtaBanner({
  title = "Ready to talk about a pilot?",
  lede = "Krellix is in early pilot with a small number of customers. If your matter looks like a fit, send a note — Cole reads every email and replies within one business day.",
  primaryLabel = "Request a pilot",
  primaryHref = "/contact",
  secondaryLabel = "See the roadmap",
  secondaryHref = "/roadmap",
}: {
  title?: string;
  lede?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative border-t border-[var(--color-border)] bg-[var(--color-ink)] text-[color:var(--color-bg)]">
      <Container width="wide" className="py-20 md:py-28">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="eyebrow !text-[color:var(--color-ink-subtle)]">Next step</p>
            <h2 className="mt-4 font-display text-[length:clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance text-[color:var(--color-bg)]">
              {title}
            </h2>
            <p className="mt-5 max-w-[56ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:color-mix(in_srgb,var(--color-bg)_78%,transparent)]">
              {lede}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">
            <div className="flex flex-col gap-3 md:items-end">
              <Button href={primaryHref} variant="seal" size="lg" arrow>
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  href={secondaryHref}
                  variant="ghost"
                  size="md"
                  className="!text-[color:var(--color-bg)] hover:!bg-[color:color-mix(in_srgb,var(--color-bg)_10%,transparent)]"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
