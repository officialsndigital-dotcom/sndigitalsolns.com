import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { Analytics } from "@/components/Analytics";
import { CookieConsent } from "@/components/CookieConsent";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MobileActionBar } from "@/components/MobileActionBar";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd, OG_IMAGE, organizationJsonLd } from "@/components/seo";
import { Tracking } from "@/components/Tracking";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"], display: "swap" });
const barlow = Barlow_Condensed({ variable: "--font-barlow", subsets: ["latin"], weight: ["600", "700"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.shortName} | Technology, Digital Growth & PR`,
    template: `%s | ${site.shortName}`,
  },
  description:
    "S N Digital Solns builds digital products, generates qualified B2B opportunities and strengthens brands through development, marketing and public relations.",
  applicationName: site.shortName,
  formatDetection: { telephone: false },
  openGraph: { siteName: site.shortName, type: "website", locale: "en_IN", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [OG_IMAGE.url] },
};

export const viewport: Viewport = { themeColor: "#172d60" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${manrope.variable} ${barlow.variable}`}>
      <head>
        {/* No preconnect to the tag manager: nothing is loaded from it until
            the visitor has agreed, and an unused preconnect is dropped long
            before that happens. */}
        {/* The header logo is the largest element painted above the fold. */}
        <link rel="preload" as="image" href="/brand/sn-logo-sm.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body className="flex min-h-screen flex-col pb-[52px] md:pb-0">
        <Analytics />
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded focus:bg-white focus:px-4 focus:py-2">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <MobileActionBar />
        <WhatsAppButton />
        <Tracking />
        <CookieConsent />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
