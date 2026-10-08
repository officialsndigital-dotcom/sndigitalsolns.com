import { CtaBand, PageHero, StatsStrip } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import Image from "next/image";
import { CheckList, Section, SectionHead } from "@/components/ui";
import { founder, markets, site, teamPhotos } from "@/lib/site";

export const metadata = pageMetadata({
  title: "About Us",
  description: "S N Digital Solns was founded in 2020 and builds websites, software and SaaS, generates B2B demand and builds brand visibility. 72 professionals, 580+ clients.",
  path: "/company/about/",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Company", href: "/company/" },
          { name: "About Us", href: "/company/about/" },
        ]}
        eyebrow="About us"
        title="We help businesses build, grow and be heard"
        lead="S N Digital Solns Pvt. Ltd. brings software development, digital marketing and public relations together in one team, so the technology, the demand and the credibility a business needs are planned together."
      />
      <Section>
        <StatsStrip />
      </Section>
      <Section tone="mist">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="What we do" title="Three disciplines, one team" />
            <CheckList
              items={[
                "Development: websites, e commerce, web and mobile apps, SaaS, CRM and ERP, AI automation and integrations.",
                "Marketing: B2B lead generation, performance marketing, SEO and AEO, social media, marketing automation and e commerce growth.",
                "PR: public relations, digital PR, founder thought leadership, influencer marketing and awards.",
                "Products: ACADMiN for education and eheera for jewellery and diamond businesses.",
              ]}
            />
          </div>
          <div>
            <SectionHead eyebrow="Where we work" title="India-based, serving clients worldwide" />
            <p className="text-lg leading-relaxed text-muted">
              Our head office is in Navi Mumbai, with postal offices in Florida, USA and Ontario, Canada. We work with clients in markets including {markets.join(", ")}.
            </p>
          </div>
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="Our story" title={`Founded in ${site.founded}`} />
        <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:items-start">
          <figure className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-mist">
            <Image
              src={founder.photo}
              alt={`${founder.name}, ${founder.role} of ${site.name}`}
              width={900}
              height={1350}
              sizes="(min-width: 1024px) 320px, 100vw"
              className="h-auto w-full object-cover"
            />
            <figcaption className="border-t border-line bg-white p-4">
              <p className="font-extrabold text-navy-900">{founder.name}</p>
              <p className="text-sm text-muted">{founder.role}</p>
            </figcaption>
          </figure>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            <p>
              S N Digital Solns Pvt. Ltd. was founded in {site.founded} and is run from our head office in CBD Belapur, Navi Mumbai, with a branch office in Deoghar, Jharkhand. What began as a development team is now {" "}
              three practices under one roof, development, marketing and PR, along with our own software products, ACADMiN for education and eheera for jewellery and diamond businesses.
            </p>
            {founder.bio.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
            <p className="font-bold text-navy-900">{founder.focus}</p>
          </div>
        </div>
      </Section>

      <Section tone="mist">
        <SectionHead eyebrow="Our team" title="The people behind the work" intro="72 technology, marketing and PR professionals, working from our Navi Mumbai and Deoghar offices." />
        <div className="grid gap-5 md:grid-cols-2">
          {teamPhotos.map((photo) => (
            <Image
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              width={photo.width}
              height={photo.height}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-full w-full rounded-[var(--radius-card)] border border-line object-cover"
            />
          ))}
        </div>
      </Section>
      <CtaBand title="Tell us what you want to achieve." />
    </>
  );
}
