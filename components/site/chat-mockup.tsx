"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowUp,
  CheckCircle2,
  Loader2,
  Plane,
  Radio,
  Sparkles,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";

type ToolIconKind = "target" | "wallet" | "sparkles" | "plane" | "radio";

type StepKind =
  | { type: "user"; text: string }
  | { type: "bido"; text: string }
  | {
      type: "tool";
      name: string;
      icon: ToolIconKind;
      detail: React.ReactNode;
      duration: number;
      live?: boolean;
    }
  | { type: "answer" };

export function ChatMockup() {
  const { locale } = useI18n();
  const [visible, setVisible] = useState(0);
  const [toolDone, setToolDone] = useState<Record<number, boolean>>({});
  const isPt = locale === "pt-BR";
  const script = useMemo<{ delay: number; step: StepKind }[]>(() => [
    {
      delay: 600,
      step: {
        type: "user",
        text: isPt
          ? "Quero patrocinar a busca de voos de São Paulo para Nova York."
          : "I want to sponsor the search for flights from Sao Paulo to New York.",
      },
    },
    {
      delay: 900,
      step: {
        type: "bido",
        text: isPt
          ? "Boa! Vou mapear o cluster de buscas com intenção de compra."
          : "Great. I'll map the search cluster with purchase intent.",
      },
    },
    {
      delay: 400,
      step: {
        type: "tool",
        name: "search_intent.scan",
        icon: "target",
        duration: 1400,
        detail: (
          <>
            <span className="text-foreground">12,430</span> {isPt ? "buscas/mês" : "searches/month"} ·{" "}
            <span className="font-mono text-violet">GRU → JFK</span>
          </>
        ),
      },
    },
    {
      delay: 700,
      step: {
        type: "bido",
        text: isPt
          ? "Cluster forte. Qual budget diário você quer aplicar e quanto está disposto a pagar por decisão (CPD)?"
          : "Strong cluster. What daily budget do you want to apply and how much are you willing to pay per decision (CPD)?",
      },
    },
    {
      delay: 900,
      step: {
        type: "user",
        text: isPt
          ? "$50 de budget e $0.50 por decisão. E mostre que estamos com 10% de desconto na nossa companhia."
          : "$50 budget and $0.50 per decision. Also show that our airline is running a 10% discount.",
      },
    },
    {
      delay: 700,
      step: { type: "bido", text: isPt ? "Configurando a campanha agora." : "Configuring the campaign now." },
    },
    {
      delay: 400,
      step: {
        type: "tool",
        name: "campaign.create",
        icon: "wallet",
        duration: 1100,
        detail: (
          <>
            Budget <span className="text-foreground">$50/{isPt ? "dia" : "day"}</span> · CPD{" "}
            <span className="text-foreground">$0.50</span>
          </>
        ),
      },
    },
    {
      delay: 300,
      step: {
        type: "tool",
        name: "offer.attach",
        icon: "sparkles",
        duration: 900,
        detail: (
          <>
            {isPt ? "Oferta" : "Offer"}: <span className="text-foreground">10% off {isPt ? "voos" : "flights"} GRU → JFK</span>
          </>
        ),
      },
    },
    {
      delay: 300,
      step: {
        type: "tool",
        name: "answer.bid",
        icon: "plane",
        duration: 1600,
        live: true,
        detail: (
          <>
            {isPt ? "Bido bidando sua marca na" : "Bido is bidding your brand into the"}{" "}
            <span className="text-foreground">{isPt ? "base de respostas" : "answer layer"}</span>…
          </>
        ),
      },
    },
    { delay: 600, step: { type: "answer" } },
  ], [isPt]);

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    let acc = 0;
    script.forEach((entry, idx) => {
      acc += entry.delay;
      timers.push(
        setTimeout(() => {
          if (!cancelled) {
            setVisible((current) => Math.max(current, idx + 1));
          }
        }, acc),
      );

      if (entry.step.type === "tool") {
        const finishAt = acc + entry.step.duration;
        if (!entry.step.live) {
          timers.push(
            setTimeout(() => {
              if (!cancelled) {
                setToolDone((current) => ({ ...current, [idx]: true }));
              }
            }, finishAt),
          );
        }
        acc = finishAt;
      }
    });

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [script]);

  return (
    <div className="relative mx-auto max-w-[1100px] overflow-hidden rounded-t-2xl border border-border bg-surface-2 text-left shadow-2xl shadow-black/60">
      <div className="flex h-10 items-center gap-2 border-b border-border bg-surface px-4">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="mx-auto rounded-md bg-background/60 px-3 py-0.5 font-mono text-[11px] text-muted-foreground">
          bido — nova campanha
        </div>
      </div>

      <div className="space-y-4 bg-background/40 px-6 py-8 sm:px-10 sm:py-10">
        {script.map((entry, idx) => {
          if (idx >= visible) return null;

          if (entry.step.type === "user") {
            return (
              <Appear key={idx}>
                <UserBubble>{entry.step.text}</UserBubble>
              </Appear>
            );
          }

          if (entry.step.type === "bido") {
            return (
              <Appear key={idx}>
                <BidoBubble>
                  <p>{entry.step.text}</p>
                </BidoBubble>
              </Appear>
            );
          }

          if (entry.step.type === "tool") {
            const done = toolDone[idx] ?? false;
            return (
              <Appear key={idx}>
                <div className="pl-10">
                  <ToolCall
                    iconKind={entry.step.icon}
                    name={entry.step.name}
                    status={entry.step.live ? "live" : done ? "done" : "running"}
                  >
                    {entry.step.detail}
                  </ToolCall>
                </div>
              </Appear>
            );
          }

          return (
            <Appear key={idx}>
              <div className="pl-10">
                <div className="rounded-xl border border-violet/30 bg-violet-soft/40 p-4">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-violet">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {isPt ? "Resposta da IA · ao vivo" : "AI answer · live"}
                  </div>
                  <p className="mt-2 text-sm text-foreground/90">
                    {isPt ? (
                      <>
                        Para voos GRU → JFK, a{" "}
                        <span className="font-semibold text-foreground">Aerolux Fly (fictícia)</span>{" "}
                        está com <span className="font-semibold text-foreground">10% de desconto</span>{" "}
                        em passagens diretas neste mês.
                      </>
                    ) : (
                      <>
                        For GRU → JFK flights,{" "}
                        <span className="font-semibold text-foreground">Aerolux Fly (fictional)</span>{" "}
                        is offering a <span className="font-semibold text-foreground">10% discount</span> on direct fares this month.
                      </>
                    )}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-violet" />
                      CTR <span className="text-foreground">14.2%</span>
                    </span>
                    <span>·</span>
                    <CounterPill label={isPt ? "Decisões" : "Decisions"} target={37} />
                  </div>
                </div>
              </div>
            </Appear>
          );
        })}

        {visible < script.length && <TypingDot />}

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
          <div className="flex-1 text-sm text-muted-foreground/70">
            {isPt ? "Pergunte algo ou descreva a campanha…" : "Ask something or describe the campaign…"}
          </div>
          <button className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-violet text-violet-foreground">
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Appear({ children }: { children: React.ReactNode }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500" style={{ animationFillMode: "both" }}>
      {children}
    </div>
  );
}

function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <div className="max-w-[80%] rounded-2xl rounded-br-sm border border-border bg-surface px-4 py-2.5 text-sm text-foreground/90">
        {children}
      </div>
    </div>
  );
}

function BidoBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-soft text-violet">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="max-w-[85%] space-y-2 text-sm text-foreground/90">{children}</div>
    </div>
  );
}

function ToolIcon({ kind }: { kind: ToolIconKind }) {
  const cls = "h-3.5 w-3.5";
  if (kind === "target") return <Target className={cls} />;
  if (kind === "wallet") return <Wallet className={cls} />;
  if (kind === "sparkles") return <Sparkles className={cls} />;
  if (kind === "radio") return <Radio className={cls} />;
  return <Plane className={cls} />;
}

function ToolCall({
  iconKind,
  name,
  status,
  children,
}: {
  iconKind: ToolIconKind;
  name: string;
  status: "running" | "done" | "live";
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border bg-surface/80 px-3 py-2">
      <div className="flex items-center gap-2 font-mono text-[11px]">
        <span className="inline-flex items-center gap-1.5 text-violet">
          <ToolIcon kind={iconKind} />
          {name}
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-muted-foreground">
          {status === "running" && (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-violet" />
              running
            </>
          )}
          {status === "done" && (
            <>
              <CheckCircle2 className="h-3 w-3 text-emerald-400" />
              done
            </>
          )}
          {status === "live" && (
            <>
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet" />
              </span>
              live
            </>
          )}
        </span>
      </div>
      <div className="mt-1.5 text-xs text-muted-foreground">{children}</div>
    </div>
  );
}

function TypingDot() {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-soft text-violet">
        <Sparkles className="h-3.5 w-3.5" />
      </div>
      <div className="flex items-center gap-1 rounded-2xl border border-border bg-surface px-3 py-2.5">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function CounterPill({ label, target }: { label: string; target: number }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let current = 0;
    const id = setInterval(() => {
      current += Math.max(1, Math.round(target / 30));
      if (current >= target) {
        setValue(target);
        clearInterval(id);
      } else {
        setValue(current);
      }
    }, 60);

    return () => clearInterval(id);
  }, [target]);

  return (
    <span>
      {label}: <span className="text-foreground">{value}</span>
    </span>
  );
}
