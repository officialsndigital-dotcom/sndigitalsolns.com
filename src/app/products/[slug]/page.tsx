import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/blocks";
import { FaqSection, JsonLd, pageMetadata } from "@/components/seo";
import { CheckList, ContentRequired, Section, SectionHead } from "@/components/ui";
import { getIndustry } from "@/content/industries";
import { getProduct, products } from "@/content/products";
import { CTA, site } from "@/lib/site";
import Link from "next/link";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.metaTitle, description: p.metaDescription, path: `/products/${p.slug}/` });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const demo = `/book-demo/?product=${p.slug}`;
  const industry = getIndustry(p.industry);
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Products", href: "/products/" },
          { name: p.name, href: `/products/${p.slug}/` },
        ]}
        eyebrow={p.category}
        title={p.name}
        lead={p.hero}
        primary={{ href: demo, label: `${CTA.demo} of ${p.name}` }}
        secondary={{ href: p.externalUrl, label: `Visit ${new URL(p.externalUrl).hostname.replace(/^www\./, "")}` }}
      >
        {p.attribution && <p className="mt-6 text-sm text-navy-100">{p.attribution}</p>}
      </PageHero>

      {p.needsConfirmation && (
        <div className="container-site pt-8">
          <ContentRequired>{p.needsConfirmation}</ContentRequired>
        </div>
      )}

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">The problem</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">What {p.name} replaces</h2>
            <ul className="mt-6 space-y-3">
              {p.problem.map((x) => (
                <li key={x} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-navy-600" />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="prose-site text-lg leading-relaxed">
            <p className="eyebrow mb-3">Overview</p>
            {p.overview.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Modules" title={`What ${p.name} covers`} />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {p.modules.map((m) => (
            <div key={m.group} className="rounded-[var(--radius-card)] border border-line bg-white p-6">
              <h3 className="text-lg font-extrabold text-navy-900">{m.group}</h3>
              <ul className="mt-3 space-y-1.5 text-[0.95rem] text-muted">
                {m.items.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHead eyebrow="Who it is for" title={`Built for`} />
        <div className="grid gap-5 md:grid-cols-3">
          {p.audience.map((a) => (
            <div key={a.title} className="rounded-[var(--radius-card)] border border-line p-6">
              <h3 className="text-lg font-extrabold">{a.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{a.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 !text-amber-300">Benefits</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">What changes after go-live</h2>
            <ul className="mt-6 space-y-3">
              {p.benefits.map((b) => (
                <li key={b} className="border-l-2 border-amber-500 pl-4 text-lg text-navy-100">
                  {b}
                </li>
              ))}
            </ul>
          </div>
          {p.facts && (
            <dl className="grid gap-4 self-start rounded-xl border border-white/15 bg-white/5 p-6">
              {p.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm font-bold uppercase tracking-wider text-amber-300">{f.label}</dt>
                  <dd className="mt-1 text-navy-50">{f.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </Section>

      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Demo" title={`See ${p.name} with your own workflow`} />
            <CheckList items={["A walkthrough of the modules that matter to you", "Answers on setup, data migration and training", "A clear next step, with no obligation"]} />
          </div>
          <div className="flex flex-col items-start justify-center gap-4">
            <a href={demo} data-track="demo_click" className="rounded-lg bg-amber-500 px-6 py-3.5 font-bold text-navy-900 hover:bg-amber-300">
              {CTA.demo} of {p.name}
            </a>
            {industry && (
              <Link href={`/industries/${industry.slug}/`} className="font-bold text-navy-700 hover:text-amber-600">
                More on our work in {industry.name}
              </Link>
            )}
          </div>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={p.faqs} />
        </div>
      </Section>

      <CtaBand title={`Book a demo of ${p.name}.`} label={CTA.demo} href={demo} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: p.name,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          description: p.metaDescription,
          url: `${site.url}/products/${p.slug}/`,
          sameAs: [p.externalUrl],
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
