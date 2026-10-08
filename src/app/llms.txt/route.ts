import { publishedCaseStudies } from "@/content/case-studies";
import { industries } from "@/content/industries";
import { products } from "@/content/products";
import { servicesFor, verticals } from "@/content/services";
import type { Vertical } from "@/content/types";
import { markets, offices, site, stats } from "@/lib/site";
import { tools } from "@/tools/registry";

/**
 * llms.txt (https://llmstxt.org): a plain Markdown map of the site for AI
 * assistants and answer engines, built from the same content as the pages.
 */
export function GET() {
  const url = (path: string) => new URL(path, site.url).toString();
  const link = (name: string, path: string, note?: string) => `- [${name}](${url(path)})${note ? `: ${note}` : ""}`;
  const order: Vertical[] = ["development", "marketing", "pr"];

  const lines = [
    `# ${site.name}`,
    "",
    `> ${site.shortName} is a software development, digital marketing and PR company headquartered in Navi Mumbai, India. ` +
      "We build websites, applications, SaaS and business systems, generate leads and sales opportunities, and build brand visibility and credibility.",
    "",
    `Key facts: ${stats.map((s) => `${s.value} ${s.label.toLowerCase()}`).join("; ")}. Markets served include ${markets.join(", ")}.`,
    "",
    `Offices: ${offices.map((o) => `${o.name} (${o.kind.toLowerCase()}): ${o.lines.join(", ")}`).join(". ")}.`,
    "",
    `Contact: phone ${site.phone}, or ${url("/contact/")}. Free 30 minute consultation: ${url("/book-consultation/")}.`,
    "",
    ...order.flatMap((v) => [
      `## ${verticals[v].name}`,
      "",
      verticals[v].intro,
      "",
      link(`${verticals[v].name} overview`, `/${v}/`),
      ...servicesFor(v).map((s) => link(s.name, `/${s.vertical}/${s.slug}/`, s.summary)),
      "",
    ]),
    "## Products",
    "",
    ...products.map((p) => link(p.name, `/products/${p.slug}/`, p.category)),
    "",
    "## Industries",
    "",
    ...industries.map((i) => link(i.name, `/industries/${i.slug}/`)),
    "",
    "## Case studies",
    "",
    ...publishedCaseStudies.map((c) => link(c.title, `/case-studies/${c.slug}/`, c.summary)),
    "",
    "## Company",
    "",
    link("About us", "/company/about/"),
    link("Our approach", "/company/approach/"),
    link("Global presence", "/company/global-presence/"),
    link("Portfolio", "/portfolio/"),
    link("FAQs", "/resources/faqs/"),
    link("Contact", "/contact/"),
    "",
    "## Optional",
    "",
    ...tools.filter((t) => t.status === "live").map((t) => link(t.name, `/free-tools/${t.slug}/`, t.summary)),
    link("Blog", "/blog/"),
    link("Privacy policy", "/privacy-policy/"),
    link("Terms", "/terms/"),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
