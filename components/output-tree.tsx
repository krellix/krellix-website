import { cn } from "@/lib/utils";

type Node = {
  name: string;
  note?: string;
  children?: Node[];
};

/**
 * The seven top-level folders every Krellix export produces.
 * Numbered so that file-system sort order matches logical review
 * order — an external reviewer opening the folder in Windows
 * Explorer sees the material in the sequence a lawyer would want:
 * native, PDFs, attachments, reports, logs, hashes, crypto.
 *
 * These names and notes track EmailExporter.cs in the app. If
 * they drift, ChainOfCustody.json's folder references will be
 * wrong, so treat this tree as documentation of the real output,
 * not as marketing copy.
 */
const tree: Node[] = [
  {
    name: "01_NativeEmails/",
    note: "Original .eml files as Microsoft Graph returned them. Byte-preserved.",
  },
  {
    name: "02_PDFs/",
    note: "One PDF per email with embedded attachments. Bates-numbered if enabled.",
    children: [
      { name: "Thread_Combined.pdf", note: "Chronological thread roll-up across all custodians." },
    ],
  },
  {
    name: "03_Attachments/",
    note: "Native attachment files. Names prefixed with Bates if enabled.",
  },
  {
    name: "04_Reports/",
    note: "Human-readable reports for review and production cover letters.",
    children: [
      { name: "CollectionSummary.html", note: "Counts, date ranges, custodian list." },
      { name: "DeduplicationReport.csv", note: "Every duplicate and the hash it matched on." },
      { name: "KQLQuery.txt", note: "Exact Graph filter used, re-runnable by another tool." },
    ],
  },
  {
    name: "05_Logs/",
    note: "Operation log. Every Graph call, every retry, every skip — timestamped.",
  },
  {
    name: "06_HashManifests/",
    note: "SHA-256 and MD5 for every file in the export.",
    children: [
      { name: "Hashes.sha256.txt", note: "Standard sha256sum format." },
      { name: "Hashes.md5.txt", note: "Standard md5sum format." },
      { name: "Hashes.csv", note: "Same data with file size, path, and relative folder." },
    ],
  },
  {
    name: "07_TimestampMaterials/",
    note: "RFC 3161 artifacts proving the manifest existed at a point in time.",
    children: [
      { name: "ChainOfCustody.json", note: "The signed manifest itself." },
      { name: "manifest.tsq", note: "Time-stamp request sent to the TSA." },
      { name: "manifest.tsr", note: "Time-stamp response — the thing you verify in court." },
      { name: "TSA.pem", note: "TSA certificate chain captured at timestamping." },
      { name: "VERIFY.md", note: "Step-by-step instructions for re-verification." },
    ],
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
