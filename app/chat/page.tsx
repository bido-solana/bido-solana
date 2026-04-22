"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useI18n } from "@/components/providers/i18n-provider";
import { ChatScreen } from "@/components/app/chat-screen";

export default function ChatPage() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();
  const { messages } = useI18n();

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace("/");
    }
  }, [authenticated, ready, router]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          {messages.common.loadingChats}
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          {messages.common.redirectingHome}
        </div>
      </main>
    );
  }

  return <ChatScreen />;
}
