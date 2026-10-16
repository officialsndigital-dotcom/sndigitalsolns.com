import Link from "next/link";
import Img from "@/components/Img";
import type { Author } from "@/content/authors";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/** A day apart or less is a typo fix, not an update worth showing. */
const meaningfullyUpdated = (published: string, modified: string) =>
  new Date(modified).getTime() - new Date(published).getTime() > 36 * 60 * 60 * 1000;

/**
 * Who wrote the post, what they do, and when it was published. Readers use it
 * to decide whether to trust the page, and it is the signal search engines
 * look for when they ask who stands behind the advice.
 */
export function Byline({ author, published, modified }: { author: Author; published: string; modified: string }) {
  return (
    <div className="mx-auto flex max-w-3xl items-start gap-4 border-b border-line pb-6">
      {author.photo && (
        <Img
          src={author.photo}
          alt={author.name}
          width={96}
          height={96}
          className="h-12 w-12 shrink-0 rounded-full object-cover"
        />
      )}
      <div className="text-sm leading-relaxed">
        <p className="font-bold text-navy-900">
          <Link href="/company/about/" className="hover:text-amber-600">
            {author.name}
          </Link>
          <span className="font-normal text-muted"> · {author.role}</span>
        </p>
        <p className="mt-0.5 text-muted">
          <time dateTime={published}>Published {fmt(published)}</time>
          {meaningfullyUpdated(published, modified) && (
            <>
              {" · "}
              <time dateTime={modified}>updated {fmt(modified)}</time>
            </>
          )}
        </p>
        <p className="mt-2 text-muted">{author.bio}</p>
      </div>
    </div>
  );
}
