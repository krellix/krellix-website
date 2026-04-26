import type { Metadata } from "next";
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
        lede="Krellix is desktop software that runs on the operator's Windows machine. Collected data never touches a Krellix server, and the product does not phone home. This page documents the design decisions that make that true, and what you can verify for yourself."
      >
        <div className="flex flex-wrap gap-3">
          <SealBadge>Data stays on your machine</SealBadge>
          <SealBadge>Delegated OAuth, no Application scopes</SealBadge>
          <SealBadge>Signed Windows installer</SealBadge>
        </div>
      </PageHero>

      {/* Data flow */}
      <Section tone="surface" divider>
        <Container width="wide">
          <div className="grid gap-12 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <Eyebrow number="02">Data flow</Eyebrow>
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
            <Eyebrow number="03">Controls</Eyebrow>
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
                <Eyebrow number="04">Microsoft Graph permissions</Eyebrow>
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
                <Eyebrow number="05">Vulnerability disclosure</Eyebrow>
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
                  <p>
                    A standard{" "}
                    <code className="font-mono text-[length:var(--text-body-sm)]">/.well-known/security.txt</code>{" "}
                    file is published at the site root with the same contact information.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CtaBanner
        title="Want a deeper security conversation before a trial?"
        lede="Email sales and we'll set up a 30-minute call to walk through the data flow, the signing infrastructure, and any questions your infosec team wants answered in writing."
        primaryLabel="Email sales"
        primaryHref={`mailto:${siteConfig.contact.salesEmail}`}
        secondaryLabel="Start the trial anyway"
        secondaryHref="/trial"
      />
    </>
  );
}

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
    title: "Every release is signed",
    body:
      "The Windows installer and the compiled application are signed with an EV code-signing certificate issued by DigiCert. Windows SmartScreen, Microsoft Defender, and most endpoint security products recognize the signature and don't flag the installer as unknown-publisher.",
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
