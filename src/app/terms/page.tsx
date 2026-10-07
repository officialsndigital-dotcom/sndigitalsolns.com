import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/components/seo";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Terms of use for the S N Digital Solns website and free tools.", path: "/terms/" });

export default function Page() {
  return (
    <LegalPage title="Terms of Use" path="/terms/">
      <h2>Website content</h2>
      <p>Content on this website is provided for general information. Case study figures describe past results for specific clients and are not a promise of future results.</p>
      <h2>Free tools</h2>
      <p>Our calculators produce estimates from the numbers you enter and stated planning assumptions. They are not financial advice or a guarantee of results.</p>
      <h2>Services</h2>
      <p>Paid services are governed by the proposal or agreement signed for each engagement.</p>
    </LegalPage>
  );
}
