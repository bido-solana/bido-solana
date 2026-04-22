"use client";

import { useState } from "react";
import { Bot, Brain, MousePointerClick, Search } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";

const GOOGLE_CPC = 3.5;
const BIDO_CPD = 0.5;

export function PricingCalculator() {
  const [budget, setBudget] = useState(1000);
  const { messages, formatCurrency, formatNumber } = useI18n();

  const googleVolume = budget / GOOGLE_CPC;
  const bidoVolume = budget / BIDO_CPD;

  return (
    <section className="relative overflow-hidden py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background: "radial-gradient(closest-side, oklch(0.4 0.15 295 / 0.5), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-10 text-left">
          <h2 className="text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-[44px]">
            {messages.pricing.titleBefore}
            <span className="text-muted-foreground">{messages.pricing.googleAds}</span>
            {messages.pricing.titleAfter}
            <span className="text-violet">{messages.pricing.bido}</span>
          </h2>
        </div>

        <div className="mb-6 rounded-xl border border-border bg-surface-2 px-6 py-5">
          <label htmlFor="calc-budget" className="mb-3 block text-sm font-semibold text-muted-foreground">
            {messages.pricing.monthlyBudget}
          </label>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-foreground">
                R$
              </span>
              <input
                id="calc-budget"
                type="number"
                min={100}
                max={100000}
                step={100}
                value={budget}
                onChange={(event) => setBudget(Math.max(0, Number(event.target.value)))}
                className="h-12 w-full rounded-lg border border-border bg-surface pl-10 pr-4 text-sm font-semibold text-foreground outline-none ring-offset-background transition focus:border-violet/60 focus:ring-2 focus:ring-violet/30"
              />
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              aria-label={messages.pricing.budgetAria}
              className="h-2 flex-1 cursor-pointer accent-violet"
            />
            <span className="min-w-[90px] text-right text-sm font-bold text-foreground">
              {formatCurrency(budget)}
            </span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border bg-surface-2">
          <div className="grid grid-cols-3 border-b border-border">
            <div className="px-6 py-4" />
            <div className="flex flex-col items-center justify-center gap-1.5 border-l border-border px-4 py-4">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-surface px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
                <Search className="h-3 w-3" />
                {messages.pricing.googleAds}
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-1.5 border-l border-border bg-violet-soft/20 px-4 py-4">
              <div className="inline-flex items-center gap-1.5 rounded-md bg-violet-soft px-2.5 py-1 text-[11px] font-semibold uppercase tracking-widest text-violet">
                <Bot className="h-3 w-3" />
                {messages.pricing.bido}
              </div>
            </div>
          </div>

          <Row label={messages.pricing.costPerClick} sublabel={messages.pricing.cpc}>
            <Cell highlight={false}>
              <MetricValue
                value={formatCurrency(GOOGLE_CPC)}
                icon={<MousePointerClick className="h-3.5 w-3.5" />}
              />
            </Cell>
            <Cell highlight>
              <span className="text-sm text-muted-foreground/50">—</span>
            </Cell>
          </Row>

          <Row label={messages.pricing.costPerDecision} sublabel={messages.pricing.cpd}>
            <Cell highlight={false}>
              <span className="text-sm text-muted-foreground/50">—</span>
            </Cell>
            <Cell highlight>
              <MetricValue
                value={formatCurrency(BIDO_CPD)}
                icon={<Brain className="h-3.5 w-3.5" />}
                accent
              />
            </Cell>
          </Row>

          <Row label={messages.pricing.volumePerMonth} sublabel={messages.pricing.withThisBudget}>
            <Cell highlight={false}>
              <AnimatedNumber value={googleVolume} suffix={` ${messages.pricing.clicks}`} className="text-foreground" formatNumber={formatNumber} />
            </Cell>
            <Cell highlight>
              <AnimatedNumber value={bidoVolume} suffix={` ${messages.pricing.decisions}`} className="font-bold text-violet" formatNumber={formatNumber} />
            </Cell>
          </Row>

          <Row label={messages.pricing.moment}>
            <Cell highlight={false}>
              <Tag>{messages.pricing.afterSearch}</Tag>
            </Cell>
            <Cell highlight>
              <Tag accent>{messages.pricing.atPurchaseDecision}</Tag>
            </Cell>
          </Row>

          <Row label={messages.pricing.audience} last>
            <Cell highlight={false}>
              <Tag>{messages.pricing.human}</Tag>
            </Cell>
            <Cell highlight>
              <Tag accent>{messages.pricing.aiAgent}</Tag>
            </Cell>
          </Row>
        </div>

        <div className="mt-6 rounded-xl border border-violet/20 bg-violet-soft/20 px-6 py-4">
          <p className="text-sm leading-relaxed text-foreground/80">
            <span className="font-semibold text-muted-foreground">{messages.pricing.summaryBefore}</span>{" "}
            <span className="font-semibold text-violet">{messages.pricing.summaryAfter}</span>
          </p>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  sublabel,
  children,
  last,
}: {
  label: string;
  sublabel?: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return <div className={`grid grid-cols-3 ${last ? "" : "border-b border-border"}`}>{children ? (
      <>
        <div className="flex flex-col justify-center px-6 py-4">
          <span className="text-sm font-semibold text-foreground">{label}</span>
          {sublabel ? (
            <span className="mt-0.5 font-mono text-[10px] text-muted-foreground/60">{sublabel}</span>
          ) : null}
        </div>
        {children}
      </>
    ) : null}</div>;
}

function Cell({ highlight, children }: { highlight: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`flex items-center justify-center border-l border-border px-4 py-4 ${highlight ? "bg-violet-soft/10" : ""}`}
    >
      {children}
    </div>
  );
}

function MetricValue({
  value,
  icon,
  accent,
}: {
  value: string;
  icon: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-bold ${accent ? "text-violet" : "text-foreground"}`}>
      <span className={accent ? "text-violet" : "text-muted-foreground"}>{icon}</span>
      {value}
    </span>
  );
}

function Tag({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ${
        accent ? "bg-violet-soft text-violet" : "bg-surface text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}

function AnimatedNumber({
  value,
  suffix,
  className,
  formatNumber,
}: {
  value: number;
  suffix?: string;
  className?: string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
}) {
  return (
    <span className={`text-sm font-bold tabular-nums ${className ?? ""}`}>
      {formatNumber(Math.floor(value))}
      {suffix ? <span className="ml-1 text-xs font-normal text-muted-foreground">{suffix}</span> : null}
    </span>
  );
}
