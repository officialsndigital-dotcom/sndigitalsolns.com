import { LeadForm } from "@/components/LeadForm";
import { pageMetadata } from "@/components/seo";
import { CheckList } from "@/components/ui";
import { products } from "@/content/products";
import { productInterests } from "@/lib/interests";
import { CTA } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Book a Product Demo | ACADMiN & eheera",
  description: "Book a demo of ACADMiN, the education ERP, or eheera, the jewellery and diamond ERP. Share your requirements and pick a time.",
  path: "/book-demo/",
});

// Each product can have its own demo calendar; others fall back to the consultation calendar.
const calendars = Object.fromEntries(products.filter((p) => p.demoUrl).map((p) => [`product/${p.slug}`, p.demoUrl]));

export default function BookDemoPage() {
  return (
    <section className="bg-mist py-12 md:py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow mb-3">Product demo</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{CTA.demo}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">Tell us which product and what you need it to do. We will tailor the demo to your workflow.</p>
          <div className="mt-8">
            <CheckList items={["A walkthrough of the modules that matter to you", "Answers on setup, migration and training", "Pricing and next steps"]} />
          </div>
        </div>
        <LeadForm
          kind="demo"
          interests={productInterests}
          queryKey="product"
          calendarUrl={process.env.NEXT_PUBLIC_CONSULTATION_CALENDAR_URL}
          calendars={calendars}
          submitLabel="Continue to choose a time"
          messageLabel="Tell us about your business and what you want to see"
        />
      </div>
    </section>
  );
}
