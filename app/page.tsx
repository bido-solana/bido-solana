"use client";

import Link from "next/link";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { useI18n } from "@/components/providers/i18n-provider";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M18.901 1.153h3.68l-8.04 9.19 9.458 12.504h-7.405l-5.8-7.584-6.633 7.584H.48l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.492h2.039L6.486 3.24H4.298L17.61 20.645Z" />
    </svg>
  );
}

function KoraLogo() {
  return (
    <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" className="h-4 w-4">
      <path d="M17.1818 17.1818H0.818176V0.818159L17.1818 17.1818Z" fill="url(#kora_paint0_linear)" fillOpacity="0.44" />
      <path d="M17.1818 0.818192H0.818176V17.1818L17.1818 0.818192Z" fill="#474747" />
      <path d="M17.1818 0.818192H0.818176V17.1818L17.1818 0.818192Z" fill="url(#kora_paint1_linear)" />
      <defs>
        <linearGradient id="kora_paint0_linear" x1="8.99999" y1="17.1818" x2="8.99999" y2="0.818159" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3C3633" />
          <stop offset="1" stopColor="#5F5149" />
        </linearGradient>
        <linearGradient id="kora_paint1_linear" x1="8.99999" y1="0.818192" x2="8.99999" y2="17.1818" gradientUnits="userSpaceOnUse">
          <stop stopColor="#3C3633" />
          <stop offset="1" stopColor="#5F5149" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M12 .297a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.577v-2.234c-3.338.726-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.756-1.333-1.756-1.09-.744.083-.729.083-.729 1.204.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.419-1.304.762-1.604-2.665-.304-5.467-1.334-5.467-5.932 0-1.31.468-2.381 1.235-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.323 3.3 1.23a11.49 11.49 0 0 1 6 0c2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.61-2.807 5.625-5.48 5.921.43.372.814 1.103.814 2.222v3.293c0 .319.216.694.825.576A12 12 0 0 0 12 .297Z" />
    </svg>
  );
}

export default function HomePage() {
  const { ready, authenticated, login } = usePrivy();
  const { messages, replace } = useI18n();
  const cards = messages.home.audienceCards;
  const infrastructure = messages.home.infrastructure;

  if (!ready) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6 text-center">
        <div className="rounded-2xl border border-border bg-surface-2 px-6 py-5 text-sm text-muted-foreground">
          {messages.common.loadingExperience}
        </div>
      </main>
    );
  }

  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <Navbar authenticated={authenticated} onLogin={login} />

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden">
          {/* ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[700px] w-[1200px] -translate-x-1/2 rounded-full opacity-35 blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, oklch(0.4 0.15 295 / 0.5), transparent 70%)",
            }}
          />

          <div className="mx-auto max-w-[1100px] px-6 pb-32 pt-40 text-center">
            {/* badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet/30 bg-violet-soft px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet">
              {messages.home.badge}
            </div>

            {/* headline — always English per brand copy */}
            <h1 className="mx-auto max-w-4xl text-balance text-5xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-[80px]">
              {messages.home.headline}
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
              {messages.home.subheadline}
            </p>

            {/* infrastructure logos */}
            {/* <div className="mt-10 flex flex-col items-center gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {messages.hero.infrastructureBy}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="https://solana.com"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full border border-white/8 bg-black px-3 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <Image src="/solana-logo.svg" alt={infrastructure.solanaName} width={90} height={20} className="h-5 w-auto" />
                  </a>
                  <a
                    href="https://launch.solana.com/docs/kora"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/80 px-3 py-2 text-sm font-medium text-foreground/80 backdrop-blur-xl transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    <KoraLogo />
                    <span>{infrastructure.koraName}</span>
                  </a>
                </div>
              </div> */}
            
          </div>
        </section>

        {/* ── Split Audience Cards ── */}
        <section className="border-t border-border/60 py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-6 sm:grid-cols-2">

              {/* For Sponsors */}
              <Link
                href="/sponsors"
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-2 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-violet/40 hover:shadow-[0_20px_60px_rgba(124,58,237,0.12)]"
              >
                {/* subtle corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: "oklch(0.5 0.2 295)" }}
                />

                <div>
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-violet-soft text-violet">
                    {/* target icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </div>

                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet">
                    {cards.sponsors.label}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {cards.sponsors.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {cards.sponsors.description}
                  </p>
                </div>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet transition-gap duration-200 group-hover:gap-3">
                  {cards.sponsors.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>

              {/* For Devs */}
              <Link
                href="/devs"
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-surface-2 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-[0_20px_60px_rgba(16,185,129,0.10)]"
              >
                {/* subtle corner glow */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20"
                  style={{ background: "oklch(0.7 0.2 160)" }}
                />

                <div>
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                    {/* code / terminal icon */}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="h-5 w-5">
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>

                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                    {cards.devs.label}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {cards.devs.title}
                  </h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {cards.devs.description}
                  </p>
                </div>

                <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 transition-gap duration-200 group-hover:gap-3">
                  {cards.devs.label}
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="border-t border-border/60 py-12">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
            <span>{replace(messages.common.footerCopy, { year: new Date().getFullYear() })}</span>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/usebido"
                target="_blank"
                rel="noreferrer"
                aria-label={messages.common.socialX}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-2 transition-colors hover:text-foreground"
              >
                <XIcon />
              </a>
              <a
                href="https://github.com/bido-solana"
                target="_blank"
                rel="noreferrer"
                aria-label={messages.common.socialGitHub}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-2 transition-colors hover:text-foreground"
              >
                <GitHubIcon />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
