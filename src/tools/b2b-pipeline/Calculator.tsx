"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { readAttribution, track } from "@/components/Tracking";
import { calculate, PLANNING_ASSUMPTIONS, validate, type PipelineInput, type PipelineResult, type Stage } from "./engine";
import { count, CURRENCIES, money, pct, type CurrencyCode } from "./format";
import { AREA_LABELS, recommend } from "./recommendations";
import { buildReport, reportAsText, STAGE_LABELS } from "./report";

type Mode = "quick" | "audit";

const field = "mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-3 text-base text-ink outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100";
const stages = Object.keys(STAGE_LABELS) as Stage[];

const toPct = (f: number) => String(Math.round(f * 1000) / 10);

export function Calculator({ siteUrl, consultationHref }: { siteUrl: string; consultationHref: string }) {
  const [mode, setMode] = useState<Mode>("quick");
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [values, setValues] = useState({
    revenueTarget: "100000",
    dealValue: "10000",
    currentProspects: "500",
    response: toPct(PLANNING_ASSUMPTIONS.response),
    meeting: toPct(PLANNING_ASSUMPTIONS.meeting),
    opportunity: toPct(PLANNING_ASSUMPTIONS.opportunity),
    close: toPct(PLANNING_ASSUMPTIONS.close),
    salesCycleDays: "",
  });
  const [submitted, setSubmitted] = useState<{ input: PipelineInput; result: PipelineResult } | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const resultsRef = useRef<HTMLDivElement>(null);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));

  function onCalculate(e: FormEvent) {
    e.preventDefault();
    const n = (s: string) => (s.trim() === "" ? NaN : Number(s));
    const input: PipelineInput = {
      revenueTarget: n(values.revenueTarget),
      dealValue: n(values.dealValue),
      currentProspects: n(values.currentProspects),
      rates: {
        response: n(values.response) / 100,
        meeting: n(values.meeting) / 100,
        opportunity: n(values.opportunity) / 100,
        close: n(values.close) / 100,
      },
      salesCycleDays: values.salesCycleDays ? n(values.salesCycleDays) : undefined,
    };
    const errs = validate(input);
    setErrors(errs);
    if (errs.length) return;
    const result = calculate(input);
    setSubmitted({ input, result });
    track("tool_calculate", { tool: "b2b_pipeline", mode, health: result.health.total, bottleneck: result.health.bottleneck });
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  return (
    <div>
      <form onSubmit={onCalculate} noValidate className="rounded-2xl border border-line bg-white p-6 md:p-8">
        <div role="tablist" aria-label="Calculator mode" className="mb-6 inline-flex rounded-lg bg-mist p-1">
          {(["quick", "audit"] as Mode[]).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-md px-4 py-2 text-sm font-bold ${mode === m ? "bg-white text-navy-900 shadow" : "text-muted"}`}
            >
              {m === "quick" ? "Quick estimate" : "Full pipeline audit"}
            </button>
          ))}
        </div>
        <p className="mb-6 text-muted">
          {mode === "quick"
            ? "Enter three numbers. We use planning assumptions for your conversion rates; switch to the full audit to use your own."
            : "Enter your own conversion rates for an accurate picture of where your funnel leaks."}
        </p>

        <div className="grid gap-5 md:grid-cols-2">
          <label className="block font-semibold">
            Currency
            <select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)} className={field}>
              {CURRENCIES.map((c) => (
                <option key={c.code}>{c.code}</option>
              ))}
            </select>
          </label>
          <label className="block font-semibold">
            Monthly revenue target
            <input inputMode="decimal" value={values.revenueTarget} onChange={set("revenueTarget")} className={field} />
          </label>
          <label className="block font-semibold">
            Average deal value
            <input inputMode="decimal" value={values.dealValue} onChange={set("dealValue")} className={field} />
          </label>
          <label className="block font-semibold">
            Prospects contacted per month
            <input inputMode="numeric" value={values.currentProspects} onChange={set("currentProspects")} className={field} />
          </label>
          {mode === "audit" && (
            <>
              <label className="block font-semibold">
                Response rate (%)
                <span className="block text-sm font-normal text-muted">Positive replies ÷ prospects contacted</span>
                <input inputMode="decimal" value={values.response} onChange={set("response")} className={field} />
              </label>
              <label className="block font-semibold">
                Meeting rate (%)
                <span className="block text-sm font-normal text-muted">Meetings ÷ positive replies</span>
                <input inputMode="decimal" value={values.meeting} onChange={set("meeting")} className={field} />
              </label>
              <label className="block font-semibold">
                Opportunity rate (%)
                <span className="block text-sm font-normal text-muted">Qualified opportunities ÷ meetings</span>
                <input inputMode="decimal" value={values.opportunity} onChange={set("opportunity")} className={field} />
              </label>
              <label className="block font-semibold">
                Close rate (%)
                <span className="block text-sm font-normal text-muted">Customers ÷ opportunities</span>
                <input inputMode="decimal" value={values.close} onChange={set("close")} className={field} />
              </label>
              <label className="block font-semibold">
                Sales cycle (days, optional)
                <input inputMode="numeric" value={values.salesCycleDays} onChange={set("salesCycleDays")} className={field} />
              </label>
            </>
          )}
        </div>
        {errors.length > 0 && (
          <ul role="alert" className="mt-5 space-y-1 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800">
            {errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        )}
        <button type="submit" className="mt-6 w-full rounded-lg bg-amber-500 px-6 py-4 text-lg font-bold text-navy-900 hover:bg-amber-300 md:w-auto">
          Calculate my pipeline
        </button>
      </form>

      {submitted && (
        <div ref={resultsRef} className="scroll-mt-24">
          <Results input={submitted.input} result={submitted.result} currency={currency} mode={mode} siteUrl={siteUrl} consultationHref={consultationHref} />
        </div>
      )}
    </div>
  );
}

function scoreTone(n: number) {
  return n >= 75 ? "text-green-700" : n >= 50 ? "text-amber-600" : "text-red-700";
}

function Results({ input, result, currency, mode, siteUrl, consultationHref }: { input: PipelineInput; result: PipelineResult; currency: CurrencyCode; mode: Mode; siteUrl: string; consultationHref: string }) {
  const rec = useMemo(() => recommend(result), [result]);
  const maxStage = Math.max(...stages.map((s) => result.required[s]), 1);
  return (
    <div className="mt-10 space-y-8" aria-live="polite">
      <div className="grid gap-5 md:grid-cols-[1fr_2fr]">
        <div className="rounded-2xl bg-navy-900 p-6 text-white">
          <p className="text-sm font-bold uppercase tracking-wider text-amber-300">Pipeline health</p>
          <p className="mt-2 font-[family-name:var(--font-display)] text-6xl font-bold">
            {result.health.total}
            <span className="text-2xl text-navy-100"> / 100</span>
          </p>
          <p className="mt-3 text-navy-100">
            Main bottleneck: <strong className="text-white">{AREA_LABELS[rec.area]}</strong>
          </p>
        </div>
        <dl className="grid grid-cols-2 gap-4 rounded-2xl border border-line bg-white p-6">
          <div>
            <dt className="text-sm text-muted">Expected revenue at current activity</dt>
            <dd className="text-2xl font-extrabold text-navy-900">{money(result.expectedRevenue, currency)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Revenue gap per month</dt>
            <dd className={`text-2xl font-extrabold ${result.revenueGap > 0 ? "text-red-700" : "text-green-700"}`}>{money(result.revenueGap, currency)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Pipeline value needed</dt>
            <dd className="text-2xl font-extrabold text-navy-900">{money(result.requiredPipelineValue, currency)}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Prospect-to-customer rate</dt>
            <dd className="text-2xl font-extrabold text-navy-900">{pct(result.conversionEfficiency)}</dd>
          </div>
          {result.cycleMonths && (
            <div className="col-span-2 text-sm text-muted">
              With a {input.salesCycleDays} day sales cycle, activity this month turns into revenue in about {result.cycleMonths} month{result.cycleMonths > 1 ? "s" : ""}.
            </div>
          )}
        </dl>
      </div>

      <div className="rounded-2xl border border-line bg-white p-6">
        <h2 className="text-xl font-extrabold">What you need each month</h2>
        <ul className="mt-5 space-y-4">
          {stages.map((s) => (
            <li key={s}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-semibold">{STAGE_LABELS[s]}</span>
                <span className="text-sm text-muted">
                  need <strong className="text-navy-900">{count(result.required[s])}</strong> · now {count(result.current[s])}
                  {result.gaps[s] > 0 && <span className="text-red-700"> · gap {count(result.gaps[s])}</span>}
                </span>
              </div>
              <div className="mt-1.5 h-3 rounded-full bg-mist" aria-hidden>
                <div className="relative h-3 rounded-full bg-navy-200" style={{ width: `${Math.max(2, (result.required[s] / maxStage) * 100)}%` }}>
                  <div className="absolute inset-y-0 left-0 rounded-full bg-navy-700" style={{ width: `${Math.min(100, (result.current[s] / Math.max(result.required[s], 1)) * 100)}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-xl font-extrabold">Health score breakdown</h2>
          <ul className="mt-4 space-y-2">
            {(Object.keys(result.health.parts) as (keyof typeof result.health.parts)[]).map((a) => (
              <li key={a} className="flex justify-between">
                <span>{AREA_LABELS[a]}</span>
                <strong className={scoreTone(result.health.parts[a])}>{result.health.parts[a]}</strong>
              </li>
            ))}
          </ul>
          {mode === "quick" && <p className="mt-4 text-sm text-muted">Quick mode uses planning assumptions for conversion rates, so rate scores show 100. Run the full audit for a real picture.</p>}
        </div>
        <div className="rounded-2xl border border-line bg-white p-6">
          <h2 className="text-xl font-extrabold">Scenarios</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead className="text-muted">
              <tr>
                <th className="pb-2 font-semibold">Scenario</th>
                <th className="pb-2 font-semibold">Prospects needed</th>
                <th className="pb-2 font-semibold">Revenue now</th>
              </tr>
            </thead>
            <tbody>
              {result.scenarios.map((sc) => (
                <tr key={sc.name} className="border-t border-line">
                  <td className="py-2 font-semibold">{sc.name}</td>
                  <td className="py-2">{count(sc.required.prospects)}</td>
                  <td className="py-2">{money(sc.expectedRevenue, currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-muted">Conservative: your rates × 0.8. Optimised: halfway between your rates and the planning assumptions.</p>
        </div>
      </div>

      <div className="rounded-2xl border-2 border-amber-500 bg-white p-6 md:p-8">
        <p className="eyebrow">Recommendation</p>
        <h2 className="mt-2 text-2xl font-extrabold text-navy-900">{rec.headline}</h2>
        <p className="mt-3 text-lg text-muted">{rec.detail}</p>
        <ul className="mt-4 list-disc space-y-1.5 pl-5">
          {rec.actions.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <div className="mt-6 rounded-xl bg-mist p-5">
          <p className="font-bold">How we can help: {rec.service.name}</p>
          <p className="mt-1 text-muted">{rec.service.pitch}</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <a href={`${consultationHref}?service=${rec.service.key.split("/")[1]}`} data-track="cta_click" className="rounded-lg bg-amber-500 px-5 py-3 text-center font-bold text-navy-900 hover:bg-amber-300">
              Book a 30 Minute Free Consultation
            </a>
            <a href={`/${rec.service.key}/`} className="rounded-lg border border-navy-800 px-5 py-3 text-center font-bold text-navy-800 hover:bg-navy-50">
              About {rec.service.name}
            </a>
          </div>
        </div>
      </div>

      <ReportForm input={input} result={result} currency={currency} siteUrl={siteUrl} />

      <p className="text-sm text-muted">
        Estimates are based on the numbers you entered and simple planning assumptions. They are not a guarantee of results. Planning assumptions are editable defaults, not industry benchmarks.
      </p>
    </div>
  );
}

function ReportForm({ input, result, currency, siteUrl }: { input: PipelineInput; result: PipelineResult; currency: CurrencyCode; siteUrl: string }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const rec = recommend(result);
    const sections = buildReport(input, result, rec, currency);
    const name = String(fd.get("name") ?? "");
    const company = String(fd.get("company") ?? "");
    setState("sending");
    setMessage("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "calculator",
          name,
          email: fd.get("email"),
          phone: fd.get("phone"),
          company,
          interest: rec.service.key,
          details: `B2B Pipeline Calculator (${currency})\n\n${reportAsText(sections)}`,
          company_url: fd.get("company_url"),
          consent: fd.get("consent") === "on",
          page: location.pathname,
          attribution: readAttribution(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setMessage(data.error || Object.values(data.errors ?? {}).join(" ") || "Something went wrong.");
        setState("error");
        return;
      }
      track("generate_lead", { form: "calculator", bottleneck: rec.area });
      const { downloadReportPdf } = await import("./pdf");
      await downloadReportPdf(sections, { name, company, date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }), siteUrl });
      track("tool_report_download", { tool: "b2b_pipeline" });
      setState("done");
    } catch {
      setMessage("We could not reach the server. Please try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="rounded-2xl bg-navy-900 p-6 text-white md:p-8">
        <h2 className="text-2xl font-extrabold">Your report is downloading.</h2>
        <p className="mt-2 text-navy-100">We have also saved a copy so we can discuss it with you if you book a consultation.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative rounded-2xl bg-navy-900 p-6 text-white md:p-8">
      <h2 className="text-2xl font-extrabold">Get your full report as a PDF</h2>
      <p className="mt-2 text-navy-100">Includes your inputs, funnel gaps, scenarios, health score breakdown and recommendations.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="block font-semibold">
          Name *
          <input name="name" autoComplete="name" required className={field} />
        </label>
        <label className="block font-semibold">
          Work email *
          <input name="email" type="email" autoComplete="email" required className={field} />
        </label>
        <label className="block font-semibold">
          Company
          <input name="company" autoComplete="organization" className={field} />
        </label>
        <label className="block font-semibold">
          Phone (optional)
          <input name="phone" type="tel" autoComplete="tel" className={field} />
        </label>
        <div aria-hidden className="absolute -left-[9999px]">
          <input name="company_url" tabIndex={-1} autoComplete="off" />
        </div>
        <label className="flex gap-3 text-sm md:col-span-2">
          <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 flex-none accent-amber-500" />
          <span>
            Send me the report and contact me about it. See our{" "}
            <a href="/privacy-policy/" className="underline">
              privacy policy
            </a>
            .
          </span>
        </label>
      </div>
      {message && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-800">
          {message}
        </p>
      )}
      <button type="submit" disabled={state === "sending"} className="mt-5 w-full rounded-lg bg-amber-500 px-6 py-3.5 font-bold text-navy-900 hover:bg-amber-300 disabled:opacity-60 md:w-auto">
        {state === "sending" ? "Preparing…" : "Download my report"}
      </button>
    </form>
  );
}
