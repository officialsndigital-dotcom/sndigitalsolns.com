import { CtaBand, PageHero } from "@/components/blocks";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { pageMetadata } from "@/components/seo";
import { Section } from "@/components/ui";
import { portfolio, portfolioCategories } from "@/content/portfolio";
import { CTA } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Website Development Portfolio",
  description: "Websites we have delivered for real estate, jewellery and diamond, education, e commerce and oil and gas businesses in India, the UAE, Canada and beyond.",
  path: "/portfolio/",
});

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Portfolio", href: "/portfolio/" }]}
        eyebrow="Portfolio"
        title="Websites we have delivered"
        lead={`A selection of ${portfolio.length} live websites from our 417+ delivered projects, grouped by industry.`}
        primary={{ href: "/book-consultation/?service=website-development", label: CTA.development }}
      />
      <Section>
        <PortfolioGrid items={portfolio} categories={portfolioCategories} />
        <p className="mt-10 max-w-3xl leading-relaxed text-muted">
          Each card shows the live home page as it is today and links straight to the site, so you can judge the work rather than take our word for it.
          Mobile applications, internal systems and SaaS builds are not shown here because most of them sit behind a client login. If you want to see work
          closer to what you are planning, ask on a call and we will walk you through it.
        </p>
      </Section>
      <CtaBand title="Discuss your website project." label={CTA.development} />
    </>
  );
}
