"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { closePreferences, openPreferences, saveConsent, useConsent } from "@/components/consent-store";
import { ACCEPT_ALL, type Categories, DENY_ALL } from "@/lib/consent";

const BTN = "rounded-lg px-5 py-2.5 text-[0.95rem] font-bold transition-colors";

/** The bar along the bottom, shown until the visitor decides. */
export function CookieConsent() {
  const { decided, panelOpen } = useConsent();
  if (panelOpen) return <Preferences />;
  if (decided) return null;
  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-0 bottom-[52px] z-[90] border-t border-line bg-white shadow-[0_-8px_24px_rgba(11,22,48,0.12)] md:bottom-0"
    >
      <div className="container-site flex flex-col gap-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
        <p className="max-w-3xl text-[0.95rem] leading-relaxed text-navy-800">
          We use cookies that the site needs to work. With your agreement we would also use cookies that tell us how
          the site is used and that help us advertise. You can accept these, reject them, or choose which ones. Our{" "}
          <Link href="/cookie-policy/" className="font-bold text-amber-600 underline underline-offset-4">
            cookie policy
          </Link>{" "}
          explains each one.
        </p>
        <div className="flex flex-wrap gap-3 lg:flex-none">
          <button type="button" onClick={openPreferences} className={`${BTN} border border-navy-800 text-navy-800 hover:bg-navy-50`}>
            Preferences
          </button>
          <button type="button" onClick={() => saveConsent(DENY_ALL)} className={`${BTN} border border-navy-800 text-navy-800 hover:bg-navy-50`}>
            Reject all
          </button>
          <button type="button" onClick={() => saveConsent(ACCEPT_ALL)} className={`${BTN} bg-amber-500 text-navy-900 hover:bg-amber-300`}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}

/** The panel behind "Preferences", where each category is chosen separately. */
function Preferences() {
  const { categories } = useConsent();
  const [draft, setDraft] = useState<Categories>(categories);
  const titleId = useId();
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    close.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreferences();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-[95] flex items-end justify-center bg-navy-900/60 p-0 sm:items-center sm:p-6">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-full w-full max-w-xl overflow-y-auto rounded-t-[var(--radius-card)] bg-white p-6 sm:rounded-[var(--radius-card)]"
      >
        <h2 id={titleId} className="text-xl font-extrabold text-navy-900">
          Choose your cookies
        </h2>
        <div className="mt-5 space-y-4">
          <Row
            title="Strictly necessary"
            body="Needed for the pages, the forms and your security. These cannot be turned off."
            checked
            disabled
          />
          <Row
            title="Analytics"
            body="Google Analytics, which tells us which pages people read and where they arrive from. We use it to decide what to write next."
            checked={draft.analytics}
            onChange={(analytics) => setDraft((d) => ({ ...d, analytics }))}
          />
          <Row
            title="Marketing"
            body="The Meta pixel, which lets us measure our advertising and show it to people who have already visited."
            checked={draft.marketing}
            onChange={(marketing) => setDraft((d) => ({ ...d, marketing }))}
          />
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button type="button" onClick={() => saveConsent(draft)} className={`${BTN} bg-amber-500 text-navy-900 hover:bg-amber-300`}>
            Save my choice
          </button>
          <button type="button" onClick={() => saveConsent(ACCEPT_ALL)} className={`${BTN} border border-navy-800 text-navy-800 hover:bg-navy-50`}>
            Accept all
          </button>
          <button ref={close} type="button" onClick={closePreferences} className={`${BTN} text-navy-800 underline-offset-4 hover:underline`}>
            Cancel
          </button>
        </div>
        <p className="mt-4 text-sm text-muted">
          Full detail is in our{" "}
          <Link href="/cookie-policy/" className="font-bold text-amber-600 underline underline-offset-4">
            cookie policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Row({
  title,
  body,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  body: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label className="flex gap-3 rounded-[var(--radius-card)] border border-line p-4">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-5 w-5 flex-none accent-navy-800"
      />
      <span>
        <span className="block font-bold text-navy-900">{title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-muted">{body}</span>
      </span>
    </label>
  );
}

/** The footer link that lets someone change their mind later. */
export function CookiePreferencesLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={openPreferences} className={className}>
      Cookie Preferences
    </button>
  );
}
