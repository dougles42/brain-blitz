"use client";

import { useEffect } from "react";
import Script from "next/script";
import SITE_CONFIG from "@/lib/site-config";
import { useCookieConsent, CookieConsentBanner } from "./cookie-consent";

export function AdSenseLoader() {
  const { status, showBanner, accept, decline } = useCookieConsent();

  useEffect(() => {
    if (status === "accepted" && typeof window !== "undefined") {
      (window as unknown as Record<string, unknown>).adsbygoogle =
        (window as unknown as Record<string, unknown>).adsbygoogle || [];
    }
  }, [status]);

  if (!SITE_CONFIG.googleAdsense.enabled) return null;

  return (
    <>
      {showBanner && (
        <CookieConsentBanner onAccept={accept} onDecline={decline} />
      )}
      {status === "accepted" && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${SITE_CONFIG.googleAdsense.publisherId}`}
            crossOrigin="anonymous"
          />
          <Script
            id="google-ads-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `try { (adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) { console.debug("AdSense init:", e); }`,
            }}
          />
        </>
      )}
    </>
  );
}

export function AdUnit({
  slot,
  format = "auto",
  className = "",
}: {
  slot: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}) {
  if (!SITE_CONFIG.googleAdsense.enabled) return null;

  const formatStyles = {
    auto: { display: "block", minHeight: "100px" },
    rectangle: { display: "block", width: "300px", height: "250px" },
    horizontal: { display: "block", width: "728px", height: "90px" },
    vertical: { display: "block", width: "160px", height: "600px" },
  };

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={formatStyles[format]}
      data-ad-client={SITE_CONFIG.googleAdsense.publisherId}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive="true"
    />
  );
}
