"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useI18n } from "@/components/providers/i18n-provider";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import { TableOfContents } from "@/components/docs/table-of-contents";
import { Navbar } from "@/components/site/navbar";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { getAdjacentPages, getDocsPage, getDocsSection, type DocSectionId } from "@/lib/docs-content";

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
      <path d="M18.901 1.153h3.68l-8.04 9.19 9.458 12.504h-7.405l-5.8-7.584-6.633 7.584H.48l8.6-9.83L0 1.154h7.594l5.243 6.932 6.064-6.932Zm-1.291 19.492h2.039L6.486 3.24H4.298L17.61 20.645Z" />
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

export function DocsShell({
  sectionId,
  pageSlug,
  children,
}: {
  sectionId: DocSectionId;
  pageSlug: string;
  children: ReactNode;
}) {
  const { authenticated, login, ready } = usePrivy();
  const { messages, replace } = useI18n();
  const section = getDocsSection(messages, sectionId);
  const currentPage = getDocsPage(messages, sectionId, pageSlug)?.page;
  const { prev, next } = getAdjacentPages(messages, sectionId, pageSlug);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar authenticated={authenticated} onLogin={login} ready={ready} />

      <main className="pt-28">
        <section className="px-3 pb-10 sm:px-4">
          <div className="mx-auto max-w-[1400px] rounded-[28px] border border-violet/14 bg-surface px-5 py-8 shadow-[0_28px_90px_rgba(88,28,135,0.08)] dark:border-violet/20 dark:shadow-[0_28px_90px_rgba(0,0,0,0.42)] sm:px-6 sm:py-10">
            <div className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-violet">{messages.docs.label}</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{section?.label}</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">{section?.description}</p>
              </div>
              <ThemeToggle />
            </div>

            <div className="flex gap-8">
              <DocsSidebar activeSectionId={sectionId} />

              <div className="min-w-0 flex-1">
                <div className="mb-6 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
                  <Link href="/docs" className="hover:text-foreground">
                    {messages.docs.rootLabel}
                  </Link>
                  <ChevronRight className="size-3.5" />
                  <span className="text-foreground">{section?.label}</span>
                  <ChevronRight className="size-3.5" />
                  <span className="text-foreground">{currentPage?.title}</span>
                </div>

                <article className="max-w-3xl">{children}</article>

                <nav className="mt-16 grid max-w-3xl grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2">
                  {prev ? (
                    <Link
                      href={`/docs/${sectionId}/${prev.slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-surface-2/40 p-4 transition-colors hover:border-violet/40"
                    >
                      <span className="flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        <ArrowLeft className="size-3" />
                        {messages.docs.previousLabel}
                      </span>
                      <span className="mt-1 font-semibold text-foreground">{prev.title}</span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {next ? (
                    <Link
                      href={`/docs/${sectionId}/${next.slug}`}
                      className="group flex flex-col rounded-2xl border border-border bg-surface-2/40 p-4 text-left transition-colors hover:border-violet/40 sm:items-end sm:text-right"
                    >
                      <span className="flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {messages.docs.nextLabel}
                        <ArrowRight className="size-3" />
                      </span>
                      <span className="mt-1 font-semibold text-foreground">{next.title}</span>
                    </Link>
                  ) : (
                    <div className="hidden sm:block" />
                  )}
                </nav>
              </div>

              <TableOfContents />
            </div>
          </div>
        </section>

        <footer className="border-t border-border/60 py-12">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
            <span>{replace(messages.common.footerCopy, { year: new Date().getFullYear() })}</span>
            <div className="flex items-center gap-3">
              <ThemeToggle />
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
