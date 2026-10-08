"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import { site } from "@/lib/site";

const noSubscribe = () => () => {};
const browserAddress = () => `${site.emailUser}@${site.emailDomain}`;

/**
 * Our email address, written into the page only in the browser. The server HTML
 * carries no address for scrapers to harvest; until the script runs (or without
 * JavaScript) the link reads "Email us" and goes to the contact page.
 */
export function EmailLink({
  className,
  subject,
  track = "email_click",
  children,
}: {
  className?: string;
  subject?: string;
  track?: string;
  /** Link text. Defaults to the address itself. */
  children?: ReactNode;
}) {
  const address = useSyncExternalStore(noSubscribe, browserAddress, () => null);
  const href = address ? `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}` : "/contact/";
  return (
    <a href={href} data-track={track} className={className}>
      {children ?? address ?? "Email us"}
    </a>
  );
}
