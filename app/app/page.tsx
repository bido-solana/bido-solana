"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useI18n } from "@/components/providers/i18n-provider";
import { LoggedInScreen } from "@/components/app/logged-in-screen";

export default function AppPage() {
  const { authenticated, login, ready } = usePrivy();
  const loginEnabled = process.env.NEXT_PUBLIC_LOGIN_ENABLED === "true";
  const { messages } = useI18n();

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          {messages.common.loadingApp}
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-xl rounded-[32px] border border-border bg-surface-2 px-8 py-10 text-center shadow-2xl shadow-black/60">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet">
            {messages.common.appName}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
            {messages.app.accessTitle}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {messages.app.accessDescription}
          </p>
          <button
            type="button"
            onClick={loginEnabled ? login : undefined}
            disabled={!loginEnabled}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-violet px-6 text-sm font-semibold text-violet-foreground transition-colors hover:bg-violet/90 disabled:cursor-not-allowed disabled:opacity-45"
          >
            {messages.navbar.signIn}
          </button>
        </div>
      </main>
    );
  }

  return <LoggedInScreen />;
}
