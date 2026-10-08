import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section, SectionHead } from "@/components/ui";
import { locations } from "@/content/locations";
import { markets } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Locations We Serve",
  description: "S N Digital Solns serves businesses in Mumbai and Navi Mumbai from its head office, and clients in Dubai, Toronto and other international markets remotely.",
  path: "/locations/",
});

export default function LocationsPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Locations", href: "/locations/" }]} eyebrow="Locations" title="Where we work" lead="Our head office is in Navi Mumbai. We work with clients across India and internationally." />
      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {locations.map((l) => (
            <Link key={l.slug} href={`/locations/${l.slug}/`} className="group rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600 hover:shadow-lg">
              <p className="eyebrow">{l.hasOffice ? "Head office region" : "Served remotely"} · {l.country}</p>
              <h2 className="mt-2 text-xl font-extrabold text-navy-900">{l.city}</h2>
              <p className="mt-2 text-muted">{l.intro}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                Services in {l.city} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="mist">
        <SectionHead eyebrow="Markets" title="Other markets we serve" />
        <ul className="flex flex-wrap gap-2.5">
          {markets.map((m) => (
            <li key={m} className="rounded-full border border-line bg-white px-4 py-2 font-semibold text-navy-800">
              {m}
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand title="Wherever you are, start with a 30 minute call." />
    </>
  );
}
