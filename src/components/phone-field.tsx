"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import GB from "country-flag-icons/react/3x2/GB";
import US from "country-flag-icons/react/3x2/US";
import DE from "country-flag-icons/react/3x2/DE";
import IT from "country-flag-icons/react/3x2/IT";
import CH from "country-flag-icons/react/3x2/CH";
import FR from "country-flag-icons/react/3x2/FR";
import ES from "country-flag-icons/react/3x2/ES";
import NL from "country-flag-icons/react/3x2/NL";
import BE from "country-flag-icons/react/3x2/BE";
import CA from "country-flag-icons/react/3x2/CA";
import AU from "country-flag-icons/react/3x2/AU";
import AE from "country-flag-icons/react/3x2/AE";
import IN from "country-flag-icons/react/3x2/IN";
import NG from "country-flag-icons/react/3x2/NG";
import ZA from "country-flag-icons/react/3x2/ZA";
import { cn } from "@/lib/utils";

const COUNTRIES = [
  { code: "GB", dial: "+44", name: "United Kingdom", Flag: GB },
  { code: "US", dial: "+1", name: "United States", Flag: US },
  { code: "DE", dial: "+49", name: "Germany", Flag: DE },
  { code: "IT", dial: "+39", name: "Italy", Flag: IT },
  { code: "CH", dial: "+41", name: "Switzerland", Flag: CH },
  { code: "FR", dial: "+33", name: "France", Flag: FR },
  { code: "ES", dial: "+34", name: "Spain", Flag: ES },
  { code: "NL", dial: "+31", name: "Netherlands", Flag: NL },
  { code: "BE", dial: "+32", name: "Belgium", Flag: BE },
  { code: "CA", dial: "+1", name: "Canada", Flag: CA },
  { code: "AU", dial: "+61", name: "Australia", Flag: AU },
  { code: "AE", dial: "+971", name: "United Arab Emirates", Flag: AE },
  { code: "IN", dial: "+91", name: "India", Flag: IN },
  { code: "NG", dial: "+234", name: "Nigeria", Flag: NG },
  { code: "ZA", dial: "+27", name: "South Africa", Flag: ZA },
];

export function PhoneField({
  name = "phone",
  placeholder,
}: {
  name?: string;
  placeholder?: string;
}) {
  const [sel, setSel] = useState(COUNTRIES[0]); // United Kingdom
  const [number, setNumber] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const Sel = sel.Flag;

  return (
    <div ref={ref} className="relative mt-1.5">
      {/* Full value (dial code + number) submitted with the form */}
      <input type="hidden" name={name} value={number ? `${sel.dial} ${number}` : ""} />

      <div className="flex items-stretch overflow-hidden rounded-xl border border-border bg-card transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select country code"
          className="flex items-center gap-1.5 border-r border-border px-3 text-sm text-foreground transition-colors hover:bg-muted"
        >
          <span className="inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10">
            <Sel className="block h-full w-full" />
          </span>
          {sel.dial}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
        <input
          type="tel"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent px-3.5 py-2.5 text-sm text-foreground outline-none"
        />
      </div>

      {open && (
        <div className="absolute left-0 z-50 mt-2 max-h-64 w-72 overflow-y-auto rounded-2xl border border-border bg-card p-1 shadow-lg shadow-black/5">
          {COUNTRIES.map((c) => {
            const F = c.Flag;
            return (
              <button
                key={c.code}
                type="button"
                onClick={() => {
                  setSel(c);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-muted",
                  c.code === sel.code ? "font-semibold text-foreground" : "text-foreground/90"
                )}
              >
                <span className="inline-block h-4 w-6 shrink-0 overflow-hidden rounded-[3px] ring-1 ring-black/10">
                  <F className="block h-full w-full" />
                </span>
                <span className="flex-1 text-left">{c.name}</span>
                <span className="text-muted-foreground">{c.dial}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
