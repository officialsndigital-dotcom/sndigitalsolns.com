import { serviceRoute } from "@/lib/service-route";

const route = serviceRoute("marketing");
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.Page;
