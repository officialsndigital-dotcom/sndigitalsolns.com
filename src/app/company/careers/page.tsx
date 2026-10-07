import { PageHero } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { ButtonLink, ContentRequired, Section } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Work with S N Digital Solns across software development, digital marketing and PR.",
  path: "/company/careers/",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Company", href: "/company/" },
          { name: "Careers", href: "/company/careers/" },
        ]}
        eyebrow="Careers"
        title="Work with us"
        lead="We are a team of 72 technology professionals plus marketing and PR specialists."
      />
      <Section>
        <div className="max-w-2xl">
          <ContentRequired>Open roles, benefits and the hiring process.</ContentRequired>
          <p className="mt-6 text-lg text-muted">Interested in joining? Send your CV and the role you are interested in.</p>
          <ButtonLink href={`mailto:${site.email}?subject=Career%20enquiry`} className="mt-6" track="email_click">
            Email your CV
          </ButtonLink>
        </div>
      </Section>
    </>
  );
}
