"use client";

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

const STORAGE_KEY = "bido-chat-threads";

const fallbackThreads: ChatThread[] = [
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

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function loadThreads(): ChatThread[] {
  if (!canUseStorage()) return fallbackThreads;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(fallbackThreads));
    return fallbackThreads;
  }

  try {
    const parsed = JSON.parse(raw) as ChatThread[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : fallbackThreads;
  } catch {
    return fallbackThreads;
  }
}

export function saveThreads(threads: ChatThread[]) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(threads));
}

export function createEmptyThread(initialMessage?: string): ChatThread {
  const timestamp = new Date().toISOString();
  return {
    id: `chat-${Date.now()}`,
    title: initialMessage ? initialMessage.slice(0, 40) : "Novo chat",
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
            content: `Campanha preparada a partir de: "${initialMessage}". Posso transformar isso em targeting, budget e CPD no próximo passo.`,
            createdAt: new Date(Date.now() + 1).toISOString(),
          },
        ]
      : [],
  };
}

export function addThread(thread: ChatThread) {
  const threads = loadThreads();
  const next = [thread, ...threads.filter((item) => item.id !== thread.id)];
  saveThreads(next);
  return next;
}

export function appendMessage(threadId: string, message: string) {
  const threads = loadThreads();
  const now = new Date().toISOString();
  const userMessage: ChatMessage = {
    id: `user-${Date.now()}`,
    role: "user",
    content: message,
    createdAt: now,
  };
  const assistantMessage: ChatMessage = {
    id: `assistant-${Date.now() + 1}`,
    role: "assistant",
    content: `Campanha preparada a partir de: "${message}". Posso transformar isso em targeting, budget e CPD no próximo passo.`,
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

  saveThreads(next);
  return next;
}
