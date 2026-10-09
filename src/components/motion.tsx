"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

// useLayoutEffect warns during server rendering, and these components all render
// on the server first.
const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades its children up the first time they scroll into view.
 *
 * Nothing is ever hidden that the visitor can already see: the hiding class is
 * added after mount, and only to content that is still below the fold. So the
 * server HTML stays visible with JavaScript off, and anything on screen when
 * the page loads is never blanked out while an observer catches up.
 */
export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "in">("idle");

  useIsoLayoutEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    const el = ref.current;
    if (!el) return;
    // Any part of it already on screen, or scrolled past: leave it alone.
    if (el.getBoundingClientRect().top < window.innerHeight) return;
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
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    // Last resort: content must never stay invisible because an observer did
    // not report.
    const timer = window.setTimeout(() => setState("in"), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
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
 * suffixes (₹, %, x, +) and the thousands separators are preserved.
 */
export function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const match = /^(\D*?)(\d[\d,]*(?:\.\d+)?)([\s\S]*)$/.exec(value);
  // Everything the animation needs is a primitive, so the effect below depends
  // on stable values and is not torn down on every frame it renders.
  const prefix = match?.[1] ?? "";
  const digits = match?.[2] ?? "";
  const suffix = match?.[3] ?? "";
  const target = digits ? Number(digits.replace(/,/g, "")) : 0;
  const decimals = digits.includes(".") ? digits.split(".")[1].length : 0;
  const grouped = digits.includes(",");

  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [armed, setArmed] = useState(false);

  useIsoLayoutEffect(() => {
    if (!digits || reducedMotion() || !("IntersectionObserver" in window)) return;
    setShown(`${prefix}${(0).toFixed(decimals)}${suffix}`);
    setArmed(true);
  }, []);

  useEffect(() => {
    if (!armed) return;
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let started = 0;
    const format = (n: number) => {
      const [whole, part] = n.toFixed(decimals).split(".");
      const body = grouped ? Number(whole).toLocaleString("en-IN") : whole;
      return `${prefix}${part ? `${body}.${part}` : body}${suffix}`;
    };
    const step = (now: number) => {
      if (!started) started = now;
      // Ease out, so the number slows as it lands rather than stopping dead.
      const progress = Math.min(1, (now - started) / 1100);
      setShown(format(target * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    // A figure already on screen counts up now; one below the fold waits until
    // it is scrolled to. Waiting for an observer to confirm what is already
    // visible is what left these showing zero.
    let io: IntersectionObserver | undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) {
      frame = requestAnimationFrame(step);
    } else {
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          frame = requestAnimationFrame(step);
        },
        { rootMargin: "0px 0px -40px 0px" },
      );
      io.observe(el);
    }
    // Last resort: the real figure must never be left showing zero.
    const timer = window.setTimeout(() => {
      if (!started) setShown(value);
    }, 2500);
    return () => {
      io?.disconnect();
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [armed, target, decimals, grouped, prefix, suffix, value]);

  if (!match) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {shown}
    </span>
  );
}
