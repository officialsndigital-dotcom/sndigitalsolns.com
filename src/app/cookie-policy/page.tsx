import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "How the S N Digital Solns website uses cookies and similar technologies.", path: "/cookie-policy/" });

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy/">
      <h2>What we use</h2>
      <p>We use Google Tag Manager to load analytics and advertising tags. These may set cookies to measure visits and the performance of our campaigns.</p>
      <p>We also store first-visit campaign information in your browser&apos;s local storage for up to 90 days, so we know which marketing brought you to us when you submit a form.</p>
      <h2>Managing cookies</h2>
      <p>You can block or delete cookies in your browser settings. The website still works without them.</p>
    </LegalPage>
  );
}
