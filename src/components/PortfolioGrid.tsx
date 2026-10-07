"use client";

import { useState } from "react";
import type { PortfolioItem } from "@/content/portfolio";

const host = (url: string) => new URL(url).hostname.replace(/^www\./, "");

export function PortfolioGrid({ items, categories }: { items: PortfolioItem[]; categories: string[] }) {
  const [active, setActive] = useState("All");
  const shown = active === "All" ? items : items.filter((i) => i.category === active);
  return (
    <>
      <div role="toolbar" aria-label="Filter by industry" className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-2">
        {["All", ...categories].map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`flex-none rounded-full border px-4 py-2 text-sm font-semibold transition ${
              active === c ? "border-navy-800 bg-navy-800 text-white" : "border-line bg-white text-navy-800 hover:border-navy-600"
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((i) => (
          <li key={i.url}>
            <a
              href={i.url}
              target="_blank"
              rel="noopener nofollow"
              data-track="portfolio_click"
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-white p-5 hover:border-navy-600 hover:shadow-md"
            >
              <span className="eyebrow">{i.category}</span>
              <span className="mt-2 break-all text-lg font-extrabold text-navy-900">{host(i.url)}</span>
              <span className="mt-1 text-sm text-muted">{i.type} · Visit site ↗</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
