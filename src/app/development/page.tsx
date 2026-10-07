import { VerticalPage } from "@/components/VerticalPage";
import { pageMetadata } from "@/components/seo";
import { verticals } from "@/content/services";

export const metadata = pageMetadata({
  title: verticals.development.metaTitle,
  description: verticals.development.metaDescription,
  path: "/development/",
});

export default function Page() {
  return <VerticalPage vertical="development" />;
}
