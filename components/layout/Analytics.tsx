"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import { clearUnconsentedCookies, consentSnapshot, parseConsent, subscribeConsent } from "@/lib/consent";
import { ClickTracker } from "./ClickTracker";
import { CookieConsent } from "./CookieConsent";

/**
 * GTM + Meta Pixel (brief §14), gated on cookie consent (privacy policy §4).
 * GTM loads only with analytics consent; the Pixel only with advertising consent.
 * Google Consent Mode is set before GTM so any ads tags inside the container also see
 * the advertising choice. GTM defaults to the site's container (public ID, safe in
 * source); NEXT_PUBLIC_GTM_ID overrides it. The Pixel needs NEXT_PUBLIC_META_PIXEL_ID.
 * GA4 itself is configured inside the GTM container, not here.
 */
const DEFAULT_GTM_ID = "GTM-TCZS844J";

export function Analytics() {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;
  const pixel = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const raw = useSyncExternalStore(subscribeConsent, consentSnapshot, () => null);
  const consent = parseConsent(raw);
  useEffect(() => clearUnconsentedCookies(parseConsent(raw)), [raw]);

  const ads = consent?.advertising ? "granted" : "denied";
  return (
    <>
      <ClickTracker />
      <CookieConsent />
      {gtm && consent?.analytics && (
        <Script id="gtm" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{analytics_storage:'granted',ad_storage:'${ads}',ad_user_data:'${ads}',ad_personalization:'${ads}'});(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
        </Script>
      )}
      {pixel && consent?.advertising && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixel}');fbq('track','PageView');`}
        </Script>
      )}
    </>
  );
}
