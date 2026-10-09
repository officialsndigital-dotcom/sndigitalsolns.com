import Link from "next/link";
import type { ReactNode } from "react";
import { getCaseStudy, type CaseStudy } from "@/content/case-studies";
import { getIndustry } from "@/content/industries";
import { getServiceByKey, serviceKey } from "@/content/services";
import type { Service, Step } from "@/content/types";
import { CTA, stats } from "@/lib/site";
import { CountUp } from "./motion";
import { Breadcrumbs, type Crumb } from "./seo";
import { Arrow, ButtonLink, SectionHead } from "./ui";

export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  children,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: string;
  lead: string;
  primary?: { href: string; label: string };
  secondary?: { href: string; label: string };
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div aria-hidden className="hero-glow pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-navy-700/40 blur-3xl" />
      <div className="container-site relative py-14 md:py-20">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="hero-in mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow mb-4 !text-amber-300">{eyebrow}</p>}
          <h1 className="text-[2.1rem] font-extrabold leading-[1.1] tracking-tight md:text-5xl">{title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-navy-100 md:text-xl">{lead}</p>
          {(primary || secondary) && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {primary && (
                <ButtonLink href={primary.href} track="cta_click">
                  {primary.label}
                </ButtonLink>
              )}
              {secondary && (
                <ButtonLink href={secondary.href} variant="light">
                  {secondary.label}
                </ButtonLink>
              )}
            </div>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}

export function StatsStrip({ items = stats, tone = "light" }: { items?: readonly { value: string; label: string }[]; tone?: "light" | "dark" }) {
  const cols = items.length >= 5 ? "md:grid-cols-5" : items.length === 4 ? "md:grid-cols-4" : items.length === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  return (
    <dl className={`grid grid-cols-2 gap-6 ${cols}`}>
      {items.map((s) => (
        <div key={s.label} className="flex flex-col-reverse border-l-2 border-amber-500 pl-4">
          <dt className={`text-sm ${tone === "dark" ? "text-navy-100" : "text-muted"}`}>{s.label}</dt>
          <dd className={`font-[family-name:var(--font-display)] text-4xl font-bold md:text-5xl ${tone === "dark" ? "text-white" : "text-navy-800"}`}>
            <CountUp value={s.value} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      href={`/${serviceKey(service)}/`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-navy-600 hover:shadow-lg"
    >
      <h3 className="text-lg font-extrabold text-navy-900">{service.name}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{service.summary}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-navy-700 group-hover:text-amber-600">
        Explore {service.short} <Arrow />
      </span>
    </Link>
  );
}

export function CaseStudyCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={`/case-studies/${cs.slug}/`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-6 transition hover:border-navy-600 hover:shadow-lg"
    >
      <p className="eyebrow">{cs.industry} · {cs.period}</p>
      <h3 className="mt-2 text-lg font-extrabold leading-snug text-navy-900">{cs.title}</h3>
      <dl className="mt-4 grid grid-cols-2 gap-3">
        {cs.metrics.slice(0, 2).map((m) => (
          <div key={m.label}>
            <dt className="text-xs text-muted">{m.label}</dt>
            <dd className="font-[family-name:var(--font-display)] text-2xl font-bold text-navy-800">{m.value}</dd>
          </div>
        ))}
      </dl>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-navy-700 group-hover:text-amber-600">
        Read case study <Arrow />
      </span>
    </Link>
  );
}

export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {steps.map((s, i) => (
        <li key={s.title} className="lift rounded-[var(--radius-card)] border border-line bg-white p-5">
          <span className="font-[family-name:var(--font-display)] text-3xl font-bold text-amber-500">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-1 text-lg font-extrabold">{s.title}</h3>
          <p className="mt-1.5 leading-relaxed text-muted">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function RelatedServices({ keys, title = "Related services" }: { keys: string[]; title?: string }) {
  const items = keys.map(getServiceByKey).filter(Boolean) as Service[];
  if (!items.length) return null;
  return (
    <div>
      <SectionHead title={title} />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {items.map((s) => (
          <ServiceCard key={serviceKey(s)} service={s} />
        ))}
      </div>
    </div>
  );
}

export function RelatedCaseStudies({ slugs }: { slugs?: string[] }) {
  const items = (slugs ?? []).map(getCaseStudy).filter(Boolean) as CaseStudy[];
  if (!items.length) return null;
  return (
    <div>
      <SectionHead eyebrow="Proof" title="Related case studies" />
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((c) => (
          <CaseStudyCard key={c.slug} cs={c} />
        ))}
      </div>
    </div>
  );
}

export function IndustryChips({ slugs }: { slugs: string[] }) {
  const items = slugs.map(getIndustry).filter(Boolean);
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((i) => (
        <li key={i!.slug}>
          <Link href={`/industries/${i!.slug}/`} className="inline-block rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold text-navy-800 hover:border-navy-600">
            {i!.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function CtaBand({ title, text, label = CTA.consultation, href = "/book-consultation/" }: { title: string; text?: string; label?: string; href?: string }) {
  return (
    <section className="bg-mist py-14 md:py-16">
      <div className="container-site">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-navy-800 p-8 text-white md:flex-row md:items-center md:p-12">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-extrabold md:text-3xl">{title}</h2>
            {text && <p className="mt-2 text-navy-100">{text}</p>}
          </div>
          <ButtonLink href={href} track="cta_click" className="flex-none">
            {label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
