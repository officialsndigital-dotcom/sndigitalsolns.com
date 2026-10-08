import Image from "@/components/Img";
import Link from "next/link";
import { mainNav } from "@/lib/nav";
import { CTA, site } from "@/lib/site";
import { EmailLink } from "./EmailLink";
import { NavBehaviour } from "./NavBehaviour";
import { SocialIcons } from "./SocialIcons";

export function Header() {
  return (
    <>
    <NavBehaviour />
    <header className="sticky top-0 z-50 border-b border-line bg-white xl:bg-white/95 xl:backdrop-blur">
      <div className="hidden bg-navy-900 text-[0.8rem] text-navy-100 md:block">
        <div className="container-site flex h-9 items-center justify-between">
          <div className="flex gap-5">
            <a href={site.phoneHref} data-track="phone_click" className="hover:text-white">
              {site.phone}
            </a>
            <EmailLink className="hover:text-white" />
          </div>
          <SocialIcons className="text-navy-100" size={15} />
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" aria-label={`${site.name} home`} className="flex-none">
          <Image src="/brand/sn-logo-sm.webp" alt={site.name} width={614} height={72} unoptimized fetchPriority="high" loading="eager" className="h-7 w-auto xl:h-8" />
        </Link>

        {/* Desktop navigation with mega menus (CSS only: hover and keyboard focus) */}
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center 2xl:gap-1">
            {mainNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className="flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-2 text-[0.92rem] font-semibold 2xl:px-3 text-navy-900 hover:bg-navy-50"
                >
                  {item.label}
                  {item.groups && (
                    <svg aria-hidden viewBox="0 0 12 12" className="h-3 w-3 opacity-60" fill="currentColor">
                      <path d="M6 8 2 4h8z" />
                    </svg>
                  )}
                </Link>
                {item.groups && (
                  <div data-megamenu className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <div className={`flex gap-8 rounded-xl border border-line bg-white p-6 shadow-xl ${item.feature ? "w-[760px]" : "w-[340px]"}`}>
                      <div className={`grid flex-1 gap-6 ${item.groups.length > 1 ? "grid-cols-2" : ""}`}>
                        {item.groups.map((g, gi) => (
                          <div key={gi}>
                            {g.title && <p className="eyebrow mb-2">{g.title}</p>}
                            <ul className="space-y-1">
                              {g.links.map((l) => (
                                <li key={l.href}>
                                  <Link href={l.href} className="block rounded-md px-2 py-1.5 hover:bg-navy-50">
                                    <span className="block text-[0.93rem] font-bold text-navy-900">{l.label}</span>
                                    {l.note && <span className="block text-[0.8rem] leading-snug text-muted">{l.note}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                      {item.feature && (
                        <Link href={item.feature.href} className="flex w-56 flex-none flex-col justify-between rounded-lg bg-navy-900 p-5 text-white hover:bg-navy-800">
                          <span className="text-lg font-extrabold leading-snug">{item.feature.title}</span>
                          <span className="mt-2 text-sm text-navy-100">{item.feature.text}</span>
                          <span className="mt-4 text-sm font-bold text-amber-300">{item.feature.cta} →</span>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/book-consultation/"
            data-track="cta_click"
            className="hidden whitespace-nowrap rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-bold text-navy-900 hover:bg-amber-300 sm:inline-flex"
          >
            {CTA.consultationShort}
          </Link>

          {/* Mobile navigation: native <details>, works without JavaScript */}
          <details data-nav="mobile" className="group xl:hidden">
            <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md border border-line" aria-label="Menu">
              <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <svg aria-hidden viewBox="0 0 24 24" className="hidden h-5 w-5 group-open:block" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </summary>
            <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-line bg-white px-4 pb-24 pt-4">
              <ul className="divide-y divide-line">
                {mainNav.map((item) => (
                  <li key={item.label}>
                    {item.groups ? (
                      <details data-nav="mobile-sub" className="group/sub">
                        <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-lg font-bold text-navy-900">
                          {item.label}
                          <span aria-hidden className="text-amber-600 group-open/sub:rotate-45">+</span>
                        </summary>
                        <ul className="pb-3">
                          <li>
                            <Link href={item.href} className="block py-2 font-semibold text-navy-700">
                              {item.label} overview
                            </Link>
                          </li>
                          {item.groups.flatMap((g) => g.links).map((l) => (
                            <li key={l.href}>
                              <Link href={l.href} className="block py-2 text-muted">
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </details>
                    ) : (
                      <Link href={item.href} className="block py-3.5 text-lg font-bold text-navy-900">
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation/" className="mt-6 flex justify-center rounded-lg bg-amber-500 px-4 py-3 font-bold text-navy-900">
                {CTA.consultation}
              </Link>
              <SocialIcons className="mt-6 justify-center text-navy-800" />
            </div>
          </details>
        </div>
      </div>
    </header>
    </>
  );
}
