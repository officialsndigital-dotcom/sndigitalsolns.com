import { PageHero } from "@/components/blocks";
import { LeadForm } from "@/components/LeadForm";
import { pageMetadata } from "@/components/seo";
import { SocialIcons } from "@/components/SocialIcons";
import { Section } from "@/components/ui";
import { serviceInterests } from "@/lib/interests";
import { offices, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Contact Us",
  description: `Contact S N Digital Solns: call ${site.phone}, email ${site.email}, or visit our Navi Mumbai head office.`,
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Contact", href: "/contact/" }]} eyebrow="Contact" title="Talk to us" lead="Send us a message, call, or book a 30 minute consultation." primary={{ href: "/book-consultation/", label: "Book a 30 Minute Free Consultation" }} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-8">
            <div>
              <p className="eyebrow mb-2">Phone & WhatsApp</p>
              <a href={site.phoneHref} data-track="phone_click" className="text-xl font-extrabold text-navy-900 hover:text-amber-600">
                {site.phone}
              </a>
              <a href={site.whatsappHref} data-track="whatsapp_click" target="_blank" rel="noopener" className="mt-1 block font-semibold text-navy-700 underline">
                Message us on WhatsApp
              </a>
            </div>
            <div>
              <p className="eyebrow mb-2">Email</p>
              <a href={`mailto:${site.email}`} data-track="email_click" className="text-xl font-extrabold text-navy-900 hover:text-amber-600">
                {site.email}
              </a>
            </div>
            {offices.map((o) => (
              <address key={o.name} className="not-italic leading-relaxed">
                <p className="eyebrow mb-2">
                  {o.name} · {o.kind}
                </p>
                {o.lines.map((l) => (
                  <span key={l} className="block text-muted">
                    {l}
                  </span>
                ))}
                {o.phone && <span className="block font-semibold">{o.phone}</span>}
              </address>
            ))}
            <SocialIcons className="text-navy-800" size={22} />
          </div>
          <LeadForm kind="contact" interests={serviceInterests} submitLabel="Send message" messageLabel="Your message" />
        </div>
      </Section>
    </>
  );
}
