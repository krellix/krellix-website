import Link from "next/link";
import { Container } from "./container";
import { Logo } from "./logo";
import { siteConfig, footerNav } from "@/lib/site-config";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--color-border-strong)] bg-[var(--color-bg)]">
      {/* Running-foot foliation strip */}
      <div className="border-b border-[var(--color-border)] bg-[var(--color-bg-deep)]">
        <Container width="wide" className="flex items-center justify-between py-2.5">
          <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
            Krellix Mail · Edition v{siteConfig.appVersion}
          </p>
          <p className="hidden font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)] md:block">
            Filed in {siteConfig.location.city}, {siteConfig.location.region}
          </p>
        </Container>
      </div>

      <Container width="wide" className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo />
            <p className="mt-5 max-w-sm text-[length:var(--text-body-sm)] leading-[1.55] text-[color:var(--color-ink-muted)]">
              {siteConfig.tagline}
            </p>
            <div className="mt-7">
              <p className="eyebrow">Office of record</p>
              <p className="mt-2 font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink)]">
                {siteConfig.location.city}, {siteConfig.location.region}
              </p>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-1 inline-block font-mono text-[length:var(--text-mono)] text-[color:var(--color-ink-muted)] underline decoration-1 underline-offset-4 hover:text-[color:var(--color-accent)]"
              >
                {siteConfig.contact.email}
              </a>
            </div>
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

        <div className="mt-16">
          <div className="rule-double" />
          <div className="mt-6 flex flex-col items-start justify-between gap-3 text-[length:var(--text-body-sm)] text-[color:var(--color-ink-muted)] md:flex-row md:items-center">
            <p>© {year} {siteConfig.legalName}. All rights reserved.</p>
            <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.16em] text-[color:var(--color-ink-subtle)]">
              Composed in Louisville · Set in Fraunces &amp; Inter Tight
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
