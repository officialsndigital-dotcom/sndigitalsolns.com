import { CtaBand, PageHero, ProcessSteps } from "@/components/blocks";
import { FaqSection, JsonLd, pageMetadata } from "@/components/seo";
import { Section, SectionHead } from "@/components/ui";
import { site } from "@/lib/site";
import { Calculator } from "@/tools/b2b-pipeline/Calculator";

const path = "/free-tools/b2b-pipeline-revenue-calculator/";

export const metadata = pageMetadata({
  title: "B2B Pipeline & Revenue Calculator (Free)",
  description: "Free B2B pipeline calculator: the prospects, meetings and opportunities you need to hit your revenue target, where your funnel leaks, and a PDF report.",
  path,
});

const faqs = [
  { q: "How does the calculator work?", a: "It divides your revenue target by your average deal value to get the customers you need, then works backwards through your close, opportunity, meeting and response rates to the number of prospects you need to contact each month. Every stage is rounded up." },
  { q: "Where do the default conversion rates come from?", a: "They are planning assumptions (10% response, 30% meeting, 50% opportunity, 25% close) to get you started. They are not industry benchmarks. Use the full audit to enter your own rates." },
  { q: "How is the health score calculated?", a: "It averages six scores out of 100: prospecting volume against what is required, your four conversion rates against the planning assumptions, and expected revenue against your target. The lowest funnel score is your bottleneck." },
  { q: "Do I need to give my email to see results?", a: "No. Results show immediately. You only share your details if you want the PDF report." },
];

export default function CalculatorPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Free Tools", href: "/free-tools/" },
          { name: "B2B Pipeline & Revenue Calculator", href: path },
        ]}
        eyebrow="Free tool"
        title="B2B Pipeline & Revenue Calculator"
        lead="Find out how many prospects, conversations, meetings and opportunities you need to reach your revenue target, and where your funnel is leaking."
      />
      <Section tone="mist">
        <div className="mx-auto max-w-4xl">
          <Calculator siteUrl={site.url} consultationHref="/book-consultation/" />
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="How it works" title="From revenue target to daily activity" />
        <ProcessSteps
          steps={[
            { title: "Customers", text: "Revenue target ÷ average deal value." },
            { title: "Opportunities", text: "Customers ÷ close rate." },
            { title: "Meetings", text: "Opportunities ÷ opportunity rate." },
            { title: "Conversations", text: "Meetings ÷ meeting rate." },
            { title: "Prospects", text: "Conversations ÷ response rate." },
            { title: "Bottleneck", text: "The weakest stage, scored against planning assumptions." },
          ]}
        />
      </Section>
      <Section tone="mist">
        <div className="mx-auto max-w-3xl">
          <FaqSection faqs={faqs} />
        </div>
      </Section>
      <CtaBand title="Want us to fill your pipeline?" text="Our B2B lead generation team books qualified sales meetings with decision makers." />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "B2B Pipeline & Revenue Calculator",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          url: `${site.url}${path}`,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          publisher: { "@id": `${site.url}/#organization` },
        }}
      />
    </>
  );
}
