import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Getting started",
  description:
    "Install Krellix, sign in to Microsoft 365, and run your first collection in under fifteen minutes.",
  alternates: { canonical: "/docs/getting-started" },
};

export default function GettingStartedPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Getting started</p>
      <h1>From download to first export in fifteen minutes.</h1>
      <p>
        This is the short path. If you followed the pilot link in your email, you already
        have the installer and a license file. If not, start at{" "}
        <Link href="/contact">/contact</Link> and come back here once the installer has
        arrived.
      </p>

      <h2 id="install">Install</h2>
      <ol>
        <li>
          Double-click <code>Krellix-Setup-3.1.0.exe</code>. Windows SmartScreen may show a
          publisher confirmation — once our EV code-signing certificate is issued, the
          installer is signed by &ldquo;Krellix LLC.&rdquo;
        </li>
        <li>
          Install for the current user (the default). Installing machine-wide works too,
          but the license file is stored per-user, so each operator on a shared machine
          needs their own license.
        </li>
        <li>
          Launch Krellix Mail from the Start Menu. The first run asks for your license
          file — point it at the <code>.lic</code> you received by email.
        </li>
      </ol>

      <h2 id="pick-a-mode">Pick a mode</h2>
      <p>
        The first screen after license activation asks whether you&apos;re running Personal or
        Enterprise. This choice determines which Microsoft Graph scopes the sign-in
        requests. You can change it later by signing out, but not mid-collection.
      </p>
      <ul>
        <li>
          <strong>Personal</strong> — you&apos;re collecting your own correspondence with a
          named contact. No admin consent required. Jump to{" "}
          <Link href="/docs/personal-setup">Personal setup</Link>.
        </li>
        <li>
          <strong>Enterprise</strong> — you&apos;re collecting from another custodian&apos;s
          mailbox, OneDrive, or SharePoint. Requires tenant admin consent and a mailbox
          permission grant. Jump to{" "}
          <Link href="/docs/enterprise-setup">Enterprise setup</Link>.
        </li>
      </ul>

      <h2 id="sign-in">Sign in to Microsoft 365</h2>
      <p>
        Click <strong>Sign in with Microsoft</strong>. Krellix opens your default browser
        to the Microsoft sign-in page — this is MSAL, Microsoft&apos;s own authentication
        library, not a Krellix-built login screen. Your password never touches Krellix;
        only the resulting access token does.
      </p>
      <p>
        On your first Enterprise sign-in to a new tenant, you&apos;ll see a consent dialog
        listing the scopes Krellix is requesting. If you&apos;re not a tenant admin, the
        dialog will say an admin must approve the request on your behalf — send them to{" "}
        <Link href="/docs/enterprise-setup#admin-consent">the admin-consent walkthrough</Link>.
      </p>

      <h2 id="scope">Scope the collection</h2>
      <p>
        The main screen asks for a custodian and a filter. In Personal mode, the custodian
        is always you, and the filter is a contact (email address or display name) you
        corresponded with. In Enterprise mode, the custodian is a UPN; the filter can be
        a date range, subject keyword, folder, sender list, or a raw KQL expression.
      </p>
      <p>
        Before the collection runs, Krellix shows you the translated Graph{" "}
        <code>$filter</code> string. This is the exact query that will be sent — read it
        once. If the filter looks wrong, the export will be wrong. Nothing below this
        point is hidden.
      </p>

      <h2 id="run">Run the collection</h2>
      <p>
        Click <strong>Run export</strong>. Krellix performs a pre-flight probe (a single
        <code>MailFolders.GetAsync(Top=1)</code> call) to surface any permission problems
        up front, then begins streaming messages. Progress is shown as
        &ldquo;collected / expected&rdquo; — the expected number comes from a separate
        Graph count call, so if it&apos;s off by a few items that&apos;s usually new mail arriving
        mid-collection, not a bug.
      </p>

      <h2 id="seal">Seal and deliver</h2>
      <p>
        When the collection finishes, Krellix writes{" "}
        <code>ChainOfCustody.json</code>, hashes it, sends the hash to DigiCert&apos;s public
        Time Stamp Authority, and stores the signed timestamp response next to the
        manifest. At that point the export is sealed — any modification to any file in the
        export will break the chain on verification.
      </p>
      <p>
        The export is a folder on your disk. You can zip it, copy it to a USB stick, upload
        it to your review platform, or email it — Krellix has no opinion about what
        happens to it next.
      </p>

      <h2 id="verify">Verify (optional but recommended)</h2>
      <p>
        Before you deliver, run the verification script yourself. It&apos;s a five-line
        OpenSSL command documented in{" "}
        <Link href="/docs/chain-of-custody">Verify a collection</Link>. If verification
        fails on a brand-new export, something is wrong — don&apos;t ship a collection you
        haven&apos;t successfully verified.
      </p>

      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/output">Understand the output</Link> — what&apos;s in each of the
          seven folders.
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting</Link> — when something goes
          wrong mid-collection.
        </li>
        <li>
          <Link href="/docs/chain-of-custody">Chain of custody</Link> — how to verify a
          Krellix export end-to-end.
        </li>
      </ul>
    </>
  );
}
