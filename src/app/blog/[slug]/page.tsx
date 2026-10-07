import { notFound } from "next/navigation";
import { CtaBand, PageHero } from "@/components/blocks";
import { JsonLd, pageMetadata } from "@/components/seo";
import { site } from "@/lib/site";
import { getPost, getPosts } from "@/lib/wp/posts";

export async function generateStaticParams() {
  const posts = await getPosts(50);
  // At least one param is required; an unknown slug simply 404s.
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "welcome" }];
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">) {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return pageMetadata({ title: p.title, description: p.excerpt.slice(0, 158), path: `/blog/${p.slug}/` });
}

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Blog", href: "/blog/" },
          { name: p.title, href: `/blog/${p.slug}/` },
        ]}
        eyebrow={`${p.categories[0] ?? "Article"} · ${fmt(p.date)}`}
        title={p.title}
        lead={p.excerpt}
      />
      <article className="container-site py-12 md:py-16">
        {/* WordPress content is authored by the company's own editors. */}
        <div className="prose-site mx-auto max-w-3xl text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: p.content }} />
      </article>
      <CtaBand title="Want help putting this into practice?" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          datePublished: p.date,
          dateModified: p.modified,
          image: p.image?.url,
          author: p.author ? { "@type": "Person", name: p.author } : { "@id": `${site.url}/#organization` },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
        }}
      />
    </>
  );
}
