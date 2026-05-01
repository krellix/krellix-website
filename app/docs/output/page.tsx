import type { Metadata } from "next";
import Link from "next/link";
import { OutputTree } from "@/components/output-tree";

export const metadata: Metadata = {
  title: "Understanding output",
  description:
    "The Krellix export structure explained folder by folder, with what each file contains and who should open it.",
  alternates: { canonical: "/docs/output" },
};

export default function OutputDocsPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Output</p>
      <h1>The Krellix export, file by file.</h1>
      <p>
        Every Krellix collection writes the same structure. Two files sit at the export
        root — the master review PDF and the verification script — and everything else
        lives in numbered folders so Windows Explorer sorts them in the order a reviewer
        would want to open them: native sources, derived PDFs, attachments, reports,
        logs, integrity records, cryptographic proof.
      </p>

      <div className="not-prose my-10">
        <OutputTree />
      </div>

      <h2 id="root-files">At the export root</h2>
      <p>
        Two files sit alongside the numbered folders. They are deliberately at the top
        level so a reviewer who has never used Krellix can open the export and find the
        primary deliverable and the verification script without hunting.
      </p>
      <ul>
        <li>
          <code>Master_{`{case}`}_{`{date}`}.pdf</code> — the single combined PDF of every
          collected email, in chronological order, preceded by the cover report. This is
          the file a reviewing attorney opens first. Bates ranges, attachment markers,
          and the table of contents are all built in.
        </li>
        <li>
          <code>VerifyTimestamp.bat</code> — a self-running Windows batch script that
          re-hashes every file in the export and verifies the RFC 3161 timestamp. A
          reviewer double-clicks it to confirm the export is intact. No Krellix license
          required.{" "}
          <Link href="/docs/chain-of-custody">Walk-through here</Link>.
        </li>
      </ul>

      <h2 id="01-native">01_NativeEmails/</h2>
      <p>
        The evidentiary originals — one <code>.eml</code> file per message, byte-for-byte
        as Microsoft Graph returned it. Messages are organized into thread subfolders so
        a reviewer can open a single conversation without scanning the whole collection.
      </p>
      <ul>
        <li>
          Thread folders are named{" "}
          <code>{`{date}`}_[Thread]_{`{first 32 chars of subject}`}/</code>.
        </li>
        <li>
          Each <code>.eml</code> file is named{" "}
          <code>{`{Bates}`}_{`{YYYY-MM-DD_HHmmss}`}_{`{from}`}_to_{`{to}`}.eml</code>.
        </li>
        <li>
          Alongside every <code>.eml</code> sits a matching{" "}
          <code>{`{...}`}_Headers.txt</code> with the parsed RFC 5322 headers in plain
          text — useful for a reviewer who wants to read the routing trail without opening
          a mail client.
        </li>
      </ul>
      <p>
        <code>.eml</code> is RFC 5322 — every mail client can open it, and standard
        tooling like <code>python email.parser</code> can walk the MIME tree
        programmatically.
      </p>

      <h2 id="02-pdfs">02_PDFs/</h2>
      <p>
        A searchable PDF for every email, organized into the same thread subfolders as{" "}
        <code>01_NativeEmails/</code>. The PDF is generated from a structured layout —
        header with from/to/cc/subject/date, body rendered as text (not a screenshot),
        and an attachment list at the bottom. If Bates numbering is enabled, the Bates
        range is stamped on every page.
      </p>
      <p>
        The single combined PDF that lawyers usually want is{" "}
        <code>Master_{`{case}`}_{`{date}`}.pdf</code> at the export root, not inside this
        folder. Use the per-message PDFs in <code>02_PDFs/</code> when you need to produce
        a specific email in isolation.
      </p>

      <h2 id="03-attachments">03_Attachments/</h2>
      <p>
        Native attachment files, preserved in their original format. A 200 KB .docx goes
        out as 200 KB .docx — Krellix does not convert attachments to PDF or re-encode
        them. The folder is flat (no subfolders); each attachment&apos;s filename is{" "}
        <code>{`{Bates}`}_{`{originalName}`}</code> so the production sequence sorts
        naturally and the link back to the parent email is unambiguous.
      </p>

      <h2 id="04-reports">04_Reports/</h2>
      <p>
        Human-readable reports and Purview-style CSV indexes. Anything a reviewer or
        opposing counsel might want to load into Excel, Relativity, Everlaw, or read
        directly is here.
      </p>
      <ul>
        <li>
          <code>CoverReport.pdf</code> — the title page that&apos;s also bound into the
          master PDF. Records case name, operator, custodian, date range, search terms,
          and counts.
        </li>
        <li>
          <code>EmailIndex.xlsx</code> — Excel workbook with two sheets (emails and
          attachments), one row per item. The workbook reviewing attorneys typically open
          first.
        </li>
        <li>
          <code>Items.csv</code> — Purview-style load file. One row per email keyed by
          Bates ID, with all metadata plus SHA-256 and MD5. Loads cleanly into review
          platforms expecting a Purview-format index.
        </li>
        <li>
          <code>Summary.csv</code> — top-line statistics in Purview-style format
          (counts, date range, custodian, deduplicated total).
        </li>
        <li>
          <code>Locations.csv</code> — per-search-term record of which folders or
          contacts were searched and what each one returned.
        </li>
        <li>
          <code>Errors.csv</code> — machine-readable record of any messages that failed
          to process. The file is always written so its absence isn&apos;t ambiguous;
          it&apos;s empty when nothing failed.
        </li>
        <li>
          <code>CustodianRecord.txt</code> — human-readable narrative of who collected
          what, from where, when, and under what authority. The file a paralegal would
          paste into a declaration.
        </li>
        <li>
          <code>SearchTermReport.txt</code> — narrative version of{" "}
          <code>Locations.csv</code>.
        </li>
        <li>
          <code>DeduplicationReport.txt</code> — records the duplicate Message-IDs that
          were excluded from the export, so opposing counsel can confirm no unique
          content was discarded.
        </li>
        <li>
          <code>ProcessingErrorReport.txt</code> — only present when something failed.
          Human-readable companion to <code>Errors.csv</code>.
        </li>
      </ul>

      <h2 id="05-logs">05_Logs/</h2>
      <p>
        The operation log of the collection run.
      </p>
      <ul>
        <li>
          <code>ExportLog.txt</code> — plain-text, auditor-readable log of every action
          Krellix took, in chronological order, with UTC timestamps. Every Graph call,
          every retry, every message written, every skip. The log is formatted for a
          human auditor; no parsing required.
        </li>
      </ul>

      <h2 id="06-hashes">06_HashManifests/</h2>
      <p>
        The integrity records. This folder is what <code>VerifyTimestamp.bat</code>{" "}
        checks against, and what gets sealed by the RFC 3161 timestamp.
      </p>
      <ul>
        <li>
          <code>ChainOfCustody.txt</code> — the chain-of-custody manifest. Plain text,
          human-readable, with section headers. Records operator identity, tenant,
          machine name, custodian, search criteria, counts, and the SHA-256 hash of every
          file in the export. This is the document a lawyer attaches to a declaration.
        </li>
        <li>
          <code>FileHashes.txt</code> — plain-text list of every file in the export with
          its SHA-256 hash. Standard format read by the verification script and by
          PowerShell <code>Get-FileHash</code>.
        </li>
      </ul>

      <h2 id="07-timestamp">07_TimestampMaterials/</h2>
      <p>
        The RFC 3161 artifacts. This folder is what transforms the collection from &ldquo;I
        collected this&rdquo; to &ldquo;this existed by 13:47:18 UTC on 2026-04-18, signed by
        DigiCert.&rdquo;
      </p>
      <ul>
        <li>
          <code>TimestampProof.tsr</code> — the RFC 3161 timestamp token returned by the
          TSA. Binary file containing a cryptographic signature over the SHA-256 hash of{" "}
          <code>ChainOfCustody.txt</code>. The TSA&apos;s certificate chain is embedded in
          this file, so verification doesn&apos;t depend on the TSA still being online ten
          years from now. Same standard used by DocuSign and Adobe Sign.
        </li>
        <li>
          <code>TimestampRequest.tsq</code> — the original TimeStampReq sent to the TSA
          (RFC 3161 §3.2). Kept for auditability.
        </li>
        <li>
          <code>TimestampInfo.txt</code> — human-readable summary of the timestamp
          transaction: which TSA was used, the UTC time recorded, the hash algorithm, and
          the verification command. The file a reviewer reads if they want to know what
          happened without running the script.
        </li>
      </ul>

      <h2 id="08-documents">08_Documents/ (Enterprise only)</h2>
      <p>
        Only present when an Enterprise-mode collection includes OneDrive or SharePoint
        documents. Contains <code>OneDrive/</code> and <code>SharePoint/</code>{" "}
        subfolders organized by custodian or site, with Bates-numbered native files.
        Every file in this folder is hashed and listed in{" "}
        <code>FileHashes.txt</code> alongside the email artifacts.
      </p>

      <h2 id="what-is-not-in-the-export">What is deliberately not in the export</h2>
      <ul>
        <li>
          <strong>The license file.</strong> The export does not include any
          Krellix-specific data that would tie it to a license seat. The artifact stands
          on its own.
        </li>
        <li>
          <strong>Telemetry or phone-home markers.</strong> Krellix does not record
          anything that would let us identify whether a specific export was produced by a
          specific customer&apos;s install. The only provenance metadata is what the
          manifest itself discloses: operator identity and Krellix version.
        </li>
        <li>
          <strong>Proprietary container formats.</strong> No .pst, no .olm, no encrypted
          archive. Everything is plain — by design.
        </li>
      </ul>

      <h2 id="next">Next steps</h2>
      <ul>
        <li>
          <Link href="/docs/chain-of-custody">Verify a collection</Link> — the
          step-by-step re-verification process.
        </li>
        <li>
          <Link href="/security">Security</Link> — the design decisions behind these
          files and how they hold up under review.
        </li>
      </ul>
    </>
  );
}
