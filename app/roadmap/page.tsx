import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Roadmap",
  description:
    "What we're building, in plain language. Items shipping today, items in active development, and items planned but not yet committed to a date.",
  alternates: { canonical: "/roadmap" },
};

type Item = { title: string; body: string };

export default function RoadmapPage() {
  return (
    <>
      <PageHero
        eyebrow="Roadmap"
        eyebrowNumber="01"
        title={<>What we&apos;re building, in plain language.</>}
        lede={
          <>
            We publish this roadmap because we want you to know where Krellix is
            heading before you commit to it. Items in &ldquo;Coming next&rdquo; are
            in active development. Items in &ldquo;On the horizon&rdquo; are planned
            but not yet committed to a date.
          </>
        }
      >
        <p className="max-w-[60ch] text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
          If something you need isn&apos;t on this roadmap and you&apos;d find it
          valuable, tell us at{" "}
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
          >
            {siteConfig.contact.email}
          </a>
          . The fastest way to get a feature prioritized is to be the customer who
          needs it.
        </p>
      </PageHero>

      {/* Available now */}
      <Section tone="surface" divider>
        <Container width="wide">
          <SectionHeader number="02" eyebrow="Available now" title="What Krellix Mail does today.">
            Shipping in v{siteConfig.appVersion}, on every install.
          </SectionHeader>
          <ItemList items={availableNow} />
        </Container>
      </Section>

      {/* Coming next */}
      <Section>
        <Container width="wide">
          <SectionHeader
            number="03"
            eyebrow="Coming next"
            title="In active development for the next release."
          >
            Targeted for the next minor release. Names of features here are firm; the
            release date is approximate.
          </SectionHeader>
          <ItemList items={comingNext} />
        </Container>
      </Section>

      {/* On the horizon */}
      <Section tone="surface" divider>
        <Container width="wide">
          <SectionHeader
            number="04"
            eyebrow="On the horizon"
            title="Planned, but not committed to a release."
          >
            The order they ship in depends on what customers tell us they need most.
          </SectionHeader>
          <ItemList items={onTheHorizon} />
        </Container>
      </Section>

      {/* Trust and verification */}
      <Section>
        <Container width="wide">
          <SectionHeader
            number="05"
            eyebrow="Trust and verification"
            title="The certifications and attestations we’re working toward."
          >
            We&rsquo;re honest about what&rsquo;s in progress versus what&rsquo;s
            planned but not yet started.
          </SectionHeader>
          <ItemList items={trust} />
        </Container>
      </Section>

      {/* What we won't build */}
      <Section tone="surface" divider>
        <Container width="wide">
          <SectionHeader
            number="06"
            eyebrow="What we won’t build"
            title="Asks we’ve thought about and decided no."
          >
            We get asked about these regularly. We&rsquo;ve thought about them, and
            the answer is no — at least for the foreseeable future.
          </SectionHeader>
          <ItemList items={wontBuild} />
        </Container>
      </Section>

      {/* How we decide */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="07">How we decide what&apos;s next</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Three inputs, in order.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <ol className="space-y-0">
                {decisionInputs.map((item, i) => (
                  <Reveal key={item.title} delay={0.04 * i}>
                    <li className="grid gap-4 border-t border-[var(--color-border)] py-7 md:grid-cols-12 md:gap-8">
                      <div className="md:col-span-1">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="md:col-span-11">
                        <h3 className="font-display text-[1.25rem] leading-[1.25] tracking-[-0.008em]">
                          {item.title}
                        </h3>
                        <p className="mt-2 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  </Reveal>
                ))}
                <li className="border-t border-[var(--color-border)]" />
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* Release cadence */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="08">Release cadence</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Six to ten weeks between meaningful releases.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="space-y-5 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    Krellix Mail ships meaningful releases every 6&ndash;10 weeks.
                    Critical bug fixes and security updates ship as soon as
                    they&apos;re ready.
                  </p>
                  <p>
                    You&apos;ll be notified by email when a new version is available.
                    Releases are always opt-in &mdash; you choose when to install.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Contact */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="09">Questions, suggestions, requests</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  We read everything.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="space-y-5 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    Email{" "}
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                    >
                      {siteConfig.contact.email}
                    </a>{" "}
                    anytime. For security-related disclosures, email{" "}
                    <a
                      href="mailto:security@krellix.app"
                      className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                    >
                      security@krellix.app
                    </a>{" "}
                    &mdash; we acknowledge within 24 hours.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <p className="mt-10 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                  Last updated: May 2026. This roadmap reflects current plans and is
                  subject to change.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner />
    </>
  );
}

function SectionHeader({
  number,
  eyebrow,
  title,
  children,
}: {
  number: string;
  eyebrow: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="grid gap-10 md:grid-cols-12 md:items-end">
      <div className="md:col-span-7">
        <Reveal>
          <Eyebrow number={number}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
            {title}
          </h2>
        </Reveal>
        {children ? (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-[56ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
              {children}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}

function ItemList({ items }: { items: Item[] }) {
  return (
    <div className="mt-12">
      <RevealStagger>
        {items.map((item, i) => (
          <RevealItem key={item.title}>
            <div className="grid gap-4 border-t border-[var(--color-border)] py-7 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-1">
                <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-[1.25rem] leading-[1.25] tracking-[-0.008em] text-[color:var(--color-ink)]">
                  {item.title}
                </h3>
              </div>
              <p className="md:col-span-7 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                {item.body}
              </p>
            </div>
          </RevealItem>
        ))}
        <div className="border-t border-[var(--color-border)]" />
      </RevealStagger>
    </div>
  );
}

const availableNow: Item[] = [
  {
    title: "Defensible email collection from Microsoft 365",
    body: "Sign in with your own Microsoft 365 account and collect email correspondence with full chain of custody — SHA-256 file hashes, RFC 3161 trusted timestamps from DigiCert, and a self-verifying manifest that proves your export is unaltered.",
  },
  {
    title: "Two collection modes",
    body: "Collect by correspondent (every email between you and a specific person, with Outlook-style autocomplete) or by folder (everything inside any mailbox folder, with optional subfolder inclusion).",
  },
  {
    title: "Forensically sound output",
    body: "Every export includes the original .eml files, individual PDFs (one per email), a combined PDF (the full conversation), a chain-of-custody manifest, a deduplication report, and a self-running verification script.",
  },
  {
    title: "Bates numbering",
    body: "Sequential Bates IDs assigned across the entire export, with a configurable prefix or one auto-derived from your case name. Bates IDs are embedded in filenames, included in the load-file index, and shown in PDF metadata.",
  },
  {
    title: "Date-range filtering",
    body: "Restrict any collection to a specific date range — by correspondent or by folder.",
  },
  {
    title: "Items.csv load file",
    body: "Machine-readable index of every email, keyed by Bates ID, with full metadata and SHA-256 / MD5 hashes. Imports directly into many review platforms.",
  },
  {
    title: "Local processing, always",
    body: "Your email content never leaves your machine. Krellix talks to Microsoft Graph and to a timestamp authority for the cryptographic seal — nothing else. No cloud upload, no third-party processing, no Krellix-side storage of your data. Ever.",
  },
  {
    title: "Built for solo and small-firm matters",
    body: "No IT department required. No admin approval needed for Personal mode.",
  },
  {
    title: "Enterprise mode for IT-equipped firms",
    body: "Custodian mailbox, OneDrive, and SharePoint collection with delegated permissions and admin oversight.",
  },
];

const comingNext: Item[] = [
  {
    title: "Concordance DAT load file format",
    body: "In addition to Items.csv, generating true Concordance DAT format for direct import into Relativity, Concordance, and Veritas workflows that require the legacy DAT format.",
  },
  {
    title: "Bates stamps burned onto every PDF page",
    body: "Today, Bates IDs appear in PDF metadata, in filenames, and in the load-file index. Coming next: a visible Bates stamp on every page of every PDF, so the Bates number is preserved when individual pages are printed, screenshotted, or excerpted.",
  },
  {
    title: "EDRM XML exports",
    body: "Open-standard alternative to vendor-specific load files. Use with any EDRM-aware review tool.",
  },
  {
    title: "Keyword filtering for folder collection",
    body: "Search-keyword filters on top of the folder picker, so you can collect “everything in the Smith case folder containing ‘power of attorney’” without taking the whole folder.",
  },
];

const onTheHorizon: Item[] = [
  {
    title: "Microsoft Teams collection",
    body: "Chat messages, call transcripts, and shared files with the same chain-of-custody rigor as email.",
  },
  {
    title: "Slack collection",
    body: "Channel messages, direct messages, and shared files from Slack workspaces.",
  },
  {
    title: "Google Workspace support",
    body: "Gmail and Google Drive collection for firms that don't run on Microsoft 365.",
  },
  {
    title: "Outlook PST file ingestion",
    body: "Apply Krellix's chain-of-custody rigor to an existing PST archive without re-collecting from a live mailbox.",
  },
  {
    title: "Shared mailbox collection in Personal mode",
    body: "For paralegals and case managers who collect from a partner's mailbox where access has already been granted.",
  },
  {
    title: "Email thread visualization",
    body: "Preview conversation threads grouped together before you commit to the export.",
  },
];

const trust: Item[] = [
  {
    title: "Microsoft Publisher Verified — in progress",
    body: "When you sign in to Krellix Mail, you'll see Microsoft's “verified publisher” badge on the consent dialog.",
  },
  {
    title: "Code signing certificate — in progress",
    body: "Every Krellix Mail installer is digitally signed by Krellix LLC.",
  },
  {
    title: "SOC 2 Type II readiness — planned",
    body: "Customers requiring formal compliance documentation can request our current security and privacy posture document at security@krellix.app.",
  },
  {
    title: "Microsoft 365 App Compliance Program — planned",
    body: "Working toward Publisher Attestation and ultimately full Microsoft 365 Certification.",
  },
];

const wontBuild: Item[] = [
  {
    title: "Mac and Linux versions",
    body: "Krellix is Windows-only. The legal market is overwhelmingly Windows, and building cross-platform versions would slow the work we're doing on Windows. If you're on Mac or Linux, run Krellix in a Windows VM (Parallels, VMware Fusion, Boot Camp).",
  },
  {
    title: "Cloud / SaaS version",
    body: "Krellix processes your email locally on your machine, on purpose. Sending email content to our servers — even temporarily, even encrypted — would undermine the privacy guarantees that make Krellix appropriate for confidential and privileged material.",
  },
  {
    title: "Document review platform",
    body: "Krellix is a collection tool. After you collect with Krellix, you review and produce in a dedicated review platform (Relativity, Everlaw, Logikcull) or use the PDF outputs directly.",
  },
  {
    title: "AI-powered email summarization",
    body: "We will not add features that send your email content to third-party AI services.",
  },
];

const decisionInputs: Item[] = [
  {
    title: "Customer requests",
    body: "If you need something not on this list, tell us — we read every email.",
  },
  {
    title: "Defensibility impact",
    body: "Features that strengthen the chain of custody, improve the integrity of the export, or make Krellix output more admissible take priority over convenience features.",
  },
  {
    title: "Engineering practicality",
    body: "We balance impact against effort so we can keep shipping useful improvements regularly.",
  },
];
