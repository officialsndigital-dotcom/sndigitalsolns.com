import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, Section } from "@/components/ui";
import { products } from "@/content/products";
import { CTA } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Our Products | ACADMiN Education ERP & eheera Jewellery ERP",
  description: "SaaS products built by S N Digital Solns: ACADMiN, an education ERP for schools and colleges, and eheera, jewellery management software and diamond ERP.",
  path: "/products/",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", href: "/products/" }]}
        eyebrow="Products"
        title="Software products we build and support"
        lead="Alongside client work, we build our own SaaS products for industries we know well."
        primary={{ href: "/book-demo/", label: CTA.demo }}
      />
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          {products.map((p) => (
            <Link key={p.slug} href={`/products/${p.slug}/`} className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-8 hover:border-navy-600 hover:shadow-lg">
              <p className="eyebrow">{p.category}</p>
              <h2 className="mt-2 text-3xl font-extrabold text-navy-900">{p.name}</h2>
              <p className="mt-3 flex-1 text-lg leading-relaxed text-muted">{p.hero}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {p.modules.slice(0, 5).map((m) => (
                  <li key={m.group} className="rounded-full bg-mist px-3 py-1 text-sm font-semibold text-navy-800">
                    {m.group}
                  </li>
                ))}
              </ul>
              <span className="mt-6 inline-flex items-center gap-1.5 font-bold text-navy-700 group-hover:text-amber-600">
                Explore {p.name} <Arrow />
              </span>
            </Link>
          ))}
        </div>
      </Section>
      <CtaBand title="See a product in action." label={CTA.demo} href="/book-demo/" />
    </>
  );
}
