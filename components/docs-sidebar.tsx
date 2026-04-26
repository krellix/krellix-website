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
      <div className="space-y-7">
        {docsNav.map((group) => (
          <div key={group.heading}>
            <p className="eyebrow">{group.heading}</p>
            <ul className="mt-3 space-y-1.5">
              {group.links.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block border-l-2 pl-3 py-1 transition-colors",
                        active
                          ? "border-[var(--color-accent)] text-[color:var(--color-ink)] font-medium"
                          : "border-transparent text-[color:var(--color-ink-muted)] hover:border-[var(--color-border-strong)] hover:text-[color:var(--color-ink)]",
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
