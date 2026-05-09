"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type DocsNavGroup = {
  heading: string;
  links: { label: string; href: string }[];
};

export const docsNav: DocsNavGroup[] = [
  {
    heading: "Start here",
    links: [
      { label: "Docs home", href: "/docs" },
      { label: "Getting started", href: "/docs/getting-started" },
    ],
  },
  {
    heading: "Setup",
    links: [
      { label: "Personal setup", href: "/docs/personal-setup" },
      { label: "Enterprise setup", href: "/docs/enterprise-setup" },
    ],
  },
  {
    heading: "Understand the output",
    links: [
      { label: "Seven-folder export", href: "/docs/output" },
      { label: "Verify a collection", href: "/docs/chain-of-custody" },
    ],
  },
  {
    heading: "Operate",
    links: [{ label: "Troubleshooting", href: "/docs/troubleshooting" }],
  },
];

export function DocsSidebar({ className }: { className?: string }) {
  const pathname = usePathname() || "";
  return (
    <nav
      aria-label="Documentation"
      className={cn("text-[length:var(--text-body-sm)]", className)}
    >
      <p className="font-mono text-[length:var(--text-mono-sm)] uppercase tracking-[0.18em] text-[color:var(--color-ink-subtle)]">
        Folio · Documentation
      </p>
      <div className="mt-2 rule-double" />
      <div className="mt-7 space-y-8">
        {docsNav.map((group) => (
          <div key={group.heading}>
            <p className="eyebrow">{group.heading}</p>
            <ul className="mt-3 space-y-0.5">
              {group.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block border-l pl-3.5 py-1.5 transition-colors",
                        active
                          ? "border-[var(--color-accent)] text-[color:var(--color-ink)] font-medium"
                          : "border-[var(--color-border)] text-[color:var(--color-ink-muted)] hover:border-[var(--color-ink)] hover:text-[color:var(--color-ink)]",
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
