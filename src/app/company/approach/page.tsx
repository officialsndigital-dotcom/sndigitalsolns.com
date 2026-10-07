import { CtaBand, PageHero, ProcessSteps } from "@/components/blocks";
import { pageMetadata } from "@/components/seo";
import { CheckList, Section, SectionHead } from "@/components/ui";

export const metadata = pageMetadata({
  title: "Our Approach",
  description: "How S N Digital Solns plans, builds and runs projects and campaigns: clear scope, staged delivery, weekly optimisation and honest reporting.",
  path: "/company/approach/",
});

export default function ApproachPage() {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Company", href: "/company/" },
          { name: "Our Approach", href: "/company/approach/" },
        ]}
        eyebrow="Our approach"
        title="Understand first, then build, then improve"
        lead="Every engagement starts with your business goal, not a list of deliverables."
      />
      <Section>
        <SectionHead eyebrow="Process" title="How every engagement runs" />
        <ProcessSteps
          steps={[
            { title: "Understand", text: "Your business, customers, goals and constraints." },
            { title: "Plan", text: "Scope, priorities, budget and how success will be measured." },
            { title: "Build or launch", text: "Software in stages, or campaigns in controlled tests." },
            { title: "Measure", text: "Tracking set up before go-live, so results are visible." },
            { title: "Improve", text: "Regular changes based on what the data shows." },
            { title: "Report", text: "Plain-language updates on progress and next steps." },
          ]}
        />
      </Section>
      <Section tone="mist">
        <SectionHead eyebrow="Principles" title="What you can expect from us" />
        <CheckList
          columns={2}
          items={[
            "We tell you if we are not the right fit.",
            "We do not guarantee rankings, leads, coverage or awards.",
            "Your accounts, code and data stay in your name.",
            "One point of contact across development, marketing and PR.",
            "Targets are agreed after we understand your market.",
            "Reporting shows what worked and what did not.",
          ]}
        />
      </Section>
      <CtaBand title="Start with a 10 minute conversation." />
    </>
  );
}
