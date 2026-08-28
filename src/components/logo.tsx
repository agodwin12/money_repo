import { cn } from "@/lib/utils";

/**
 * Brand logo image. The source is a square, white-background wordmark, so we
 * render it on a white rounded tile that reads cleanly in both light and dark.
 */
export function Logo({
  className,
  alt = "Money Store — money counting machines",
}: {
  className?: string;
  alt?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-black/5",
        className
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/logo.png" alt={alt} className="h-full w-full object-contain" />
    </span>
  );
}
