"use client";

import { usePathname } from "next/navigation";
import { whatsappHref, TELEGRAM_URL } from "@/lib/contact-info";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { TelegramIcon } from "@/components/telegram-icon";

export function ChatButtons() {
  const pathname = usePathname();
  // Keep the storefront chat off the admin and login screens.
  if (/\/(admin|login)(\/|$)/.test(pathname)) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Message us on Telegram"
        className="group flex items-center"
      >
        <span className="pointer-events-none mr-3 hidden rounded-full bg-card px-3 py-1.5 text-sm font-semibold text-foreground opacity-0 shadow-lg ring-1 ring-black/5 transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Telegram
        </span>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#229ED9] text-white shadow-xl shadow-black/20 transition-transform duration-200 group-hover:scale-105">
          <TelegramIcon className="h-7 w-7" />
        </span>
      </a>

      <a
        href={whatsappHref()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group flex items-center"
      >
        <span className="pointer-events-none mr-3 hidden rounded-full bg-card px-3 py-1.5 text-sm font-semibold text-foreground opacity-0 shadow-lg ring-1 ring-black/5 transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Chat with us
        </span>
        <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl shadow-black/20 transition-transform duration-200 group-hover:scale-105">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppIcon className="relative h-8 w-8" />
        </span>
      </a>
    </div>
  );
}
