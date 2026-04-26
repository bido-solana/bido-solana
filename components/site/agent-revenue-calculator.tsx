"use client";

import { useState } from "react";
import { ArrowRight, CircleDollarSign} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";

const DEFAULT_QUERIES = 10000;
const EARNINGS_PER_QUERY = 0.25;

export function AgentRevenueCalculator() {
  const [queries, setQueries] = useState(DEFAULT_QUERIES);
  const { messages, formatCurrency, formatNumber } = useI18n();
  const calculator = messages.devs.revenueCalculator;
  const estimatedRevenue = queries * EARNINGS_PER_QUERY;

  return (
    <section className="relative overflow-hidden border-t border-border/60 py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, oklch(0.4 0.15 295 / 0.5), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet">
            {calculator.badge}
          </div>

          <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {calculator.title}
          </h2>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            {calculator.description}
          </p>

          <p className="mt-8 max-w-xl text-sm leading-relaxed text-foreground/80">
            {calculator.microcopy}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#install-skill"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-violet px-6 text-sm font-semibold text-violet-foreground transition-colors hover:bg-violet/90"
            >
              {calculator.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#install-skill"
              className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-surface-2 px-6 text-sm font-semibold text-foreground transition-colors hover:border-violet/40 hover:bg-surface"
            >
              {calculator.secondaryCta}
            </a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-border bg-surface-2/90 shadow-[0_24px_100px_-32px_rgba(0,0,0,0.7)] backdrop-blur-xl">
          <div className="border-b border-border/70 px-6 py-5">
            <label htmlFor="agent-commercial-queries" className="mb-3 block text-sm font-semibold text-muted-foreground">
              {calculator.queriesLabel}
            </label>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="relative flex-1">
                <input
                  id="agent-commercial-queries"
                  type="number"
                  min={0}
                  max={1000000}
                  step={100}
                  value={queries}
                  onChange={(event) => setQueries(Math.max(0, Number(event.target.value) || 0))}
                  className="h-12 w-full rounded-lg border border-border bg-surface px-4 pr-4 text-sm font-semibold text-foreground outline-none ring-offset-background transition focus:border-violet/60 focus:ring-2 focus:ring-violet/30"
                />
              </div>
              <input
                type="range"
                min={0}
                max={100000}
                step={500}
                value={queries}
                onChange={(event) => setQueries(Number(event.target.value))}
                aria-label={calculator.queriesAriaLabel}
                className="h-2 flex-1 cursor-pointer accent-violet"
              />
              <span className="min-w-[110px] text-right text-sm font-bold text-foreground">
                {formatNumber(queries)}
              </span>
            </div>
          </div>

          <div className="grid gap-3 p-6">
            <MetricCard
              label={calculator.earningsPerQueryLabel}
              value={formatCurrency(EARNINGS_PER_QUERY, { currency: "USD" })}
              icon={<CircleDollarSign className="h-4 w-4" />}
              accent={false}
            />
            <MetricCard
              label={calculator.estimatedRevenueLabel}
              value={`${formatCurrency(estimatedRevenue, { currency: "USD", maximumFractionDigits: 0 })} ${calculator.perMonth}`}
              accent
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: string;
  icon?: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div className={`rounded-2xl border px-4 py-4 ${accent ? "border-violet/25 bg-violet-soft/20" : "border-border bg-surface"}`}>
      <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className={`mt-2 inline-flex items-center gap-2 text-2xl font-bold tracking-tight ${accent ? "text-violet" : "text-foreground"}`}>
        {icon ? <span className={accent ? "text-violet" : "text-muted-foreground"}>{icon}</span> : null}
        {value}
      </p>
    </div>
  );
}
