import type { Metadata } from "next";
import Link from "next/link";
import { OutputTree } from "@/components/output-tree";

export const metadata: Metadata = {
  title: "Understanding output",
  description:
    "The seven-folder Krellix export structure explained folder by folder, with what each file contains and who should open it.",
  alternates: { canonical: "/docs/output" },
};

export default function OutputDocsPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Output</p>
      <h1>The seven folders, and what&apos;s in each.</h1>
      <p>
        Every Krellix export writes the same top-level structure. The folders are numbered
        so Windows Explorer sorts them in the order a reviewer would want to open them —
        native sources first, derived artifacts next, cryptographic materials last.
      </p>

      <div className="not-prose my-10">
        <OutputTree />
      </div>

      <h2 id="01-native">01_NativeEmails/</h2>
      <p>
        One <code>.eml</code> file per message, byte-for-byte as Microsoft Graph returned
        it. These are the authoritative originals. File names are{" "}
        <code>[receivedDate]_[subject-slug]_[graphId-tail].eml</code>. The Graph message
        ID appears both in the filename and inside the manifest so you can cross-reference
        without parsing filenames.
      </p>
      <p>
        <code>.eml</code> is RFC 5322 — every mail client can open it, and standard
        tooling like <code>openssl smime</code> or{" "}
        <code>python email.parser</code> can walk the MIME tree programmatically.
      </p>

      <h2 id="02-pdfs">02_PDFs/</h2>
      <p>
        A searchable PDF for every email, with embedded native attachments. The PDF is
        generated from a structured layout — header with from/to/cc/subject/date, body
        rendered as text (not a screenshot), and an attachment list at the bottom. If
        Bates numbering is enabled, the Bates range is stamped on every page.
      </p>
      <ul>
        <li>
          Per-message PDFs are named{" "}
          <code>[receivedDate]_[subject-slug]_[graphId-tail].pdf</code>, parallel to the
          native files.
        </li>
        <li>
          <code>Thread_Combined.pdf</code> is the full collection rolled into a single
          chronological PDF, with a table of contents linking to each message. This is the
          file most reviewers start with.
        </li>
      </ul>

      <h2 id="03-attachments">03_Attachments/</h2>
      <p>
        Native attachment files, preserved in their original format. A 200 KB .docx goes
        out as 200 KB .docx — Krellix does not convert attachments to PDF or re-encode
        them. Filenames are{" "}
        <code>[receivedDate]_[emailSubjectSlug]_[originalAttachmentName]</code> so sort
        order matches the containing email.
      </p>
      <p>
        If Bates is enabled, each attachment filename is prefixed with its Bates number.
      </p>

      <h2 id="04-reports">04_Reports/</h2>
      <p>Review-oriented reports intended to be read by humans, not machines.</p>
      <ul>
        <li>
          <code>CollectionSummary.html</code> — counts, date range, custodian identity,
          query, storage footprint. Open in any browser; no dependencies.
        </li>
        <li>
          <code>DeduplicationReport.csv</code> — one row per duplicate found during
          collection, with the matching hash and the retained file path. Useful for
          reviewers who need to show opposing counsel that no unique content was
          discarded.
        </li>
        <li>
          <code>KQLQuery.txt</code> — the exact Graph <code>$filter</code> expression used
          for this collection. Re-runnable by another tool or re-verifiable by a third
          party.
        </li>
        <li>
          <code>SkippedItems.csv</code> — any messages that couldn&apos;t be collected and why
          (permission issue, encrypted content, corrupt message). Empty in a clean
          collection, but the file is always written so its absence isn&apos;t ambiguous.
        </li>
      </ul>

      <h2 id="05-logs">05_Logs/</h2>
      <p>
        The operation log. Every Graph call with request ID, status code, and elapsed
        time; every retry with reason; every message written with hash and size. Rotated
        by day if the collection spans multiple calendar days.
      </p>
      <p>
        The logs are plain text, structured as JSON lines (one JSON object per line).
        Standard log-ingestion tooling (<code>jq</code>, Splunk forwarders, Elastic agents)
        can parse them without a custom adapter.
      </p>

      <h2 id="06-hashes">06_HashManifests/</h2>
      <p>
        SHA-256 and MD5 for every file in the export. Three formats of the same data, for
        different downstream tools:
      </p>
      <ul>
        <li>
          <code>Hashes.sha256.txt</code> — standard <code>sha256sum</code> format, verify
          with <code>sha256sum -c Hashes.sha256.txt</code>.
        </li>
        <li>
          <code>Hashes.md5.txt</code> — standard <code>md5sum</code> format, verify with{" "}
          <code>md5sum -c Hashes.md5.txt</code>.
        </li>
        <li>
          <code>Hashes.csv</code> — one row per file with path, relative folder, size,
          SHA-256, MD5. Loads cleanly into Excel, Relativity, Everlaw, and most review
          platforms.
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
          <code>ChainOfCustody.json</code> — the signed manifest itself. Records operator
          identity, tenant, custodian, query, counts, per-file hashes, and the TSA used.
        </li>
        <li>
          <code>manifest.tsq</code> — the TimeStampReq sent to the TSA (RFC 3161 §3.2).
          Contains the SHA-256 hash of the manifest and a nonce.
        </li>
        <li>
          <code>manifest.tsr</code> — the TimeStampResp returned by the TSA. This is the
          file a reviewer validates to prove the manifest existed at a specific moment.
        </li>
        <li>
          <code>TSA.pem</code> — the TSA&apos;s public certificate and intermediate chain,
          captured at the moment of timestamping. Needed for third-party verification so
          you don&apos;t have to trust that the TSA&apos;s cert won&apos;t be re-issued or revoked
          later.
        </li>
        <li>
          <code>VERIFY.md</code> — step-by-step verification instructions with the exact
          OpenSSL commands for the reviewer.{" "}
          <Link href="/docs/chain-of-custody">Also on the Krellix site</Link>.
        </li>
      </ul>

      <h2 id="what-is-not-in-the-export">What is deliberately not in the export</h2>
      <ul>
        <li>
          <strong>The license file.</strong> The export does not include any
          Krellix-specific data that would tie it to a license seat. The artifact stands on
          its own.
        </li>
        <li>
          <strong>Telemetry or phone-home markers.</strong> Krellix does not record
          anything that would let us identify whether a specific export was produced by a
          specific customer&apos;s install. The only provenance metadata is what the manifest
          itself discloses: operator identity and Krellix version.
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
          <Link href="/why-defensible">Why defensible</Link> — the legal and technical
          framework behind each of these files.
        </li>
      </ul>
    </>
  );
}
