"use client";

import { messages, type Locale } from "@/lib/i18n";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ChatThread = {
  id: string;
  title: string;
  updatedAt: string;
  messages: ChatMessage[];
};

function getStorageKey(locale: Locale) {
  return `bido-chat-threads:${locale}`;
}

function getFallbackThreads(locale: Locale): ChatThread[] {
  if (locale === "en") {
    return [
      {
        id: "chat-1",
        title: "Solana campaign",
        updatedAt: new Date().toISOString(),
        messages: [
          {
            id: "m-1",
            role: "user",
            content: "I want to sponsor searches for Solana wallets with stronger intent.",
            createdAt: new Date().toISOString(),
          },
          {
            id: "m-2",
            role: "assistant",
            content: "I can structure intent clusters, daily budget, and CPD for that campaign.",
            createdAt: new Date().toISOString(),
          },
        ],
      },
    ];
  }

  return [
    {
      id: "chat-1",
      title: "Campanha Solana",
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: "m-1",
          role: "user",
          content: "Quero patrocinar buscas de carteiras Solana com maior intenção.",
          createdAt: new Date().toISOString(),
        },
        {
          id: "m-2",
          role: "assistant",
          content: "Posso estruturar clusters por intenção, budget diário e CPD para essa campanha.",
          createdAt: new Date().toISOString(),
        },
      ],
    },
  ];
}

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadThreads(locale: Locale): ChatThread[] {
  const fallbackThreads = getFallbackThreads(locale);
  if (!canUseStorage()) return fallbackThreads;

  const raw = window.localStorage.getItem(getStorageKey(locale));
  if (!raw) {
    window.localStorage.setItem(getStorageKey(locale), JSON.stringify(fallbackThreads));
    return fallbackThreads;
  }

  try {
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallbackThreads;
  } catch {
    return fallbackThreads;
  }
}

export function saveThreads(locale: Locale, threads: ChatThread[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(getStorageKey(locale), JSON.stringify(threads));
}

export function createEmptyThread(locale: Locale, initialMessage?: string): ChatThread {
  const timestamp = new Date().toISOString();
  const fallbackTitle = messages[locale].app.fallbackNewCampaign;
  const assistantTemplate =
    locale === "en"
      ? `Campaign prepared from: "${initialMessage}". I can turn this into targeting, budget, and CPD in the next step.`
      : `Campanha preparada a partir de: "${initialMessage}". Posso transformar isso em targeting, budget e CPD no próximo passo.`;

  return {
    id: `chat-${Date.now()}`,
    title: initialMessage ? initialMessage.slice(0, 40) : fallbackTitle,
    updatedAt: timestamp,
    messages: initialMessage
      ? [
          {
            id: `user-${Date.now()}`,
            role: "user",
            content: initialMessage,
            createdAt: timestamp,
          },
          {
            id: `assistant-${Date.now() + 1}`,
            role: "assistant",
            content: assistantTemplate,
            createdAt: new Date(Date.now() + 1).toISOString(),
          },
        ]
      : [],
  };
}

export function addThread(locale: Locale, thread: ChatThread) {
  const threads = loadThreads(locale);
  const next = [thread, ...threads.filter((item) => item.id !== thread.id)];
  saveThreads(locale, next);
  return next;
}

export function appendMessage(locale: Locale, threadId: string, message: string) {
  const threads = loadThreads(locale);
  const now = new Date().toISOString();
  const assistantContent =
    locale === "en"
      ? `Campaign prepared from: "${message}". I can turn this into targeting, budget, and CPD in the next step.`
      : `Campanha preparada a partir de: "${message}". Posso transformar isso em targeting, budget e CPD no próximo passo.`;
  const userMessage: ChatMessage = {
    id: `user-${Date.now()}`,
    role: "user",
    content: message,
    createdAt: now,
  };
  const assistantMessage: ChatMessage = {
    id: `assistant-${Date.now() + 1}`,
    role: "assistant",
    content: assistantContent,
    createdAt: new Date(Date.now() + 1).toISOString(),
  };

  const next = threads.map((thread) =>
    thread.id === threadId
      ? {
          ...thread,
          title: thread.messages.length === 0 ? message.slice(0, 40) : thread.title,
          updatedAt: assistantMessage.createdAt,
          messages: [...thread.messages, userMessage, assistantMessage],
        }
      : thread,
  );

  saveThreads(locale, next);
  return next;
}
