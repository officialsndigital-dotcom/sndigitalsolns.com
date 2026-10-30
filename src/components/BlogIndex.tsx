import Link from "next/link";
import { CtaBand, PageHero } from "@/components/blocks";
import { Arrow, ButtonLink, Section } from "@/components/ui";
import { getPostPage } from "@/lib/wp/posts";

export const POSTS_PER_PAGE = 24;

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

const href = (page: number) => (page <= 1 ? "/blog/" : `/blog/page/${page}/`);

/** Page numbers to show: always the first and last, plus a window around the current one. */
function pageNumbers(current: number, total: number): (number | "gap")[] {
  const keep = new Set([1, total, current - 1, current, current + 1]);
  const shown = [...keep].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  return shown.flatMap((n, i) => (i > 0 && n - shown[i - 1] > 1 ? ["gap" as const, n] : [n]));
}

function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const linkClass = "inline-flex h-10 min-w-10 items-center justify-center rounded-[var(--radius-card)] border border-line px-3 text-sm font-bold text-navy-700 hover:border-navy-600 hover:text-navy-900";
  return (
    <nav aria-label="Blog pages" className="mt-12 flex flex-wrap items-center justify-center gap-2">
      {page > 1 && (
        <Link href={href(page - 1)} rel="prev" className={linkClass}>
          Previous
        </Link>
      )}
      {pageNumbers(page, totalPages).map((n, i) =>
        n === "gap" ? (
          <span key={`gap-${i}`} className="px-1 text-muted">
            …
          </span>
        ) : n === page ? (
          <span key={n} aria-current="page" className="inline-flex h-10 min-w-10 items-center justify-center rounded-[var(--radius-card)] bg-navy-800 px-3 text-sm font-bold text-white">
            {n}
          </span>
        ) : (
          <Link key={n} href={href(n)} className={linkClass}>
            {n}
          </Link>
        ),
      )}
      {page < totalPages && (
        <Link href={href(page + 1)} rel="next" className={linkClass}>
          Next
        </Link>
      )}
    </nav>
  );
}

export async function BlogIndex({ page }: { page: number }) {
  const { posts, totalPages } = await getPostPage(page, POSTS_PER_PAGE);
  return (
    <>
      <PageHero
        crumbs={[{ name: "Blog", href: "/blog/" }, ...(page > 1 ? [{ name: `Page ${page}`, href: href(page) }] : [])]}
        eyebrow="Blog"
        title="Insights"
        lead="Practical guidance on building, growing and being heard."
      />
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
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white hover:border-navy-600 hover:shadow-lg">
                  {p.image && (
                    // eslint-disable-next-line @next/next/no-img-element -- WordPress media host varies by install
                    // The generated cover art is 1200x630 (not 16:9); matching the box to that
                    // ratio lets object-cover fill it without cropping the card's edge content.
                    <img src={p.image.url} alt={p.image.alt} loading="lazy" className="aspect-[1200/630] w-full object-cover" />
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
            <Pagination page={page} totalPages={totalPages} />
          </>
        )}
      </Section>
      <CtaBand title="Have a question we have not covered?" />
    </>
  );
}
