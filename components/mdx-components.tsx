import * as React from "react";
import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  a: ({ href, children, ...rest }) => {
    const url = href ?? "#";
    const isExternal = /^https?:/.test(url);
    if (isExternal) {
      return (
        <a href={url} target="_blank" rel="noreferrer noopener" {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={url} {...rest}>
        {children}
      </Link>
    );
  },
  Note: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-8 border-l-2 border-[var(--color-accent)] bg-[var(--color-surface)] p-5">
      <p className="eyebrow !text-[color:var(--color-accent)]">Note</p>
      <div className="mt-2 text-[length:var(--text-body)] leading-[1.6]">{children}</div>
    </aside>
  ),
  Warning: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-8 border-l-2 border-[var(--color-warning)] bg-[var(--color-surface)] p-5">
      <p className="eyebrow !text-[color:var(--color-warning)]">Warning</p>
      <div className="mt-2 text-[length:var(--text-body)] leading-[1.6]">{children}</div>
    </aside>
  ),
  /* Sealed — used in docs to flag a step that materializes a
     cryptographic artifact (the manifest, the timestamp token).
     Gold tint is reserved for these moments only. */
  Sealed: ({ children }: { children?: React.ReactNode }) => (
    <aside className="my-8 rounded-sm border border-[var(--color-seal-soft)] bg-[var(--color-seal-tint)] p-5">
      <p className="eyebrow !text-[color:var(--color-seal)]">Sealed</p>
      <div className="mt-2 text-[length:var(--text-body)] leading-[1.6]">{children}</div>
    </aside>
  ),
};
