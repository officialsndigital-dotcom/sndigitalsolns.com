"use cache";

import { cacheLife } from "next/cache";

// Blog posts come from WordPress (the CMS) through its REST API. WORDPRESS_URL is
// the WordPress install, e.g. https://cms.sndigitalsolns.com. Without it the blog is empty.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  author?: string;
  image?: { url: string; alt: string };
  categories: string[];
};

type WpPost = {
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name?: string }[];
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[];
    "wp:term"?: { taxonomy: string; name: string }[][];
  };
};

const base = () => process.env.WORDPRESS_URL?.replace(/\/$/, "");

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .trim();

function toPost(p: WpPost): Post {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  return {
    slug: p.slug,
    title: decode(p.title.rendered),
    excerpt: decode(p.excerpt.rendered),
    content: p.content.rendered,
    date: p.date_gmt + "Z",
    modified: p.modified_gmt + "Z",
    author: p._embedded?.author?.[0]?.name,
    image: media?.source_url ? { url: media.source_url, alt: media.alt_text ?? "" } : undefined,
    categories: (p._embedded?.["wp:term"] ?? []).flat().filter((t) => t.taxonomy === "category").map((t) => t.name),
  };
}

async function wp(path: string): Promise<WpPost[]> {
  const url = base();
  if (!url) return [];
  try {
    const res = await fetch(`${url}/wp-json/wp/v2/${path}`, { headers: { Accept: "application/json" } });
    if (!res.ok) return [];
    return (await res.json()) as WpPost[];
  } catch {
    return [];
  }
}

export async function getPosts(limit = 24): Promise<Post[]> {
  cacheLife("hours");
  return (await wp(`posts?per_page=${limit}&_embed=1&status=publish`)).map(toPost);
}

export async function getPost(slug: string): Promise<Post | null> {
  cacheLife("hours");
  const [p] = await wp(`posts?slug=${encodeURIComponent(slug)}&_embed=1`);
  return p ? toPost(p) : null;
}
