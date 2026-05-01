import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/container";
import { Section } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";
import { PageHero } from "@/components/page-hero";
import { CtaBanner } from "@/components/cta-banner";
import { SealBadge } from "@/components/seal-badge";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Krellix handles credentials, data flow, OAuth scopes, vendor chain, and vulnerability disclosure. Plain-English architecture decisions.",
  alternates: { canonical: "/security" },
};

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="Security"
        eyebrowNumber="01"
        title={<>Straight answers to the security review.</>}
        lede="Krellix is desktop software that runs on the operator's Windows machine. Collected data never touches a Krellix server, and the product does not phone home. This page documents the design decisions that make that true today, and the certifications we're working toward."
      >
        <div className="flex flex-wrap gap-3">
          <SealBadge>Data stays on your machine</SealBadge>
          <SealBadge>Delegated OAuth, no Application scopes</SealBadge>
          <SealBadge>No telemetry</SealBadge>
        </div>
      </PageHero>

      {/* Current security posture */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="02">Current security posture</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  What&apos;s in place today.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Krellix is in early pilot. The list below is what is shipping in v{siteConfig.appVersion} — not aspirational, not roadmap, just the current state of the build.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <ul className="space-y-3.5">
                  {currentPosture.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-[length:var(--text-body)] leading-[1.55] text-[color:var(--color-ink)]"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="mt-[0.3rem] flex-shrink-0">
                        <path
                          d="M3 8.5l3.5 3.5L13 4.5"
                          stroke="var(--color-accent)"
                          strokeWidth="1.6"
                          strokeLinecap="square"
                        />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* What's coming */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="03">What&rsquo;s coming</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Certifications we&apos;re working toward.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Status here mirrors the public{" "}
                  <Link
                    href="/roadmap"
                    className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    roadmap
                  </Link>
                  . If you need formal compliance documentation today, request our
                  current security and privacy posture document at{" "}
                  <a
                    href="mailto:security@krellix.app"
                    className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                  >
                    security@krellix.app
                  </a>
                  .
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <ul className="space-y-4">
                  {comingSoon.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <p className="font-display text-[1.0625rem] leading-[1.25] tracking-[-0.005em] text-[color:var(--color-ink)]">
                          {item.title}
                        </p>
                        <span className="font-mono text-[length:var(--text-mono)] uppercase tracking-[0.08em] text-[color:var(--color-ink-muted)]">
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-2 text-[length:var(--text-body-sm)] leading-[1.55] text-[color:var(--color-ink-muted)]">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Data flow */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="04">Data flow</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Where collected messages go.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  The short answer is: nowhere but your disk. The longer answer is the
                  table on the right.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="rounded-md border border-[var(--color-border-strong)] bg-[var(--color-bg)] overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-[var(--color-surface)]">
                        <th className="px-5 py-3 text-[length:var(--text-body-sm)] font-medium text-[color:var(--color-ink)] border-b border-[var(--color-border)]">
                          Data type
                        </th>
                        <th className="px-5 py-3 text-[length:var(--text-body-sm)] font-medium text-[color:var(--color-ink)] border-b border-[var(--color-border)]">
                          Where it lives
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataFlow.map((row) => (
                        <tr key={row.type}>
                          <td className="px-5 py-4 text-[length:var(--text-body)] text-[color:var(--color-ink)] border-b border-[var(--color-border)] last:border-b-0">
                            {row.type}
                          </td>
                          <td className="px-5 py-4 text-[length:var(--text-body)] text-[color:var(--color-ink-muted)] border-b border-[var(--color-border)] last:border-b-0">
                            {row.location}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Controls */}
      <Section>
        <Container width="wide">
          <Reveal>
            <Eyebrow number="05">Controls</Eyebrow>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 max-w-[28ch] font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
              Design decisions that matter for a security review.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {controls.map((c, i) => (
              <Reveal key={c.title} delay={0.03 * i}>
                <article className="flex h-full flex-col rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-7">
                  <p className="eyebrow">{c.label}</p>
                  <h3 className="mt-3 font-display text-[1.375rem] leading-[1.2] tracking-[-0.01em] text-[color:var(--color-ink)]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[length:var(--text-body)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                    {c.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Permissions */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="06">Microsoft Graph permissions</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  The scopes we ask for, and why.
                </h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 max-w-[48ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                  Krellix requests delegated scopes only — never Application permissions.
                  The operator signs in as themselves; every Graph call is made on their
                  behalf and logged under their identity in the tenant&apos;s audit log.
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="space-y-5">
                  {scopes.map((s) => (
                    <div
                      key={s.name}
                      className="rounded-sm border border-[var(--color-border)] bg-[var(--color-bg)] p-5"
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <code className="font-mono text-[length:var(--text-body)] text-[color:var(--color-ink)]">
                          {s.name}
                        </code>
                        <span className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)]">
                          {s.mode}
                        </span>
                      </div>
                      <p className="mt-2 text-[length:var(--text-body-sm)] leading-[1.55] text-[color:var(--color-ink-muted)]">
                        {s.why}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vulnerability disclosure */}
      <Section>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="07">Vulnerability disclosure</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-5 font-display text-[clamp(2rem,4.5vw,3rem)] leading-[1.08] tracking-[-0.018em] text-balance">
                  Found something? Tell us directly.
                </h2>
              </Reveal>
            </div>
            <div className="md:col-span-7">
              <Reveal delay={0.08}>
                <div className="space-y-5 text-[length:var(--text-body-lg)] leading-[1.65] text-[color:var(--color-ink-muted)]">
                  <p>
                    Email{" "}
                    <a
                      href={`mailto:${siteConfig.contact.email}?subject=Security%20disclosure`}
                      className="text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
                    >
                      {siteConfig.contact.email}
                    </a>{" "}
                    with the subject line &quot;Security disclosure.&quot; A human responds within
                    one business day. Critical issues — anything that could compromise a
                    customer&apos;s collection — are acknowledged within four hours during US
                    business hours.
                  </p>
                  <p>
                    We commit to working with reporters in good faith, not pursuing legal
                    action against reporters who follow this disclosure process, and
                    crediting reporters publicly if they want credit. No bug bounty yet —
                    Krellix is early — but we&apos;ll send a bottle of something nice and a
                    hand-written thank-you note for anything meaningful.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner
        title="Want a deeper security conversation before a pilot?"
        lede="Email and we'll set up a 30-minute call to walk through the data flow, the signing infrastructure, and any questions your infosec team wants answered in writing."
        primaryLabel="Email sales"
        primaryHref={`mailto:${siteConfig.contact.salesEmail}`}
        secondaryLabel="Request a pilot"
        secondaryHref="/contact"
      />
    </>
  );
}

const currentPosture = [
  "Local-only processing — collected email and documents never leave the operator's machine",
  "No telemetry — the app does not phone home and collects no usage analytics",
  "No cloud upload — Krellix has no server-side storage of customer content",
  "Encrypted local cache for in-flight collection state",
  "OAuth tokens stored in Windows DPAPI via the MSAL secure cache",
  "Crash logs written only to %APPDATA% on the operator's machine",
  "Delegated OAuth scopes only — never Application permissions",
  "Outbound traffic limited to Microsoft Graph and a public RFC 3161 timestamp authority",
  "Self-running verification script bundled with every export (VerifyTimestamp.bat)",
];

const comingSoon = [
  {
    title: "EV code-signing certificate",
    status: "In progress",
    body: "Certificate ordered. Pilot installers signed once issued.",
  },
  {
    title: "Microsoft Publisher Verification",
    status: "In progress",
    body: "Submitted. When approved, sign-in shows Microsoft's verified-publisher badge on the consent dialog.",
  },
  {
    title: "SOC 2 readiness program",
    status: "Planned",
    body: "Documentation and process work scheduled, not yet underway.",
  },
  {
    title: "Microsoft 365 App Compliance Program",
    status: "Planned",
    body: "Working toward Publisher Attestation and ultimately full M365 Certification.",
  },
  {
    title: "SOC 2 Type II audit",
    status: "Not in v3.x",
    body: "Not on the v3.x roadmap. We're being upfront rather than implying it's imminent.",
  },
];

const dataFlow = [
  { type: "Collected messages and attachments", location: "Operator's local disk, under the export folder they chose" },
  { type: "SHA-256 / MD5 hashes", location: "Operator's local disk, inside 06_HashManifests/" },
  { type: "Chain-of-custody manifest", location: "Operator's local disk, inside 07_TimestampMaterials/" },
  { type: "Hash of the manifest (for TSA request)", location: "Sent to a public Time Stamp Authority — DigiCert, Sectigo, or GlobalSign" },
  { type: "Access token (OAuth, short-lived)", location: "Windows DPAPI-protected token cache, operator's user profile only" },
  { type: "Refresh token", location: "Same DPAPI-protected cache, cleared on sign-out" },
  { type: "License file", location: "Operator's user profile, issued by Krellix license server at purchase time" },
  { type: "Telemetry / usage analytics", location: "Not collected. The app does not phone home." },
];

const controls = [
  {
    label: "Credentials",
    title: "Your password never reaches Krellix",
    body:
      "Sign-in is handled by MSAL (Microsoft Authentication Library) running the sign-in in the system browser. Krellix receives an access token and a refresh token; it never sees the password. You can sign out and revoke the refresh token at any time from the Microsoft 365 sign-ins page.",
  },
  {
    label: "Code signing",
    title: "EV code-signing in progress",
    body:
      "An EV code-signing certificate has been ordered and is being issued; pilot installers go out signed once it's in place. We're tracking the same goal toward Microsoft Publisher Verification so the M365 consent dialog shows the verified-publisher badge. Status of both is on the roadmap.",
  },
  {
    label: "Network egress",
    title: "Three outbound destinations, total",
    body:
      "During a collection, Krellix talks to Microsoft Graph (graph.microsoft.com) over TLS 1.2+, and once at the end of the collection to a public Time Stamp Authority. During license activation it talks to the Krellix license server. That's it. You can log every outbound connection and satisfy yourself it matches.",
  },
  {
    label: "Tenant audit log",
    title: "Every collection is logged under your identity",
    body:
      "Because Krellix uses delegated (not Application) permissions, every Graph call appears in your tenant's audit log with your UPN and the scope set you consented to. If your tenant has Microsoft Purview Audit or a SIEM ingesting Entra logs, the Krellix activity is visible there with no extra integration.",
  },
  {
    label: "Export integrity",
    title: "Tampering with an export is detectable",
    body:
      "Every file in the export is SHA-256 hashed. The hash manifest itself is hashed, and that hash is signed by a public TSA. Modifying any byte after the fact — in the native .eml, the attachments, or the manifest — breaks the hash chain and invalidates the TSA signature. Detection is a single OpenSSL command.",
  },
  {
    label: "License server",
    title: "License checks are periodic, not per-collection",
    body:
      "The license is checked at app startup and once every 24 hours thereafter while the app is running. If the license server is unreachable, the app runs with the cached license until the next successful check. A collection in progress will never be interrupted by a license check — the cryptographic artifacts would still be valid if Krellix the company ceased to exist mid-export.",
  },
];

const scopes = [
  {
    name: "User.Read",
    mode: "Both modes",
    why: "Read the operator's own profile to identify them in the chain-of-custody manifest (UPN, display name, object ID).",
  },
  {
    name: "Mail.Read",
    mode: "Both modes",
    why: "Read mail from /me/messages in Personal mode, and fall back to the operator's own mailbox for self-collection scenarios in Enterprise mode.",
  },
  {
    name: "People.Read",
    mode: "Both modes",
    why: "Power the Outlook-style autocomplete on the by-correspondent picker — surface the people you most often email so you don't have to type a full address. Read-only against your own people graph; no contact data is exported or sent off the machine.",
  },
  {
    name: "offline_access",
    mode: "Both modes",
    why: "Obtain a refresh token so a long-running collection doesn't require the operator to re-authenticate every hour.",
  },
  {
    name: "Mail.Read.Shared",
    mode: "Enterprise only",
    why: "Read a custodian's mailbox, authorized by Add-MailboxPermission granting the operator Full Access. The scope by itself doesn't grant access to any mailbox — the mailbox permission on the custodian side is what actually gates access.",
  },
  {
    name: "Files.Read.All",
    mode: "Enterprise only",
    why: "Read files from custodian OneDrive. Admin-restricted — tenant admin consent required on first sign-in.",
  },
  {
    name: "Sites.Read.All",
    mode: "Enterprise only",
    why: "Read files and pages from SharePoint sites the operator has membership on. Admin-restricted — tenant admin consent required on first sign-in.",
  },
];
