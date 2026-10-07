import { CtaBand, PageHero } from "@/components/blocks";
import { PortfolioGrid } from "@/components/PortfolioGrid";
import { pageMetadata } from "@/components/seo";
import { ContentRequired, Section } from "@/components/ui";
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
        <div className="mt-10">
          <ContentRequired>Screenshots of each website, and application and SaaS portfolio items.</ContentRequired>
        </div>
      </Section>
      <CtaBand title="Discuss your website project." label={CTA.development} />
    </>
  );
}
