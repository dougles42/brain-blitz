"use client";

import { useState, useEffect, useCallback } from "react";

const COOKIE_CONSENT_KEY = "pitchperfect_cookie_consent";

export type ConsentStatus = "accepted" | "declined" | "pending";

export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (stored === "accepted" || stored === "declined") return stored;
  return "pending";
}

export function useCookieConsent() {
  const [status, setStatus] = useState<ConsentStatus>("pending");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const current = getConsentStatus();
    setStatus(current);
    setShowBanner(current === "pending");
  }, []);

  const accept = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
    setStatus("accepted");
    setShowBanner(false);
  }, []);

  const decline = useCallback(() => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "declined");
    setStatus("declined");
    setShowBanner(false);
  }, []);

  return { status, showBanner, accept, decline };
}

export function CookieConsentBanner({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
    >
      <div className="mx-4 mb-4 max-w-2xl sm:mx-auto">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-700 dark:bg-zinc-900">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Cookie Consent
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                We use cookies to show personalized ads via Google AdSense and
                to analyze site traffic. By clicking &ldquo;Accept&rdquo; you
                consent to our use of cookies. You can decline non-essential
                cookies and still use all features.
              </p>
              <p className="mt-2 text-xs text-zinc-500">
                Read our{" "}
                <a
                  href="/privacy"
                  className="underline hover:text-zinc-700 dark:hover:text-zinc-300"
                >
                  Privacy Policy
                </a>{" "}
                for details.
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={onDecline}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Decline
              </button>
              <button
                onClick={onAccept}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
