import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/components/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "How S N Digital Solns collects, uses and protects personal information submitted through this website.", path: "/privacy-policy/" });

export default function Page() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/">
      <h2>What we collect</h2>
      <p>When you submit a form on this website we collect the details you enter, such as your name, email address, phone number, company and message. If you use our free tools and request a report, we also store the inputs and results of that tool.</p>
      <p>We record how you arrived at the website (for example campaign parameters and the referring page) so we can understand which marketing works.</p>
      <h2>How we use it</h2>
      <p>We use your details to respond to your enquiry, arrange consultations and demos, send reports you request, and improve our services. We store enquiries in our customer relationship management (CRM) system.</p>
      <h2>Cookies and analytics</h2>
      <p>We use analytics and advertising tags to measure website use. See our <a href="/cookie-policy/">cookie policy</a>.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete your personal information by emailing <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
