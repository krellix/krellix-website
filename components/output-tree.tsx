import { cn } from "@/lib/utils";

type Node = {
  name: string;
  note?: string;
  children?: Node[];
};

/**
 * The export structure every Krellix collection produces. Two files
 * sit at the export root (the master PDF and the verification
 * script); everything else is in numbered folders so file-system
 * sort order matches logical review order. 08_Documents/ is
 * Enterprise-only and only present if OneDrive/SharePoint collection
 * was enabled.
 *
 * These names and notes track EmailExporter.cs and ChainOfCustody.cs
 * in the app. If they drift, the export structure documented here
 * will be wrong, so treat this tree as documentation of the real
 * output, not as marketing copy.
 */
const tree: Node[] = [
  {
    name: "Master_{case}_{date}.pdf",
    note: "Single combined PDF of every collected email in chronological order, preceded by the cover report. The primary deliverable for review.",
  },
  {
    name: "VerifyTimestamp.bat",
    note: "Self-running Windows script that re-hashes every file and verifies the RFC 3161 timestamp. Run it any time to prove the export is intact.",
  },
  {
    name: "01_NativeEmails/",
    note: "The evidentiary originals. Organized into thread subfolders.",
    children: [
      { name: "{date}_[Thread]_{subject}/", note: "One folder per email thread. Contains .eml files (RFC 822) and matching Headers.txt files." },
    ],
  },
  {
    name: "02_PDFs/",
    note: "One PDF per email, organized into the same thread subfolders as 01_NativeEmails. Bates-numbered if enabled.",
  },
  {
    name: "03_Attachments/",
    note: "Native attachment files preserved in their original format. Bates-prefixed filenames sort by production sequence.",
  },
  {
    name: "04_Reports/",
    note: "Human-readable reports and Purview-style CSV indexes.",
    children: [
      { name: "CoverReport.pdf", note: "Title page for the master PDF — case, operator, custodian, date range, search terms, counts." },
      { name: "EmailIndex.xlsx", note: "Excel workbook with one row per email, two sheets (emails and attachments). The workbook lawyers actually open." },
      { name: "Items.csv", note: "Purview-style load file. One row per email keyed by Bates ID, with all metadata + SHA-256 + MD5." },
      { name: "Summary.csv", note: "Top-line statistics in Purview-style format." },
      { name: "Locations.csv", note: "Per-search-term record of which folders or contacts were searched and what each returned." },
      { name: "Errors.csv", note: "Machine-readable record of any messages that failed to process. Empty when nothing failed." },
      { name: "CustodianRecord.txt", note: "Human-readable narrative of who collected what, from where, when, under what authority." },
      { name: "SearchTermReport.txt", note: "Narrative version of Locations.csv." },
      { name: "DeduplicationReport.txt", note: "Records duplicate Message-IDs that were excluded from the export." },
    ],
  },
  {
    name: "05_Logs/",
    note: "Operation log of the collection run.",
    children: [
      { name: "ExportLog.txt", note: "Plain-text, auditor-readable log of every action Krellix took, in chronological order, with UTC timestamps." },
    ],
  },
  {
    name: "06_HashManifests/",
    note: "The integrity records. This folder is what VerifyTimestamp.bat checks against.",
    children: [
      { name: "ChainOfCustody.txt", note: "The chain-of-custody manifest. Plain text, human-readable. Records operator, tenant, machine, custodian, search criteria, and the SHA-256 hash of every file. The document a lawyer attaches to a declaration." },
      { name: "FileHashes.txt", note: "Plain-text list of every file in the export with its SHA-256 hash. Standard format read by the verification script." },
    ],
  },
  {
    name: "07_TimestampMaterials/",
    note: "RFC 3161 cryptographic proof of when the collection occurred.",
    children: [
      { name: "TimestampProof.tsr", note: "The RFC 3161 timestamp token returned by the TSA (DigiCert by default). Binary file containing a cryptographic signature over the manifest hash. Same standard used by DocuSign and Adobe Sign." },
      { name: "TimestampRequest.tsq", note: "The original timestamp request that was sent to the TSA. Kept for auditability." },
      { name: "TimestampInfo.txt", note: "Human-readable summary of the timestamp transaction — TSA used, time recorded, hash algorithm, verification command." },
    ],
  },
  {
    name: "08_Documents/",
    note: "Only present when Enterprise mode collects OneDrive/SharePoint documents. Contains OneDrive/ and SharePoint/ subfolders with Bates-numbered files.",
  },
];

export function OutputTree({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] p-5 md:p-7",
        className,
      )}
    >
      <ul className="space-y-4">
        {tree.map((node) => (
          <TreeRow key={node.name} node={node} depth={0} />
        ))}
      </ul>
    </div>
  );
}

function TreeRow({ node, depth }: { node: Node; depth: number }) {
  const isFolder = node.name.endsWith("/");
  return (
    <li>
      <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4">
        <span
          className={cn(
            "font-mono text-[length:var(--text-mono)] tabular-nums",
            depth === 0 ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-ink-muted)]",
            isFolder && depth === 0 ? "text-[0.95rem]" : "",
          )}
          style={{ paddingLeft: `${depth * 1.25}rem` }}
        >
          {depth > 0 ? <span className="mr-2 text-[color:var(--color-ink-subtle)]">└─</span> : null}
          {node.name}
        </span>
        {node.note ? (
          <span className="text-[length:var(--text-body-sm)] leading-[1.55] text-[color:var(--color-ink-muted)]">
            {node.note}
          </span>
        ) : null}
      </div>
      {node.children?.length ? (
        <ul className="mt-3 space-y-3">
          {node.children.map((c) => (
            <TreeRow key={c.name} node={c} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}
