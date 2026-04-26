import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/button";
import { Eyebrow } from "@/components/eyebrow";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container width="narrow" className="py-32 md:py-48">
      <Eyebrow number="404">Page not found</Eyebrow>
      <h1 className="mt-6 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.022em] text-balance">
        That one&rsquo;s missing.
      </h1>
      <p className="mt-6 max-w-[52ch] text-[length:var(--text-body-lg)] leading-[1.6] text-[color:var(--color-ink-muted)]">
        Whatever you were looking for isn&rsquo;t here. If you followed a link from an older page or a PDF, the URL may have moved when we renamed the product from CCS ThreadVault to Krellix. The documentation has landing pages for the most common arrivals:
      </p>
      <ul className="mt-8 grid gap-3 text-[length:var(--text-body)]">
        <li>
          <Link href="/docs/getting-started" className="underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]">
            Getting started
          </Link>{" "}
          — install Krellix and run your first collection.
        </li>
        <li>
          <Link href="/docs/enterprise-setup#admin-consent" className="underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]">
            Enterprise tenant setup
          </Link>{" "}
          — the admin-consent and mailbox-permission steps.
        </li>
        <li>
          <Link href="/docs/chain-of-custody" className="underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]">
            Verifying a collection
          </Link>{" "}
          — how a forensic expert re-verifies your output.
        </li>
      </ul>
      <div className="mt-12">
        <Button href="/" variant="primary" size="lg" arrow>
          Back to the homepage
        </Button>
      </div>
    </Container>
  );
}
