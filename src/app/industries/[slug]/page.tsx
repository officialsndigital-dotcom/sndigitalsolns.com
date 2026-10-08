import Image from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, RelatedCaseStudies, RelatedServices } from "@/components/blocks";
import { FaqSection, pageMetadata } from "@/components/seo";
import { Arrow, CheckList, Section, SectionHead } from "@/components/ui";
import { getIndustry, industries } from "@/content/industries";
import { hostOf, portfolio } from "@/content/portfolio";
import { getProduct } from "@/content/products";
import { CTA } from "@/lib/site";

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const i = getIndustry((await params).slug);
  if (!i) return {};
  return pageMetadata({ title: i.metaTitle ?? `${i.name} Software, Websites & Marketing`, description: i.metaDescription, path: `/industries/${i.slug}/` });
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const i = getIndustry((await params).slug);
  if (!i) notFound();
  const sites = i.portfolioCategory ? portfolio.filter((p) => p.category === i.portfolioCategory) : [];
  const prods = (i.products ?? []).map(getProduct).filter((p) => p !== undefined);
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", href: "/industries/" },
          { name: i.name, href: `/industries/${i.slug}/` },
        ]}
        eyebrow="Industries"
        title={i.h1 ?? `${i.name} solutions`}
        lead={i.intro}
        primary={{ href: `/book-consultation/?industry=${i.slug}`, label: CTA.consultation }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">Challenges</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">What we see in {i.name.toLowerCase()}</h2>
            <ul className="mt-6 space-y-3">
              {i.challenges.map((c) => (
                <li key={c} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-navy-600" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">What businesses need</p>
            <CheckList items={i.needs} />
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <RelatedServices keys={i.services} title={`Services for ${i.name.toLowerCase()} businesses`} />
      </Section>

      {prods.length > 0 && (
        <Section>
          <SectionHead eyebrow="Our product" title={`Built for ${i.name.toLowerCase()}`} />
          {prods.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}/`} className="group block rounded-[var(--radius-card)] border border-line p-7 hover:border-navy-600">
              <p className="eyebrow">{p.category}</p>
              <p className="mt-2 text-2xl font-extrabold text-navy-900">{p.name}</p>
              <p className="mt-2 text-muted">{p.hero}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                Explore {p.name} <Arrow />
              </span>
            </Link>
          ))}
        </Section>
      )}

      <Section tone={prods.length ? "mist" : "white"}>
        <SectionHead eyebrow="Proof" title="Why work with us" />
        <CheckList items={i.why} />
        {sites.length > 0 && (
          <div className="mt-8">
            <p className="mb-3 font-bold">Websites we have delivered in this sector</p>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {sites.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener nofollow" data-track="portfolio_click" className="block overflow-hidden rounded-[var(--radius-card)] border border-line bg-white hover:border-navy-600 hover:shadow-md">
                    <Image
                      src={s.shot}
                      alt={`Home page of ${hostOf(s.url)}`}
                      width={800}
                      height={374}
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="aspect-[800/374] w-full border-b border-line object-cover object-top"
                    />
                    <span className="block break-all p-4 text-sm font-bold text-navy-800">{hostOf(s.url)} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Section>

      {i.caseStudies?.length ? (
        <Section>
          <RelatedCaseStudies slugs={i.caseStudies} />
        </Section>
      ) : null}

      <Section tone="mist">
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={i.faqs} />
        </div>
      </Section>

      <CtaBand title={`Discuss your ${i.name.toLowerCase()} project.`} />
    </>
  );
}
