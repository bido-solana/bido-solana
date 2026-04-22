"use client";

import React, { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, SendHorizontal, Zap } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";

interface Model {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

function ModelSelector({
  selectedModel = "bido-0.1",
  onModelChange,
}: {
  selectedModel?: string;
  onModelChange?: (model: Model) => void;
}) {
  const { messages } = useI18n();
  const models: Model[] = [
    {
      id: "bido-0.1",
      name: "Bido 0.1",
      description: messages.app.messageInput.modelDescription,
      icon: <Zap className="size-4 text-violet" />,
      badge: messages.app.messageInput.modelBadge,
    },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(
    models.find((model) => model.id === selectedModel) ?? models[0],
  );

  const handleSelect = (model: Model) => {
    setSelected(model);
    setIsOpen(false);
    onModelChange?.(model);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:bg-surface hover:text-foreground active:scale-95"
      >
        {selected.icon}
        <span>{selected.name}</span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-full left-0 z-50 mb-2 min-w-[220px] overflow-hidden rounded-xl border border-border bg-surface-2/95 shadow-2xl shadow-black/50 backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
            <div className="p-1.5">
              <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                {messages.common.selectModel}
              </div>
              {models.map((model) => (
                <button
                  key={model.id}
                  type="button"
                  onClick={() => handleSelect(model)}
                  className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-all duration-150 ${
                    selected.id === model.id
                      ? "bg-surface text-foreground"
                      : "text-foreground/70 hover:bg-surface hover:text-foreground"
                  }`}
                >
                  <div className="flex-shrink-0">{model.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{model.name}</span>
                      {model.badge ? (
                        <span className="rounded-full bg-surface px-1.5 py-0.5 text-[10px] font-medium text-foreground/70">
                          {model.badge}
                        </span>
                      ) : null}
                    </div>
                    <span className="text-[11px] text-muted-foreground">{model.description}</span>
                  </div>
                  {selected.id === model.id ? (
                    <Check className="size-4 flex-shrink-0 text-violet" />
                  ) : null}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function BidoMessageInput({
  onSend,
  placeholder,
}: {
  onSend: (message: string) => void;
  placeholder?: string;
}) {
  const { messages } = useI18n();
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
  }, [message]);

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSend(message.trim());
    setMessage("");
  };

  return (
    <div className="relative mx-auto w-full max-w-[680px]">
      <div className="pointer-events-none absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/[0.08] to-transparent" />
      <div className="relative rounded-2xl bg-surface-2 shadow-[0_0_0_1px_rgba(255,255,255,0.05),0_2px_20px_rgba(0,0,0,0.4)] ring-1 ring-white/[0.08]">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              handleSubmit();
            }
          }}
          placeholder={placeholder ?? messages.app.messageInput.placeholder}
          className="min-h-[80px] max-h-[200px] w-full resize-none bg-transparent px-5 pt-5 pb-3 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none"
          style={{ height: "80px" }}
        />

        <div className="flex items-center justify-between px-3 pt-1 pb-3">
          <ModelSelector />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!message.trim()}
            className="flex items-center gap-2 rounded-full bg-violet px-4 py-2 text-sm font-medium text-violet-foreground shadow-[0_0_20px_rgba(179,112,255,0.24)] transition-all duration-200 hover:bg-violet/90 disabled:cursor-not-allowed disabled:opacity-40 active:scale-95"
          >
            <span className="hidden sm:inline">{messages.app.messageInput.send}</span>
            <SendHorizontal className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
