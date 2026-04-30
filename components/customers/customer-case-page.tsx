"use client";

import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";
import { useI18n } from "@/components/providers/i18n-provider";
import { BrandLogo } from "@/components/site/brand-logo";
import { Navbar } from "@/components/site/navbar";
import { ThemeToggle } from "@/components/site/theme-toggle";
import type { CustomerCaseStudy } from "@/lib/customer-cases";
import { cn } from "@/lib/utils";

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

export function CustomerCasePage({ slug }: { slug: CustomerCaseStudy["slug"] }) {
  const { authenticated, login, ready } = usePrivy();
  const { messages } = useI18n();
  const study = messages.customerCases.items.find((item) => item.slug === slug);

  if (!study) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar authenticated={authenticated} onLogin={login} ready={ready} />

      <main className="pt-24 sm:pt-28">
        <section className="px-3 pb-6 sm:px-4">
          <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-violet/14 bg-surface shadow-[0_28px_90px_rgba(88,28,135,0.08)] dark:border-violet/20 dark:shadow-[0_28px_90px_rgba(0,0,0,0.42)]">
            <div className="border-b border-border/70 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-muted-foreground">{messages.customerCases.caseStudyLabel}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{study.breadcrumbLabel}</span>
              </div>
            </div>

            <div className="px-6 pb-8 pt-10 sm:px-8 sm:pt-14">
              <h1 className="bg-[linear-gradient(90deg,#9945FF,#F472B6,#34D399)] bg-clip-text text-[64px] font-black leading-[0.92] tracking-[-0.06em] text-transparent sm:text-[96px] md:text-[140px]">
                {study.title}
              </h1>

              <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
                <div className="overflow-hidden rounded-[24px] border border-border/70 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.24),transparent_48%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,240,255,0.94))] p-8 dark:bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.22),transparent_42%),linear-gradient(180deg,rgba(18,18,24,0.98),rgba(8,8,12,0.98))]">
                  <div className="flex aspect-square max-h-[520px] items-center justify-center overflow-hidden rounded-[22px] border border-border/70 bg-background/80 p-8">
                    <Image
                      src={study.imageSrc}
                      alt={study.imageAlt}
                      width={720}
                      height={720}
                      className="h-auto max-h-full w-full max-w-[360px] object-contain dark:brightness-0 dark:invert"
                    />
                  </div>
                </div>

                <div className="grid overflow-hidden rounded-[24px] border border-border/70 bg-background/70 lg:grid-rows-[1fr_auto]">
                  <div className="border-b border-border/70 p-8">
                    <BrandLogo className="mb-6 w-[118px]" />
                    <p className="max-w-xl text-[28px] font-semibold leading-[1.15] tracking-[-0.03em] text-foreground sm:text-[34px]">
                      {study.heroDescription}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">{study.heroBadge}</p>
                  </div>

                  <div className="grid grid-cols-1 divide-y divide-border/70 md:grid-cols-3 md:divide-x md:divide-y-0">
                    {study.heroStats.map((stat) => (
                      <div key={stat.title} className="p-6">
                        <div className="text-[22px] font-bold leading-tight tracking-[-0.03em] text-foreground">
                          {stat.title}
                        </div>
                        <p className="mt-3 text-[13px] leading-snug text-muted-foreground">{stat.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-3 pb-20 sm:px-4">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
            <aside className="lg:sticky lg:top-28 lg:h-max">
              <nav className="rounded-[24px] border border-border/70 bg-surface p-5">
                <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-violet">
                  {messages.customerCases.contentsLabel}
                </div>
                <ul className="space-y-3 text-sm">
                  {study.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="flex items-start gap-3 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-violet/70" />
                        <span className="leading-snug">{section.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            <div className="min-w-0 space-y-24">
              {study.sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-28">
                  <Pill>{section.eyebrow}</Pill>
                  <h2 className="mt-6 max-w-4xl text-[34px] font-bold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-[42px]">
                    {section.title}
                  </h2>

                  {section.kind === "overview" ? (
                    <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[300px_minmax(0,1fr)]">
                      <div className="space-y-6 rounded-[24px] border border-border/70 bg-surface p-6 text-[15px]">
                        {section.aside?.map((item, index) => (
                          <div key={item.label}>
                            {index > 0 ? <Divider /> : null}
                            <Field label={item.label}>
                              <span>{item.content}</span>
                              {"href" in item && "hrefLabel" in item && item.href && item.hrefLabel ? (
                                <a
                                  href={item.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="mt-3 block font-semibold text-foreground underline decoration-violet/50 underline-offset-4"
                                >
                                  {item.hrefLabel} ↗
                                </a>
                              ) : null}
                            </Field>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-6 text-[16px] leading-[1.7] text-muted-foreground">
                        {section.quote ? (
                          <p className="text-[24px] font-semibold leading-[1.35] tracking-[-0.02em] text-foreground">
                            “{section.quote}”
                          </p>
                        ) : null}
                        {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </div>
                  ) : null}

                  {section.kind === "problems" ? (
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      {section.cards?.map((card) => (
                        <InfoCard key={card.title} title={card.title} description={card.description} />
                      ))}
                    </div>
                  ) : null}

                  {section.kind === "diagram" ? (
                    <>
                      <div className="mt-8 overflow-hidden rounded-[28px] border border-violet/25 bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.18),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,245,255,0.92))] p-8 dark:bg-[radial-gradient(circle_at_top,rgba(167,139,250,0.18),transparent_32%),linear-gradient(180deg,rgba(18,18,24,0.98),rgba(10,10,14,0.98))]">
                        <p className="text-center text-[22px] font-semibold leading-[1.3] text-foreground">
                          {section.diagram?.heading}
                        </p>
                        <div className="mx-auto mt-10 flex max-w-[560px] flex-col items-center gap-3">
                          <DiagramPill className="bg-violet text-white">{section.diagram?.sourceLabel}</DiagramPill>
                          <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                            {section.diagram?.items.map((item) => (
                              <DiagramPill key={item} className="bg-background text-foreground">
                                {item}
                              </DiagramPill>
                            ))}
                          </div>
                          <DiagramPill className="bg-[linear-gradient(90deg,#9945FF,#F472B6,#34D399)] text-white">
                            {section.diagram?.outputLabel}
                          </DiagramPill>
                        </div>
                      </div>

                      <div className="mt-8 space-y-6 text-[16px] leading-[1.7] text-muted-foreground">
                        {section.body?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                      </div>
                    </>
                  ) : null}

                  {section.kind === "sequence" ? (
                    <div className="mt-8 space-y-4">
                      {section.sequence?.map((item) => (
                        <CaseCodeBlock key={item.label} label={item.label} code={item.code} />
                      ))}
                      {section.agentAnswer ? (
                        <div className="rounded-[24px] border border-border/70 bg-surface p-6 text-[15px] leading-[1.7] text-foreground/90">
                          <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                            {messages.customerCases.agentAnswersLabel}
                          </div>
                          “{section.agentAnswer}”
                        </div>
                      ) : null}
                    </div>
                  ) : null}

                  {section.kind === "metrics" ? (
                    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {section.metrics?.map((metric) => (
                        <MetricRow key={metric.name} name={metric.name} description={metric.description} />
                      ))}
                    </div>
                  ) : null}

                  {section.kind === "impact" ? (
                    <>
                      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {section.impacts?.map((impact) => (
                          <ImpactCard key={impact.kpi} kpi={impact.kpi} label={impact.label} />
                        ))}
                      </div>

                      {section.oneLiner ? (
                        <div className="mt-12 rounded-[28px] border border-violet/20 bg-[linear-gradient(180deg,rgba(16,16,22,0.98),rgba(8,8,12,1))] p-8 text-white">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                            {messages.customerCases.oneLinerLabel}
                          </p>
                          <p className="mt-3 max-w-4xl text-[24px] font-bold leading-[1.25] tracking-[-0.03em] md:text-[30px]">
                            {section.oneLiner}
                          </p>
                        </div>
                      ) : null}
                    </>
                  ) : null}
                </section>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-border/60 py-12">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} Bido</span>
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <a
                href="https://x.com/usebido"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="inline-flex size-9 items-center justify-center rounded-full border border-border bg-surface-2 transition-colors hover:text-foreground"
              >
                <XIcon />
              </a>
              <a
                href="https://github.com/bido-solana"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
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

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-background px-4 py-1.5 text-[13px] font-medium text-foreground">
      {children}
    </span>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="pt-6 first:pt-0">
      <div className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">{label}</div>
      <div className="text-foreground">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-dashed border-border/80" />;
}

function DiagramPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-full px-5 py-2.5 text-center text-[15px] font-semibold shadow-sm ring-1 ring-black/5 dark:ring-white/5",
        className,
      )}
    >
      {children}
    </div>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-[24px] border border-border/70 bg-surface p-6">
      <div className="text-[20px] font-bold tracking-[-0.02em] text-foreground">{title}</div>
      <p className="mt-2 text-[14px] leading-snug text-muted-foreground">{description}</p>
    </div>
  );
}

function MetricRow({ name, description }: { name: string; description: string }) {
  return (
    <div className="flex items-start gap-3 rounded-[24px] border border-border/70 bg-surface p-5">
      <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[linear-gradient(135deg,#9945FF,#34D399)]" />
      <div>
        <div className="text-[15px] font-semibold text-foreground">{name}</div>
        <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function ImpactCard({ kpi, label }: { kpi: string; label: string }) {
  return (
    <div className="rounded-[24px] border border-border/70 bg-surface p-6">
      <div className="text-[28px] font-bold tracking-[-0.03em] text-foreground">{kpi}</div>
      <p className="mt-2 text-[14px] text-muted-foreground">{label}</p>
    </div>
  );
}

function CaseCodeBlock({ label, code }: { label: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-[24px] border border-border/70 bg-[linear-gradient(180deg,rgba(16,16,22,0.98),rgba(8,8,12,1))]">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        <span className="ml-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">{label}</span>
      </div>
      <pre className="overflow-x-auto px-5 py-4 text-[13px] leading-[1.55] text-white/92">
        <code>{code}</code>
      </pre>
    </div>
  );
}
