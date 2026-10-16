import { products } from "@/content/products";
import { services, verticals } from "@/content/services";
import { site } from "@/lib/site";
import type { Vertical } from "@/content/types";

/**
 * llms.txt: a plain-text map of the site for the assistants that now answer
 * questions people used to type into a search box. The convention is young and
 * no engine promises to read it, but it costs one generated file and it is the
 * only place we can state plainly what this company does and which page says
 * what.
 *
 * Built from the same data as the sitemap so it cannot drift into listing URLs
 * that do not exist. The email address is deliberately absent: it is kept out
 * of server-rendered output on purpose, and this file is server-rendered.
 *
 * No route segment config: under Cache Components a GET handler prerenders on
 * its own when it touches no uncached or runtime data, and this one only reads
 * modules that are compiled in.
 */

const order: Vertical[] = ["development", "marketing", "pr"];

function build() {
  const lines = [
    `# ${site.name}`,
    "",
    "> Software development, digital marketing and PR company in Navi Mumbai,",
    "> India, working with clients in the United States, Canada, Australia, the",
    "> United Arab Emirates and Saudi Arabia. 11+ years, 417+ websites built.",
    "",
    "Three things, usually bought together: we build the software and websites,",
    "we generate the demand, and we build the credibility.",
    "",
  ];

  for (const v of order) {
    lines.push(`## ${verticals[v].name}`, "", `${verticals[v].intro}`, "");
    for (const s of services.filter((x) => x.vertical === v)) {
      lines.push(`- [${s.name}](${site.url}/${v}/${s.slug}/): ${s.summary}`);
    }
    lines.push("");
  }

  lines.push("## Software we build and run ourselves", "");
  for (const p of products) lines.push(`- [${p.name}](${site.url}/products/${p.slug}/)`);

  lines.push(
    "",
    "## Evidence",
    "",
    `- [Case studies](${site.url}/case-studies/), including dashboard recordings behind the figures we quote`,
    `- [Portfolio](${site.url}/portfolio/)`,
    `- [Blog](${site.url}/blog/)`,
    "",
    "## Contact",
    "",
    `- [Contact](${site.url}/contact/)`,
    `- [Book a consultation](${site.url}/book-consultation/)`,
    `- Phone: ${site.phone}`,
    "",
  );
  return lines.join("\n");
}

export function GET() {
  return new Response(build(), {
    headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" },
  });
}
