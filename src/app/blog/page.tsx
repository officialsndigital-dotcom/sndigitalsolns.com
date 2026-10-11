import { BlogIndex } from "@/components/BlogIndex";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({
  title: "Blog | Development, B2B Marketing & PR Insights",
  description: "Practical articles on websites, software, B2B lead generation, performance marketing, SEO and PR from the S N Digital Solns team.",
  path: "/blog/",
});

export default async function BlogPage() {
  return <BlogIndex page={1} />;
}
