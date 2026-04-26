import { cn } from "@/lib/utils";

type Width = "narrow" | "default" | "wide" | "full";

const widthClass: Record<Width, string> = {
  narrow: "max-w-[56rem]",
  default: "max-w-[72rem]",
  wide: "max-w-[80rem]",
  full: "max-w-none",
};

export function Container({
  width = "default",
  className,
  children,
  as: Component = "div",
}: {
  width?: Width;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}) {
  return (
    <Component className={cn("mx-auto w-full px-6 md:px-10", widthClass[width], className)}>
      {children}
    </Component>
  );
}
