import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/button";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description:
    "Krellix is a one-person company today, built by Cole Flanders in Louisville, Kentucky. The story behind the product, the people it’s for, and what being in early pilot means for customers.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        eyebrowNumber="01"
        title={<>One person, one product, in early pilot.</>}
        lede={
          <>
            Krellix is built by one engineer in Louisville, Kentucky. It exists because
            the gap between &ldquo;Microsoft Purview&rdquo; and &ldquo;save email as PDF
            and pray&rdquo; was too wide for a small firm to bridge honestly.
          </>
        }
      />

      {/* Founder */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow number="02">The person doing the work</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.06] tracking-[-0.018em] text-balance">
                  I&apos;m {siteConfig.founder}. I run Microsoft environments for a living.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <div className="mt-6 space-y-5 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    My day job is IT lead at Heaven Hill, a multi-generational distillery
                    in Kentucky. I built Krellix on the side because I kept seeing the
                    same gap from two directions: small firms that couldn&apos;t afford
                    Purview, and IT teams that didn&apos;t want to forward email and
                    pray.
                  </p>
                  <p>
                    Microsoft Purview is excellent and expensive. It&apos;s priced for
                    organizations that already buy E5. For a two-person law firm, an
                    in-house counsel team running Business Premium, or an HR
                    investigation that needs preservation today, Purview isn&apos;t a
                    realistic option. The realistic options were &ldquo;PDF the
                    inbox&rdquo; and &ldquo;call a vendor and wait two weeks.&rdquo;
                    Neither is good.
                  </p>
                  <p className="text-[color:var(--color-ink)]">
                    Krellix is a third option. Annual license, runs on your machine,
                    produces an export with the same chain-of-custody artifacts a vendor
                    would: native .eml, signed PDFs, SHA-256 hashes, an RFC 3161
                    timestamp. You handle the matter; the tool handles the cryptography.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    href={`mailto:cole@krellix.app`}
                    variant="primary"
                    arrow
                  >
                    Email me directly
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Request a pilot
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.1}>
                <dl className="grid grid-cols-2 gap-6 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-8">
                  <div className="col-span-2">
                    <dt className="eyebrow">Currently</dt>
                    <dd className="mt-3 space-y-3 text-[length:var(--text-body)]">
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-accent)]">→</span>
                        Shipping Krellix Mail v{siteConfig.appVersion}
                      </p>
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-accent)]">→</span>
                        In early pilot with a small number of customers
                      </p>
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-accent)]">→</span>
                        Onboarding new pilots one at a time
                      </p>
                    </dd>
                  </div>
                  <div className="col-span-2 border-t border-[var(--color-border)] pt-6">
                    <dt className="eyebrow">Company</dt>
                    <dd className="mt-2 font-display text-[1.125rem] leading-[1.3] tracking-[-0.005em]">
                      {siteConfig.legalName}
                    </dd>
                    <dd className="mt-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                      {siteConfig.location.city}, {siteConfig.location.region} · owned by {siteConfig.founder}
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Stage of company */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="03">What &ldquo;early pilot&rdquo; means</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Krellix is a one-person company today.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <div className="space-y-5 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    What that means for you, plainly: you talk to me when you email
                    support. You talk to me when you email sales. If you want a demo,
                    you get me on a call &mdash; no SDR, no qualification form, no
                    hand-off. Decisions on pricing, the roadmap, and what gets built
                    next happen quickly because there&apos;s nobody to defer to.
                  </p>
                  <p>
                    What it also means: capacity is finite. We&apos;re onboarding pilots
                    one at a time so each one gets real attention. If you reach out and
                    we&apos;re not the right fit yet, I&apos;ll tell you that
                    directly. As the company grows, those direct lines change &mdash;
                    but right now they&apos;re the reason support responds the same day
                    and the roadmap reflects what customers actually need.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section>
        <Container width="wide">
          <Reveal>
            <Eyebrow number="04">How I build</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[30ch] font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
              The principles Krellix was built on.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.title} delay={0.04 * i}>
                <article>
                  <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 font-display text-[1.5rem] leading-[1.2] tracking-[-0.01em] text-[color:var(--color-ink)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                    {p.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Open about the company */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="05">In the open</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Who you&apos;re buying from.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <dl className="divide-y divide-[var(--color-border)] border-t border-[var(--color-border-strong)] border-b">
                {disclosures.map((item, i) => (
                  <Reveal key={item.q} delay={0.04 * i}>
                    <div className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                      <dt className="font-display text-[1.125rem] leading-[1.3] tracking-[-0.008em] text-[color:var(--color-ink)] md:col-span-4">
                        {item.q}
                      </dt>
                      <dd className="text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)] md:col-span-8">
                        {item.a}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
              <Reveal delay={0.18}>
                <p className="mt-10 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  For anything not covered here, write to{" "}
                  <a
                    href="mailto:cole@krellix.app"
                    className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    cole@krellix.app
                  </a>{" "}
                  or{" "}
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    {siteConfig.contact.email}
                  </a>
                  .
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Parent / consulting context */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="06">Related work</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Cole Christopher Solutions LLC.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <div className="space-y-5 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    My consulting practice,{" "}
                    <Link
                      href={siteConfig.parent.url}
                      className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                    >
                      {siteConfig.parent.name}
                    </Link>
                    , builds Microsoft 365 utilities for IT teams &mdash; the most
                    relevant being CCS ThreadVault, a Windows utility for offboarding
                    mailbox archives. A few attorneys bought ThreadVault, used it for
                    litigation prep, and asked for the same tool with a real chain of
                    custody. Krellix is what happens when I take that request seriously.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

const principles = [
  {
    title: "Charge once. Don't nickel-and-dime.",
    body:
      "Per-custodian and per-gigabyte pricing makes sense if you're selling infrastructure that scales with usage. Krellix runs on your machine. The cost to let you do one more collection is exactly zero, so the price model doesn't pretend otherwise.",
  },
  {
    title: "Publish the price.",
    body:
      "If a prospect has to email sales to find out what something costs, the answer is almost always “more than you want to pay.” Krellix prices are on the pricing page. The biggest enterprise deal and the smallest pilot pay the same sticker.",
  },
  {
    title: "The output is the product.",
    body:
      "The app is a tool for producing a specific artifact: a sealed, timestamped, hashed collection. Everything else — the UI, the installer, the onboarding — is scaffolding. If the artifact doesn't hold up, nothing else matters.",
  },
  {
    title: "Build for the person who opens it in ten years.",
    body:
      "Native .eml, PDF, JSON, standard hash formats, RFC 3161 tokens. Nothing proprietary. A reviewer in 2035 should be able to verify a 2026 Krellix export without Krellix the company still existing.",
  },
  {
    title: "Tell on the product when it fails.",
    body:
      "Every error message names exactly what went wrong and what to do. Every skipped message shows up in the manifest with a reason code. A defensible tool that quietly drops items is worse than one that doesn't exist.",
  },
  {
    title: "Small on purpose.",
    body:
      "One engineer, one phone number, one email address. When the company grows, those stop being true — but right now they're the reason support responds the same day and the roadmap reflects what customers actually need.",
  },
];

const disclosures = [
  {
    q: "Company",
    a: "Krellix LLC, a Kentucky limited liability company, formed in 2026. Wholly owned by Cole Flanders.",
  },
  {
    q: "Location",
    a: "Louisville, Kentucky. Krellix Mail is built and supported from here.",
  },
  {
    q: "Headcount",
    a: "One. Cole writes the code, answers the support email, runs sales calls, and signs the licenses. When that changes, this page changes too.",
  },
  {
    q: "Funding",
    a: "Bootstrapped. No outside investors, no venture capital. The product’s direction reflects what customers ask for, not what an investor expects to see in a quarterly review.",
  },
  {
    q: "Revenue",
    a: "Pre-revenue. We’re piloting with our first customers and have not yet billed for the product. The site is honest about that.",
  },
];
