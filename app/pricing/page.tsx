import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { PricingCard } from "@/components/pricing-card";
import { FeatureMatrix } from "@/components/feature-matrix";
import { Button } from "@/components/button";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Three tiers, transparent pricing. Solo at $${siteConfig.pricing.soloAnnual}/year, Firm at $${siteConfig.pricing.firmAnnual}/year, Enterprise from $${siteConfig.pricing.enterpriseAnnual.toLocaleString()}/year. No per-custodian or per-gigabyte fees.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const solo = siteConfig.pricing.soloAnnual;
  const firm = siteConfig.pricing.firmAnnual;
  const enterprise = siteConfig.pricing.enterpriseAnnual;

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        eyebrowNumber="01"
        title={<>Three tiers, transparent pricing.</>}
        lede={
          <>
            Pay once per year for unlimited collections — no per-matter fees, no
            per-gigabyte fees, no per-custodian fees. Most matters cost less than one
            billable hour.
          </>
        }
      />

      {/* Price cards */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-8 md:grid-cols-3">
            <Reveal>
              <PricingCard
                name="Solo"
                price={`$${solo}`}
                period="/year"
                lede="For solo practitioners and small matters. Collect from your own M365 mailbox or shared mailboxes you have access to."
                bullets={[
                  "Personal mode (your own M365 mailbox or shared mailboxes you have access to)",
                  "By-correspondent or by-folder collection",
                  "Bates numbering",
                  "SHA-256 + MD5 hashes, RFC 3161 timestamps, manifest",
                  "Items.csv load file",
                  "Self-running verification script",
                  "Email support, 1 business day",
                ]}
                ctaLabel="Request a pilot"
                ctaHref="/contact"
                footnote="No admin consent required. Best fit for solo practitioners and small matters."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <PricingCard
                name="Firm"
                price={`$${firm}`}
                period="/year"
                lede="For 2–5 attorney firms running matters in parallel. Everything in Solo, plus seats for the team."
                bullets={[
                  "Everything in Solo",
                  "Up to 5 operator seats",
                  "Priority email support",
                ]}
                ctaLabel="Request a pilot"
                ctaHref="/contact"
                variant="seal"
                badge="Most popular"
                footnote="Best fit for 2–5 attorney firms running matters in parallel."
              />
            </Reveal>
            <Reveal delay={0.12}>
              <PricingCard
                name="Enterprise"
                price={`$${enterprise.toLocaleString()}`}
                period="/year"
                priceLabel="Starting at — pricing scales with seat count and custodian volume."
                lede="For in-house counsel, compliance, and IT running custodian holds across an organization."
                bullets={[
                  "Everything in Firm",
                  "Custodian collection (other users' mailboxes)",
                  "OneDrive + SharePoint document collection",
                  "Tenant-wide admin consent",
                  "Onboarding call",
                  "Custom seat counts",
                ]}
                ctaLabel="Talk to sales"
                ctaHref={`mailto:${siteConfig.contact.salesEmail}`}
                footnote="Pricing scales with seat count and custodian volume. Custom contracts available."
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Feature matrix */}
      <Section>
        <Container width="wide">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow number="02">Side by side</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  What&apos;s in each plan.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  The Personal column covers Solo and Firm. The Enterprise column adds
                  custodian mailbox, OneDrive, and SharePoint collection on top of
                  everything in Personal.
                </p>
              </Reveal>
            </div>
          </div>
          <Reveal delay={0.18}>
            <div className="mt-12">
              <FeatureMatrix />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Procurement FAQ */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="03">Frequently asked</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  The procurement questions.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <dl className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border-strong)] border-b">
                {faqs.map((item, i) => (
                  <Reveal key={item.q} delay={0.04 * i}>
                    <div className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                      <dt className="font-display text-[1.25rem] leading-[1.3] tracking-[-0.008em] text-[color:var(--color-ink)] md:col-span-5">
                        {item.q}
                      </dt>
                      <dd className="text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)] md:col-span-7">
                        {item.a}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pilot program banner */}
      <Section>
        <Container width="wide">
          <Reveal>
            <div className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-12 md:items-center">
                <div className="md:col-span-8">
                  <p className="eyebrow">Pilot program</p>
                  <h2 className="mt-3 font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.15] tracking-[-0.015em] text-balance">
                    We&apos;re working closely with our first customers.
                  </h2>
                  <p className="mt-4 max-w-[56ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                    If you have a use case that fits, request a pilot — we&apos;ll set
                    you up directly.
                  </p>
                </div>
                <div className="md:col-span-4 md:justify-self-end">
                  <Button href="/contact" variant="primary" size="lg" arrow>
                    Request a pilot
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

const faqs = [
  {
    q: "What does the annual license cover?",
    a: "Operator seats running Krellix on Windows 10 or Windows 11 machines (one seat for Solo, up to five for Firm, custom for Enterprise). Unlimited collections, unlimited messages, unlimited custodians for the license term. When the term expires, your existing exports and manifests remain verifiable forever — the license renewal is for future collections.",
  },
  {
    q: "Do I need to buy per-custodian or per-gigabyte?",
    a: "No. Enterprise customers preserving a mailbox-a-week pay the same as customers running a dozen holds a quarter. If the economics make you hesitate on whether a collection is worth doing, something about the pricing model is wrong — and that's why we don't meter.",
  },
  {
    q: "What happens to my exports if I don't renew?",
    a: "Your exports are yours. They are plain .eml files, plain PDFs, plain JSON, and plain TSA tokens. Nothing about them requires Krellix to verify — a lapsed license doesn't make a past collection inadmissible. The renewal is for the ability to make new collections, not to read old ones.",
  },
  {
    q: "Can we expense it? Can IT expense it?",
    a: "Both. The license is invoiced under your firm's name by default. Solo is typically expensed by the individual attorney; Firm and Enterprise are typically expensed by the firm or IT/compliance budget. We can also split invoicing if your procurement process requires it.",
  },
  {
    q: "Is there a month-to-month option?",
    a: "Not as a public tier. If you're running a single defined matter and want the license to end when the matter does, email sales and we'll scope a term-of-matter license.",
  },
  {
    q: "Do you offer a nonprofit or academic discount?",
    a: "Legal aid organizations, clinics attached to law schools, and 501(c)(3) investigative journalism outfits get a discount on Solo. Email sales with your EIN and we'll send a quote.",
  },
  {
    q: "Do you have SOC 2?",
    a: "Not yet. Krellix is desktop software that runs on the operator's machine and sends no collected data to Krellix servers, so SOC 2's applicability is limited. SOC 2 readiness is on our roadmap — see the roadmap page for current status.",
  },
];
