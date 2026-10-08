import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { Arrow, ButtonLink, Section } from "@/components/ui";
import { getPosts } from "@/lib/wp/posts";

export const metadata = pageMetadata({
  title: "Blog | Development, B2B Marketing & PR Insights",
  description: "Practical articles on websites, software, B2B lead generation, performance marketing, SEO and PR from the S N Digital Solns team.",
  path: "/blog/",
});

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export default async function BlogPage() {
  const posts = await getPosts();
  return (
    <>
      <PageHero crumbs={[{ name: "Blog", href: "/blog/" }]} eyebrow="Blog" title="Insights" lead="Practical guidance on building, growing and being heard." />
      <Section>
        {posts.length === 0 ? (
          <div className="mx-auto max-w-2xl rounded-[var(--radius-card)] border border-line bg-mist p-8 text-center md:p-12">
            <h2 className="text-2xl font-extrabold text-navy-900">The first articles are on their way</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted">
              We are writing up what we actually do day to day: what a website build costs and why, how B2B lead generation works when it works, what we
              change first on an ad account that is losing money. If there is a question you want answered, ask us and we will write that one next.
            </p>
            <ButtonLink href="/contact/" className="mt-6">
              Suggest a topic
            </ButtonLink>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white hover:border-navy-600 hover:shadow-lg">
                {p.image && (
                  // eslint-disable-next-line @next/next/no-img-element -- WordPress media host varies by install
                  <img src={p.image.url} alt={p.image.alt} loading="lazy" className="aspect-[16/9] w-full object-cover" />
                )}
                <div className="flex flex-1 flex-col p-6">
                  <p className="eyebrow">{p.categories[0] ?? "Article"} · {fmt(p.date)}</p>
                  <h2 className="mt-2 text-lg font-extrabold leading-snug text-navy-900">{p.title}</h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-muted">{p.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
                    Read article <Arrow />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </Section>
      <CtaBand title="Have a question we have not covered?" />
    </>
  );
}
