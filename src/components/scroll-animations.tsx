"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Progressive reveal-on-scroll. Content is visible by default (see CSS).
 * On mount / navigation we hide only the elements that are below the fold,
 * then reveal each as it scrolls into view. Anything already visible stays
 * visible, and if this never runs, nothing is hidden — content is never lost.
 */
export function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let fallback: number | undefined;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    // Run after paint so the (possibly just-navigated) DOM is in place.
    const raf = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
      if (els.length === 0) return;
      if (reduce || !("IntersectionObserver" in window)) return; // leave everything visible

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.remove("reveal-hidden");
              observer?.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
      );

      const vh = window.innerHeight;
      els.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const inView = rect.top < vh * 0.92 && rect.bottom > 0;
        if (inView) return; // already on screen — keep visible, no animation
        el.classList.add("reveal-hidden");
        observer!.observe(el);
      });

      // Safety net: never leave anything hidden for good.
      fallback = window.setTimeout(() => {
        document
          .querySelectorAll(".reveal-hidden")
          .forEach((el) => el.classList.remove("reveal-hidden"));
      }, 6000);
    });

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, [pathname]);

  return null;
}
