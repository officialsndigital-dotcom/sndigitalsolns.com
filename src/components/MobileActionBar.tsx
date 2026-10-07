import Link from "next/link";
import { site } from "@/lib/site";

export function MobileActionBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-line bg-white text-center text-sm font-bold text-navy-900 shadow-[0_-4px_16px_rgba(15,23,42,0.08)] md:hidden">
      <a href={site.phoneHref} data-track="phone_click" className="py-3.5">
        Call
      </a>
      {site.whatsappHref ? (
        <a href={site.whatsappHref} target="_blank" rel="noopener" data-track="whatsapp_click" className="border-x border-line py-3.5">
          WhatsApp
        </a>
      ) : (
        <a href={`mailto:${site.email}`} data-track="email_click" className="border-x border-line py-3.5">
          Email
        </a>
      )}
      <Link href="/book-consultation/" data-track="cta_click" className="bg-amber-500 py-3.5">
        Book a Call
      </Link>
    </div>
  );
}
