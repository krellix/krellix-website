import { cn } from "@/lib/utils";

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
        "eyebrow flex items-center gap-3 text-[color:var(--color-ink-muted)]",
        className,
      )}
    >
      {number ? (
        <span className="font-mono text-[color:var(--color-ink-subtle)]">{number}</span>
      ) : null}
      <span>{children}</span>
    </Component>
  );
}
