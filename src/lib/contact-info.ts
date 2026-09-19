// Central contact details used by the chat buttons and the contact page.

/** The single phone number used everywhere on the site (E.164 without +). */
export const PHONE_NUMBER = "447848467421";
export const PHONE_DISPLAY = "+44 7848467421";

/** WhatsApp is reachable on that same number. */
export const WHATSAPP_NUMBER = PHONE_NUMBER;
export const WHATSAPP_DISPLAY = PHONE_DISPLAY;

export const TELEGRAM_HANDLE = "meetupsonly12";
export const TELEGRAM_DISPLAY = "@meetupsonly12";
export const TELEGRAM_URL = `https://t.me/${TELEGRAM_HANDLE}`;

export const WHATSAPP_TEXT =
  "Hi! I have a question about your money counting machines.";

export function whatsappHref(text = WHATSAPP_TEXT) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
