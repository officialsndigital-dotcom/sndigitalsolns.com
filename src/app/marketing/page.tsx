import { VerticalPage } from "@/components/VerticalPage";
import { pageMetadata } from "@/components/seo";
import { verticals } from "@/content/services";

export const metadata = pageMetadata({
  title: verticals.marketing.metaTitle,
  description: verticals.marketing.metaDescription,
  path: "/marketing/",
});

export default function Page() {
  return <VerticalPage vertical="marketing" />;
}
