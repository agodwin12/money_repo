"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";

const PHASES: { key: "phase1" | "phase2" | "phase3"; img: string }[] = [
  { key: "phase1", img: "/images/hero1.jpg" },
  { key: "phase2", img: "/images/hero2.jpg" },
  { key: "phase3", img: "/images/hero3.jpg" },
];

const INTERVAL = 6000;

export function Hero() {
  const t = useTranslations("Hero");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (i: number) => setActive((i + PHASES.length) % PHASES.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % PHASES.length), INTERVAL);
    return () => clearInterval(id);
  }, [paused, active]);

  const phase = PHASES[active];

  return (
    <section className="w-full pt-6">
      <Container>
        <div
          className="relative overflow-hidden rounded-[2rem] border border-border sm:rounded-[2.5rem]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Background photos (crossfade + Ken Burns on active) */}
          {PHASES.map((p, i) => (
            <div
              key={p.key}
              aria-hidden={i !== active}
              className={cn(
                "absolute inset-0 transition-opacity duration-1000",
                i === active ? "opacity-100" : "opacity-0"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.img}
                alt=""
                className={cn(
                  "h-full w-full object-cover object-center",
                  i === active && "animate-kenburns"
                )}
              />
            </div>
          ))}

          {/* Readability scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Copy — top-left */}
          <div className="relative flex min-h-[34rem] flex-col px-6 pt-12 pb-28 sm:px-12 sm:pt-16 lg:min-h-[40rem] lg:px-16">
            <div key={active} className="hero-fade max-w-2xl text-white">
              <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white backdrop-blur">
                {t(`${phase.key}.eyebrow`)}
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight drop-shadow-sm sm:text-5xl xl:text-7xl">
                {t(`${phase.key}.title`)}
              </h1>
              <p className="mt-5 max-w-lg text-base text-white/85 sm:text-lg">
                {t(`${phase.key}.subtitle`)}
              </p>
            </div>
          </div>

          {/* Controls — top-right */}
          <div className="absolute right-5 top-5 z-20 flex items-center gap-2 sm:right-8 sm:top-8">
            <button
              type="button"
              aria-label="Previous"
              onClick={() => go(active - 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={() => go(active + 1)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Concave notch — bottom-left, houses the CTA */}
          <div className="hero-notch">
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-transform hover:-translate-y-0.5"
                >
                  {t(`${phase.key}.cta`)}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-full px-2 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card">
                    <Play className="h-4 w-4 fill-current" />
                  </span>
                  {t("watch")}
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2 pl-1">
                {PHASES.map((p, i) => (
                  <button
                    key={p.key}
                    type="button"
                    aria-label={t("goToSlide", { n: i + 1 })}
                    aria-current={i === active}
                    onClick={() => go(i)}
                    className={cn(
                      "h-2.5 rounded-full transition-all",
                      i === active ? "w-8 bg-primary" : "w-2.5 bg-foreground/25 hover:bg-foreground/40"
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
