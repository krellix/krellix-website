import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Troubleshooting",
  description:
    "The errors Krellix operators actually hit and how to resolve them. Sign-in failures, permission issues, TSA timeouts, manifest verification failures.",
  alternates: { canonical: "/docs/troubleshooting" },
};

export default function TroubleshootingPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Troubleshooting</p>
      <h1>Errors you might actually hit.</h1>
      <p>
        Organized by where in the flow the problem surfaces: sign-in, pre-flight,
        collection, timestamping, verification. Every error Krellix shows has a
        user-facing code you can search for on this page.
      </p>

      <h2 id="sign-in">Sign-in errors</h2>

      <h3 id="aadsts90094">AADSTS90094 — Consent required</h3>
      <p>
        Microsoft is telling you admin consent hasn&apos;t been granted for one of the scopes
        Krellix is requesting. This is the most common first-sign-in error on Enterprise
        tenants with restrictive consent policies.
      </p>
      <p>
        <strong>Fix:</strong> a tenant admin needs to approve admin consent.{" "}
        <Link href="/docs/enterprise-setup#admin-consent">See the walkthrough</Link>. If
        the operator is not an admin themselves, forward them this page — the admin can
        grant consent from the Entra admin center in under a minute.
      </p>

      <h3 id="aadsts50020">AADSTS50020 — User account not found in tenant</h3>
      <p>
        The sign-in succeeded against a personal Microsoft account (MSA), but you were
        trying to sign into a work tenant. This happens when a user&apos;s email address is
        also registered as a personal MSA.
      </p>
      <p>
        <strong>Fix:</strong> on the sign-in screen, when Microsoft shows the &ldquo;Personal
        account&rdquo; vs &ldquo;Work or school account&rdquo; prompt, pick Work or school. If you
        don&apos;t see the prompt, try signing in from an InPrivate window to clear cached
        MSA state.
      </p>

      <h3 id="signing-in-unsigned">SmartScreen: &ldquo;Windows protected your PC&rdquo; on install</h3>
      <p>
        The Krellix installer is signed with a DigiCert EV certificate, so you should not
        see this. If you do, you may be running a pre-release build or an installer from
        an untrusted source.
      </p>
      <p>
        <strong>Fix:</strong> verify the file&apos;s signature. Right-click the installer,
        choose <em>Properties</em> → <em>Digital Signatures</em>, and confirm the signer
        is &ldquo;Krellix LLC&rdquo; with a valid DigiCert chain. If the signature is
        missing or invalid, re-download from the link in your pilot email — don&apos;t
        install.
      </p>

      <h2 id="pre-flight">Pre-flight errors</h2>

      <h3 id="probe-403">403 on MailFolders pre-flight probe</h3>
      <p>
        You&apos;re authorized to sign in but not authorized to read the target mailbox. In
        Enterprise mode, this almost always means the{" "}
        <code>Add-MailboxPermission</code> step hasn&apos;t been done for this custodian, or
        was done but hasn&apos;t propagated yet.
      </p>
      <p>
        <strong>Fix:</strong> have a tenant admin run the command in{" "}
        <Link href="/docs/enterprise-setup#mailbox-permission">Enterprise setup</Link>.
        After the command succeeds, sign out of Krellix and sign back in to force a fresh
        access token. Token caches on the operator side can take up to 60 minutes to
        refresh otherwise.
      </p>

      <h3 id="probe-404">404 on custodian lookup</h3>
      <p>
        The UPN you entered does not exist in this tenant. Common causes: typo, mailbox
        belongs to a different tenant, account was disabled/deleted, or you&apos;re signed in
        to the wrong tenant entirely.
      </p>
      <p>
        <strong>Fix:</strong> open the Microsoft 365 admin center and confirm the
        custodian&apos;s UPN exactly as written. UPNs are often different from primary SMTP
        addresses — some organizations use <code>first.last@tenant.onmicrosoft.com</code>{" "}
        as the UPN even when mail routes to <code>first.last@company.com</code>.
      </p>

      <h3 id="onedrive-403">403 on OneDrive or SharePoint probe</h3>
      <p>
        The operator is missing a role or site membership. <code>Files.Read.All</code> and{" "}
        <code>Sites.Read.All</code> are delegated scopes gated by the operator&apos;s Entra
        role and SharePoint site membership — the scope alone doesn&apos;t open access.
      </p>
      <p>
        <strong>Fix:</strong> the simplest path is to add the operator to one of these
        Entra roles: Global Reader, Compliance Administrator, or eDiscovery Manager.
        Alternatively, the tenant admin can add the operator as a site member (Read
        permission is enough) on every SharePoint site the collection touches.
      </p>

      <h2 id="collection">Collection errors</h2>

      <h3 id="throttling">429 — Request throttled</h3>
      <p>
        Microsoft Graph rate-limited a call. Krellix handles this automatically: it
        honors the <code>Retry-After</code> header and resumes. You shouldn&apos;t need to
        intervene unless throttling persists for more than 10 minutes, in which case the
        tenant may have a reduced Graph quota.
      </p>
      <p>
        <strong>Fix:</strong> wait it out. If throttling persists, run collections outside
        peak Exchange activity hours for your region (typically 0800–1100 local). Krellix
        writes the 429 events to <code>05_Logs/</code> so you can produce them if asked.
      </p>

      <h3 id="token-expired">InvalidAuthenticationToken mid-collection</h3>
      <p>
        The access token expired and the refresh token didn&apos;t renew it — usually because
        the refresh token itself was revoked (sign-out on another device, admin
        revocation, Conditional Access policy change).
      </p>
      <p>
        <strong>Fix:</strong> Krellix prompts you to re-sign-in. The collection resumes
        from the last successful message. No data is lost; the manifest records that the
        collection had a re-auth event in the middle.
      </p>

      <h3 id="corrupt-message">Message could not be serialized</h3>
      <p>
        A specific message is corrupt in the source mailbox (usually very old messages
        with non-standard MIME encoding, or messages that Outlook&apos;s offline cache has
        partially synced). Krellix skips the message, logs it to{" "}
        <code>04_Reports/Errors.csv</code> (machine-readable) and{" "}
        <code>04_Reports/ProcessingErrorReport.txt</code> (human-readable), and continues.
      </p>
      <p>
        <strong>Fix:</strong> review <code>Errors.csv</code> after the collection. For
        each skipped message, try opening it in the source mailbox; usually the message
        is unrecoverable at the source too. The manifest discloses the count of skipped
        items so opposing counsel can&apos;t claim you hid something.
      </p>

      <h2 id="timestamping">Timestamping errors</h2>

      <h3 id="tsa-timeout">TSA request timed out</h3>
      <p>
        The first-choice Time Stamp Authority didn&apos;t respond within 30 seconds. Krellix
        automatically falls back to Sectigo, then GlobalSign. If all three fail, the
        collection is written to disk but not sealed — you&apos;ll see &ldquo;Collection unsealed&rdquo;
        in the summary screen.
      </p>
      <p>
        <strong>Fix:</strong> check your internet connection. If the outbound network is
        healthy, the TSAs may all be having a bad day (rare). Click <strong>Retry timestamp</strong>{" "}
        — Krellix will try each TSA again, in order, without re-running the collection.
        When one succeeds, the export is sealed and the manifest updated.
      </p>

      <h3 id="tsa-firewall">TSA request rejected at network egress</h3>
      <p>
        Your firewall is blocking outbound HTTPS to the TSA endpoints. This is common in
        tightly-controlled corporate networks.
      </p>
      <p>
        <strong>Fix:</strong> allow outbound HTTPS to{" "}
        <code>timestamp.digicert.com</code>, <code>timestamp.sectigo.com</code>, and{" "}
        <code>timestamp.globalsign.com/tsa/r6advanced1</code>. These are the default
        Krellix TSA endpoints; they&apos;re public, WebTrust-audited, and used by every major
        code-signing tool. Your IT team can allowlist them by hostname.
      </p>

      <h2 id="verification">Verification errors</h2>

      <h3 id="hash-mismatch">VerifyTimestamp.bat reports FAIL on a file</h3>
      <p>
        One or more files in the export have been modified since collection, or the file
        is corrupt on disk. The script&apos;s third block prints FAIL for any file whose
        SHA-256 no longer matches the value recorded in <code>FileHashes.txt</code>.
      </p>
      <p>
        <strong>Fix:</strong> do not ship the export. Re-run the collection. If the
        failure is on a file that appears corrupt on disk (common on USB drives with
        silent bit-rot), copy from a known-good backup. Do not try to re-hash and
        overwrite the manifest — that invalidates the TSA timestamp.
      </p>

      <h3 id="manifest-mismatch">VerifyTimestamp.bat reports a manifest mismatch</h3>
      <p>
        The script&apos;s second block — the SHA-256 of{" "}
        <code>06_HashManifests/ChainOfCustody.txt</code> — does not match the expected
        value embedded in the script at sealing time. Something has modified the manifest
        since Krellix sealed it, and the timestamp no longer covers the current contents.
      </p>
      <p>
        <strong>Fix:</strong> treat the collection as unsealed. If you have a backup of
        the export in its sealed state, restore it. Otherwise the collection&apos;s
        defensibility is compromised and you&apos;ll need to re-run.
      </p>

      <h3 id="locked-file">VerifyTimestamp.bat reports LOCKED on a file</h3>
      <p>
        The file exists but couldn&apos;t be opened for hashing because another program is
        using it.
      </p>
      <p>
        <strong>Fix:</strong> close any program that has the file open — Excel, Word,
        Notepad, a PDF viewer, or a OneDrive/Dropbox sync agent are the usual culprits —
        and re-run the script. LOCKED is not a verification failure on its own; it just
        means the script couldn&apos;t complete the check until the file is released.
      </p>

      <h2 id="still-stuck">Still stuck?</h2>
      <p>
        Email <a href="mailto:support@krellix.app">support@krellix.app</a> with the error
        code and, if relevant, the tail of <code>05_Logs/</code>. You&apos;ll hear back from
        the founder the same business day. No tier-one, no ticket system — direct email
        works.
      </p>
    </>
  );
}
