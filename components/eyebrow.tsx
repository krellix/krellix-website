import { cn } from "@/lib/utils";

/**
 * Editorial eyebrow. Renders a small monospaced label with an
 * optional folio numeral and a thin vertical separator that
 * mimics typeset metadata in a printed legal document.
 */
export function Eyebrow({
  children,
  className,
  as: Component = "p",
  number,
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  number?: string;
}) {
  return (
    <Component
      className={cn(
        "eyebrow inline-flex items-center gap-3 text-[color:var(--color-ink-muted)]",
        className,
      )}
    >
      {number ? (
        <>
          <span className="tabular text-[color:var(--color-ink-subtle)]">
            §&nbsp;{number}
          </span>
          <span aria-hidden="true" className="block h-2.5 w-px bg-[var(--color-border-strong)]" />
        </>
      ) : null}
      <span>{children}</span>
    </Component>
  );
}
