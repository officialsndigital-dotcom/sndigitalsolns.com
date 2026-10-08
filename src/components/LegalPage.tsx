import { EmailLink } from "@/components/EmailLink";
import type { ReactNode } from "react";
import { offices, site } from "@/lib/site";
import { PageHero } from "./blocks";

/** The date the current wording of the policy pages took effect. */
export const legalEffectiveDate = "8 October 2026";

export function LegalPage({ title, path, children }: { title: string; path: string; children: ReactNode }) {
  const hq = offices[0];
  return (
    <>
      <PageHero crumbs={[{ name: title, href: path }]} title={title} lead="S N Digital Solns Pvt. Ltd." />
      <article className="container-site py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[var(--radius-card)] border border-line bg-mist p-5 text-sm leading-relaxed text-muted">
            <p>
              <strong className="text-navy-900">Effective {legalEffectiveDate}.</strong> This page applies to {site.url.replace(/^https?:\/\//, "")} and to
              the services S N Digital Solns Pvt. Ltd. provides through it.
            </p>
            <p className="mt-2">
              Registered office: {hq.lines.join(", ")}. Questions about this page go to{" "}
              <EmailLink className="font-semibold text-navy-700 hover:text-amber-600" />
              .
            </p>
          </div>
          <div className="prose-site mt-8 text-lg leading-relaxed">{children}</div>
        </div>
      </article>
    </>
  );
}
