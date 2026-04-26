"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";

type Line =
  | { kind: "prompt"; text: string; typeSpeed?: number }
  | { kind: "output"; text: string; className?: string; delay?: number }
  | { kind: "blank" };

const INSTALL_CMD = "npx skills add bido/ads";

function useTypewriter(active: boolean, script: readonly Line[]) {
  const [rendered, setRendered] = useState<{ idx: number; partial: string }[]>([]);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
  const totalKey = useMemo(
    () => script.map((line) => line.kind + ("text" in line ? line.text : "")).join("|"),
    [script],
  );

  useEffect(() => {
    if (!active) return;

    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];

    let elapsed = 0;
    let out: { idx: number; partial: string }[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const timer = setTimeout(fn, ms);
      timeouts.current.push(timer);
    };

    script.forEach((line, idx) => {
      if (line.kind === "prompt") {
        const speed = line.typeSpeed ?? 38;

        schedule(() => {
          out = [...out, { idx, partial: "" }];
          setRendered([...out]);
        }, elapsed);

        for (let i = 1; i <= line.text.length; i += 1) {
          const at = elapsed + i * speed;
          schedule(() => {
            out = out.map((item) =>
              item.idx === idx ? { ...item, partial: line.text.slice(0, i) } : item,
            );
            setRendered([...out]);
          }, at);
        }

        elapsed += line.text.length * speed + 280;
        return;
      }

      const wait = line.kind === "output" ? line.delay ?? 200 : 120;
      elapsed += wait;
      schedule(() => {
        out = [...out, { idx, partial: line.kind === "output" ? line.text : "" }];
        setRendered([...out]);
      }, elapsed);
    });

    return () => {
      timeouts.current.forEach(clearTimeout);
      timeouts.current = [];
    };
  }, [active, script, totalKey]);

  return rendered;
}

export function InstallTerminal() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const { messages } = useI18n();
  const devsTerminal = messages.devs.terminal;
  const script: readonly Line[] = devsTerminal.script;
  const rendered = useTypewriter(active, script);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(INSTALL_CMD);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures in unsupported contexts.
    }
  };

  return (
    <div ref={ref} className="mx-auto w-full max-w-3xl">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface-2/80 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
        <div className="flex items-center gap-2 border-b border-border/70 bg-surface/60 px-4 py-3">
          <span className="size-3 rounded-full bg-[#ff5f57]" />
          <span className="size-3 rounded-full bg-[#febc2e]" />
          <span className="size-3 rounded-full bg-[#28c840]" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">{devsTerminal.windowTitle}</span>
          <button
            type="button"
            onClick={handleCopy}
            className="ml-auto inline-flex items-center gap-1.5 rounded-md border border-border/70 bg-surface-2/60 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-violet/50 hover:text-foreground"
            aria-label={devsTerminal.copyLabel}
          >
            {copied ? (
              <>
                <Check className="size-3" />
                {devsTerminal.copied}
              </>
            ) : (
              <>
                <Copy className="size-3" />
                {devsTerminal.commandLabel}
              </>
            )}
          </button>
        </div>

        <div className="relative min-h-[360px] px-5 py-5 font-mono text-[13px] leading-relaxed sm:text-sm">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative space-y-1">
            {rendered.map((item, index) => {
              const line = script[item.idx];

              if (line.kind === "blank") {
                return <div key={`${item.idx}-${index}`} className="h-3" />;
              }

              if (line.kind === "prompt") {
                const isLast = index === rendered.length - 1;
                const done = item.partial.length === line.text.length;

                return (
                  <div key={`${item.idx}-${index}`} className="flex">
                    <span className="mr-2 text-violet">$</span>
                    <span className="text-foreground">{item.partial}</span>
                    {isLast && !done ? (
                      <span className="ml-0.5 inline-block h-4 w-1.5 animate-pulse bg-violet" />
                    ) : null}
                  </div>
                );
              }

              return (
                <div key={`${item.idx}-${index}`} className={line.className ?? "text-foreground"}>
                  {item.partial}
                </div>
              );
            })}

            {rendered.length > 0 && script[rendered[rendered.length - 1].idx]?.kind !== "prompt" ? (
              <div className="flex pt-1">
                <span className="mr-2 text-violet">$</span>
                <span className="inline-block h-4 w-1.5 animate-pulse bg-violet" />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
