import { LegalPage } from "@/components/LegalPage";
import { pageMetadata } from "@/components/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "How the S N Digital Solns website uses cookies and similar technologies.", path: "/cookie-policy/" });

export default function Page() {
  return (
    <LegalPage title="Cookie Policy" path="/cookie-policy/">
      <h2>What cookies are</h2>
      <p>
        Cookies are small files a website stores in your browser. Similar technologies, such as local storage and tracking pixels, do much the same job.
        This page explains which of them this website uses and why.
      </p>
      <h2>What we use</h2>
      <p>
        <strong>Strictly necessary.</strong> A small number of cookies keep the website working, for example remembering that you submitted a form so you
        are not shown it again on the thank-you step. These cannot be switched off.
      </p>
      <p>
        <strong>Analytics.</strong> We load analytics tags through Google Tag Manager to count visits, see which pages people read and find pages that are
        not working. This tells us how the website performs, not who you are.
      </p>
      <p>
        <strong>Advertising.</strong> When we run campaigns we load advertising tags, such as the Google Ads and Meta pixels, so we can measure which ads
        lead to enquiries and avoid showing you ads for something you have already asked about.
      </p>
      <p>
        <strong>First-visit campaign data.</strong> We store the campaign parameters and referring page from your first visit in your browser&rsquo;s local
        storage for up to 90 days, so that when you submit a form we know which marketing brought you to us.
      </p>
      <h2>How long they last</h2>
      <p>
        Session cookies disappear when you close your browser. The rest last from a few days up to two years, depending on the tag that set them. Our own
        first-visit campaign record is cleared after 90 days.
      </p>
      <h2>Managing cookies</h2>
      <p>
        You can block or delete cookies in your browser settings, and most browsers let you refuse third party cookies specifically. Browser extensions can
        block advertising and analytics tags entirely. The website still works without any of them, though some measurement will be missing on our side.
      </p>
      <h2>Changes and contact</h2>
      <p>
        We update this page when the tags we run change. Questions about it go to <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
