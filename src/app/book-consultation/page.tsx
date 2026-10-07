import { LeadForm } from "@/components/LeadForm";
import { pageMetadata } from "@/components/seo";
import { CheckList } from "@/components/ui";
import { serviceInterests } from "@/lib/interests";
import { CTA, site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Book a 10 Minute Free Consultation",
  description: "Tell us what you want to achieve and pick a time. In 10 minutes we will tell you honestly whether and how we can help.",
  path: "/book-consultation/",
});

export default function BookConsultationPage() {
  return (
    <section className="bg-mist py-12 md:py-20">
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <div>
          <p className="eyebrow mb-3">Free consultation</p>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight md:text-5xl">{CTA.consultation}</h1>
          <p className="mt-5 text-lg leading-relaxed text-muted">Share a few details, then choose a time that suits you.</p>
          <div className="mt-8">
            <p className="mb-3 font-bold">In 10 minutes you will get</p>
            <CheckList
              items={[
                "A clear read on whether we can help",
                "The approach we would suggest",
                "What the next step would be, with no obligation",
              ]}
            />
          </div>
          <p className="mt-8 text-sm text-muted">
            Prefer to talk now? Call{" "}
            <a href={site.phoneHref} data-track="phone_click" className="font-semibold text-navy-800 underline">
              {site.phone}
            </a>{" "}
            or email{" "}
            <a href={`mailto:${site.email}`} data-track="email_click" className="font-semibold text-navy-800 underline">
              {site.email}
            </a>
            .
          </p>
        </div>
        <LeadForm
          kind="consultation"
          interests={serviceInterests}
          queryKey="service"
          calendarUrl={process.env.NEXT_PUBLIC_CONSULTATION_CALENDAR_URL}
          submitLabel="Continue to choose a time"
        />
      </div>
    </section>
  );
}
