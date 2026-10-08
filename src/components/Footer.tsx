import Image from "next/image";
import Link from "next/link";
import { footerColumns } from "@/lib/nav";
import { offices, site } from "@/lib/site";
import { SocialIcons, WhatsAppGlyph } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-site grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-6">
        <div className="lg:col-span-1">
          <div className="inline-block rounded-md bg-white p-2.5">
            <Image src="/brand/sn-logo.png" alt={site.name} width={3601} height={422} className="h-6 w-auto" />
          </div>
          <p className="mt-4 text-sm leading-relaxed">{site.tagline}</p>
          <SocialIcons className="mt-5 text-white" />
        </div>
        {footerColumns.map((col) => (
          <div key={col.title}>
            <p className="mb-3 text-sm font-bold uppercase tracking-wider text-white">{col.title}</p>
            <ul className="space-y-2 text-sm">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="container-site grid gap-8 border-t border-white/10 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
        {offices.map((o) => (
          <address key={o.name} className="not-italic leading-relaxed">
            <p className="font-bold text-white">
              {o.name} · {o.kind}
            </p>
            {o.lines.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
            {o.phone &&
              (o.phoneHref ? (
                <a href={o.phoneHref} data-track="phone_click" className="block hover:text-white">
                  {o.phone}
                </a>
              ) : (
                <span className="block">{o.phone}</span>
              ))}
          </address>
        ))}
        <div className="leading-relaxed">
          <p className="font-bold text-white">Contact</p>
          <a href={site.phoneHref} data-track="phone_click" className="block hover:text-white">
            {site.phone}
          </a>
          <a href={`mailto:${site.email}`} data-track="email_click" className="block hover:text-white">
            {site.email}
          </a>
          <a
            href={site.whatsappHref}
            data-track="whatsapp_click"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 rounded-lg border border-white/25 px-3 py-2 font-semibold text-white hover:border-white hover:bg-white/10"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            WhatsApp us
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col justify-between gap-3 py-6 text-xs md:flex-row">
          <p>© {site.name}. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy-policy/" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms/" className="hover:text-white">Terms</Link></li>
            <li><Link href="/cookie-policy/" className="hover:text-white">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
