"use client";

import { useI18n } from "@/components/providers/i18n-provider";
import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

type Step = {
  number: string;
  title: string;
  description: string;
  code?: string;
  codeType: "query" | "response" | "none";
};

function StepCard({ step, index, visible }: { step: Step; index: number; visible: boolean }) {
  const hasCode = step.codeType !== "none" && step.code;
  const isQuery = step.codeType === "query";

  return (
    <div
      style={{
        transitionDelay: `${index * 70}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-surface-2 p-6 hover:border-violet/30 transition-colors duration-300"
    >
      {/* Subtle violet glow on hover */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -right-10 size-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.4 0.15 295 / 0.3), transparent)" }}
      />

      {/* Step number pill */}
      <div className="inline-flex w-fit items-center rounded-full border border-violet/30 bg-violet-soft px-2.5 py-0.5 font-mono text-[11px] font-bold tracking-widest text-violet">
        {step.number}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold leading-snug text-foreground">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-muted-foreground">
        {step.description}
      </p>

      {/* Code snippet (steps 01 and 05) */}
      {hasCode && (
        <div
          className={`mt-auto rounded-xl border px-4 py-3 font-mono text-[12px] leading-relaxed ${
            isQuery
              ? "border-border/60 bg-surface text-muted-foreground"
              : "border-emerald-500/20 bg-emerald-950/30 text-emerald-400"
          }`}
        >
          {!isQuery && (
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-emerald-500/70">
              resposta patrocinada
            </span>
          )}
          {step.code}
        </div>
      )}

      {/* Step 03: 402 badge visual */}
      {step.number === "03" && (
        <div className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-violet/25 bg-violet-soft px-3 py-1.5">
          <span className="font-mono text-xs font-bold text-violet">402</span>
          <span className="text-[11px] text-muted-foreground">Payment Required</span>
        </div>
      )}

      {/* Step 06: USDC visual */}
      {step.number === "06" && (
        <div className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-950/30 px-3 py-1.5">
          <span className="size-2 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_oklch(0.7_0.18_150_/_0.4)]" />
          <span className="font-mono text-xs font-semibold text-emerald-400">USDC → Solana</span>
        </div>
      )}
    </div>
  );
}

export function HowItWorks() {
  const { messages } = useI18n();
  const hiw = messages.devs.howItWorks;
  const { ref, visible } = useInView();
  const steps: readonly Step[] = hiw.steps;

  return (
    <section className="border-t border-border/60 py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header — left-aligned like home features section */}
        <div ref={ref}>
          <h2 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {hiw.title}{" "}
            <span className="text-violet">{hiw.titleAccent}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {hiw.subtitle}
          </p>
        </div>

        {/* Step cards grid: 3 + 3 */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} visible={visible} />
          ))}
        </div>
      </div>
    </section>
  );
}
