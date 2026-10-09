"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// useLayoutEffect warns during server rendering, and these components all render
// on the server first.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades its children up the first time they scroll into view.
 *
 * The hiding class is added after mount, so the server HTML is visible and the
 * content never disappears when JavaScript is off or still loading.
 */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "in">("idle");

  useIsoLayoutEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    setState("hidden");
  }, []);

  useEffect(() => {
    if (state !== "hidden") return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setState("in");
        io.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [state]);

  const motion = state === "hidden" ? "reveal" : state === "in" ? "reveal is-in" : "";
  return (
    <div ref={ref} className={`${motion} ${className}`} style={delay && state !== "idle" ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/**
 * Counts a figure up to its final value when it scrolls into view.
 *
 * The final value is what renders on the server, so the real number is in the
 * HTML for search engines and for anyone without JavaScript. Prefixes and
 * suffixes (₹, %, x, M) and the thousands separators are preserved.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = /^(\D*?)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/.exec(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [armed, setArmed] = useState(false);

  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const decimals = match?.[2].includes(".") ? match[2].split(".")[1].length : 0;
  const grouped = match?.[2].includes(",") ?? false;

  useIsoLayoutEffect(() => {
    if (!match || reducedMotion() || !("IntersectionObserver" in window)) return;
    setShown(`${match[1]}${(0).toFixed(decimals)}${match[3]}`);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed || !match) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const [whole, part] = fixed.split(".");
      const withSeparators = grouped ? Number(whole).toLocaleString("en-IN") : whole;
      return `${match[1]}${part ? `${withSeparators}.${part}` : withSeparators}${match[3]}`;
    };
    const run = (start: number) => (now: number) => {
      // Ease out, so the number slows as it lands rather than stopping dead.
      const progress = Math.min(1, (now - start) / 1100);
      const eased = 1 - (1 - progress) ** 3;
      setShown(format(target * eased));
      if (progress < 1) frame = requestAnimationFrame(run(start));
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        frame = requestAnimationFrame((now) => run(now)(now));
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [armed, decimals, grouped, match, target]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
