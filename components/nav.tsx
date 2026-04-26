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
        "sticky top-0 z-40 w-full transition-colors duration-300",
        scrolled
          ? "bg-[color:color-mix(in_srgb,var(--color-bg)_92%,transparent)] backdrop-blur-md border-b border-[var(--color-border)]"
          : "bg-transparent",
      )}
    >
      <Container width="wide" className="flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {primaryNav.map((link) => {
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[length:var(--text-body-sm)] transition-colors hover:text-[color:var(--color-ink)]",
                  active ? "text-[color:var(--color-ink)]" : "text-[color:var(--color-ink-muted)]",
                )}
              >
                {link.label}
                {active ? (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-[var(--color-accent)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href="/trial" variant="primary" size="sm" arrow>
            Start a trial
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
              <path d="M4 4l14 14M18 4L4 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            ) : (
              <>
                <path d="M3 7h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                <path d="M3 15h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </>
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <div className="md:hidden">
          <div className="border-t border-[var(--color-border)] bg-[var(--color-bg)]">
            <Container width="wide" className="py-8">
              <ul className="flex flex-col gap-5">
                {primaryNav.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-display text-[2rem] leading-[1.1] tracking-[-0.018em] text-[color:var(--color-ink)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button href="/trial" variant="primary" size="md" arrow>
                  Start a trial
                </Button>
              </div>
            </Container>
          </div>
        </div>
      ) : null}
    </header>
  );
}
