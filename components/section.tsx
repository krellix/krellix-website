import { cn } from "@/lib/utils";

type Tone = "default" | "surface" | "ink" | "seal";

const toneClass: Record<Tone, string> = {
  default: "bg-[var(--color-bg)] text-[color:var(--color-ink)]",
  surface: "bg-[var(--color-surface)] text-[color:var(--color-ink)]",
  ink: "bg-[var(--color-ink)] text-[color:var(--color-bg)]",
  /* seal — used once or twice per page, max. For chain-of-custody
     and verification content that semantically earns the gold. */
  seal: "bg-[var(--color-seal-tint)] text-[color:var(--color-ink)]",
};

export function Section({
  tone = "default",
  className,
  children,
  id,
  divider = false,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-20 md:py-28",
        toneClass[tone],
        divider && "border-t border-[var(--color-border)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
