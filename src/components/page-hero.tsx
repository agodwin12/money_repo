import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

/** Reusable clean hero band for content pages. */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <section className="w-full pt-8">
      <Container>
        <div
          data-reveal="up"
          className={cn(
            "overflow-hidden rounded-[2rem] border border-border bg-surface-dark px-6 py-14 sm:rounded-[2.5rem] sm:px-12 sm:py-20",
            className
          )}
        >
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="text-sm font-semibold uppercase tracking-wide text-primary">
                {eyebrow}
              </p>
            )}
            <h1 className="mt-3 text-4xl font-bold leading-[1.05] tracking-tight text-surface-dark-foreground sm:text-5xl xl:text-6xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-5 max-w-2xl text-base text-surface-dark-foreground/70 sm:text-lg">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
