import type { ReactNode } from "react";
import { PageHero } from "./blocks";
import { ContentRequired } from "./ui";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} lead="S N Digital Solns Pvt. Ltd." />
      <article className="container-site py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <ContentRequired>Legal review of this page, effective date and registered office details.</ContentRequired>
          <div className="prose-site mt-8 text-lg leading-relaxed">{children}</div>
        </div>
      </article>
    </>
  );
}
