import { Star } from "lucide-react";
import type { ComponentType } from "react";
import GB from "country-flag-icons/react/3x2/GB";
import IT from "country-flag-icons/react/3x2/IT";
import CH from "country-flag-icons/react/3x2/CH";
import DE from "country-flag-icons/react/3x2/DE";
import FR from "country-flag-icons/react/3x2/FR";
import ES from "country-flag-icons/react/3x2/ES";
import NL from "country-flag-icons/react/3x2/NL";
import BE from "country-flag-icons/react/3x2/BE";
import AT from "country-flag-icons/react/3x2/AT";
import IE from "country-flag-icons/react/3x2/IE";
import PT from "country-flag-icons/react/3x2/PT";
import SE from "country-flag-icons/react/3x2/SE";
import { reviews, type Review } from "@/lib/reviews";
import { cn } from "@/lib/utils";

const FLAGS: Record<string, ComponentType<{ className?: string; title?: string }>> = {
  GB, IT, CH, DE, FR, ES, NL, BE, AT, IE, PT, SE,
};

function ReviewCard({ r }: { r: Review }) {
  const Flag = FLAGS[r.code] ?? GB;
  return (
    <figure className="mr-4 flex w-[300px] shrink-0 flex-col rounded-2xl border border-border bg-card p-5 sm:w-[340px]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
          {r.name.charAt(0)}
        </span>
        <div className="min-w-0 flex-1">
          <figcaption className="truncate text-sm font-semibold text-foreground">{r.name}</figcaption>
          <p className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
            <span className="inline-block h-3 w-[18px] shrink-0 overflow-hidden rounded-[2px] ring-1 ring-black/10">
              <Flag className="block h-full w-full" />
            </span>
            {r.role} · {r.country}
          </p>
        </div>
      </div>
      <div className="mt-3 flex gap-0.5">
        {Array.from({ length: 5 }).map((_, k) => (
          <Star
            key={k}
            className={cn("h-3.5 w-3.5", k < r.rating ? "fill-accent text-accent" : "text-border")}
          />
        ))}
      </div>
      <blockquote className="mt-2 line-clamp-4 text-sm leading-relaxed text-foreground/80">
        {r.text}
      </blockquote>
    </figure>
  );
}

function Row({
  items,
  reverse,
  dur,
}: {
  items: Review[];
  reverse?: boolean;
  dur: string;
}) {
  return (
    <div className="mn-marquee">
      <div
        className={cn("mn-marquee-track", reverse && "reverse")}
        style={{ "--mq-dur": dur } as React.CSSProperties}
      >
        {[...items, ...items].map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </div>
  );
}

export function ReviewsMarquee() {
  const row1 = reviews.slice(0, 40);
  const row2 = reviews.slice(40, 80);
  const row3 = reviews.slice(80, 120);
  return (
    <div className="flex flex-col gap-4">
      <Row items={row1} dur="95s" />
      <Row items={row2} reverse dur="80s" />
      <Row items={row3} dur="110s" />
    </div>
  );
}
