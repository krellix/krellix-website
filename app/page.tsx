import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/button";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { CtaBanner } from "@/components/cta-banner";
import { HeroOrnament } from "@/components/hero-ornament";
import { ManifestSample } from "@/components/manifest-sample";
import { SealBadge } from "@/components/seal-badge";
import { audiences, siteConfig } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
        <Container width="wide">
          <div className="grid items-center gap-12 md:grid-cols-12">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow number="01">{siteConfig.productName} · v{siteConfig.appVersion}</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="mt-6 font-display text-[clamp(2.75rem,6.75vw,5.25rem)] leading-[1.02] tracking-[-0.022em] text-balance text-[color:var(--color-ink)]">
                  Preserve email and documents
                  <span className="block text-[color:var(--color-ink-muted)]">
                    in a way a court will accept.
                  </span>
                </h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-7 max-w-[54ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Krellix collects email from Microsoft 365 with full chain of custody —
                  SHA-256 hashes, RFC 3161 timestamps from DigiCert, and a self-verifying
                  manifest. Built for solo attorneys, in-house counsel, and HR
                  investigators who need defensible collection without a Purview seat or a
                  vendor invoice.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Button href="/contact" variant="primary" size="lg" arrow>
                    Request a pilot
                  </Button>
                  <Button href="/how-it-works" variant="secondary" size="lg">
                    See how it works
                  </Button>
                </div>
              </Reveal>
              <Reveal delay={0.24}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <SealBadge>SHA-256 + MD5</SealBadge>
                  <SealBadge>RFC 3161 timestamped</SealBadge>
                  <SealBadge>Verifiable on any machine</SealBadge>
                </div>
              </Reveal>
            </div>

            <div className="hidden md:col-span-5 md:block">
              <Reveal delay={0.25}>
                <HeroOrnament className="aspect-square w-full" />
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Positioning strip */}
      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface)]">
        <Container width="wide" className="py-10">
          <div className="grid items-center gap-6 md:grid-cols-3">
            <Reveal>
              <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                <span className="text-[color:var(--color-accent)]">→</span> Runs on the operator&apos;s Windows machine
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                <span className="text-[color:var(--color-accent)]">→</span> No data leaves your control
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                <span className="text-[color:var(--color-accent)]">→</span> Delivered in plain, open formats
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Where Krellix is today */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="02">Where Krellix is today</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.018em] text-balance">
                  Honest about the stage we&apos;re at.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <RevealStagger>
                {stage.map((item, i) => (
                  <RevealItem key={item.title}>
                    <div className="grid gap-4 border-t border-[var(--color-border)] py-8 md:grid-cols-12 md:gap-10">
                      <div className="md:col-span-1">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="md:col-span-4">
                        <h3 className="font-display text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.008em]">
                          {item.title}
                        </h3>
                      </div>
                      <div className="md:col-span-7">
                        <p className="text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
                <div className="border-t border-[var(--color-border)]" />
              </RevealStagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* The problem */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="03">The gap Krellix fills</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Defensible collection shouldn&apos;t require an E5 license.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.12}>
                <div className="space-y-5 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    Most small firms and mid-market companies don&apos;t have Microsoft Purview.
                    The moment a matter requires preserved email, the options narrow to
                    three: forward messages to yourself (inadmissible), ask IT to PST-export
                    them (no chain of custody), or call a vendor and wait two weeks for a
                    five-figure invoice.
                  </p>
                  <p>
                    Krellix is the fourth option. Annual license, runs on the operator&apos;s
                    machine, produces native .eml files, searchable PDFs, a signed
                    manifest, and a public TSA timestamp.
                  </p>
                  <p className="text-[color:var(--color-ink)]">
                    Personal mode for your own correspondence. Enterprise mode for another
                    custodian&apos;s mailbox, OneDrive, and SharePoint. Same defensibility in
                    both.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="04">How it works</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Four steps. Same output every time.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  From sign-in to sealed export, a typical collection takes under thirty
                  minutes of operator time.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8">
                  <Link
                    href="/how-it-works"
                    className="group inline-flex items-center gap-2 text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    Full walkthrough, with screenshots
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <RevealStagger>
                {steps.map((step, i) => (
                  <RevealItem key={step.title}>
                    <div className="grid gap-4 border-t border-[var(--color-border)] py-8 md:grid-cols-12 md:gap-10">
                      <div className="md:col-span-1">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="md:col-span-4">
                        <h3 className="font-display text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.008em]">
                          {step.title}
                        </h3>
                      </div>
                      <div className="md:col-span-7">
                        <p className="text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
                <div className="border-t border-[var(--color-border)]" />
              </RevealStagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sample output */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="05">What you ship</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.018em] text-balance">
                  The manifest is the artifact that wins the argument.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[50ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Every export includes a signed plain-text manifest of exactly who collected
                  what, from whom, when, and how. Hash the manifest, send the hash to a public
                  Time Stamp Authority, archive the signed response. The verification process
                  is bundled with every export.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/how-it-works" variant="primary" arrow>
                    See how it works
                  </Button>
                  <Button href="/docs/chain-of-custody" variant="ghost">
                    How to verify one yourself
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.18}>
                <ManifestSample />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Audiences */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="06">Who Krellix is for</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Built for the person who needs the evidence, not the person who manages the tenant.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <RevealStagger>
                {audiences.map((audience) => (
                  <RevealItem key={audience.title}>
                    <div className="grid gap-4 border-t border-[var(--color-border)] py-8 md:grid-cols-12 md:gap-10">
                      <div className="md:col-span-5">
                        <h3 className="font-display text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.008em]">
                          {audience.title}
                        </h3>
                      </div>
                      <div className="md:col-span-7">
                        <p className="text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                          {audience.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
                <div className="border-t border-[var(--color-border)]" />
              </RevealStagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* Pricing preview */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-10 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <Reveal>
                <Eyebrow number="07">Pricing</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Three tiers. Published on the pricing page.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-[56ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  No per-seat pricing, no per-custodian pricing, no per-gigabyte
                  pricing. One annual license, unlimited collections. Solo for the
                  individual practitioner; Firm for 2&ndash;5 attorneys; Enterprise
                  for IT-equipped teams running custodian holds.
                </p>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/pricing" variant="primary" arrow>
                    See what&apos;s included
                  </Button>
                  <Button href="/contact" variant="secondary">
                    Request a pilot
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-5">
              <Reveal delay={0.18}>
                <dl className="grid grid-cols-3 gap-4 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] p-6 md:p-7">
                  <div>
                    <dt className="eyebrow">Solo</dt>
                    <dd className="mt-2 font-display text-[1.625rem] leading-none tracking-[-0.015em]">
                      ${siteConfig.pricing.soloAnnual}
                    </dd>
                    <dd className="mt-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                      / year
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Firm</dt>
                    <dd className="mt-2 font-display text-[1.625rem] leading-none tracking-[-0.015em]">
                      ${siteConfig.pricing.firmAnnual}
                    </dd>
                    <dd className="mt-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                      / year
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow">Enterprise</dt>
                    <dd className="mt-2 font-display text-[1.625rem] leading-none tracking-[-0.015em]">
                      from ${siteConfig.pricing.enterpriseAnnual.toLocaleString()}
                    </dd>
                    <dd className="mt-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                      / year
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <CtaBanner />
    </>
  );
}

const stage = [
  {
    title: "Krellix Mail v3.1 is shipping today.",
    body:
      "The product is real and in operators' hands. It collects email from Microsoft 365 with a full chain of custody — hashes, RFC 3161 timestamps, and a verifiable manifest.",
  },
  {
    title: "We're in early pilot.",
    body:
      "We're working with a small number of customers in Kentucky and beyond, expanding deliberately rather than chasing scale. Every customer talks to the founder directly.",
  },
  {
    title: "What we ship next is shaped by what our customers ask for.",
    body: (
      <>
        We publish a <Link href="/roadmap" className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]">public roadmap</Link>{" "}
        so prospects can see where Krellix is heading before they commit. Customer
        feedback decides what comes next.
      </>
    ),
  },
] as const;

const steps = [
  {
    title: "Sign in and scope",
    body:
      "Authenticate with your own Microsoft 365 credentials or IMAP login. Pick a custodian — yourself in Personal mode, another user in Enterprise mode — and a date range, correspondent, or folder.",
  },
  {
    title: "Collect and preserve",
    body:
      "Krellix pulls messages through the official Microsoft Graph API (or IMAP), writes native .eml files and searchable PDFs, and captures each attachment in its original format. No intermediate server, no copy in the cloud.",
  },
  {
    title: "Hash and seal",
    body:
      "Every exported file gets a SHA-256 and MD5 hash. A manifest records the operator, tenant, custodian, query, counts, and hashes — then that manifest itself is SHA-256 hashed and sent to a public Time Stamp Authority.",
  },
  {
    title: "Deliver and verify",
    body:
      "The export lands on your disk as numbered folders. Any reviewer can re-hash the files and re-verify the TSA signature with the bundled VerifyTimestamp.bat — no Krellix license required.",
  },
];
