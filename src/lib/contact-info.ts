// Central contact details used by the WhatsApp button and the contact page.
export const WHATSAPP_NUMBER = "447346767104"; // wa.me / E.164 without +
export const WHATSAPP_DISPLAY = "+44 7346767104";
export const PHONE_NUMBER = "447466440364"; // tel: / E.164 without +
export const PHONE_DISPLAY = "+44 7466440364";
export const WHATSAPP_TEXT =
  "Hi! I have a question about your money counting machines.";

export function whatsappHref(text = WHATSAPP_TEXT) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
