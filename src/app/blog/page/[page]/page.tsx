import { notFound } from "next/navigation";
import { BlogIndex, POSTS_PER_PAGE } from "@/components/BlogIndex";
import { pageMetadata } from "@/components/seo";
import { getPostPage } from "@/lib/wp/posts";

// Page one lives at /blog/, so this route starts at two. Later pages are
// generated on request; only the first few are worth prerendering.
export async function generateStaticParams() {
  const { totalPages } = await getPostPage(1, POSTS_PER_PAGE);
  const upTo = Math.min(Math.max(totalPages, 2), 6);
  return Array.from({ length: upTo - 1 }, (_, i) => ({ page: String(i + 2) }));
}

export async function generateMetadata({ params }: PageProps<"/blog/page/[page]">) {
  const page = Number((await params).page);
  return pageMetadata({
    title: `Blog, page ${page} | Development, B2B Marketing & PR Insights`,
    description: "Practical articles on websites, software, B2B lead generation, performance marketing, SEO and PR from the S N Digital Solns team.",
    path: `/blog/page/${page}/`,
  });
}

export default async function BlogPaged({ params }: PageProps<"/blog/page/[page]">) {
  const page = Number((await params).page);
  if (!Number.isInteger(page) || page < 2) notFound();
  const { posts } = await getPostPage(page, POSTS_PER_PAGE);
  if (posts.length === 0) notFound();
  return <BlogIndex page={page} />;
}
