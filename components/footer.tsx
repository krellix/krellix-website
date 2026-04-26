import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
import { siteConfig, footerNav } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
      <Container width="wide" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-[length:var(--text-body-sm)] leading-[1.55] text-[color:var(--color-ink-muted)]">
              {siteConfig.tagline}
            </p>
            <p className="mt-6 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
              {siteConfig.location.city}, {siteConfig.location.region}
            </p>
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className="mt-2 block font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink)] hover:text-[color:var(--color-accent)]"
            >
              {siteConfig.contact.email}
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 md:col-span-8 md:grid-cols-4">
            {footerNav.map((group) => (
              <div key={group.heading}>
                <p className="eyebrow">{group.heading}</p>
                <ul className="mt-4 space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)] transition-colors hover:text-[color:var(--color-ink)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-[var(--color-border)] pt-8 text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)] md:flex-row md:items-center">
          <div className="flex flex-col gap-1">
            <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
            <p className="text-[color:var(--color-ink-subtle)]">
              A product of{" "}
              <a
                href={siteConfig.parent.url}
                className="underline decoration-[var(--color-border-strong)] underline-offset-2 hover:text-[color:var(--color-ink)]"
                target="_blank"
                rel="noreferrer noopener"
              >
                {siteConfig.parent.name}
              </a>.
            </p>
          </div>
          <p className="font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-subtle)]">
            v{siteConfig.appVersion} · Built in {siteConfig.location.city}.
          </p>
        </div>
      </Container>
    </footer>
  );
}
