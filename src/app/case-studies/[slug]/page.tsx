import Image from "@/components/Img";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand, PageHero, RelatedServices } from "@/components/blocks";
import { CountUp } from "@/components/motion";
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
              <dd className="font-[family-name:var(--font-display)] text-3xl font-bold text-navy-800 md:text-4xl">
                <CountUp value={m.value} />
              </dd>
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
        {c.accounts?.length ? (
          <div className="mt-10">
            <p className="eyebrow mb-3">Account by account</p>
            <div className="grid gap-5 md:grid-cols-2">
              {c.accounts.map((a) => (
                <div key={a.name} className="lift flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-6">
                  <p className="eyebrow">{a.role}</p>
                  <h3 className="mt-1 text-xl font-extrabold text-navy-900">{a.name}</h3>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3">
                    {a.figures.map((f) => (
                      <div key={f.label} className="flex flex-col-reverse">
                        <dt className="text-sm text-muted">{f.label}</dt>
                        <dd className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy-800">
                          <CountUp value={f.value} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                  {a.callsBooked && (
                    <div className="mt-4 flex items-baseline gap-3 border-t border-line pt-4">
                      <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-amber-600">
                        <CountUp value={a.callsBooked} />
                      </span>
                      <span className="font-semibold text-navy-900">sales calls booked</span>
                    </div>
                  )}
                  <a
                    href={a.video}
                    target="_blank"
                    rel="noopener"
                    className="mt-5 inline-flex items-center justify-center gap-2 self-start rounded-[var(--radius-card)] bg-navy-800 px-5 py-3 font-bold text-white hover:bg-navy-700"
                  >
                    Watch the dashboard walkthrough <span aria-hidden="true">→</span>
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-3 text-sm text-muted">
              Each recording is a walkthrough of that account&apos;s live dashboard, which is where its invitations, connections, messages and replies
              come from. The calls booked are counted from that account&apos;s booking records.
            </p>
          </div>
        ) : null}
        {c.outcomes?.length ? (
          <div className="mt-10">
            <p className="eyebrow mb-3">What the conversations turned into</p>
            <ul className="grid gap-4 md:grid-cols-2">
              {c.outcomes.map((o) => (
                <li key={o.label} className="rounded-[var(--radius-card)] border border-line bg-mist p-5">
                  <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-navy-800">
                    <CountUp value={o.value} />
                  </p>
                  <p className="mt-1 font-semibold text-navy-900">{o.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{o.source}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        {c.videos?.length ? (
          <div className="mt-10">
            <p className="eyebrow mb-3">Recorded walkthroughs</p>
            <ul className="flex flex-wrap gap-3">
              {c.videos.map((v) => (
                <li key={v.url}>
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-2 rounded-[var(--radius-card)] bg-navy-800 px-5 py-3 font-bold text-white hover:bg-navy-700"
                  >
                    {v.label} <span aria-hidden="true">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-muted">Each recording is a walkthrough of the live campaign dashboard the figures above are taken from.</p>
          </div>
        ) : null}
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
