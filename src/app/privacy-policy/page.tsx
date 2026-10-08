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
      <h2>Who we share it with</h2>
      <p>We share your details with the service providers that run our systems, such as our CRM, email, analytics and hosting providers, and only so they can provide that service to us. We do not sell your personal information. We disclose it to a public authority only where the law requires it.</p>
      <h2>How long we keep it</h2>
      <p>We keep enquiry records for as long as we are in contact with you and for up to three years after our last exchange, so we can pick up the conversation where it ended. Accounting records are kept for the period Indian law requires. Free tool inputs are kept for up to 12 months.</p>
      <h2>Where it is stored</h2>
      <p>Some of the providers we use store data outside India. Where that happens we rely on the provider&rsquo;s standard contractual protections for that transfer.</p>
      <h2>Your choices</h2>
      <p>You can ask us to access, correct or delete your personal information, or to stop sending you marketing, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within 30 days. Every marketing email we send also carries an unsubscribe link.</p>
      <h2>Changes to this page</h2>
      <p>When we change how we handle personal information we update this page and the effective date at the top of it.</p>
    </LegalPage>
  );
}
