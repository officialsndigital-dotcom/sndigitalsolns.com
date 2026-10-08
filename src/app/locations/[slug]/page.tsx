import { notFound } from "next/navigation";
import { CtaBand, PageHero, StatsStrip } from "@/components/blocks";
import { FaqSection, JsonLd, pageMetadata } from "@/components/seo";
import { Arrow, CheckList, Section, SectionHead } from "@/components/ui";
import { getLocation, locations } from "@/content/locations";
import { getServiceByKey } from "@/content/services";
import { CTA, offices, site } from "@/lib/site";
import Link from "next/link";

export function generateStaticParams() {
  return locations.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/locations/[slug]">) {
  const l = getLocation((await params).slug);
  if (!l) return {};
  return pageMetadata({ title: l.metaTitle, description: l.metaDescription, path: `/locations/${l.slug}/` });
}

export default async function LocationPage({ params }: PageProps<"/locations/[slug]">) {
  const l = getLocation((await params).slug);
  if (!l) notFound();
  const hq = offices[0];
  const url = `${site.url}/locations/${l.slug}/`;
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Locations", href: "/locations/" },
          { name: l.city, href: `/locations/${l.slug}/` },
        ]}
        eyebrow={`${l.city}, ${l.country}`}
        title={l.h1}
        lead={l.intro}
        primary={{ href: `/book-consultation/?location=${l.slug}`, label: CTA.consultation }}
        secondary={{ href: "/case-studies/", label: CTA.work }}
      >
        <p className="mt-6 text-sm text-navy-100">{l.presence}</p>
      </PageHero>

      <Section>
        <StatsStrip />
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Services" title={`What we do for ${l.city} businesses`} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {l.services.map(({ key, angle }) => {
            const s = getServiceByKey(key);
            if (!s) return null;
            return (
              <Link key={key} href={`/${key}/`} className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600 hover:shadow-lg">
                <h3 className="text-lg font-extrabold text-navy-900">
                  {s.name} in {l.city}
                </h3>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{angle}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                  About {s.short} <Arrow />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Why S N Digital Solns" title={`Why ${l.city} businesses work with us`} />
            <CheckList
              items={[
                "One team for websites and software, marketing and PR.",
                "11+ years of development experience and 72 technology professionals.",
                "417+ websites and 74+ applications developed, for 580+ clients.",
                "Weekly reporting on enquiries, meetings and sales, not just clicks.",
                "No guaranteed rankings or results. We agree realistic targets first.",
              ]}
            />
          </div>
          <div>
            {l.hasOffice ? (
              <address className="rounded-[var(--radius-card)] border border-line p-6 not-italic leading-relaxed">
                <p className="eyebrow">Visit us</p>
                <p className="mt-1 text-xl font-extrabold text-navy-900">{hq.name} {hq.kind.toLowerCase()}</p>
                {hq.lines.map((x) => (
                  <span key={x} className="block text-muted">
                    {x}
                  </span>
                ))}
                <a href={site.phoneHref} data-track="phone_click" className="mt-3 block font-bold text-navy-800">
                  {site.phone}
                </a>
              </address>
            ) : (
              <div className="rounded-[var(--radius-card)] border border-line p-6">
                <p className="eyebrow">How we work with you</p>
                <p className="mt-2 leading-relaxed text-muted">{l.presence}</p>
                {l.portfolioHosts && (
                  <>
                    <p className="mt-5 font-bold">Websites we have delivered in {l.country}</p>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {l.portfolioHosts.map((h) => (
                        <li key={h}>
                          <a href={`https://${h}/`} target="_blank" rel="noopener nofollow" className="inline-block rounded-full border border-line px-3 py-1.5 text-sm font-semibold text-navy-800 hover:border-navy-600">
                            {h}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            )}
            {l.nearby && (
              <p className="mt-6 text-sm text-muted">
                We also work with businesses in {l.nearby.join(", ")}.
              </p>
            )}
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={l.faqs} title={`Questions from ${l.city} businesses`} />
        </div>
      </Section>

      <CtaBand title={`Growing a business in ${l.city}?`} text="Book a 30 minute consultation. We will tell you honestly whether and how we can help." />

      <JsonLd
        data={
          l.hasOffice
            ? {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                "@id": `${url}#business`,
                name: site.name,
                url,
                telephone: site.phone,
                email: site.email,
                parentOrganization: { "@id": `${site.url}/#organization` },
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Office No. A-302, 3rd Floor, Shree Nand Dham, Sector 11, CBD Belapur",
                  addressLocality: "Navi Mumbai",
                  addressRegion: "Maharashtra",
                  postalCode: "400614",
                  addressCountry: "IN",
                },
                areaServed: [l.city, ...(l.nearby ?? [])].map((n) => ({ "@type": "City", name: n })),
              }
            : {
                "@context": "https://schema.org",
                "@type": "Service",
                name: l.h1,
                url,
                provider: { "@id": `${site.url}/#organization` },
                areaServed: { "@type": "City", name: l.city, containedInPlace: { "@type": "Country", name: l.country } },
              }
        }
      />
    </>
  );
}
