import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/** Full-bleed width with responsive side padding (not a narrow centered column). */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-full px-4 sm:px-6 lg:px-12 xl:px-20", className)}>
      {children}
    </div>
  );
}
