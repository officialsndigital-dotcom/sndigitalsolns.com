import Link from "next/link";
import { Arrow, SectionHead } from "@/components/ui";
import { getPosts, type Post } from "@/lib/wp/posts";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/** Stable, so the same post always sits at the same place in the ring. */
const bySlug = (a: Post, b: Post) => a.slug.localeCompare(b.slug);

/** A small stable number from a string, used to start each service page's ring somewhere different. */
function offsetOf(seed: string): number {
  let n = 0;
  for (const c of seed) n = (n * 31 + c.charCodeAt(0)) % 100003;
  return n;
}

/**
 * Pick posts from `pool` as a ring rather than "the newest few".
 *
 * Taking the newest posts every time would point every link at the same
 * handful and leave the rest with nothing, which is the problem this block
 * exists to fix. Walking a sorted ring from a per-page starting point gives
 * every post roughly the same number of links in.
 */
function ring(pool: Post[], start: number, count: number): Post[] {
  if (pool.length === 0) return [];
  const n = Math.min(count, pool.length);
  return Array.from({ length: n }, (_, i) => pool[(start + 1 + i) % pool.length]);
}

type Props = {
  /** Category names to draw from. Empty or unmatched falls back to every post. */
  categories?: string[];
  /** The post being read, so it does not link to itself. */
  excludeSlug?: string;
  /** Starting point for the ring on pages that are not themselves a post. */
  seed?: string;
  title?: string;
  eyebrow?: string;
  count?: number;
};

export async function RelatedPosts({ categories, excludeSlug, seed, title = "Related reading", eyebrow = "More on this", count = 4 }: Props) {
  const all = (await getPosts(200)).filter((p) => p.slug !== excludeSlug);
  if (all.length === 0) return null;

  const wanted = new Set(categories ?? []);
  const inCategory = wanted.size ? all.filter((p) => p.categories.some((c) => wanted.has(c))) : [];
  // A thin category still deserves links out, so top it up from everything else.
  const pool = inCategory.length >= count ? inCategory : [...inCategory, ...all.filter((p) => !inCategory.includes(p))];

  const sorted = [...pool].sort(bySlug);
  // On a post, start where this post would sit in the ring, so it links to its
  // neighbours and they link back. Elsewhere, start from the page's own seed.
  const start = excludeSlug
    ? sorted.filter((p) => p.slug < excludeSlug).length - 1
    : offsetOf(seed ?? "blog") % sorted.length;

  const items = ring(sorted, start, count);
  if (!items.length) return null;

  return (
    <div>
      <SectionHead eyebrow={eyebrow} title={title} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}/`}
            className="group flex flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 hover:border-navy-600 hover:shadow-lg"
          >
            <p className="eyebrow">
              {p.categories[0] ?? "Article"} · {fmt(p.date)}
            </p>
            <h3 className="mt-2 flex-1 text-base font-extrabold leading-snug text-navy-900">{p.title}</h3>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
              Read article <Arrow />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
