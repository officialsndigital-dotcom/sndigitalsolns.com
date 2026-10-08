import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/components/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Terms of use for the S N Digital Solns website and free tools.", path: "/terms/" });

export default function Page() {
  return (
    <LegalPage title="Terms of Use" path="/terms/">
      <h2>Who these terms are between</h2>
      <p>
        These terms govern your use of this website. &ldquo;We&rdquo; and &ldquo;us&rdquo; mean S N Digital Solns Pvt. Ltd., a company registered in India.
        By using the website you accept these terms. If you do not accept them, please do not use the website.
      </p>
      <h2>Website content</h2>
      <p>
        Content on this website is provided for general information. Case study figures describe past results for specific clients and are not a promise of
        future results. We keep the website accurate, but we do not warrant that every page is complete or current, and we may change or remove content at
        any time.
      </p>
      <h2>Free tools</h2>
      <p>
        Our calculators produce estimates from the numbers you enter and from stated planning assumptions. They are not financial, legal or tax advice and
        they are not a guarantee of results. Decisions you take on the basis of a calculator output are your own.
      </p>
      <h2>Services</h2>
      <p>
        Nothing on this website is an offer or a quotation. Paid services are governed by the proposal, statement of work or agreement signed for that
        specific engagement, and where that document conflicts with this page, that document applies.
      </p>
      <h2>Intellectual property</h2>
      <p>
        The text, design, logos, screenshots and software on this website belong to us or to our clients and licensors. You may read, print and share pages
        for your own business use. You may not republish, resell or systematically copy them without our written permission.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Please do not attempt to break into, overload, scrape at scale, or interfere with this website or the systems behind it, and do not submit anything
        unlawful or that infringes someone else&rsquo;s rights.
      </p>
      <h2>Third party links</h2>
      <p>
        Some pages link to websites we do not run, including client websites in our portfolio. We are not responsible for their content or their privacy
        practices.
      </p>
      <h2>Liability</h2>
      <p>
        To the extent the law allows, we are not liable for indirect or consequential loss, lost profits or lost data arising from your use of this website
        or of the free tools. Nothing here limits liability that cannot be limited by law.
      </p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts at Mumbai, Maharashtra have jurisdiction over any dispute about them.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms go to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
