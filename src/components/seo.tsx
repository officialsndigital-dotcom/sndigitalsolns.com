import Link from "next/link";
import type { Metadata } from "next";
import { founder, site } from "@/lib/site";
import type { Faq } from "@/content/types";

export function pageMetadata({
  title,
  description,
  path,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}): Metadata {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.shortName, type: "website", locale: "en_IN" },
    twitter: { card: "summary_large_image", title, description },
    robots: noindex || process.env.NEXT_PUBLIC_NOINDEX === "true" ? { index: false, follow: !process.env.NEXT_PUBLIC_NOINDEX } : undefined,
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped cannot break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export type Crumb = { name: string; href: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-navy-100">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1.5">
              {i > 0 && <span aria-hidden>›</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-white">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="hover:text-white hover:underline">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: new URL(c.href, site.url).toString(),
          })),
        }}
      />
    </>
  );
}

export function FaqSection({ faqs, title = "Frequently asked questions", schema = true }: { faqs: Faq[]; title?: string; schema?: boolean }) {
  if (!faqs.length) return null;
  return (
    <div>
      <h2 className="mb-6 text-2xl font-extrabold tracking-tight md:text-[2.1rem]">{title}</h2>
      <div className="divide-y divide-line rounded-[var(--radius-card)] border border-line bg-white">
        {faqs.map((f) => (
          <details key={f.q} className="group p-5 md:p-6">
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-bold">
              {f.q}
              <span aria-hidden className="mt-1 text-amber-600 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      {schema && <JsonLd data={faqJsonLd(faqs)} />}
    </div>
  );
}

export const faqJsonLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: [site.shortName, "S N Digital Solutions", "SN Digital Solns"],
  url: site.url,
  logo: `${site.url}/brand/sn-logo.png`,
  email: site.email,
  telephone: site.phone,
  slogan: site.brandLine,
  foundingDate: site.founded,
  founder: { "@type": "Person", name: founder.name, jobTitle: founder.role },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. A-302, 3rd Floor, Shree Nand Dham, Sector 11, CBD Belapur",
    addressLocality: "Navi Mumbai",
    addressRegion: "Maharashtra",
    postalCode: "400614",
    addressCountry: "IN",
  },
  sameAs: Object.values(site.social),
};
