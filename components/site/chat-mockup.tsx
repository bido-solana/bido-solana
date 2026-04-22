"use client";

import { useEffect, useState } from "react";
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

const SCRIPT: { delay: number; step: StepKind }[] = [
  {
    delay: 600,
    step: {
      type: "user",
      text: "Quero patrocinar a busca de voos de São Paulo para Nova York.",
    },
  },
  {
    delay: 900,
    step: {
      type: "bido",
      text: "Boa! Vou mapear o cluster de buscas com intenção de compra.",
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
          <span className="text-foreground">12.430</span> buscas/mês ·{" "}
          <span className="font-mono text-violet">GRU → JFK</span>
        </>
      ),
    },
  },
  {
    delay: 700,
    step: {
      type: "bido",
      text: "Cluster forte. Qual budget diário você quer aplicar e quanto está disposto a pagar por decisão (CPD)?",
    },
  },
  {
    delay: 900,
    step: {
      type: "user",
      text: "$50 de budget e $0.50 por decisão. E mostre que estamos com 10% de desconto na nossa companhia.",
    },
  },
  {
    delay: 700,
    step: { type: "bido", text: "Configurando a campanha agora." },
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
          Budget <span className="text-foreground">$50/dia</span> · CPD{" "}
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
          Oferta: <span className="text-foreground">10% off voos GRU → JFK</span>
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
          Bido bidando sua marca na{" "}
          <span className="text-foreground">base de respostas</span>…
        </>
      ),
    },
  },
  { delay: 600, step: { type: "answer" } },
];

export function ChatMockup() {
  const [visible, setVisible] = useState(0);
  const [toolDone, setToolDone] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    let acc = 0;
    SCRIPT.forEach((entry, idx) => {
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
  }, []);

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
        {SCRIPT.map((entry, idx) => {
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
                    Resposta da IA · ao vivo
                  </div>
                  <p className="mt-2 text-sm text-foreground/90">
                    Para voos GRU → JFK, a{" "}
                    <span className="font-semibold text-foreground">Aerolux Fly (fictícia)</span>{" "}
                    está com <span className="font-semibold text-foreground">10% de desconto</span>{" "}
                    em passagens diretas neste mês.
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-violet" />
                      CTR <span className="text-foreground">14.2%</span>
                    </span>
                    <span>·</span>
                    <CounterPill label="Decisões" target={37} />
                  </div>
                </div>
              </div>
            </Appear>
          );
        })}

        {visible < SCRIPT.length && <TypingDot />}

        <div className="mt-4 flex items-center gap-2 rounded-xl border border-border bg-surface px-4 py-3">
          <div className="flex-1 text-sm text-muted-foreground/70">
            Pergunte algo ou descreva a campanha…
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
