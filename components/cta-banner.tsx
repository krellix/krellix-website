import { Container } from "./container";
import { Button } from "./button";
import { Reveal } from "./reveal";

export function CtaBanner({
  title = "Ready to talk about a pilot?",
  lede = "Krellix is in early pilot with a small number of customers. If your matter looks like a fit, send a note — we read every email and reply within one business day.",
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
    <section className="relative overflow-hidden border-t border-[var(--color-border-strong)] bg-[var(--color-ink)] text-[color:var(--color-bg)]">
      {/* Hatch / paper-grain on dark — gives a leather-bound feeling */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent 0 9px, rgba(255,255,255,0.5) 9px 10px)",
        }}
      />
      {/* Top hairlines — emulate the sewn binding of a folio */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-[color:color-mix(in_srgb,var(--color-bg)_20%,transparent)]" />
      <div aria-hidden="true" className="absolute inset-x-0 top-1.5 h-px bg-[color:color-mix(in_srgb,var(--color-bg)_10%,transparent)]" />

      <Container width="wide" className="relative py-20 md:py-28">
        <div className="grid items-end gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-8">
            <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-bg)_55%,transparent)]">
              § Next step
            </p>
            <h2 className="mt-5 font-display text-[length:clamp(2rem,4.8vw,3.5rem)] leading-[1.06] tracking-[-0.02em] text-balance text-[color:var(--color-bg)]">
              {title}
            </h2>
            <p className="mt-6 max-w-[58ch] text-[length:var(--text-body-lg)] leading-[1.62] text-[color:color-mix(in_srgb,var(--color-bg)_75%,transparent)]">
              {lede}
            </p>
          </Reveal>
          <Reveal delay={0.1} className="md:col-span-4 md:justify-self-end">
            <div className="flex flex-col items-stretch gap-3 md:items-end">
              <Button href={primaryHref} variant="seal" size="lg" arrow>
                {primaryLabel}
              </Button>
              {secondaryLabel && secondaryHref ? (
                <Button
                  href={secondaryHref}
                  variant="ghost"
                  size="md"
                  className="!text-[color:var(--color-bg)] hover:!bg-[color:color-mix(in_srgb,var(--color-bg)_8%,transparent)]"
                >
                  {secondaryLabel}
                </Button>
              ) : null}
            </div>
          </Reveal>
        </div>

        {/* Bottom foliation — a credit line in mono */}
        <div aria-hidden="true" className="mt-16 flex items-center justify-between border-t border-[color:color-mix(in_srgb,var(--color-bg)_15%,transparent)] pt-5">
          <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-bg)_45%,transparent)]">
            SHA-256 · RFC 3161 · DigiCert TSA
          </p>
          <p className="hidden font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:color-mix(in_srgb,var(--color-bg)_45%,transparent)] md:block">
            Verifiable on any machine
          </p>
        </div>
      </Container>
    </section>
  );
}
