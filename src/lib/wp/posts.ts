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
  /** Which byline to show: see src/content/authors.ts. WordPress post meta. */
  authorId?: string;
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
  meta?: { sn_author?: string };
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
    authorId: p.meta?.sn_author,
    image: media?.source_url ? { url: media.source_url, alt: media.alt_text ?? "" } : undefined,
    categories: (p._embedded?.["wp:term"] ?? []).flat().filter((t) => t.taxonomy === "category").map((t) => t.name),
  };
}

// WordPress caps per_page at 100, and reports the full count in these headers.
const MAX_PER_PAGE = 100;

async function wpRaw<T>(path: string): Promise<{ items: T[]; totalPages: number; total: number }> {
  const url = base();
  const empty = { items: [] as T[], totalPages: 0, total: 0 };
  if (!url) return empty;
  try {
    const res = await fetch(`${url}/wp-json/wp/v2/${path}`, { headers: { Accept: "application/json" } });
    if (!res.ok) return empty;
    return {
      items: (await res.json()) as T[],
      totalPages: Number(res.headers.get("x-wp-totalpages") ?? 0),
      total: Number(res.headers.get("x-wp-total") ?? 0),
    };
  } catch {
    return empty;
  }
}

async function wp(path: string): Promise<WpPost[]> {
  return (await wpRaw<WpPost>(path)).items;
}

export async function getPosts(limit = 24): Promise<Post[]> {
  cacheLife("hours");
  return (await wp(`posts?per_page=${limit}&_embed=1&status=publish`)).map(toPost);
}

export type PostPage = { posts: Post[]; page: number; totalPages: number; total: number };

/** One page of the blog index. Pages are 1-based, as WordPress numbers them. */
export async function getPostPage(page: number, perPage = 24): Promise<PostPage> {
  cacheLife("hours");
  const { items, totalPages, total } = await wpRaw<WpPost>(
    `posts?per_page=${perPage}&page=${page}&_embed=1&status=publish`,
  );
  return { posts: items.map(toPost), page, totalPages, total };
}

/**
 * Every published post, as slug and modified date only.
 *
 * The sitemap needs all of them, not the most recent hundred, so this pages
 * through WordPress rather than taking a single capped request. _fields keeps
 * each response small enough that a few thousand posts stay cheap.
 */
export async function getPostRefs(): Promise<{ slug: string; modified: string }[]> {
  cacheLife("hours");
  const refs: { slug: string; modified: string }[] = [];
  for (let page = 1; ; page++) {
    const { items, totalPages } = await wpRaw<{ slug: string; modified_gmt: string }>(
      `posts?per_page=${MAX_PER_PAGE}&page=${page}&status=publish&_fields=slug,modified_gmt`,
    );
    refs.push(...items.map((p) => ({ slug: p.slug, modified: p.modified_gmt + "Z" })));
    if (page >= totalPages || items.length === 0) return refs;
  }
}

/** Just enough of a post to render a link to it. */
export type PostCard = { slug: string; title: string; date: string; categories: string[] };

/**
 * Every published post as a card.
 *
 * The related-posts block needs the whole archive, not the most recent
 * hundred, or posts past that cutoff keep the orphan problem this block
 * exists to fix. `_fields` keeps each response small, and the category names
 * are resolved from one extra request rather than `_embed`, which would pull
 * the full content of every post.
 */
export async function getPostCards(): Promise<PostCard[]> {
  cacheLife("hours");
  const names = new Map<number, string>();
  for (let page = 1; ; page++) {
    const { items, totalPages } = await wpRaw<{ id: number; name: string }>(
      `categories?per_page=${MAX_PER_PAGE}&page=${page}&_fields=id,name`,
    );
    for (const c of items) names.set(c.id, c.name);
    if (page >= totalPages || items.length === 0) break;
  }

  const cards: PostCard[] = [];
  for (let page = 1; ; page++) {
    const { items, totalPages } = await wpRaw<{
      slug: string;
      date_gmt: string;
      title: { rendered: string };
      categories?: number[];
    }>(`posts?per_page=${MAX_PER_PAGE}&page=${page}&status=publish&_fields=slug,date_gmt,title,categories`);
    cards.push(
      ...items.map((p) => ({
        slug: p.slug,
        title: decode(p.title.rendered),
        date: p.date_gmt + "Z",
        categories: (p.categories ?? []).map((id) => names.get(id)).filter((n): n is string => Boolean(n)),
      })),
    );
    if (page >= totalPages || items.length === 0) return cards;
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  cacheLife("hours");
  const [p] = await wp(`posts?slug=${encodeURIComponent(slug)}&_embed=1`);
  return p ? toPost(p) : null;
}
