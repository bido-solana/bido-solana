"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BarChart3, ChevronRight, Gavel, GripVertical, Receipt, Target, TrendingUp, X } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import type { ChatThread } from "@/lib/chat-store";
import { cn } from "@/lib/utils";

function getAnalytics(
  thread: ChatThread | null,
  formatCurrency: (value: number, options?: Intl.NumberFormatOptions) => string,
  copy: {
    fallbackOffer: string;
    updatedNow: string;
    metrics: {
      decisions: string;
      budgetUsed: string;
      wonAuctions: string;
      weeklyPerformance: string;
      activeOffer: string;
    };
    insights: string[];
  },
) {
  const decisionCount = Math.max(12, (thread?.messages.length ?? 2) * 9);
  const budgetUsed = 8400 + decisionCount * 185;
  const wonAuctions = Math.max(4, Math.round(decisionCount * 0.34));
  const weeklyPerformance = `+${Math.max(8, Math.round(decisionCount * 0.18))}%`;
  const activeOffer = thread?.title && thread.title.length > 0 ? thread.title : copy.fallbackOffer;

  return {
    title: activeOffer,
    updatedAt: copy.updatedNow,
    metrics: [
      { label: copy.metrics.decisions, value: decisionCount.toString(), icon: Target },
      { label: copy.metrics.budgetUsed, value: formatCurrency(budgetUsed, { maximumFractionDigits: 0 }), icon: Receipt },
      { label: copy.metrics.wonAuctions, value: wonAuctions.toString(), icon: Gavel },
      { label: copy.metrics.weeklyPerformance, value: weeklyPerformance, icon: TrendingUp },
      { label: copy.metrics.activeOffer, value: activeOffer, icon: BarChart3 },
    ],
    insights: copy.insights,
  };
}

export function AnalyticsArtifactPanel({
  open,
  thread,
  widthPercent,
  onWidthChange,
  onClose,
}: {
  open: boolean;
  thread: ChatThread | null;
  widthPercent: number;
  onWidthChange: (next: number) => void;
  onClose: () => void;
}) {
  const { messages, formatCurrency } = useI18n();
  const analytics = getAnalytics(thread, formatCurrency, {
    fallbackOffer: messages.app.currentOfferFallback,
    updatedNow: messages.app.updatedNow,
    metrics: messages.app.metrics,
    insights: [...messages.app.insights],
  });
  const panelRef = useRef<HTMLElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const resizeStartX = useRef(0);
  const resizeStartWidth = useRef(widthPercent);

  const handleResizeStart = useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      resizeStartX.current = event.clientX;
      resizeStartWidth.current = widthPercent;
      setIsResizing(true);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [widthPercent],
  );

  const handleResize = useCallback(
    (event: MouseEvent) => {
      if (!panelRef.current) return;

      const viewportWidth = window.innerWidth;
      const deltaX = resizeStartX.current - event.clientX;
      const deltaPercent = (deltaX / viewportWidth) * 100;
      const next = Math.max(26, Math.min(68, resizeStartWidth.current + deltaPercent));
      onWidthChange(next);
    },
    [onWidthChange],
  );

  const handleResizeEnd = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (!isResizing) return;

    window.addEventListener("mousemove", handleResize);
    window.addEventListener("mouseup", handleResizeEnd);
    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [handleResize, handleResizeEnd, isResizing]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, []);

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label={messages.common.close}
          onClick={onClose}
          className="absolute inset-0 z-20 bg-black/30 backdrop-blur-[1px] lg:hidden"
        />
      ) : null}

      <aside
        ref={panelRef}
        style={{ width: open ? `min(${widthPercent}vw, 560px)` : "0px" }}
        className={cn(
          "absolute top-[87px] right-0 bottom-0 z-40 overflow-visible transition-[width,opacity,transform] duration-300 ease-out",
          open ? "pointer-events-auto translate-x-0 opacity-100" : "pointer-events-none translate-x-full opacity-0",
        )}
      >
        <div className="relative h-full overflow-hidden border-l border-white/6 bg-surface/94 backdrop-blur-2xl">
          <div
            onMouseDown={handleResizeStart}
            className="absolute top-0 left-0 z-50 hidden h-full w-8 -translate-x-1/2 cursor-col-resize items-center justify-center lg:flex"
          >
            <div
              className={cn(
                "flex h-16 w-5 items-center justify-center rounded-full border border-white/8 bg-surface-2/88 text-muted-foreground shadow-[0_12px_30px_rgba(0,0,0,0.28)] transition-all duration-200",
                isResizing ? "text-violet ring-1 ring-violet/30" : "hover:text-foreground",
              )}
            >
              <GripVertical className="size-3.5" />
            </div>
          </div>

          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between border-b border-white/6 px-5 py-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet">{messages.common.analytics}</p>
                <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                  {analytics.title}
                </h2>
                <p className="mt-1 text-xs text-muted-foreground">{analytics.updatedAt}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              <div className="px-5 py-5">
                <div className="rounded-[24px] border border-white/6 bg-background/45">
                  {analytics.metrics.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.label}
                        className={cn(
                          "flex items-center justify-between gap-4 px-4 py-4",
                          index !== analytics.metrics.length - 1 ? "border-b border-white/6" : "",
                        )}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <div className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-muted-foreground">
                            <Icon className="size-4" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                            <p className="truncate text-sm font-semibold tracking-tight text-foreground sm:text-base">
                              {item.value}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="size-4 shrink-0 text-muted-foreground/60" />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {messages.app.recommendations}
                  </p>
                  <div className="mt-3 space-y-2">
                    {analytics.insights.map((item) => (
                      <div
                        key={item}
                        className="rounded-2xl border border-white/6 bg-surface-2/56 px-4 py-3 text-sm leading-6 text-foreground/86"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
