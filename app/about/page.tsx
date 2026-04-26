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
    "Krellix is built by Cole Flanders, an end-user-technologies engineer in Louisville, Kentucky. Built on the bones of CCS ThreadVault after real users asked for chain-of-custody features.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        eyebrowNumber="01"
        title={<>Small company, big artifact.</>}
        lede={
          <>
            Krellix is built by one engineer in Louisville, Kentucky. It exists because the
            gap between &quot;forward it to yourself&quot; and &quot;call a vendor and wait two weeks&quot; was
            too wide, and nothing else filled it honestly.
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
                    I&apos;m an end-user-technologies engineer focused on Microsoft 365, Entra
                    ID, and Intune. My day job is the unglamorous half of IT —
                    Conditional Access, device baselines, mailbox migrations, the kinds of
                    tickets that don&apos;t produce case studies but do keep businesses
                    running.
                  </p>
                  <p>
                    Krellix started as a feature request on{" "}
                    <Link
                      href={siteConfig.parent.url + "/products/threadvault"}
                      className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                    >
                      CCS ThreadVault
                    </Link>
                    , a small Windows utility I built for IT teams handling offboarding. A
                    few attorneys bought ThreadVault, used it for litigation prep, and
                    told me what they actually wanted was the same tool plus a real chain
                    of custody. Krellix is what happens when I take that request
                    seriously.
                  </p>
                  <p className="text-[color:var(--color-ink)]">
                    You&apos;ll talk to me when you email support. You&apos;ll talk to me when you
                    email sales. If you want a demo, you get me on a call — no SDR, no
                    qualification form.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    href={`mailto:${siteConfig.contact.salesEmail}`}
                    variant="primary"
                    arrow
                  >
                    Email me directly
                  </Button>
                  <Button href={siteConfig.parent.url} variant="secondary" external>
                    See my consulting practice
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
                        Taking on small-firm & in-house counsel trials
                      </p>
                      <p className="flex items-baseline gap-3">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-accent)]">→</span>
                        Onboarding calls available same week
                      </p>
                    </dd>
                  </div>
                  <div className="col-span-2 border-t border-[var(--color-border)] pt-6">
                    <dt className="eyebrow">Parent company</dt>
                    <dd className="mt-2 font-display text-[1.125rem] leading-[1.3] tracking-[-0.005em]">
                      {siteConfig.parent.name}
                    </dd>
                    <dd className="mt-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                      Louisville, KY · est. 2025
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Principles */}
      <Section tone="surface" divider>
        <Container width="wide">
          <Reveal>
            <Eyebrow number="03">How I build</Eyebrow>
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

      {/* History */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="04">How we got here</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  ThreadVault to Krellix, in two years.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ol className="space-y-0">
                {timeline.map((item, i) => (
                  <Reveal key={item.year} delay={0.04 * i}>
                    <li className="grid gap-4 border-t border-[var(--color-border)] py-7 md:grid-cols-12 md:gap-8">
                      <div className="md:col-span-3">
                        <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                          {item.year}
                        </p>
                        <p className="mt-1 font-display text-[1.125rem] leading-[1.2] tracking-[-0.005em]">
                          {item.headline}
                        </p>
                      </div>
                      <p className="md:col-span-9 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                        {item.body}
                      </p>
                    </li>
                  </Reveal>
                ))}
                <li className="border-t border-[var(--color-border)]" />
              </ol>
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
      "Per-custodian and per-gigabyte pricing makes sense if you&rsquo;re selling infrastructure that scales with usage. Krellix runs on your machine. The cost to let you do one more collection is exactly zero, so the price model doesn&rsquo;t pretend otherwise.",
  },
  {
    title: "Publish the price.",
    body:
      "If a prospect has to email sales to find out what something costs, the answer is almost always &ldquo;more than you want to pay.&rdquo; Krellix prices are on the pricing page. The biggest enterprise deal and the smallest solo trial pay the same sticker.",
  },
  {
    title: "The output is the product.",
    body:
      "The app is a tool for producing a specific artifact: a sealed, timestamped, hashed collection. Everything else &mdash; the UI, the installer, the onboarding &mdash; is scaffolding. If the artifact doesn&rsquo;t hold up in a hearing, nothing else matters.",
  },
  {
    title: "Build for the person who opens it in ten years.",
    body:
      "Native .eml, PDF, JSON, standard hash formats, RFC 3161 tokens. Nothing proprietary. A reviewer in 2035 should be able to verify a 2026 Krellix export without Krellix the company still existing.",
  },
  {
    title: "Tell on the product when it fails.",
    body:
      "Every error message names exactly what went wrong and what to do. Every skipped message shows up in the manifest with a reason code. A defensible tool that quietly drops items is worse than one that doesn&rsquo;t exist.",
  },
  {
    title: "Small on purpose.",
    body:
      "One engineer, one phone number, one email address. When the company grows, those stop being true &mdash; but right now they&rsquo;re the reason support responds the same day and the roadmap reflects what customers actually need.",
  },
];

const timeline = [
  {
    year: "2024",
    headline: "ThreadVault v1",
    body:
      "Built a Windows utility for IT teams handling Microsoft 365 offboarding. Archive a departing employee&rsquo;s mailbox to PST or EML, done. One-time license, $300 per tenant. Sold well to MSPs and small-firm IT.",
  },
  {
    year: "2025",
    headline: "The legal customers show up",
    body:
      "A handful of law-firm IT buyers bought ThreadVault and started asking for features: chain-of-custody manifests, cryptographic hashing, timestamp tokens, Bates numbering. Not because the tool was bad, but because what they really needed was a different product that shared 70% of the code.",
  },
  {
    year: "2025 · Q4",
    headline: "Decision to fork",
    body:
      "Rather than graft defensibility features onto ThreadVault and compromise its simplicity for the IT buyer, spun up Krellix as a separate product line with its own brand, pricing, and audience. ThreadVault remains supported and sold to its original buyers.",
  },
  {
    year: "2026 · Q1",
    headline: "Krellix v3.0",
    body:
      "First public release. RFC 3161 TSA integration, SHA-256/MD5 dual-hash manifests, two-mode architecture (Personal + Enterprise), admin-consent flow for Enterprise tenants. Version 3.0 because the underlying collection engine is a direct continuation of ThreadVault v2.",
  },
  {
    year: "2026 · Q2",
    headline: "Krellix v3.1 — current",
    body:
      "Refinement release. Multi-custodian collections in Enterprise mode, deduplication reports, pre-flight permission probe that catches Add-MailboxPermission gaps before a collection starts. Added OneDrive and SharePoint collection. This is the build the trial ships.",
  },
];
