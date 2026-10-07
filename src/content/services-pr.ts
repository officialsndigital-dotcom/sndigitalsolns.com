import type { Service, Step } from "./types";

const prProcess: Step[] = [
  { title: "Understand", text: "Your story, audience, competitors and what credibility means in your market." },
  { title: "Position", text: "Key messages, angles and spokespeople agreed before any outreach." },
  { title: "Plan", text: "Target publications, opportunities and a calendar of activity." },
  { title: "Execute", text: "Pitching, writing and coordinating with editors, creators or award bodies." },
  { title: "Amplify", text: "Coverage shared across your website, LinkedIn and sales material." },
  { title: "Report", text: "What was pitched, what was published and what comes next." },
];

const noGuarantee =
  "Editorial coverage, placements and awards are decided by editors and judges. We do not sell guaranteed placements or awards.";

export const prServices: Service[] = [
  {
    vertical: "pr",
    slug: "public-relations",
    name: "Public Relations",
    short: "Public Relations",
    metaTitle: "Public Relations Services | Media Relations & Press Releases",
    h1: "Public Relations Services",
    metaDescription:
      "PR strategy, media relations, press releases and corporate profiling that build visibility and credibility with the audiences that matter to your business.",
    outcome: "Your company is visible and credible in the publications your customers, partners and investors read.",
    summary: "PR strategy, media relations, press releases and profiling.",
    problem: {
      intro: "Buyers check you out before they speak to you. What they find shapes the first conversation.",
      points: [
        "Searching your company name shows little beyond your own website.",
        "Competitors appear in industry media and you do not.",
        "Company news, launches and milestones go unannounced.",
      ],
    },
    whatWeDo: [
      "We build a PR plan around your business goals, develop the story angles that editors care about, and handle media relations, press releases, corporate profiles and ongoing media outreach.",
      "The aim is steady, credible visibility in your industry, not one-off announcements.",
    ],
    deliverables: [
      "PR strategy and messaging",
      "Media list for your industry and markets",
      "Press releases and announcements",
      "Media outreach and editor relationships",
      "Corporate profiles and feature pitches",
      "Coverage reporting",
    ],
    process: prProcess,
    whyUs: [
      "PR works alongside our marketing and development teams, so coverage can be used across your website, SEO and sales outreach.",
      noGuarantee,
    ],
    industries: ["saas-technology", "it-services", "real-estate", "education"],
    related: ["pr/digital-pr", "pr/founder-thought-leadership", "pr/awards-recognition", "marketing/social-media-content"],
    faqs: [
      { q: "Do you guarantee media coverage?", a: "No. Editors decide what they publish. We improve your chances with strong angles, the right targets and persistent, professional outreach." },
      { q: "How soon can we expect coverage?", a: "Timing depends on the news value of your story and publication schedules. We share a plan with expected activity in the first month." },
    ],
  },
  {
    vertical: "pr",
    slug: "digital-pr",
    name: "Digital PR",
    short: "Digital PR",
    metaTitle: "Digital PR Agency | Online Media Placements",
    h1: "Digital PR Agency",
    metaDescription:
      "Digital PR for online publications and editorial stories that build brand visibility, authority and, where appropriate, support your SEO.",
    outcome: "Editorial mentions on respected online publications that build authority with readers and search engines.",
    summary: "Online editorial stories, publications and authority building.",
    problem: {
      intro: "Online authority comes from what other credible sites say about you.",
      points: [
        "Few respected websites mention or link to your company.",
        "Your brand has no presence in online industry publications.",
        "Online search results about your company are thin or outdated.",
      ],
    },
    whatWeDo: [
      "We pitch editorial stories, data and expert commentary to online publications relevant to your industry and markets.",
      "Where it makes sense, digital PR is aligned with your SEO plan so coverage also strengthens the pages you want to rank.",
    ],
    deliverables: [
      "Story angles and pitch calendar",
      "Online publication targeting",
      "Editorial pitching and follow-up",
      "Expert commentary opportunities",
      "Online reputation support",
      "Coverage and link reporting",
    ],
    process: prProcess,
    whyUs: ["Digital PR and SEO are planned together by one company.", noGuarantee],
    industries: ["saas-technology", "it-services", "ecommerce-retail"],
    related: ["pr/public-relations", "marketing/seo-aeo", "pr/founder-thought-leadership"],
    faqs: [
      { q: "Is digital PR the same as buying links?", a: "No. Digital PR earns editorial mentions through stories and expertise. We do not buy links." },
    ],
  },
  {
    vertical: "pr",
    slug: "founder-thought-leadership",
    name: "Founder & Executive Thought Leadership",
    short: "Founder Thought Leadership",
    metaTitle: "Founder Personal Branding & Thought Leadership Agency",
    h1: "Founder Personal Branding & Thought Leadership",
    metaDescription:
      "Founder and executive positioning through opinion pieces, interviews, profiles, speaking opportunities and LinkedIn thought leadership.",
    outcome: "Your founders and leaders become recognised voices in your industry, which makes every sales conversation easier.",
    summary: "Founder positioning, opinion pieces, interviews and speaking.",
    problem: {
      intro: "In B2B, people buy from people they have heard of.",
      points: [
        "Founders have strong views but no platform for them.",
        "Leadership is invisible outside existing clients.",
        "Speaking and interview opportunities go to competitors.",
      ],
    },
    whatWeDo: [
      "We define what each founder or executive should be known for, then build that position through opinion pieces, interviews, profiles, podcasts, speaking opportunities and LinkedIn content.",
    ],
    deliverables: [
      "Positioning and topics for each leader",
      "Opinion pieces and bylined articles",
      "Interview and profile pitching",
      "Speaking and panel opportunities",
      "LinkedIn thought leadership content",
    ],
    process: prProcess,
    whyUs: [
      "Founder PR is connected to LinkedIn content and B2B outreach, so visibility supports pipeline.",
      noGuarantee,
    ],
    industries: ["saas-technology", "it-services", "real-estate"],
    related: ["marketing/social-media-content", "pr/public-relations", "marketing/b2b-lead-generation", "pr/awards-recognition"],
    faqs: [
      { q: "How much of the founder's time does this need?", a: "Usually a short interview each month to capture views and stories, plus approval of drafts." },
    ],
  },
  {
    vertical: "pr",
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    short: "Influencer Marketing",
    metaTitle: "Influencer Marketing Agency | Creator Campaigns",
    h1: "Influencer Marketing Agency",
    metaDescription:
      "Influencer identification, creator outreach, campaign planning, brand collaborations and performance reporting.",
    outcome: "Creator collaborations that reach the right audience and are measured like any other campaign.",
    summary: "Creator outreach, collaborations and campaign reporting.",
    problem: {
      intro: "Influencer campaigns fail when creators are chosen on follower count alone.",
      points: [
        "Creators' audiences do not match your buyers.",
        "Briefs are vague, so content feels forced.",
        "Nobody can say what the campaign achieved.",
      ],
    },
    whatWeDo: [
      "We find creators whose audiences match your customers, handle outreach and negotiation, brief and coordinate the content, and report on reach, engagement and sales or leads where trackable.",
    ],
    deliverables: [
      "Creator identification and vetting",
      "Outreach and negotiation",
      "Campaign plan and creative briefs",
      "Campaign execution and approvals",
      "Performance reporting",
    ],
    process: prProcess,
    whyUs: ["Influencer content can be reused in paid social campaigns run by our performance marketing team."],
    industries: ["ecommerce-retail", "jewellery-diamonds", "real-estate"],
    related: ["marketing/performance-marketing", "marketing/ecommerce-growth", "marketing/social-media-content"],
    faqs: [
      { q: "How do you measure influencer campaigns?", a: "With tracked links, discount codes and platform data where available, reported against the goal agreed at the start." },
    ],
  },
  {
    vertical: "pr",
    slug: "awards-recognition",
    name: "Awards & Industry Recognition",
    short: "Awards & Recognition",
    metaTitle: "Business Awards Support | Award Nominations & Submissions",
    h1: "Business Awards & Industry Recognition",
    metaDescription:
      "Identify relevant industry awards and prepare strong submissions for company and founder recognition.",
    outcome: "Strong, well-prepared award entries for the recognition that matters in your industry.",
    summary: "Award identification and submissions for companies and founders.",
    problem: {
      intro: "Awards build trust, but entries take time and most are written in a rush.",
      points: [
        "You do not know which awards are credible or relevant.",
        "Deadlines are missed or entries are rushed.",
        "Entries describe activity instead of evidence.",
      ],
    },
    whatWeDo: [
      "We identify credible awards for your industry and markets, plan entries around deadlines, gather evidence from your team and write submissions for company and founder categories.",
    ],
    deliverables: [
      "Award research and calendar",
      "Entry strategy and category selection",
      "Submission writing and evidence gathering",
      "Founder and company recognition entries",
      "Announcement support if shortlisted",
    ],
    process: prProcess,
    whyUs: [noGuarantee],
    industries: ["saas-technology", "it-services", "education"],
    related: ["pr/public-relations", "pr/founder-thought-leadership", "pr/digital-pr"],
    faqs: [
      { q: "Do you guarantee we will win?", a: "No. Judges decide. We make sure entries are relevant, evidence-based and on time." },
      { q: "Do you recommend paid awards?", a: "We prioritise awards with credible judging. We will tell you if an award looks like pay-to-win." },
    ],
  },
];
