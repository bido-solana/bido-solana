"use client";

import { useMemo, useState } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";

export function DateRangePicker() {
  const { messages } = useI18n();
  const ranges = useMemo(
    () => [
      messages.app.dateRange.last7days,
      messages.app.dateRange.last14days,
      messages.app.dateRange.last30days,
    ],
    [messages],
  );
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>(ranges[2]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted/50"
      >
        <Calendar size={14} className="text-muted-foreground" />
        <span>{selected}</span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-border bg-card py-1 shadow-xl">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => {
                setSelected(range);
                setOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-left text-sm transition-colors hover:bg-muted/50 ${
                selected === range ? "bg-muted/30 font-medium text-foreground" : "text-muted-foreground"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
