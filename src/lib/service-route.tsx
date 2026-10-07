import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { pageMetadata } from "@/components/seo";
import { getService, servicesFor } from "@/content/services";
import type { Vertical } from "@/content/types";

// Shared implementation for /development/[slug], /marketing/[slug] and /pr/[slug].
export function serviceRoute(vertical: Vertical) {
  return {
    generateStaticParams: async () => servicesFor(vertical).map((s) => ({ slug: s.slug })),
    generateMetadata: async ({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> => {
      const { slug } = await params;
      const s = getService(vertical, slug);
      if (!s) return {};
      return pageMetadata({ title: s.metaTitle, description: s.metaDescription, path: `/${vertical}/${slug}/` });
    },
    Page: async function Page({ params }: { params: Promise<{ slug: string }> }) {
      const { slug } = await params;
      const s = getService(vertical, slug);
      if (!s) notFound();
      return <ServicePage service={s} />;
    },
  };
}
