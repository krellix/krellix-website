import { cn } from "@/lib/utils";

type Tone = "default" | "surface" | "ink" | "seal";

const toneClass: Record<Tone, string> = {
  default: "bg-[var(--color-bg)] text-[color:var(--color-ink)]",
  surface: "bg-[var(--color-surface)] text-[color:var(--color-ink)]",
  ink: "bg-[var(--color-ink)] text-[color:var(--color-bg)]",
  seal: "bg-[var(--color-seal-tint)] text-[color:var(--color-ink)]",
};

export function Section({
  tone = "default",
  className,
  children,
  id,
  divider = false,
  doubleRule = false,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
  divider?: boolean;
  /** Replace the single divider with a typeset double-rule. */
  doubleRule?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        toneClass[tone],
        divider && !doubleRule && "border-t border-[var(--color-border-strong)]",
        className,
      )}
    >
      {divider && doubleRule ? (
        <div aria-hidden="true" className="absolute inset-x-0 top-0">
          <div className="rule-double" />
        </div>
      ) : null}
      {children}
    </section>
  );
}
