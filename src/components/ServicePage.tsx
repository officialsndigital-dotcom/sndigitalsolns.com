import { buyerIntent, costFaq } from "@/content/buyer-faqs";
import { serviceKey, verticals } from "@/content/services";
import type { Service } from "@/content/types";
import { CTA, site } from "@/lib/site";
import { CtaBand, IndustryChips, PageHero, ProcessSteps, RelatedCaseStudies, RelatedServices } from "./blocks";
import { FaqSection, JsonLd } from "./seo";
import { CheckList, Section, SectionHead } from "./ui";

export function ServicePage({ service }: { service: Service }) {
  const v = verticals[service.vertical];
  const url = `${site.url}/${service.vertical}/${service.slug}/`;
  const intent = buyerIntent[serviceKey(service)];
  const cost = costFaq(serviceKey(service));
  const faqs = [...(cost ? [cost] : []), ...(intent?.extraFaqs ?? []), ...service.faqs];
  return (
    <>
      <PageHero
        crumbs={[
          { name: v.name, href: `/${service.vertical}/` },
          { name: service.name, href: `/${service.vertical}/${service.slug}/` },
        ]}
        eyebrow={v.name}
        title={service.h1 ?? service.name}
        lead={service.outcome}
        primary={{ href: `/book-consultation/?service=${service.slug}`, label: CTA.consultation }}
        secondary={{ href: service.vertical === "development" ? "/portfolio/" : "/case-studies/", label: CTA.work }}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">The problem</p>
            <h2 className="text-2xl font-extrabold tracking-tight md:text-3xl">{service.problem.intro}</h2>
            <ul className="mt-6 space-y-3">
              {service.problem.points.map((p) => (
                <li key={p} className="flex gap-3 leading-relaxed text-muted">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-navy-600" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow mb-3">What we do</p>
            <div className="prose-site text-lg leading-relaxed">
              {service.whatWeDo.map((p) => {
                // Paragraphs that open with a short label ("CRM: ...", "SEO: ...")
                // read better with the label picked out.
                const m = /^([A-Za-z0-9 &+-]{1,28}):\s([\s\S]*)$/.exec(p);
                return (
                  <p key={p}>
                    {m ? (
                      <>
                        <strong className="font-bold text-navy-900">{m[1]}:</strong> {m[2]}
                      </>
                    ) : (
                      p
                    )}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="What you get" title="What's included" />
        <CheckList items={service.deliverables} columns={2} />
      </Section>

      {service.useCases && (
        <Section>
          <SectionHead eyebrow="Use cases" title="Where this fits" />
          <div className="grid gap-5 md:grid-cols-2">
            {service.useCases.map((u) => (
              <div key={u.title} className="rounded-[var(--radius-card)] border border-line p-6">
                <h3 className="text-lg font-extrabold">{u.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{u.text}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section tone={service.useCases ? "mist" : "white"}>
        <SectionHead eyebrow="How we work" title="Our process" />
        <ProcessSteps steps={service.process} />
      </Section>

      <Section tone="navy">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow mb-3 !text-amber-300">Why S N Digital Solns</p>
            <h2 className="text-2xl font-extrabold md:text-3xl">Why businesses choose us for {service.short}</h2>
          </div>
          <ul className="space-y-4">
            {service.whyUs.map((w) => (
              <li key={w} className="border-l-2 border-amber-500 pl-4 text-lg leading-relaxed text-navy-100">
                {w}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {service.caseStudies?.length ? (
        <Section>
          <RelatedCaseStudies slugs={service.caseStudies} />
        </Section>
      ) : null}

      <Section tone="mist">
        <SectionHead eyebrow="Industries" title="Industries we serve" />
        <IndustryChips slugs={service.industries} />
      </Section>

      {intent && (
        <Section>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="Pricing" title={intent.costQuestion} intro={intent.pricingModel} />
            </div>
            <div>
              <p className="mb-4 font-bold">What affects the cost</p>
              <CheckList items={intent.costDrivers} />
            </div>
          </div>
        </Section>
      )}

      <Section tone={intent ? "mist" : "white"}>
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={faqs} />
        </div>
      </Section>

      <Section tone={intent ? "white" : "mist"}>
        <RelatedServices keys={service.related} />
      </Section>

      <CtaBand title={`${v.cta}.`} text="Book a 30 minute consultation. We will tell you honestly whether and how we can help." />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          serviceType: service.name,
          description: service.metaDescription,
          url,
          provider: { "@id": `${site.url}/#organization` },
          areaServed: ["IN", "AE", "US", "GB", "CA", "AU", "SA", "KW", "ZA"],
        }}
      />
    </>
  );
}
