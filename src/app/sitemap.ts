import type { MetadataRoute } from "next";
import { publishedCaseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { locations } from "@/content/locations";
import { products } from "@/content/products";
import { services } from "@/content/services";
import { site } from "@/lib/site";
import { getPosts } from "@/lib/wp/posts";
import { tools } from "@/tools/registry";

const staticPaths = [
  "/",
  "/development/",
  "/marketing/",
  "/pr/",
  "/products/",
  "/industries/",
  "/case-studies/",
  "/portfolio/",
  "/free-tools/",
  "/blog/",
  "/resources/",
  "/resources/faqs/",
  "/company/",
  "/company/about/",
  "/company/approach/",
  "/company/global-presence/",
  "/company/careers/",
  "/contact/",
  "/locations/",
  "/book-consultation/",
  "/book-demo/",
  "/privacy-policy/",
  "/terms/",
  "/cookie-policy/",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts(100);
  const paths = [
    ...staticPaths,
    ...services.map((s) => `/${s.vertical}/${s.slug}/`),
    ...products.map((p) => `/products/${p.slug}/`),
    ...industries.map((i) => `/industries/${i.slug}/`),
    ...locations.map((l) => `/locations/${l.slug}/`),
    ...publishedCaseStudies.map((c) => `/case-studies/${c.slug}/`),
    ...tools.filter((t) => t.status === "live").map((t) => `/free-tools/${t.slug}/`),
  ];
  return [
    ...paths.map((p) => ({ url: `${site.url}${p}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: p.modified })),
  ];
}
