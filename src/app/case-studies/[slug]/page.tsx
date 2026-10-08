import Image from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, RelatedServices } from "@/components/blocks";
import { JsonLd, pageMetadata } from "@/components/seo";
import { CheckList, Section, SectionHead } from "@/components/ui";
import { getCaseStudy, publishedCaseStudies } from "@/content/case-studies";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return publishedCaseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">) {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: `${c.summary} ${c.metrics.map((m) => `${m.label}: ${m.value}`).join(", ")}.`.slice(0, 158), path: `/case-studies/${c.slug}/` });
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Case Studies", href: "/case-studies/" },
          { name: c.title, href: `/case-studies/${c.slug}/` },
        ]}
        eyebrow={`${c.industry} · ${c.period}`}
        title={c.title}
        lead={c.summary}
      />
      <Section>
        <dl className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {c.metrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse border-l-2 border-amber-500 pl-4">
              <dt className="text-sm text-muted">{m.label}</dt>
              <dd className="font-[family-name:var(--font-display)] text-3xl font-bold text-navy-800 md:text-4xl">{m.value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <p className="eyebrow mb-1">Client</p>
            <p className="font-semibold">{c.client}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Channels</p>
            <p className="font-semibold">{c.channels.join(", ")}</p>
          </div>
          <div>
            <p className="eyebrow mb-1">Source</p>
            <p className="font-semibold">{c.source.replace(" [CONTENT REQUIRED]", "").replace(/\. Dated dashboard screenshots\.$/, ".")}</p>
          </div>
        </div>
        {c.table && (
          <div className="mt-10">
            <div className="-mx-4 overflow-x-auto px-4">
              <table className="w-full min-w-[640px] border-collapse text-left text-[0.95rem]">
                <caption className="caption-bottom pt-3 text-left text-sm text-muted">{c.table.caption}</caption>
                <thead>
                  <tr className="border-b-2 border-navy-800">
                    {c.table.columns.map((col) => (
                      <th key={col} scope="col" className="py-2.5 pr-5 font-bold text-navy-900">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.table.rows.map((row) => (
                    <tr key={row[0]} className="border-b border-line">
                      <th scope="row" className="py-2.5 pr-5 text-left font-semibold text-navy-900">
                        {row[0]}
                      </th>
                      {row.slice(1).map((cell, i) => (
                        <td key={`${row[0]}-${c.table!.columns[i + 1]}`} className="py-2.5 pr-5 text-muted">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {c.proofs?.map((proof) => (
          <figure key={proof.src} className="mt-10">
            <Image
              src={proof.src}
              alt={proof.caption}
              width={proof.width}
              height={proof.height}
              sizes="(min-width: 1024px) 900px, 100vw"
              className="w-full rounded-[var(--radius-card)] border border-line"
            />
            <figcaption className="mt-3 text-sm text-muted">{proof.caption}</figcaption>
          </figure>
        ))}
      </Section>

      {(c.objective || c.approach) && (
        <Section tone="mist">
          <div className="grid gap-10 lg:grid-cols-2">
            {c.objective && (
              <div>
                <SectionHead eyebrow="Objective" title="What we set out to do" />
                <p className="text-lg leading-relaxed text-muted">{c.objective}</p>
              </div>
            )}
            {c.approach && (
              <div>
                <SectionHead eyebrow="Approach" title="How we did it" />
                <CheckList items={c.approach} />
              </div>
            )}
          </div>
        </Section>
      )}

      {c.note && (
        <div className="container-site py-8">
          <p className="rounded-lg border border-line bg-white p-4 text-sm text-muted">{c.note}</p>
        </div>
      )}

      <Section>
        <RelatedServices keys={c.services} title="Services used" />
        <p className="mt-8">
          <Link href="/case-studies/" className="font-bold text-navy-700 hover:text-amber-600">
            ← All case studies
          </Link>
        </p>
      </Section>

      <CtaBand title="Discuss your growth goals." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: c.title,
          description: c.summary,
          url: `${site.url}/case-studies/${c.slug}/`,
          author: { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
