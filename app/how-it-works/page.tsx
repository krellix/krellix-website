import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/button";
import { Reveal, RevealStagger, RevealItem } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { OutputTree } from "@/components/output-tree";
import { SealBadge } from "@/components/seal-badge";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "The two Krellix modes — Personal and Enterprise — explained end to end. Sign-in, scope, collection, hashing, RFC 3161 timestamping, and the seven-folder output.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        eyebrow="How it works"
        eyebrowNumber="01"
        title={<>Two modes, one output.</>}
        lede="Krellix has two operating modes. Choose based on who the custodian is — yourself, or somebody else in your tenant. Everything downstream of that choice is identical: the same hashes, the same timestamp, the same manifest."
      >
        <div className="flex flex-wrap gap-3">
          <SealBadge>Personal — your own correspondence</SealBadge>
          <SealBadge>Enterprise — another custodian&apos;s mailbox</SealBadge>
        </div>
      </PageHero>

      {/* Mode comparison */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-10 md:grid-cols-2">
            <Reveal>
              <ModeCard
                name="Personal"
                lede="The operator is the custodian. You're preserving your own email — by correspondent or by folder."
                audience="Solo and small-firm attorneys. An operator collecting their client correspondence or matter folders at the start of a matter."
                mailbox="Your own M365 mailbox, via /me/messages"
                filter="By correspondent (Outlook-style autocomplete), by folder (with subfolder inclusion), or by date range"
                docs="Email only. No OneDrive or SharePoint."
                consent="No admin consent required. User-consentable scopes — you sign in and collect in under a minute."
                scopes={["Mail.Read", "User.Read", "People.Read", "offline_access"]}
              />
            </Reveal>
            <Reveal delay={0.08}>
              <ModeCard
                name="Enterprise"
                lede="Somebody else is the custodian. You're preserving their mailbox, OneDrive, and SharePoint on behalf of the matter."
                audience="In-house counsel, HR, compliance officers, IT running custodian holds."
                mailbox="Named custodian's mailbox, via /users/{custodian}/messages"
                filter="Full mailbox or scoped by KQL, date range, folder, sender list"
                docs="Email plus OneDrive and SharePoint, scoped by custodian."
                consent="Tenant admin consent required once, plus Add-MailboxPermission granting the operator Full Access to each custodian mailbox."
                scopes={[
                  "User.Read",
                  "Mail.Read",
                  "Mail.Read.Shared",
                  "People.Read",
                  "Files.Read.All",
                  "Sites.Read.All",
                  "offline_access",
                ]}
                highlighted
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Walkthrough */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="02">End-to-end walkthrough</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  From sign-in to sealed export.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-[40ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  These are the actual steps the app walks through in order. A typical
                  collection takes under thirty minutes of operator time, and most of that
                  is Krellix running while you do something else.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <RevealStagger>
                {walkthrough.map((step, i) => (
                  <RevealItem key={step.title}>
                    <div className="grid gap-4 border-t border-[var(--color-border)] py-8 md:grid-cols-12 md:gap-8">
                      <div className="md:col-span-1">
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <div className="md:col-span-11">
                        <h3 className="font-display text-[length:var(--text-h3)] leading-[1.2] tracking-[-0.008em]">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-[length:var(--text-body)] leading-[1.65] text-[color:var(--color-ink-muted)]">
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

      {/* Output structure */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <Reveal>
                <Eyebrow number="03">What lands on disk</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Seven numbered folders.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-[40ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Named so they sort in the order a reviewer would want to see them: native
                  first, derived second, metadata last. Nothing in the export is a
                  proprietary format you can only read with Krellix.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="mt-8">
                  <Link
                    href="/docs/output"
                    className="group inline-flex items-center gap-2 text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    Understanding output, folder by folder
                    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </div>
              </Reveal>
            </div>
            <div className="md:col-span-8">
              <Reveal delay={0.1}>
                <OutputTree />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Choosing a mode */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="04">Which mode should I pick?</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.06] tracking-[-0.018em] text-balance">
                  Ask one question: who is the custodian?
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <div className="space-y-6 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    If the custodian is <span className="text-[color:var(--color-ink)]">you</span> —
                    if what you&apos;re preserving is your own correspondence with somebody
                    else, or your own matter folder — pick Personal. Collect by correspondent
                    or by folder (with subfolders, scoped by date range). No admin consent,
                    no mailbox permission grant. You can be collecting in under a minute.
                  </p>
                  <p>
                    If the custodian is <span className="text-[color:var(--color-ink)]">someone else in your tenant</span> —
                    a departed employee, a subject of an investigation, the other side of a
                    regulatory response — pick Enterprise. You&apos;ll need your tenant admin
                    to approve the scopes once and to grant you Full Access mailbox
                    permission on the custodian mailboxes you&apos;re authorized to collect.
                  </p>
                  <p className="text-[color:var(--color-ink)]">
                    The output is the same either way. The distinction is entirely about
                    the authorization model, not the defensibility of the result.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/docs/personal-setup" variant="primary" arrow>
                    Personal setup guide
                  </Button>
                  <Button href="/docs/enterprise-setup" variant="secondary">
                    Enterprise setup guide
                  </Button>
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

function ModeCard({
  name,
  lede,
  audience,
  mailbox,
  filter,
  docs,
  consent,
  scopes,
  highlighted,
}: {
  name: string;
  lede: string;
  audience: string;
  mailbox: string;
  filter: string;
  docs: string;
  consent: string;
  scopes: string[];
  highlighted?: boolean;
}) {
  return (
    <div
      className={
        "flex h-full flex-col rounded-md border p-7 md:p-8 " +
        (highlighted
          ? "border-[var(--color-seal-soft)] bg-[var(--color-seal-tint)]"
          : "border-[var(--color-border-strong)] bg-[var(--color-bg)]")
      }
    >
      <p className="eyebrow">Mode</p>
      <h3 className="mt-2 font-display text-[2.25rem] leading-[1.05] tracking-[-0.018em] text-[color:var(--color-ink)]">
        {name}
      </h3>
      <p className="mt-3 text-[length:var(--text-body-lg)] leading-[1.55] text-[color:var(--color-ink-muted)]">
        {lede}
      </p>

      <dl className="mt-8 space-y-5">
        <Row term="Built for" value={audience} />
        <Row term="Mailbox access" value={mailbox} />
        <Row term="Filtering" value={filter} />
        <Row term="Document collection" value={docs} />
        <Row term="Authorization" value={consent} />
      </dl>

      <div className="mt-8 border-t border-[var(--color-border)] pt-6">
        <p className="eyebrow">Graph scopes requested</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {scopes.map((scope) => (
            <code
              key={scope}
              className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] px-2.5 py-1 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink)]"
            >
              {scope}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ term, value }: { term: string; value: string }) {
  return (
    <div>
      <dt className="eyebrow">{term}</dt>
      <dd className="mt-1.5 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink)]">
        {value}
      </dd>
    </div>
  );
}

const walkthrough = [
  {
    title: "Pick a mode on the first screen",
    body:
      "Personal or Enterprise. The choice determines which Microsoft Graph scopes Krellix requests at sign-in, which UI controls appear, and whether the collection targets /me/messages or /users/{custodian}/messages. You can't change it mid-collection.",
  },
  {
    title: "Sign in with your Microsoft 365 account",
    body:
      "Krellix uses MSAL (Microsoft's own authentication library) to run the sign-in in the system browser. Your credentials never touch Krellix — the app only sees the resulting access token. In Enterprise mode, your tenant admin approves the scope set once per tenant; subsequent operators sign in without prompting.",
  },
  {
    title: "Identify the custodian and scope the query",
    body:
      "In Personal mode, choose a correspondent (Outlook-style autocomplete) or pick a folder, with optional subfolder inclusion and a date range. In Enterprise mode, enter the custodian's UPN and optionally restrict by date range, subject keyword, folder, or KQL filter. Krellix translates your inputs into a Graph $filter expression and shows it to you before the collection begins.",
  },
  {
    title: "Pre-flight probe",
    body:
      "Before collecting, Krellix runs a single MailFolders.GetAsync(Top=1) call against the target mailbox. This surfaces permission problems — a missing Add-MailboxPermission grant, a typo'd UPN, a disabled account — as a clean user-facing error instead of a mid-export 403 that leaves a half-completed collection on disk.",
  },
  {
    title: "Collection",
    body:
      "Krellix streams messages page by page. Each message is written as a native .eml, converted to a searchable PDF with the attachment list rendered inline, and its attachments are saved in their original format. A running SHA-256 and MD5 is computed for each file as it's written, not after the fact.",
  },
  {
    title: "Manifest + TSA timestamp",
    body:
      "When the collection finishes, Krellix writes ChainOfCustody.txt — the plain-text manifest describing who collected what, from whom, when, and with what query. It hashes that manifest, sends the hash to a public Time Stamp Authority (DigiCert by default, with Sectigo and GlobalSign as failovers), and stores the signed TSR token in 07_TimestampMaterials/. At that point the collection is sealed.",
  },
  {
    title: "Deliver",
    body:
      "The export is a folder on your disk. Hand it to opposing counsel, your eDiscovery vendor, or your reviewer as-is. Anyone who runs the bundled VerifyTimestamp.bat sees three checks pass: the RFC 3161 timestamp token decodes and shows the signing authority and UTC time; the manifest's SHA-256 matches the value sealed into the timestamp; every individual file in the export still hashes to its recorded value. No Krellix license required to verify.",
  },
];
