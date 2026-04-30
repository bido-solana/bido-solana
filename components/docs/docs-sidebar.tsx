"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Lock } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/providers/i18n-provider";
import {
  DOC_ROUTE_STRUCTURE,
  getDocsSection,
  type DocSectionId,
  type LocalizedDocGroup,
  type LocalizedDocSection,
} from "@/lib/docs-content";
import { cn } from "@/lib/utils";

export function DocsSidebar({ activeSectionId }: { activeSectionId: DocSectionId }) {
  const { messages } = useI18n();
  const pathname = usePathname();
  const activeSlug = pathname.split("/").filter(Boolean)[2];
  const section = getDocsSection(messages, activeSectionId);

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-64 shrink-0 overflow-y-auto pr-4 lg:block">
      <div className="mb-6 flex gap-1 border-b border-border">
        {DOC_ROUTE_STRUCTURE.map((routeSection) => {
          const sectionItem = getDocsSection(messages, routeSection.id);
          if (!sectionItem) return null;

          const firstPage = sectionItem.groups[0]?.pages[0];
          if (!firstPage) return null;

          if (routeSection.comingSoon) {
            return <ComingSoonTab key={routeSection.id} sectionItem={sectionItem} />;
          }

          return (
            <Link
              key={routeSection.id}
              href={`/docs/${routeSection.id}/${firstPage.slug}`}
              className={cn(
                "relative -mb-px px-3 py-2 text-sm font-medium transition-colors",
                routeSection.id === activeSectionId ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {sectionItem.label}
              {routeSection.id === activeSectionId ? (
                <span className="absolute inset-x-0 -bottom-px h-px bg-violet" />
              ) : null}
            </Link>
          );
        })}
      </div>

      <nav>
        {section?.groups.map((group) => (
          <SidebarGroup
            key={group.label ?? "root"}
            activeSlug={activeSlug}
            group={group}
            isLocked={Boolean(section?.comingSoon)}
            sectionId={activeSectionId}
          />
        ))}
      </nav>
    </aside>
  );
}

function ComingSoonTab({ sectionItem }: { sectionItem: LocalizedDocSection }) {
  const { messages } = useI18n();

  return (
    <div className="group relative">
      <div className="relative -mb-px inline-flex cursor-not-allowed items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground/80">
        <Lock className="size-3.5" />
        {sectionItem.label}
      </div>
      <div className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {messages.docs.comingSoonBadge}
      </div>
    </div>
  );
}

function SidebarGroup({
  group,
  activeSlug,
  isLocked,
  sectionId,
}: {
  group: LocalizedDocGroup;
  activeSlug?: string;
  isLocked: boolean;
  sectionId: DocSectionId;
}) {
  const { messages } = useI18n();
  const containsActive = useMemo(
    () => group.pages.some((page) => page.slug === activeSlug),
    [activeSlug, group.pages],
  );
  const [open, setOpen] = useState(group.label ? containsActive : true);

  return (
    <div className="mb-4">
      {group.label ? (
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-sm font-semibold text-foreground hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <span>{group.label}</span>
          <ChevronDown
            className={cn("size-4 text-muted-foreground transition-transform", !open && "-rotate-90")}
          />
        </button>
      ) : null}
      {open ? (
        <ul className="mt-1 space-y-0.5 border-l border-border pl-3">
          {group.pages.map((page) => {
            const isActive = page.slug === activeSlug;

            if (isLocked) {
              return (
                <li key={page.slug} className="group relative">
                  <div className="flex cursor-not-allowed items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground/75">
                    <Lock className="size-3.5 shrink-0" />
                    <span>{page.title}</span>
                  </div>
                  <div className="pointer-events-none absolute left-full top-1/2 z-20 ml-3 -translate-y-1/2 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-foreground opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                    {messages.docs.comingSoonBadge}
                  </div>
                </li>
              );
            }

            return (
              <li key={page.slug}>
                <Link
                  href={`/docs/${sectionId}/${page.slug}`}
                  className={cn(
                    "block rounded-md px-2 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-violet-soft font-medium text-foreground"
                      : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                  )}
                >
                  {page.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
