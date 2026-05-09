"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Logo } from "./logo";
import { Button } from "./button";
import { Container } from "./container";
import { primaryNav } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-[background-color,backdrop-filter,border-color] duration-500",
        scrolled
          ? "bg-[color:color-mix(in_srgb,var(--color-bg)_88%,transparent)] backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent border-b border-transparent",
      )}
    >
      <Container width="wide" className="flex h-16 items-center justify-between md:h-[72px]">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNav.map((link, i) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group/nav relative inline-flex items-baseline gap-1.5 text-[length:var(--text-body-sm)] transition-colors hover:text-[color:var(--color-ink)]",
                  active ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-ink-muted)]",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "font-mono text-[0.6875rem] tabular tracking-[0.04em] transition-colors",
                    active ? "text-[color:var(--color-accent)]" : "text-[color:var(--color-ink-subtle)] group-hover/nav:text-[color:var(--color-ink-muted)]",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{link.label}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-1 left-0 h-px bg-[var(--color-accent)] transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "w-full" : "w-0 group-hover/nav:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/contact" variant="primary" size="sm" arrow>
            Request a pilot
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-sm md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
            ) : (
              <>
                <path d="M3 7h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
                <path d="M3 15h16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="md:hidden">
          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
            <Container width="wide" className="py-10">
              <p className="eyebrow">Contents</p>
              <ul className="mt-6 flex flex-col gap-1">
                {primaryNav.map((link, i) => (
                  <li key={link.href} className="border-t border-[var(--color-border)] first:border-t-0">
                    <Link
                      href={link.href}
                      className="flex items-baseline gap-4 py-4"
                    >
                      <span className="font-mono text-[0.75rem] tabular tracking-[0.05em] text-[color:var(--color-ink-subtle)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[1.875rem] leading-[1.1] tracking-[-0.018em] text-[color:var(--color-ink)]">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Button href="/contact" variant="primary" size="md" arrow>
                  Request a pilot
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}
