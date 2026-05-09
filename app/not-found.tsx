import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/container";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Container width="narrow" className="py-32 md:py-44">
      <div className="flex items-baseline justify-between border-b border-[var(--color-border-strong)] pb-3">
        <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.2em] text-[color:var(--color-ink-subtle)]">
          § 404 · Page not found
        </p>
        <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.2em] text-[color:var(--color-ink-subtle)]">
          Folio &mdash;
        </p>
      </div>
      <h1 className="mt-10 font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04] tracking-[-0.022em] text-balance text-[color:var(--color-ink)]">
        That one&rsquo;s
        <span className="block italic text-[color:var(--color-ink-muted)]" style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}>
          missing from the record.
        </span>
      </h1>
      <p className="mt-7 max-w-[54ch] text-[length:var(--text-body-lg)] leading-[1.62] text-[color:var(--color-ink-soft)]">
        Whatever you were looking for isn&rsquo;t here. If you followed a link from an older page or a PDF, the URL may have moved when we renamed the product from CCS ThreadVault to Krellix. The documentation has landing pages for the most common arrivals:
      </p>

      <ul className="mt-10 border-y-2 border-double border-[var(--color-border-strong)] divide-y divide-[var(--color-border)]">
        {fallbacks.map((item, i) => (
          <li key={item.href} className="grid grid-cols-[auto_1fr] items-baseline gap-5 py-5">
            <span className="font-mono text-[length:var(--text-mono-sm)] tabular text-[color:var(--color-ink-subtle)]">
              §&nbsp;{String(i + 1).padStart(2, "0")}
            </span>
            <div>
              <Link href={item.href} className="font-display text-[1.25rem] leading-[1.25] tracking-[-0.008em] text-[color:var(--color-ink)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]">
                {item.title}
              </Link>
              <p className="mt-1 text-[length:var(--text-body-sm)] leading-[1.6] text-[color:var(--color-ink-muted)]">
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Button href="/" variant="primary" size="lg" arrow>
          Back to the title page
        </Button>
      </div>
    </Container>
  );
}

const fallbacks = [
  {
    href: "/docs/getting-started",
    title: "Getting started",
    body: "Install Krellix and run your first collection.",
  },
  {
    href: "/docs/enterprise-setup#admin-consent",
    title: "Enterprise tenant setup",
    body: "The admin-consent and mailbox-permission steps.",
  },
  {
    href: "/docs/chain-of-custody",
    title: "Verifying a collection",
    body: "How a forensic expert re-verifies your output.",
  },
];
