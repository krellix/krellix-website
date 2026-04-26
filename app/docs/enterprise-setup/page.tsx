import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enterprise setup",
  description:
    "The Enterprise-mode setup guide. Admin consent, Add-MailboxPermission, custodian onboarding, and the first cross-mailbox collection.",
  alternates: { canonical: "/docs/enterprise-setup" },
};

export default function EnterpriseSetupPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Enterprise setup</p>
      <h1>Enterprise mode: collect from another custodian.</h1>
      <p>
        Enterprise mode is for operators preserving somebody else&apos;s mailbox, OneDrive, or
        SharePoint content. It requires a one-time admin approval and a per-custodian
        mailbox permission grant. The payoff is full custodian coverage with the same
        defensibility guarantees as Personal mode.
      </p>

      <h2 id="what-enterprise-mode-does">What Enterprise mode does</h2>
      <p>
        Enterprise mode uses delegated Microsoft Graph permissions to pull mail from a
        custodian&apos;s mailbox (<code>/users/&#123;custodian&#125;/messages</code>), files
        from their OneDrive, and content from SharePoint sites they have access to. The
        operator signs in as themselves; every Graph call is made on their behalf and
        logged in the tenant audit trail.
      </p>
      <p>
        This is not an Application-permission tool. Krellix never asks for{" "}
        <code>Mail.Read.All</code> or similar tenant-wide Application scopes — those would
        break the delegated chain-of-custody story. Instead, the tenant admin grants the
        operator&apos;s sign-in the delegated scope set once, and then grants Full Access
        mailbox permission on each custodian mailbox the operator is authorized to
        collect.
      </p>

      <h2 id="prerequisites">Prerequisites</h2>
      <ul>
        <li>A Microsoft 365 tenant with Exchange Online.</li>
        <li>
          An operator account in the tenant. No special license required beyond a standard
          M365 seat.
        </li>
        <li>
          Tenant admin access to perform the one-time admin consent and the per-custodian
          mailbox permission grants (or an admin willing to do these on your behalf).
        </li>
        <li>
          For OneDrive/SharePoint collection: the operator needs either a privileged Entra
          role (Global Reader, Compliance Administrator, eDiscovery Manager) or site
          membership on the specific SharePoint sites being collected.
        </li>
      </ul>

      <h2 id="admin-consent">Admin consent (one-time)</h2>
      <p>
        The first operator to sign into Krellix in Enterprise mode will be prompted to
        request admin consent for six scopes:
      </p>
      <ul>
        <li><code>User.Read</code> — identify the operator in the manifest.</li>
        <li><code>Mail.Read</code> — the operator&apos;s own mailbox (fallback for self-collection scenarios).</li>
        <li><code>Mail.Read.Shared</code> — delegated access to custodian mailboxes the operator has permission on.</li>
        <li><code>Files.Read.All</code> — OneDrive collection. Admin-restricted.</li>
        <li><code>Sites.Read.All</code> — SharePoint collection. Admin-restricted.</li>
        <li><code>offline_access</code> — refresh tokens for long collections.</li>
      </ul>
      <h3 id="approving-admin-consent">Approving admin consent</h3>
      <p>The admin has two paths:</p>
      <ol>
        <li>
          <strong>From the consent dialog.</strong> If the admin clicks through the Krellix
          sign-in themselves, Microsoft shows a consent screen with a &ldquo;Consent on behalf
          of your organization&rdquo; checkbox. Approving with that checkbox ticked grants the
          scopes tenant-wide in a single click.
        </li>
        <li>
          <strong>From the Entra admin center.</strong> Navigate to{" "}
          <em>Microsoft Entra ID → Enterprise applications → Krellix Mail</em> (the app
          appears after the first sign-in attempt, even if consent wasn&apos;t granted). Open
          the app&apos;s <em>Permissions</em> tab and click{" "}
          <strong>Grant admin consent for [tenant]</strong>.
        </li>
      </ol>
      <p>
        After admin consent, subsequent operators in the same tenant sign in without
        seeing the consent dialog. The tenant is now provisioned.
      </p>

      <h2 id="mailbox-permission">Add-MailboxPermission (per custodian)</h2>
      <p>
        Admin consent alone does <strong>not</strong> grant the operator access to any
        specific mailbox. That is intentional — a delegated <code>Mail.Read.Shared</code>{" "}
        token only works against mailboxes where the token holder has explicit mailbox
        permission. For every custodian mailbox the operator is authorized to collect, the
        tenant admin must run the following Exchange Online PowerShell command:
      </p>
      <pre><code>{`Add-MailboxPermission \`
  -Identity  "custodian@yourtenant.com" \`
  -User      "operator@yourtenant.com" \`
  -AccessRights FullAccess \`
  -InheritanceType All \`
  -AutoMapping $false`}</code></pre>
      <p>
        <code>AutoMapping $false</code> keeps the custodian mailbox from automatically
        appearing in the operator&apos;s Outlook client. This is important: the goal is{" "}
        <em>programmatic</em> collection access, not an additional mailbox in the
        operator&apos;s Outlook folder list.
      </p>
      <p>
        The permission takes effect immediately, but token caches on the operator side can
        take up to 60 minutes to refresh. If Krellix returns a 403 on a custodian you just
        got permission for, sign out and sign back in to force a fresh token.
      </p>

      <h3 id="removing-mailbox-permission">Removing permission after collection</h3>
      <p>
        Best practice is to grant <code>FullAccess</code> for the duration of a specific
        matter and remove it after delivery. The reverse command:
      </p>
      <pre><code>{`Remove-MailboxPermission \`
  -Identity  "custodian@yourtenant.com" \`
  -User      "operator@yourtenant.com" \`
  -AccessRights FullAccess \`
  -InheritanceType All`}</code></pre>
      <p>
        The operator&apos;s past collections remain verifiable forever — revoking permission
        doesn&apos;t invalidate exports that were already sealed.
      </p>

      <h2 id="first-collection">First Enterprise collection</h2>
      <ol>
        <li>
          Open Krellix, pick <strong>Enterprise</strong>, and sign in with the operator
          account.
        </li>
        <li>
          On the collection screen, enter the custodian&apos;s UPN (e.g.{" "}
          <code>d.marquez@yourtenant.com</code>). Krellix validates the UPN by calling{" "}
          <code>/users/&#123;upn&#125;</code> — if the lookup fails, you&apos;ll see &ldquo;Custodian
          not found.&rdquo; Check the spelling and confirm the account is enabled.
        </li>
        <li>
          Choose which sources to collect: <strong>Mail</strong>,{" "}
          <strong>OneDrive</strong>, <strong>SharePoint</strong>. Each is independent —
          you can collect mail-only, or mail + OneDrive, or all three.
        </li>
        <li>
          Set the scope: date range, KQL filter, folder restriction, SharePoint site list,
          OneDrive subfolder path. Krellix shows the translated Graph filter for mail; for
          OneDrive/SharePoint it shows the exact drive and site IDs that will be walked.
        </li>
        <li>
          Click <strong>Run export</strong>. Krellix runs a pre-flight probe against each
          source — a <code>MailFolders.GetAsync(Top=1)</code> for mail, a{" "}
          <code>Drive.GetAsync</code> for OneDrive, a{" "}
          <code>Sites.Root.GetAsync</code> for SharePoint. If any probe returns 403, the
          operator is missing the required permission — the error names the specific
          source.
        </li>
      </ol>

      <h2 id="multi-custodian">Multi-custodian collections</h2>
      <p>
        A single Krellix collection targets one custodian. For matters spanning multiple
        custodians, run one collection per custodian; Krellix writes each into its own
        timestamped subfolder with its own manifest. At delivery time, zip the subfolders
        together and include a short cover letter referencing the collection IDs — those
        IDs appear in each ChainOfCustody.json and are stable.
      </p>
      <p>
        Deduplication across custodians is handled by matching SHA-256 hashes across the
        per-custodian manifests. The <code>DeduplicationReport.csv</code> in each
        collection lists hashes and gives you the inputs for cross-custodian dedup without
        having to open every file.
      </p>

      <h2 id="common-errors">Common errors during setup</h2>
      <ul>
        <li>
          <strong>AADSTS90094</strong> on sign-in: admin consent has not been granted for
          the tenant. Return to the <Link href="#admin-consent">admin consent</Link>{" "}
          section.
        </li>
        <li>
          <strong>403 on first mailbox read</strong>: admin consent is in place but
          mailbox permission isn&apos;t. Run{" "}
          <Link href="#mailbox-permission">Add-MailboxPermission</Link>.
        </li>
        <li>
          <strong>403 on OneDrive or SharePoint</strong>: the operator lacks the
          privileged role or site membership. Full list of required access in{" "}
          <Link href="/docs/troubleshooting">troubleshooting</Link>.
        </li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/output">Understand the output</Link>
        </li>
        <li>
          <Link href="/docs/chain-of-custody">Verify a collection</Link>
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting</Link>
        </li>
      </ul>
    </>
  );
}
