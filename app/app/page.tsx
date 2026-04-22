"use client";

import { usePrivy } from "@privy-io/react-auth";
import { LoggedInScreen } from "@/components/app/logged-in-screen";

export default function AppPage() {
  const { authenticated, login, ready } = usePrivy();

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          Carregando aplicativo…
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="w-full max-w-xl rounded-[32px] border border-border bg-surface-2 px-8 py-10 text-center shadow-2xl shadow-black/60">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet">
            Acesso ao app
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground">
            Faça login com Privy para entrar no aplicativo.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A home permanece pública. O acesso ao app é uma ação separada.
          </p>
          <button
            type="button"
            onClick={login}
            className="mt-8 inline-flex h-12 items-center justify-center rounded-md bg-violet px-6 text-sm font-semibold text-violet-foreground transition-colors hover:bg-violet/90"
          >
            Entrar com Privy
          </button>
        </div>
      </main>
    );
  }

  return <LoggedInScreen />;
}
