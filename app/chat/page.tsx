"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { ChatScreen } from "@/components/app/chat-screen";

export default function ChatPage() {
  const router = useRouter();
  const { authenticated, ready } = usePrivy();

  useEffect(() => {
    if (ready && !authenticated) {
      router.replace("/");
    }
  }, [authenticated, ready, router]);

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          Carregando chats…
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          Redirecionando para a home…
        </div>
      </main>
    );
  }

  return <ChatScreen />;
}
