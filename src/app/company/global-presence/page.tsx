import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Section, SectionHead } from "@/components/ui";
import Link from "next/link";
import { locations } from "@/content/locations";
import { markets, offices } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Global Presence",
  description: "S N Digital Solns works from its head office in Navi Mumbai, India, with postal offices in Florida and Ontario, and serves clients in the UAE, USA, UK, Canada, Australia, Saudi Arabia, Kuwait and Europe.",
  path: "/company/global-presence/",
});

export default function GlobalPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Company", href: "/company/" },
          { name: "Global Presence", href: "/company/global-presence/" },
        ]}
        eyebrow="Global presence"
        title="Based in India, working worldwide"
        lead="Our teams work from India with clients across the Middle East, North America, Europe, Africa and Australia."
      />
      <Section>
        <SectionHead eyebrow="Offices" title="Where to find us" intro="Delivery runs from our head office in Navi Mumbai. The Florida and Ontario addresses are postal offices, which give clients in North America a local address and a local number to call rather than a staffed office." />
        <div className="grid gap-5 md:grid-cols-3">
          {offices.map((o) => (
            <address key={o.name} className="rounded-[var(--radius-card)] border border-line p-6 not-italic leading-relaxed">
              <p className="eyebrow">{o.kind}</p>
              <p className="mt-1 text-xl font-extrabold text-navy-900">{o.name}</p>
              {o.lines.map((l) => (
                <span key={l} className="block text-muted">
                  {l}
                </span>
              ))}
              {o.phone &&
                (o.phoneHref ? (
                  <a href={o.phoneHref} data-track="phone_click" className="mt-2 block font-semibold text-navy-700 hover:text-amber-600">
                    {o.phone}
                  </a>
                ) : (
                  <span className="mt-2 block font-semibold">{o.phone}</span>
                ))}
            </address>
          ))}
        </div>
        <p className="mt-8 max-w-3xl leading-relaxed text-muted">
          Wherever you are, the same team does the work. We run calls in your working hours, report on a fixed schedule, and invoice in the currency that
          suits you.
        </p>
      </Section>
      <Section tone="mist">
        <SectionHead eyebrow="Markets" title="Markets we serve" />
        <ul className="flex flex-wrap gap-2.5">
          {markets.map((m) => (
            <li key={m} className="rounded-full border border-line bg-white px-4 py-2 font-semibold text-navy-800">
              {m}
            </li>
          ))}
        </ul>
      </Section>
      <Section>
        <SectionHead eyebrow="City pages" title="Services by location" />
        <ul className="flex flex-wrap gap-2.5">
          {locations.map((l) => (
            <li key={l.slug}>
              <Link href={`/locations/${l.slug}/`} className="inline-block rounded-full border border-line bg-white px-4 py-2 font-semibold text-navy-800 hover:border-navy-600">
                {l.city}
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Wherever you are, start with a 30 minute call." />
    </>
  );
}
