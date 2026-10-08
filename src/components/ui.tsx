import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "light";
  className?: string;
  track?: string;
};

const variants = {
  primary: "bg-amber-500 text-navy-900 hover:bg-amber-300",
  secondary: "border border-navy-800 text-navy-800 hover:bg-navy-50",
  ghost: "text-navy-800 underline-offset-4 hover:underline",
  light: "border border-white/40 text-white hover:bg-white/10",
};

export function ButtonLink({ href, children, variant = "primary", className = "", track }: ButtonProps) {
  const external = /^https?:/.test(href);
  const cls = `inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-[0.95rem] font-bold transition-colors ${variants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener" data-track={track}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} data-track={track}>
      {children}
    </Link>
  );
}

export function Section({
  children,
  tone = "white",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "white" | "mist" | "navy";
  className?: string;
  id?: string;
}) {
  const tones = { white: "bg-paper", mist: "bg-mist", navy: "bg-navy-900 text-white" };
  return (
    <section id={id} className={`${tones[tone]} py-14 md:py-20 ${className}`}>
      <div className="container-site">{children}</div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, intro, center, className = "" }: { eyebrow?: string; title: string; intro?: string; center?: boolean; className?: string }) {
  return (
    <div className={`mb-10 max-w-3xl ${center ? "mx-auto text-center" : ""} ${className}`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-2xl font-extrabold leading-tight tracking-tight md:text-[2.1rem]">{title}</h2>
      {intro && <p className="mt-4 text-lg leading-relaxed text-muted [.bg-navy-900_&]:text-navy-100">{intro}</p>}
    </div>
  );
}


export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-[var(--radius-card)] border border-line bg-white p-6 ${className}`}>{children}</div>;
}

export function Check() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="mt-1 h-4 w-4 flex-none text-amber-500" fill="currentColor">
      <path d="M7.6 13.6 4 10l-1.4 1.4 5 5 10-10L16.2 5z" />
    </svg>
  );
}

export function CheckList({ items, columns = 1 }: { items: string[]; columns?: 1 | 2 }) {
  // Two columns use CSS columns rather than a grid, so a two-line item in one
  // column does not leave a gap beside it in the other.
  return (
    <ul className={columns === 2 ? "md:columns-2 md:gap-x-10" : ""}>
      {items.map((i) => (
        <li key={i} className="mb-3 flex break-inside-avoid gap-3 leading-relaxed last:mb-0">
          <Check />
          <span>{i}</span>
        </li>
      ))}
    </ul>
  );
}

export function Arrow() {
  return (
    <svg aria-hidden viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  );
}
