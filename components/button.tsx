import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "ink" | "seal";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 font-medium rounded-sm transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--color-accent)] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--color-ink)] text-[color:var(--color-bg)] hover:bg-[#1d2229]",
  secondary:
    "bg-transparent text-[color:var(--color-ink)] border border-[var(--color-border-strong)] hover:bg-[var(--color-surface)]",
  ghost:
    "bg-transparent text-[color:var(--color-ink)] hover:bg-[var(--color-surface)]",
  ink:
    "bg-[var(--color-bg)] text-[color:var(--color-ink)] hover:bg-[var(--color-surface)]",
  /* seal — for the rare CTA tied to a cryptographic artifact (sample
     manifest, timestamped export). Reserved on purpose; the gold is
     load-bearing visual signal, not decoration. */
  seal:
    "bg-[var(--color-seal)] text-[#FAFAF7] hover:bg-[#8F6724]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[length:var(--text-body-sm)]",
  md: "h-11 px-5 text-[length:var(--text-body)]",
  lg: "h-14 px-7 text-[length:var(--text-body-lg)]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  arrow?: boolean;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps | "href">;

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    arrow,
  } = props;

  const cls = cn(base, variants[variant], sizes[size], className);

  const inner = (
    <>
      <span>{children}</span>
      {arrow ? <ArrowRight /> : null}
    </>
  );

  if ("href" in props && props.href !== undefined) {
    const { href, external, variant: _v, size: _s, className: _c, children: _ch, arrow: _a, ...rest } = props;
    void _v; void _s; void _c; void _ch; void _a;
    if (external) {
      return (
        <a className={cls} href={href} target="_blank" rel="noreferrer noopener" {...rest}>
          {inner}
        </a>
      );
    }
    return (
      <Link className={cls} href={href} {...rest}>
        {inner}
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, arrow: _a, ...rest } = props as ButtonAsButton;
  void _v; void _s; void _c; void _ch; void _a;
  return (
    <button className={cls} {...rest}>
      {inner}
    </button>
  );
}

function ArrowRight() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-0.5"
    >
      <path
        d="M2 7h10m0 0L8 3m4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}
