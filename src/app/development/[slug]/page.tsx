import { serviceRoute } from "@/lib/service-route";

const route = serviceRoute("development");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
