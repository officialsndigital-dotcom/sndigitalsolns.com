import Image from "next/image";
import Link from "next/link";
import { locations } from "@/content/locations";
import { footerColumns } from "@/lib/nav";
import { CTA, offices, site } from "@/lib/site";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="border-b border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-6 py-12 md:flex-row md:items-center">
          <div>
            <p className="text-2xl font-extrabold text-white md:text-3xl">Have a project, growth challenge or product idea?</p>
            <p className="mt-2 text-navy-100">Talk to us for 10 minutes. We will tell you honestly whether and how we can help.</p>
          </div>
          <Link href="/book-consultation/" data-track="cta_click" className="flex-none rounded-lg bg-amber-500 px-6 py-3.5 font-bold text-navy-900 hover:bg-amber-300">
            {CTA.consultation}
          </Link>
        </div>
      </div>

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

      <div className="container-site grid gap-8 border-t border-white/10 py-10 text-sm md:grid-cols-3">
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
            {o.phone && <span className="block">{o.phone}</span>}
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
        </div>
      </div>

      <div className="container-site border-t border-white/10 py-5 text-sm">
        <span className="font-bold text-white">Locations: </span>
        {locations.map((l, i) => (
          <span key={l.slug}>
            {i > 0 && " · "}
            <Link href={`/locations/${l.slug}/`} className="hover:text-white">
              {l.city}
            </Link>
          </span>
        ))}
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
