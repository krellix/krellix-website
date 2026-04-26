import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { TrialForm } from "@/components/trial-form";
import { SealBadge } from "@/components/seal-badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Start a trial",
  description: `${siteConfig.pricing.trialDays}-day trial of Krellix Mail. Full feature set, no credit card, no sales call. Download link and license file delivered by email.`,
  alternates: { canonical: "/trial" },
};

export default function TrialPage() {
  return (
    <>
      <PageHero
        eyebrow="Start a trial"
        eyebrowNumber="01"
        title={<>Fourteen days. Real build. No credit card.</>}
        lede="Fill out the form, get a download link and a time-limited license by email. The trial is the same binary paying customers run — same TSA relationships, same signing, same artifacts. When the trial ends the app stops collecting; existing exports remain verifiable forever."
      >
        <div className="flex flex-wrap gap-3">
          <SealBadge>{siteConfig.pricing.trialDays} days</SealBadge>
          <SealBadge>Unlimited collections during trial</SealBadge>
          <SealBadge>Real RFC 3161 timestamps</SealBadge>
        </div>
      </PageHero>

      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow number="02">Request a trial</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Tell me where to send the link.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <TrialForm />
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.12}>
                <div className="sticky top-28 space-y-8">
                  <div className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-6 md:p-7">
                    <p className="eyebrow">What you get</p>
                    <ul className="mt-4 space-y-3.5 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink)]">
                      {included.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Check />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-6 md:p-7">
                    <p className="eyebrow">What we don&apos;t do</p>
                    <ul className="mt-4 space-y-3.5 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                      {excluded.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <Dash />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="text-[length:var(--text-body-sm)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                    Questions before signing up? Email{" "}
                    <a
                      href={`mailto:${siteConfig.contact.salesEmail}`}
                      className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                    >
                      {siteConfig.contact.salesEmail}
                    </a>
                    . You&apos;ll hear back from the founder, same day.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.35rem] flex-shrink-0">
      <path
        d="M3 8.5l3.5 3.5L13 4.5"
        stroke="var(--color-accent)"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Dash() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.5rem] flex-shrink-0">
      <path d="M3 8h10" stroke="var(--color-ink-subtle)" strokeWidth="1.5" strokeLinecap="square" />
    </svg>
  );
}

const included = [
  "A Windows installer, signed with an EV code-signing certificate",
  "A time-limited license file, valid for the full trial period",
  "Unlimited collections during the trial window",
  "Real RFC 3161 timestamps on every manifest — not sandbox timestamps",
  "Access to Personal mode out of the box",
  "Enterprise-mode trial available on request, with onboarding call",
  "Direct email access to the founder for any question that comes up",
];

const excluded = [
  "No credit card asked for up front",
  "No sales call required — but available if you want one",
  "No auto-conversion to paid when the trial ends",
  "No nagware, no trial-restricted output, no watermarks on exports",
  "No telemetry pinging back to us during the trial",
];
