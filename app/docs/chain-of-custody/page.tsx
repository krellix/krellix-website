import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify a collection",
  description:
    "Step-by-step instructions for re-hashing every file in a Krellix export and re-validating the RFC 3161 timestamp using the bundled VerifyTimestamp.bat script. No Krellix license required.",
  alternates: { canonical: "/docs/chain-of-custody" },
};

export default function VerifyPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Verify a collection</p>
      <h1>Verify a Krellix collection from scratch.</h1>
      <p>
        Every Krellix export ships with a self-running verification script,{" "}
        <code>VerifyTimestamp.bat</code>, sitting at the export root. A reviewer
        double-clicks it. The script does three things, prints the results, and
        exits — no Krellix license, no third-party tooling, no command-line skills.
      </p>
      <p>
        This page walks through what the script does, what each result means, and how
        a sophisticated reviewer can run the same checks by hand using the standard
        Windows tools <code>certutil</code> and PowerShell <code>Get-FileHash</code>.
      </p>

      <h2 id="what-youre-verifying">What you&apos;re verifying</h2>
      <p>Three things, in this order:</p>
      <ol>
        <li>
          <strong>Timestamp authenticity.</strong> That{" "}
          <code>07_TimestampMaterials/TimestampProof.tsr</code> is a valid RFC 3161
          timestamp token, with a readable signing TSA, signing certificate, and UTC
          timestamp.
        </li>
        <li>
          <strong>Manifest integrity.</strong> That the SHA-256 of{" "}
          <code>06_HashManifests/ChainOfCustody.txt</code> matches the value that was
          submitted to the TSA. This catches modification of the manifest itself.
        </li>
        <li>
          <strong>File integrity.</strong> That every file listed in{" "}
          <code>06_HashManifests/FileHashes.txt</code> still hashes to its recorded
          value. This catches accidental or deliberate modification of any individual
          file.
        </li>
      </ol>
      <p>
        If any of the three fails, the export is not defensible and should not be
        relied on. If all three pass, you have cryptographic evidence that the
        collection existed, unchanged, at the recorded UTC time.
      </p>

      <h2 id="run-the-script">Run the script</h2>
      <ol>
        <li>Open the export folder in Windows Explorer.</li>
        <li>
          Double-click <code>VerifyTimestamp.bat</code>. It will open a console
          window and run automatically.
        </li>
        <li>
          Read the three result blocks. The script will pause at the end so you can
          see the output before the window closes.
        </li>
      </ol>
      <p>
        The script uses tools built into Windows: <code>certutil</code> for ASN.1
        decoding and hash computation, and PowerShell <code>Get-FileHash</code> for
        the per-file integrity sweep. There is nothing to install, and the script is
        plain text — open it in Notepad to read exactly what it does before running it.
      </p>

      <h2 id="what-the-script-prints">What the script prints</h2>

      <h3 id="block-1-timestamp">Block 1 — Timestamp token</h3>
      <p>
        The script runs <code>certutil -asn</code> against{" "}
        <code>TimestampProof.tsr</code> and prints the decoded ASN.1 structure. Look
        for the signing TSA name (DigiCert, Sectigo, or GlobalSign), the signing
        certificate&apos;s serial number, and the <code>genTime</code> field — the
        UTC moment the TSA recorded.
      </p>
      <p>
        That UTC time is what opposing counsel would have to dispute if they wanted
        to challenge when the collection was sealed.
      </p>

      <h3 id="block-2-manifest">Block 2 — Manifest hash</h3>
      <p>
        The script computes <code>SHA-256(ChainOfCustody.txt)</code> using PowerShell{" "}
        <code>Get-FileHash</code> and compares it against the expected hash that was
        submitted to the TSA at sealing time. The expected hash is embedded in the
        script when Krellix generates it, so the comparison is local — no network
        call.
      </p>
      <ul>
        <li>
          <strong>PASS</strong> — the manifest matches what the TSA signed. Together
          with Block 1, this proves the manifest existed in its current form at the
          recorded UTC time.
        </li>
        <li>
          <strong>FAIL</strong> — the manifest has been edited since collection. The
          timestamp no longer covers the current contents and the export is not
          defensible.
        </li>
      </ul>

      <h3 id="block-3-files">Block 3 — Per-file hashes</h3>
      <p>
        The script reads <code>FileHashes.txt</code> line by line and re-hashes every
        file in the export, again using <code>Get-FileHash</code>. Each file gets one
        of four results:
      </p>
      <ul>
        <li>
          <strong>PASS</strong> — the file&apos;s SHA-256 matches the value recorded
          at collection time.
        </li>
        <li>
          <strong>FAIL</strong> — the file is present but its hash does not match. The
          file has been modified.
        </li>
        <li>
          <strong>MISSING</strong> — a file listed in the manifest is no longer in the
          export. Something has been deleted.
        </li>
        <li>
          <strong>LOCKED</strong> — the file exists but couldn&apos;t be opened for
          hashing because another program is using it (commonly Excel, Notepad, or a
          OneDrive/Dropbox sync agent). Close the program and re-run the script.
        </li>
      </ul>
      <p>
        If every file is PASS, the export is intact. Any FAIL or MISSING means the
        export has been altered and its defensibility claims no longer hold.
      </p>

      <h2 id="advanced-manual">Advanced — verify by hand</h2>
      <p>
        A sophisticated reviewer can reproduce every check the script makes using the
        standard Windows tools. Open <code>cmd.exe</code> at the export root and run:
      </p>
      <p>Decode and inspect the timestamp token:</p>
      <pre><code>certutil -asn 07_TimestampMaterials\TimestampProof.tsr</code></pre>
      <p>
        The decoded output shows the signing TSA, the certificate chain, the policy
        OID, and the <code>genTime</code>. The certificate chain is embedded in the
        token itself — verification does not require fetching anything from the TSA.
      </p>
      <p>Compute the SHA-256 of the manifest:</p>
      <pre><code>certutil -hashfile 06_HashManifests\ChainOfCustody.txt SHA256</code></pre>
      <p>
        Compare the printed value to the expected hash recorded in{" "}
        <code>07_TimestampMaterials/TimestampInfo.txt</code> and used as the input to
        the timestamp request. They should be identical.
      </p>
      <p>Hash any individual file to confirm it matches the manifest:</p>
      <pre><code>certutil -hashfile {`<path-to-file>`} SHA256</code></pre>
      <p>
        Look up the same path in <code>FileHashes.txt</code> and confirm the
        SHA-256 values are byte-identical. Repeat for as many files as the
        engagement requires.
      </p>

      <h2 id="walk-through-manually">Walking through it in a hearing</h2>
      <p>
        If you need to do this in front of a judge or an expert, the short script is:
      </p>
      <ol>
        <li>
          Open the export folder. Show the numbered structure exists and the master
          PDF and verification script sit at the root.
        </li>
        <li>
          Double-click <code>VerifyTimestamp.bat</code>. Show all three blocks pass:
          timestamp valid, manifest matches, every file hashes correctly.
        </li>
        <li>
          Open <code>07_TimestampMaterials/TimestampInfo.txt</code>. Show the TSA
          name, signing time, and verification commands recorded in plain text.
        </li>
        <li>
          Open <code>06_HashManifests/ChainOfCustody.txt</code>. Read the operator,
          custodian, search criteria, and counts directly from the manifest the TSA
          signed.
        </li>
      </ol>
      <p>
        The entire walkthrough is one double-click and a couple of file opens. The
        foundation-witness time per collection is about two minutes.
      </p>

      <h2 id="common-questions">Common questions during verification</h2>
      <h3 id="revoked-cert">&ldquo;What if the TSA certificate has been revoked?&rdquo;</h3>
      <p>
        RFC 3161 timestamps are designed to remain valid even after the signing
        certificate is revoked, <em>as long as the revocation happened after the
        timestamp was issued</em>. The TSA&apos;s certificate chain — root,
        intermediate, and signing cert — is embedded inside{" "}
        <code>TimestampProof.tsr</code> at sealing time, so a verifier can confirm
        the cert was valid at <code>genTime</code> without fetching anything from the
        TSA. There is no separate certificate file to keep track of.
      </p>
      <h3 id="different-tsa">&ldquo;What if the collection used a different TSA?&rdquo;</h3>
      <p>
        Krellix tries DigiCert first, then Sectigo, then GlobalSign — whichever one
        responds successfully signs the token. The TSA actually used is recorded in{" "}
        <code>07_TimestampMaterials/TimestampInfo.txt</code> in plain text, and the
        certificate chain for that TSA is embedded inside{" "}
        <code>TimestampProof.tsr</code>. The verification process is identical
        regardless of which TSA signed the token, because every check operates on the
        token itself.
      </p>
      <h3 id="re-hash">&ldquo;Can I re-verify this ten years from now?&rdquo;</h3>
      <p>
        Yes, as long as you still have the export folder. SHA-256 will still be a
        standard hash function. <code>certutil</code> and PowerShell are built into
        Windows. The TSA certificate chain captured inside{" "}
        <code>TimestampProof.tsr</code> will still verify the timestamp — that&apos;s
        the point of embedding the chain at seal time. The only long-term risk is a
        future cryptographic break of SHA-256, which would be a problem for the
        entire industry, not specifically Krellix.
      </p>

      <h2 id="related">Related</h2>
      <ul>
        <li>
          <Link href="/docs/output">Understanding the export structure</Link>
        </li>
        <li>
          <Link href="/security">Security — design decisions behind the chain of custody</Link>
        </li>
        <li>
          <Link href="/docs/troubleshooting">Troubleshooting — verification failures</Link>
        </li>
      </ul>
    </>
  );
}
