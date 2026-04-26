import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/button";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { ManifestSample } from "@/components/manifest-sample";
import { SealBadge } from "@/components/seal-badge";

export const metadata: Metadata = {
  title: "Why defensible",
  description:
    "SHA-256 hashing, RFC 3161 timestamping, and the Federal Rules of Evidence framework behind every Krellix collection. Explained without the jargon and without the hand-waving.",
  alternates: { canonical: "/why-defensible" },
};

export default function WhyDefensiblePage() {
  return (
    <>
      <PageHero
        eyebrow="Why defensible"
        eyebrowNumber="01"
        title={<>Defensibility is a specific, testable claim.</>}
        lede={
          <>
            Anyone can write a tool that exports email. Defensibility means the export can
            survive a motion to compel, a Rule 901 authenticity challenge, and a hostile
            cross-examination about chain of custody. That requires three things —
            cryptographic hashing, RFC 3161 timestamping, and a human-legible manifest —
            combined in a way any reviewer can re-verify on their own.
          </>
        }
      >
        <div className="flex flex-wrap gap-3">
          <SealBadge>SHA-256 + MD5</SealBadge>
          <SealBadge>RFC 3161 timestamp</SealBadge>
          <SealBadge>FRE 901 / 902(14)</SealBadge>
          <SealBadge>Sedona Conference aligned</SealBadge>
        </div>
      </PageHero>

      {/* Three pillars */}
      <Section tone="surface" divider>
        <Container width="wide">
          <Reveal>
            <Eyebrow number="02">The three pillars</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[28ch] font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.018em] text-balance">
              Every defensibility argument rests on three things, not one.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={0.05 + i * 0.05}>
                <article className="flex h-full flex-col rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-7">
                  <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-[1.625rem] leading-[1.15] tracking-[-0.012em] text-[color:var(--color-ink)]">
                    {pillar.title}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                    {pillar.body}
                  </p>
                  <p className="mt-5 border-t border-[var(--color-border)] pt-4 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                    {pillar.technical}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Hashing explained */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="03">Hashing</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Two hashes per file, because opposing counsel&apos;s expert will demand both.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  SHA-256 is the modern cryptographic standard. MD5 is legacy — it&apos;s no
                  longer collision-resistant, but most eDiscovery tooling from the 2010s
                  still treats an MD5 match as the primary deduplication signal. Krellix
                  writes both because the review platform your reviewer uses may insist on
                  one or the other, and having both is cheaper than re-collecting.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.18}>
                <div className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] p-7 hairline-seal">
                  <p className="eyebrow">What the hash proves</p>
                  <ul className="mt-4 space-y-4 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink)]">
                    {hashClaims.map((claim) => (
                      <li key={claim} className="flex items-start gap-3">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.35rem] flex-shrink-0">
                          <path
                            d="M3 8.5l3.5 3.5L13 4.5"
                            stroke="var(--color-accent)"
                            strokeWidth="1.6"
                            strokeLinecap="square"
                          />
                        </svg>
                        <span>{claim}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 border-t border-[var(--color-border)] pt-5 text-[length:var(--text-body-sm)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                    The hash files Krellix writes are plain text, in the standard
                    <code className="mx-1 font-mono">sha256sum</code>/<code className="mx-1 font-mono">md5sum</code>
                    format. Any reviewer with a Linux or macOS terminal can run
                    <code className="mx-1 font-mono">sha256sum -c Hashes.sha256.txt</code>
                    and get a pass/fail on every file in the export.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* RFC 3161 */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="04">RFC 3161 timestamping</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  When you collected it, signed by a third party.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  A file hash proves that a specific byte sequence existed. A RFC 3161
                  timestamp proves that specific byte sequence existed by a specific
                  moment. Without a third-party timestamp, every timestamp in a collection
                  is just metadata your opposing counsel can argue was forged. With one,
                  the argument becomes a claim against DigiCert&apos;s public signing key.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.18}>
                <div className="space-y-6">
                  <ProtocolStep
                    num="01"
                    title="Hash the manifest"
                    body="Krellix SHA-256 hashes ChainOfCustody.json after it finishes the collection. The hash, not the file itself, is what gets sent to the TSA — so no collection contents leave your machine."
                  />
                  <ProtocolStep
                    num="02"
                    title="Send a TSQ, receive a TSR"
                    body="Krellix wraps the hash in a TimeStampReq (RFC 3161 section 3.2) and POSTs it to a public Time Stamp Authority. The response is a TimeStampResp signed by the TSA's private key. The response embeds the hash, the exact UTC time the TSA received the request, and the TSA certificate chain."
                  />
                  <ProtocolStep
                    num="03"
                    title="Store the TSR next to the manifest"
                    body="The .tsr file is stored in 07_TimestampMaterials alongside the TSA public certificate and re-verification instructions. Any reviewer with OpenSSL can re-validate the chain themselves — no Krellix required."
                  />
                  <ProtocolStep
                    num="04"
                    title="Failover path"
                    body="DigiCert is the default TSA. If the DigiCert TSA is unavailable at collection time, Krellix automatically falls back to Sectigo, then GlobalSign — all three are WebTrust-audited commercial TSAs. The TSA used is recorded in the manifest so verification knows which public key to validate against."
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Sample manifest anchor */}
      <Section id="sample">
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="05">The artifact itself</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Here&apos;s what an actual Krellix manifest looks like.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  This is an excerpt. The real file is longer — one entry per collected
                  file — but every Krellix manifest has this shape. Opposing counsel or an
                  expert reviewer can read it without special tooling, and it tells them
                  exactly who collected what, from whom, when, and under what query.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Button href="/docs/chain-of-custody" variant="primary" arrow>
                    Verify a collection yourself
                  </Button>
                  <Button
                    href="/samples/krellix-sample-export.zip"
                    variant="secondary"
                    external
                  >
                    Download a full sample export
                  </Button>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <ManifestSample />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Legal framework */}
      <Section tone="ink" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <p className="eyebrow !text-[color:var(--color-ink-subtle)]">06 · Legal framework</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance text-[color:var(--color-bg)]">
                  What the rules actually require.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[36ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:color-mix(in_srgb,var(--color-bg)_72%,transparent)]">
                  Krellix&apos;s output is shaped by these four sources. Your jurisdiction may
                  have additional rules — Krellix doesn&apos;t relieve you of the obligation to
                  check.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <RevealStagger>
                {legalSources.map((src) => (
                  <RevealItem key={src.name}>
                    <div className="grid gap-4 border-t border-[color:color-mix(in_srgb,var(--color-bg)_15%,transparent)] py-7 md:grid-cols-12 md:gap-8">
                      <div className="md:col-span-4">
                        <p className="font-mono text-[length:var(--text-mono)] text-[color:color-mix(in_srgb,var(--color-bg)_60%,transparent)]">
                          {src.cite}
                        </p>
                        <h3 className="mt-2 font-display text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.008em] text-[color:var(--color-bg)]">
                          {src.name}
                        </h3>
                      </div>
                      <div className="md:col-span-8">
                        <p className="text-[length:var(--text-body)] leading-[1.65] text-[color:color-mix(in_srgb,var(--color-bg)_78%,transparent)]">
                          {src.body}
                        </p>
                      </div>
                    </div>
                  </RevealItem>
                ))}
                <div className="border-t border-[color:color-mix(in_srgb,var(--color-bg)_15%,transparent)]" />
              </RevealStagger>
            </div>
          </div>
        </Container>
      </Section>

      {/* Not a lawyer */}
      <Section>
        <Container width="default">
          <Reveal>
            <div className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-surface)] p-8 md:p-10">
              <p className="eyebrow">Disclosure</p>
              <h3 className="mt-3 font-display text-[1.625rem] leading-[1.2] tracking-[-0.012em] text-[color:var(--color-ink)]">
                Krellix is software, not legal advice.
              </h3>
              <p className="mt-4 max-w-[64ch] text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                The product produces artifacts that are widely accepted as defensible —
                industry-standard hashes and a public TSA timestamp, with documentation a
                third party can verify. Whether any specific collection is admissible in
                any specific matter depends on jurisdiction, opposing counsel, the judge,
                the scope of the hold, and facts about the custodian that Krellix can&apos;t
                know. We do not guarantee admissibility. If you&apos;re on a matter with real
                stakes, a qualified attorney should review your preservation plan before
                collection. That&apos;s true with or without Krellix.
              </p>
              <p className="mt-4 text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)]">
                Questions about fit?{" "}
                <Link href="/about" className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]">
                  Read about the founder
                </Link>{" "}
                or{" "}
                <a
                  href="mailto:sales@krellix.app"
                  className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                >
                  email sales
                </a>.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

function ProtocolStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="grid gap-3 border-t border-[var(--color-border)] pt-5 md:grid-cols-12">
      <div className="md:col-span-2">
        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
          {num}
        </span>
      </div>
      <div className="md:col-span-10">
        <h3 className="font-display text-[1.375rem] leading-[1.2] tracking-[-0.01em] text-[color:var(--color-ink)]">
          {title}
        </h3>
        <p className="mt-2 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
          {body}
        </p>
      </div>
    </div>
  );
}

const pillars = [
  {
    title: "Integrity",
    body:
      "A hash proves a specific byte sequence existed. If even one bit of a collected file changed after Krellix wrote it — accidentally or otherwise — the hash stops matching. A reviewer can run a one-line command and get a yes/no on every file in the export.",
    technical: "SHA-256 · MD5",
  },
  {
    title: "Authenticity of time",
    body:
      "A third-party timestamp proves the collection existed by a specific moment. Without it, the collection's timestamps are metadata your adversary can claim was fabricated. With it, the claim becomes a forgery allegation against DigiCert.",
    technical: "RFC 3161 · TSA signature",
  },
  {
    title: "Chain of custody",
    body:
      "A manifest records who the operator was, who the custodian was, what tenant the collection was pulled from, what query produced the results, and what counts came back. Combined with the hash and timestamp, it tells the entire authentication story on a single page.",
    technical: "ChainOfCustody.json",
  },
];

const hashClaims = [
  "The file written to disk was not altered between collection and delivery — any tampering breaks the match.",
  "The same file, collected twice, produces the same hash. Deduplication across the review set is exact, not approximate.",
  "Matching hashes with opposing counsel's copy establishes that both sides are reviewing the same byte-level material.",
  "Under Federal Rule of Evidence 902(14), a certified copy of an electronic record authenticated by a cryptographic hash is self-authenticating.",
];

const legalSources = [
  {
    cite: "FRE 901(a)",
    name: "Authenticating evidence",
    body:
      "The proponent must produce evidence sufficient to support a finding that the item is what the proponent claims. For a digital collection, that means you can explain where it came from, who collected it, how it was preserved, and demonstrate that it hasn't been altered. The Krellix manifest and hash manifest answer those four questions in writing.",
  },
  {
    cite: "FRE 902(14)",
    name: "Self-authentication by hash",
    body:
      "Added in 2017. Certified electronic data authenticated by a cryptographic hash is self-authenticating if the process is described by a qualified person. This is the specific rule that makes SHA-256 admissible without additional foundation witnesses for the hash itself — you still need the foundation for the collection process, but the integrity proof is automatic.",
  },
  {
    cite: "FRCP 26(f) + 34",
    name: "Discovery and preservation",
    body:
      "The meet-and-confer obligation requires parties to discuss preservation at the outset. Producing a defensibly-collected set — one with hashes and a chain-of-custody manifest — preempts fights over form and completeness. The Sedona Conference commentaries recommend this approach specifically for avoiding motions to compel re-production.",
  },
  {
    cite: "RFC 3161",
    name: "Time-Stamp Protocol",
    body:
      "The IETF standard for public-key timestamping. A TSA signs a hash of your data together with a trusted timestamp, producing a token any third party can verify against the TSA's certificate chain. Krellix uses DigiCert, Sectigo, and GlobalSign — all WebTrust-audited public TSAs whose timestamps are accepted by Adobe Reader, OpenSSL, and every major forensics tool.",
  },
];
