"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Keeps the navigation from staying open after you use it.
 *
 * The mobile menu is a native <details>, which stays open across a client-side
 * route change, and the desktop mega menu is CSS hover, which stays visible
 * while the pointer is still inside it after a click. Both looked stuck. On
 * every route change we close the <details> elements and suppress the hover
 * menus briefly, so the new page is visible straight away.
 */
export function NavBehaviour() {
  const pathname = usePathname();

  useEffect(() => {
    for (const d of document.querySelectorAll<HTMLDetailsElement>("details[data-nav]")) d.open = false;
    (document.activeElement as HTMLElement | null)?.blur?.();

    const root = document.documentElement;
    root.classList.add("nav-suppressed");
    const t = window.setTimeout(() => root.classList.remove("nav-suppressed"), 500);
    return () => window.clearTimeout(t);
  }, [pathname]);

  // Lock the page behind the mobile menu so only the menu scrolls.
  useEffect(() => {
    const panel = document.querySelector<HTMLDetailsElement>("details[data-nav='mobile']");
    if (!panel) return;
    const sync = () => document.body.classList.toggle("menu-open", panel.open);
    panel.addEventListener("toggle", sync);
    return () => {
      panel.removeEventListener("toggle", sync);
      document.body.classList.remove("menu-open");
    };
  }, []);

  return null;
}
