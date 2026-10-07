import { VerticalPage } from "@/components/VerticalPage";
import { pageMetadata } from "@/components/seo";
import { verticals } from "@/content/services";

export const metadata = pageMetadata({
  title: verticals.pr.metaTitle,
  description: verticals.pr.metaDescription,
  path: "/pr/",
});

export default function Page() {
  return <VerticalPage vertical="pr" />;
}
