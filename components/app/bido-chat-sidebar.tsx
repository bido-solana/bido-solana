"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronDown, House, Plus, Search } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import type { ChatThread } from "@/lib/chat-store";
import { BidoChatSearchModal } from "@/components/app/bido-chat-search-modal";

function formatRelativeTime(
  value: string,
  labels: { now: string; min: string; hour: string; day: string },
) {
  const minutes = Math.max(0, Math.round((Date.now() - new Date(value).getTime()) / 60000));
  if (minutes < 1) return labels.now;
  if (minutes < 60) return `${minutes} ${labels.min}`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} ${labels.hour}`;
  return `${Math.floor(minutes / 1440)} ${labels.day}`;
}

function getCampaignName(thread: ChatThread, fallback: string) {
  return thread.title?.trim() || fallback;
}

export function BidoChatSidebar({
  threads,
  currentChatId,
  isOpen,
  onClose,
  onSelectChat,
  onCreateChat,
  onGoHome,
  desktopCollapsed = false,
}: {
  threads: ChatThread[];
  currentChatId?: string | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectChat: (id: string) => void;
  onCreateChat: () => void;
  onGoHome?: () => void;
  desktopCollapsed?: boolean;
}) {
  const { messages } = useI18n();
  const [recentChatsExpanded, setRecentChatsExpanded] = useState(true);
  const [searchOpen, setSearchOpen] = useState(false);

  const orderedThreads = useMemo(
    () => [...threads].sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt)),
    [threads],
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (isTypingTarget) return;
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {isOpen ? (
        <button
          type="button"
          aria-label={messages.common.closeSidebar}
          onClick={onClose}
          className="absolute inset-0 z-10 bg-black/20 backdrop-blur-[1px] md:hidden"
        />
      ) : null}

      <aside
        className={`absolute top-[76px] bottom-0 left-0 z-20 overflow-hidden transition-all duration-300 ease-in-out ${isOpen
            ? "w-[86vw] max-w-80 opacity-100 translate-x-0"
            : desktopCollapsed
              ? "w-0 opacity-0 -translate-x-full pointer-events-none"
              : "w-0 opacity-0 -translate-x-full pointer-events-none md:w-80 md:opacity-100 md:translate-x-0 md:pointer-events-auto"
          }`}
      >
        <div className="h-full w-[86vw] max-w-80 p-3 md:w-80">
          <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-surface/88 shadow-[0_18px_60px_rgba(0,0,0,0.35)] ring-1 ring-white/6 backdrop-blur-2xl">
            <div className="px-4 pt-4 pb-3">
              {onGoHome ? (
                <button
                  type="button"
                  onClick={() => {
                    onGoHome();
                    onClose();
                  }}
                  className="mb-2 flex w-full items-center justify-center gap-2 rounded-2xl border border-white/6 bg-background/45 px-4 py-2.5 text-sm font-medium text-foreground/82 transition-all duration-200 hover:bg-background/70 hover:text-foreground"
                >
                  <House className="size-4" />
                  {messages.app.sidebar.backHome}
                </button>
              ) : null}
              <button
                type="button"
                onClick={onCreateChat}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-violet px-4 py-3 text-sm font-semibold text-violet-foreground transition-all duration-200 hover:bg-violet/90"
              >
                <Plus className="size-4" />
                {messages.app.sidebar.newChat}
              </button>
            </div>

            <div className="px-4 pb-3">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                className="flex w-full items-center gap-3 rounded-2xl bg-background/55 px-3 py-2.5 text-left text-sm text-muted-foreground transition-all duration-200 hover:bg-background/75 hover:text-foreground"
              >
                <Search className="size-4" />
                {messages.app.sidebar.searchChats}
                <span className="ml-auto hidden rounded-full border border-white/6 bg-surface px-2 py-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:inline-flex">
                  Cmd K
                </span>
              </button>
            </div>

            <div className="min-h-0 flex-1 px-3 pb-4">
              <div className="flex items-center justify-between px-2 py-2">
                <button
                  type="button"
                  onClick={() => setRecentChatsExpanded((current) => !current)}
                  className="flex flex-1 items-center justify-between rounded-xl px-2 py-1.5 text-left text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>{messages.app.sidebar.recentChats}</span>
                  <ChevronDown
                    className={`size-4 transition-transform duration-200 ${recentChatsExpanded ? "rotate-0" : "-rotate-90"
                      }`}
                  />
                </button>
              </div>

              {recentChatsExpanded ? (
                <div className="space-y-1 overflow-y-auto pr-1">
                  {orderedThreads.map((thread) => {
                    const selected = currentChatId === thread.id;

                    return (
                      <button
                        key={thread.id}
                        type="button"
                        onClick={() => {
                          onSelectChat(thread.id);
                          onClose();
                        }}
                        className={`w-full rounded-2xl px-3 py-3 text-left transition-all duration-200 ${selected
                            ? "bg-violet-soft/35 text-foreground shadow-[inset_0_0_0_1px_rgba(179,112,255,0.22)]"
                            : "bg-transparent text-foreground/80 hover:bg-background/55"
                          }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <p className="line-clamp-2 text-sm leading-5">
                            {getCampaignName(thread, messages.app.fallbackNewCampaign)}
                          </p>
                          <span className="shrink-0 pt-0.5 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
                            {formatRelativeTime(thread.updatedAt, messages.app.relativeTime)}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </aside>

      {searchOpen ? (
        <BidoChatSearchModal
          isOpen={searchOpen}
          threads={orderedThreads}
          onClose={() => setSearchOpen(false)}
          onSelectChat={(id) => {
            onSelectChat(id);
            setSearchOpen(false);
            onClose();
          }}
          onCreateChat={() => {
            onCreateChat();
            setSearchOpen(false);
          }}
          onGoHome={
            onGoHome
              ? () => {
                onGoHome();
                setSearchOpen(false);
              }
              : undefined
          }
        />
      ) : null}
    </>
  );
}
