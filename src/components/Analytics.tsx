"use client";

import Script from "next/script";
import { useConsent } from "@/components/consent-store";
import { googleConsent } from "@/lib/consent";
import { analytics } from "@/lib/site";

const { gtmId: GTM_ID, ga4Id: GA4_ID, metaPixelId: PIXEL_ID } = analytics;

/**
 * The measurement tags, and nothing until the visitor has agreed to them.
 * Rendering them conditionally rather than loading them and asking afterwards
 * is the point: a script that has already run has already set its cookies.
 */
export function Analytics() {
  const { decided, categories } = useConsent();
  if (!decided) return null;

  const consent = JSON.stringify(googleConsent(categories));
  // Google's tags carry the signal themselves, so a container that fires its
  // own tags still knows what it may do.
  const googleInit =
    "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
    `gtag('consent','default',${JSON.stringify(googleConsent({ analytics: false, marketing: false }))});` +
    `gtag('consent','update',${consent});`;

  return (
    <>
      {GTM_ID && (categories.analytics || categories.marketing) && (
        <Script id="gtm" strategy="afterInteractive">
          {`${googleInit}(function(w,d,s,l,i){w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
      )}
      {GA4_ID && categories.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`${googleInit}gtag('js',new Date());gtag('config','${GA4_ID}');`}
          </Script>
        </>
      )}
      {PIXEL_ID && categories.marketing && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
          </Script>
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              alt=""
              style={{ display: "none" }}
              src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
