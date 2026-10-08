import { site } from "@/lib/site";
import { WhatsAppGlyph } from "./SocialIcons";

/**
 * Floating WhatsApp button, bottom right. On small screens it sits above the
 * mobile action bar so the two do not overlap.
 */
export function WhatsAppButton() {
  return (
    <a
      href={site.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      aria-label={`Message ${site.shortName} on WhatsApp`}
      className="fixed right-4 bottom-20 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 md:bottom-6"
    >
      <WhatsAppGlyph className="h-8 w-8" />
    </a>
  );
}
