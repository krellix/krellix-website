import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Verify a collection",
  description:
    "Step-by-step instructions for re-hashing every file in a Krellix export and re-validating the RFC 3161 timestamp with OpenSSL. No Krellix license required.",
  alternates: { canonical: "/docs/chain-of-custody" },
};

export default function VerifyPage() {
  return (
    <>
      <p className="eyebrow">Documentation · Verify a collection</p>
      <h1>Verify a Krellix collection from scratch.</h1>
      <p>
        This page is the same verification procedure bundled inside every Krellix export
        as <code>07_TimestampMaterials/VERIFY.md</code>. It&apos;s published here so
        opposing counsel, a reviewer, an expert witness, or a judge can see the steps
        without needing access to a specific export first.
      </p>
      <p>
        Verification does not require Krellix. It uses <code>sha256sum</code> (any Linux
        or macOS terminal; Windows via Git Bash or WSL) and <code>openssl</code> (widely
        preinstalled on macOS and Linux; bundled with Git for Windows).
      </p>

      <h2 id="what-youre-verifying">What you&apos;re verifying</h2>
      <p>Three things, in this order:</p>
      <ol>
        <li>
          <strong>File integrity.</strong> That every file in the export still hashes to
          the value recorded in the hash manifest. This catches accidental or deliberate
          modification after collection.
        </li>
        <li>
          <strong>Manifest integrity.</strong> That the hash of{" "}
          <code>ChainOfCustody.json</code> matches what was sent to the TSA. This catches
          modification of the manifest itself.
        </li>
        <li>
          <strong>Timestamp signature.</strong> That the TSA response (.tsr) is a valid
          signature over the manifest hash, issued by the TSA certificate in{" "}
          <code>TSA.pem</code>, at the UTC time the response records.
        </li>
      </ol>
      <p>
        If any of the three fails, the collection is <em>not</em> defensible and should
        not be relied on. If all three pass, you have cryptographic evidence that the
        collection existed, unchanged, at the recorded time.
      </p>

      <h2 id="step-1-hash-check">Step 1 — Verify file hashes</h2>
      <p>
        From the export root (the folder containing the numbered subfolders), run:
      </p>
      <pre><code>cd 06_HashManifests{"\n"}sha256sum -c Hashes.sha256.txt</code></pre>
      <p>
        Expected output: one <code>OK</code> line per file in the export, with no lines
        reading <code>FAILED</code>. If any file reports FAILED, stop — the export has
        been altered since collection and its defensibility claims no longer hold.
      </p>
      <p>
        For MD5 (if your downstream tooling prefers it):
      </p>
      <pre><code>md5sum -c Hashes.md5.txt</code></pre>

      <h2 id="step-2-manifest-hash">Step 2 — Verify the manifest hash</h2>
      <p>
        Compute the SHA-256 of the manifest and compare to the value recorded in the
        manifest&apos;s own <code>timestamp.manifestDigest</code> field:
      </p>
      <pre><code>cd ../07_TimestampMaterials{"\n"}sha256sum ChainOfCustody.json</code></pre>
      <p>
        Open <code>ChainOfCustody.json</code> in a text editor. Find the{" "}
        <code>timestamp</code> object near the end of the file. The{" "}
        <code>manifestDigest</code> field should equal the hash you just computed.
      </p>
      <p>
        If the two values match, nothing has modified the manifest since Krellix sealed
        it. If they don&apos;t match, the manifest has been edited after collection and the
        timestamp no longer covers the current contents.
      </p>

      <h2 id="step-3-verify-timestamp">Step 3 — Verify the TSA timestamp signature</h2>
      <p>
        The <code>.tsr</code> file is a PKCS#7 signed structure. OpenSSL can verify it
        against the TSA certificate chain captured at timestamping:
      </p>
      <pre><code>{`openssl ts -verify \\
  -data ChainOfCustody.json \\
  -in   manifest.tsr \\
  -CAfile TSA.pem`}</code></pre>
      <p>
        Expected output: <code>Verification: OK</code>. Anything else means either the TSA
        token does not cover the current manifest hash, the TSA certificate chain is
        broken, or the <code>.tsr</code> file has been tampered with.
      </p>

      <h3 id="extract-the-signing-time">Extract the signing time</h3>
      <p>
        To read the UTC time the TSA issued the signature — the moment the collection was
        sealed — run:
      </p>
      <pre><code>openssl ts -reply -in manifest.tsr -text | grep "Time stamp"</code></pre>
      <p>
        This prints the exact <code>genTime</code> from the TSA response. That time is
        what opposing counsel would have to dispute if they wanted to challenge when the
        collection occurred.
      </p>

      <h2 id="walk-through-manually">Walking through manually in a hearing</h2>
      <p>
        If you need to do this in front of a judge or an expert, the short script is:
      </p>
      <ol>
        <li>
          Mount the export. Show the seven folders exist and are named as the
          documentation describes.
        </li>
        <li>
          Run <code>sha256sum -c Hashes.sha256.txt</code>. Show the <code>OK</code>{" "}
          lines.
        </li>
        <li>
          Run <code>sha256sum ChainOfCustody.json</code> and show the output matches the{" "}
          <code>manifestDigest</code> field inside the JSON.
        </li>
        <li>
          Run the <code>openssl ts -verify</code> command and show{" "}
          <code>Verification: OK</code>.
        </li>
        <li>
          Run <code>openssl ts -reply</code> to show the <code>genTime</code> — the
          third-party attested timestamp.
        </li>
      </ol>
      <p>
        The entire walkthrough is four commands. The foundation-witness time per
        collection is about two minutes.
      </p>

      <h2 id="common-questions">Common questions during verification</h2>
      <h3 id="revoked-cert">&ldquo;What if the TSA certificate has been revoked?&rdquo;</h3>
      <p>
        RFC 3161 timestamps are designed to remain valid even after the signing
        certificate is revoked, <em>as long as the revocation happened after the
        timestamp was issued</em>. The TSA provides a CRL or OCSP response that a
        verifier can use to confirm the cert was valid at <code>genTime</code>. The
        timestamp token embeds the certificate chain, and{" "}
        <code>TSA.pem</code> was captured at timestamping — so everything you need for
        revocation-aware verification is in the export, not fetched from the TSA later.
      </p>
      <h3 id="different-tsa">&ldquo;What if the collection used a different TSA?&rdquo;</h3>
      <p>
        Krellix defaults to DigiCert and falls back to Sectigo and GlobalSign if DigiCert
        is unavailable. The TSA used is recorded in <code>ChainOfCustody.json</code> under{" "}
        <code>timestamp.tsa</code>, and <code>TSA.pem</code> contains the certificate chain
        for whichever TSA actually signed the token. The verification commands are
        identical regardless of which TSA is involved.
      </p>
      <h3 id="re-hash">&ldquo;Can I re-verify this ten years from now?&rdquo;</h3>
      <p>
        Yes, if you still have the export folder. The hash algorithms (SHA-256 and MD5)
        will still work. The TSA certificate chain in <code>TSA.pem</code> will still
        verify the timestamp token — that&apos;s the point of capturing the chain at seal
        time. The only long-term risk is a future cryptographic break of SHA-256, which
        would be a problem for the entire industry, not specifically Krellix.
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
