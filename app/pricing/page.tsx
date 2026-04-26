import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { PricingCard } from "@/components/pricing-card";
import { FeatureMatrix } from "@/components/feature-matrix";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Pricing",
  description: `Transparent two-tier pricing. Personal at $${siteConfig.pricing.personalAnnual}/year, Enterprise at $${siteConfig.pricing.enterpriseAnnual.toLocaleString()}/year. No per-custodian fees, no per-gigabyte fees, no procurement cycle.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  const personal = siteConfig.pricing.personalAnnual;
  const enterprise = siteConfig.pricing.enterpriseAnnual;

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        eyebrowNumber="01"
        title={<>Two tiers. Published on the internet.</>}
        lede={
          <>
            No per-seat pricing. No per-custodian pricing. No per-gigabyte pricing. One
            operator seat, unlimited collections for the license term. Personal pays for
            itself on the first matter; Enterprise pays for itself by lunchtime on the
            first custodian.
          </>
        }
      />

      {/* Price cards */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-8 md:grid-cols-2">
            <Reveal>
              <PricingCard
                name="Personal"
                price={`$${personal}`}
                period="/year"
                lede="For solo attorneys, HR investigators, and anyone preserving their own correspondence with a named contact."
                bullets={[
                  "Collect from your own Microsoft 365 mailbox or any IMAP account",
                  "Per-email PDFs with embedded native attachments",
                  "Thread roll-up PDFs for combined chronological review",
                  "SHA-256 + MD5 hashes for every file",
                  "RFC 3161 timestamp from a public TSA",
                  "Full chain-of-custody manifest",
                  "Unlimited collections, unlimited messages",
                  "Priority email support, one business day",
                ]}
                ctaLabel="Start a 14-day trial"
                ctaHref="/trial"
                footnote="No admin consent required. Works on any Microsoft 365 tenant by default — and any IMAP account including Gmail, iCloud, Yahoo, and Fastmail."
              />
            </Reveal>
            <Reveal delay={0.08}>
              <PricingCard
                name="Enterprise"
                price={`$${enterprise.toLocaleString()}`}
                period="/year"
                lede="For in-house counsel, compliance, and IT running custodian holds across an organization."
                bullets={[
                  "Everything in Personal, plus —",
                  "Collect from another user's mailbox via delegated access",
                  "Collect from custodian OneDrive",
                  "Collect from custodian SharePoint sites",
                  "Multi-custodian collection records and manifests",
                  "Deduplication across custodians with hash-based matching",
                  "Onboarding call with the founder for admin-consent setup",
                  "Priority email support, same business day",
                ]}
                ctaLabel="Start a 14-day trial"
                ctaHref="/trial"
                variant="seal"
                footnote="Requires tenant admin consent once and Add-MailboxPermission Full Access on each custodian mailbox. Setup guide linked from the trial email."
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
                  The difference between the two plans is entirely about <em>who</em> the
                  custodian is — not about the defensibility of the output or the quality
                  of the manifest. Both tiers produce the same hashes, the same
                  timestamp, and the same verifiable artifacts.
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

      <CtaBanner />
    </>
  );
}

const faqs = [
  {
    q: "What does the annual license cover?",
    a: "One operator seat running Krellix on a Windows 10 or Windows 11 machine. Unlimited collections, unlimited messages, unlimited custodians for the license term. When the term expires, your existing exports and manifests remain verifiable forever — the license renewal is for future collections.",
  },
  {
    q: "Do I need to buy per-custodian or per-gigabyte?",
    a: "No. Enterprise customers preserving a mailbox-a-week pay the same as customers running a dozen holds a quarter. If the economics make you hesitate on whether a collection is worth doing, something about the pricing model is wrong — and that's why we don't meter.",
  },
  {
    q: "Can a firm buy seats for multiple operators?",
    a: "Yes. Additional operator seats are $299/year each on Personal and $1,499/year each on Enterprise. The second and third seats cost less because the infrastructure — the TSA relationships, the cert pinning, the chain of custody tooling — is already built.",
  },
  {
    q: "Is there a month-to-month option?",
    a: "Not as a public tier. If you're running a single defined matter and want the license to end when the matter does, email sales and we'll scope a term-of-matter license. Most customers realize after one use that they want the permanent tool.",
  },
  {
    q: "Can we expense it? Can IT expense it?",
    a: "Both. The license is invoiced under your firm's name by default. Personal tier is typically expensed by the individual attorney; Enterprise is typically expensed by the IT or compliance budget. We can also split invoicing if your procurement process requires it.",
  },
  {
    q: "Do you offer a nonprofit or academic discount?",
    a: "Legal aid organizations, clinics attached to law schools, and 501(c)(3) investigative journalism outfits get Personal at $199/year. Email sales with your EIN and we'll issue a quote the same day.",
  },
  {
    q: "What happens to my exports if I don't renew?",
    a: "Your exports are yours. They are plain .eml files, plain PDFs, plain JSON, and plain TSA tokens. Nothing about them requires Krellix to verify — a lapsed license doesn't make a past collection inadmissible. The renewal is for the ability to make new collections, not to read old ones.",
  },
  {
    q: "Do you have SOC 2?",
    a: "Not yet — the product is desktop software that runs on the operator's machine and sends no collected data to Krellix servers, so SOC 2's applicability is limited. We have a SOC 2 Type I engagement scheduled for Q3 2026 covering the website, license issuance, and support infrastructure.",
  },
];
