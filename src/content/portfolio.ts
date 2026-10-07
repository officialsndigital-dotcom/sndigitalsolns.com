// Development portfolio from the supplied PDF. These are websites we delivered;
// no functionality is claimed beyond that. The screenshots in public/portfolio/
// are the home-page captures from that same PDF (supplied 2026-10-03).
export type PortfolioItem = { url: string; category: string; type: "Website"; shot: string };

export const hostOf = (url: string) => new URL(url).hostname.replace(/^www\./, "");

const group = (category: string, urls: string[]): PortfolioItem[] =>
  urls.map((url) => ({ url, category, type: "Website", shot: `/portfolio/${hostOf(url)}.webp` }));

export const portfolio: PortfolioItem[] = [
  ...group("Real Estate", [
    "https://soberestate.net/",
    "https://homencondos.ca/",
    "https://teamarora.com/",
    "https://retailnoffice.com/",
    "https://investwithdion.ae/",
    "https://nicoletteconnors.com/",
  ]),
  ...group("Jewellery & Diamonds", [
    "https://thecaratcreations.com/",
    "https://www.enchantedjewels.co.in/",
    "https://colourjewels.com/",
    "https://diamonddeal.ae/",
    "https://dmcc.ae/",
    "https://anitadiam.com/",
    "http://www.kavirdiamhk.com/",
    "https://vramsimpex.com/",
  ]),
  ...group("Education", [
    "https://nesedu.in/",
    "https://www.dalmialionscollege.ac.in/",
    "https://www.hrcollege.edu/",
    "https://www.chmcollege.in/",
    "https://www.hvpslawcollege.edu.in/",
    "https://www.ksmanjunathacollege.edu.in/",
    "https://eknathmadhavicollege.in/",
    "https://lpps.co.in/",
    "https://kmdc.edu.in/",
    "https://krmdc.edu.in/",
    "https://karnatakasanghadom.org/",
    "https://ksmanjunathaschool.edu.in/",
    "https://gnkhalsa.edu.in/",
    "https://lalacollege.edu.in/",
    "https://sndtcollegechurchgate.in/",
    "https://www.kitg.in/",
  ]),
  ...group("E Commerce & Retail", ["https://www.greenbankcannabis.com/"]),
  ...group("Oil & Gas", ["https://www.aimmsgroup.com/"]),
];

export const portfolioCategories = [...new Set(portfolio.map((p) => p.category))];
