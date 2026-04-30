import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsPageContent } from "@/components/docs/docs-page-content";
import { DocsShell } from "@/components/docs/docs-shell";
import { defaultLocale, messages } from "@/lib/i18n";
import { DOC_ROUTE_STRUCTURE, getDefaultDocsMetadata, hasDocPage, isDocSectionId } from "@/lib/docs-content";

export function generateStaticParams() {
  return DOC_ROUTE_STRUCTURE.flatMap((section) =>
    section.groups.flatMap((group) =>
      group.pages.map((slug) => ({
        section: section.id,
        slug,
      })),
    ),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}): Promise<Metadata> {
  const { section, slug } = await params;
  if (!isDocSectionId(section)) {
    return {
      title: "Bido Docs",
    };
  }

  const found = getDefaultDocsMetadata(messages[defaultLocale].docs, section, slug);

  if (!found) {
    return {
      title: "Bido Docs",
    };
  }

  return {
    title: `${found.page.title} | ${found.section.label} | Bido Docs`,
    description: found.page.description,
  };
}

export default async function DocContentPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;
  if (!isDocSectionId(section) || !hasDocPage(section, slug)) {
    notFound();
  }

  return (
    <DocsShell sectionId={section} pageSlug={slug}>
      <DocsPageContent sectionId={section} pageSlug={slug} />
    </DocsShell>
  );
}
