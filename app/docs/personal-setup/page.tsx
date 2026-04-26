import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Personal setup",
  description:
    "The Personal-mode setup guide. Sign in with your own Microsoft 365 credentials, scope a collection with a named contact, and export.",
  alternates: { canonical: "/docs/personal-setup" },
};

export default function PersonalSetupPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Personal setup</p>
      <h1>Personal mode: collect your own correspondence.</h1>
      <p>
        Personal mode is the minimal-friction path for solo operators preserving their own
        email with a named contact. It does not require admin consent, mailbox permission
        grants, or any coordination with IT.
      </p>

      <h2 id="what-personal-mode-does">What Personal mode does</h2>
      <p>
        Personal mode queries your own mailbox (<code>/me/messages</code>) and filters for
        messages to or from a named contact. The output is the same as any Krellix
        collection — native <code>.eml</code>, searchable PDFs, SHA-256/MD5 hash
        manifest, RFC 3161 timestamp, chain-of-custody manifest — but the custodian in
        the manifest is always <em>you</em>.
      </p>
      <p>
        If you need to collect from someone else&apos;s mailbox (a paralegal pulling a
        partner&apos;s correspondence, an HR investigator collecting a subject&apos;s messages),{" "}
        <Link href="/docs/enterprise-setup">use Enterprise mode</Link> instead — Personal
        is not the right tool.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>A Microsoft 365 mailbox — any license that includes Exchange Online is enough. Business Basic, Business Standard, Business Premium, and all E-plans work.</li>
        <li>Or any IMAP mailbox — Gmail (with an app password), iCloud, Yahoo, Fastmail, or a self-hosted IMAP server. Non-Microsoft paths skip the MSAL sign-in entirely.</li>
        <li>Windows 10 or 11, with at least 500 MB of disk space per 10,000 messages you expect to collect.</li>
      </ul>

      <h2 id="sign-in">Sign in</h2>
      <ol>
        <li>
          Launch Krellix Mail. On the mode selector, choose <strong>Personal</strong> and
          click <strong>Continue</strong>.
        </li>
        <li>
          On the sign-in screen, pick either <strong>Microsoft 365</strong> or{" "}
          <strong>IMAP</strong>. The flows diverge here; the rest of this guide assumes
          Microsoft 365. For IMAP, enter your server, port, username, and password (or
          app password for Gmail/Yahoo) — Krellix then connects over STARTTLS or TLS.
        </li>
        <li>
          For Microsoft 365, click <strong>Sign in with Microsoft</strong>. Your default
          browser opens to login.microsoftonline.com. Enter your credentials as you would
          for Outlook on the web.
        </li>
        <li>
          On the first sign-in, Microsoft shows a consent dialog listing three scopes:{" "}
          <code>Mail.Read</code>, <code>User.Read</code>, and{" "}
          <code>offline_access</code>. Approve. These are all user-consentable scopes — no
          admin approval is required.
        </li>
      </ol>
      <p>
        <strong>AADSTS90094.</strong> If you see this error on your own tenant, your
        tenant admin has the &ldquo;Let Microsoft manage your consent settings&rdquo; option turned on
        with a restrictive policy. Either ask your admin to approve the Krellix app for
        the tenant (the app listing ID is in the error) or switch to IMAP, which bypasses
        Entra consent entirely.
      </p>

      <h2 id="scope">Scope the collection</h2>
      <p>The main collection screen has four fields:</p>
      <ul>
        <li>
          <strong>Contact</strong> — the email address or display name of the person
          you corresponded with. Krellix uses this to filter to messages where the
          contact is either the sender or a recipient. You can enter multiple contacts
          separated by semicolons.
        </li>
        <li>
          <strong>Date range</strong> — optional. If left blank, Krellix collects
          everything that matches the contact filter.
        </li>
        <li>
          <strong>Folder scope</strong> — by default, Krellix searches all folders
          including Deleted Items and Archive. You can restrict to Inbox + Sent Items if
          you want a narrower set.
        </li>
        <li>
          <strong>Output folder</strong> — where the export will land on disk. Krellix
          creates a timestamped subfolder named{" "}
          <code>krx-[YYYYMMDD-HHMMSS]-[contact]</code> under this path.
        </li>
      </ul>
      <p>
        Once the fields are set, Krellix renders the translated Microsoft Graph{" "}
        <code>$filter</code> expression in a read-only box below the form. This is the
        literal query that will be sent — if you know KQL, read it once before clicking
        Run.
      </p>

      <h2 id="run">Run</h2>
      <p>
        Click <strong>Run export</strong>. Krellix performs a pre-flight{" "}
        <code>MailFolders.GetAsync(Top=1)</code> against your mailbox to confirm the token
        works, then begins streaming messages. Progress updates every 50 messages.
      </p>
      <p>
        Keep the machine awake. Krellix does not put the machine into sleep — if your
        Windows power settings would normally sleep after 30 minutes of inactivity,
        Krellix&apos;s ongoing network calls and disk writes count as activity for most
        settings, but not all. If you&apos;re running a multi-thousand-message collection,
        plug in.
      </p>

      <h2 id="output">Output</h2>
      <p>
        When the collection finishes, Krellix writes the manifest, hashes it, and sends
        the hash to DigiCert&apos;s public Time Stamp Authority. A notification appears when
        the timestamp token is stored. The export folder is now sealed.
      </p>
      <p>
        Open the export folder to see the{" "}
        <Link href="/docs/output">seven-folder structure</Link>. Hand it off as-is, or zip
        it first — the contents are all open formats, so the recipient doesn&apos;t need
        Krellix to read them.
      </p>

      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/output">Understand the output</Link> — what each of the seven
          folders contains.
        </li>
        <li>
          <Link href="/docs/chain-of-custody">Verify the collection</Link> — rerun the
          hash checks and re-validate the timestamp before you ship.
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting</Link> — if anything in the
          sign-in or collection went sideways.
        </li>
      </ul>
    </>
  );
}
