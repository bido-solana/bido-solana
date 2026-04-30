import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsShell } from "@/components/docs/docs-shell";
import { H1, P } from "@/components/docs/blocks";
import { DOC_SECTIONS, getPage } from "@/lib/docs-content";

export function generateStaticParams() {
  return DOC_SECTIONS.flatMap((section) =>
    section.groups.flatMap((group) =>
      group.pages.map((page) => ({
        section: section.id,
        slug: page.slug,
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
  const found = getPage(section, slug);

  if (!found) {
    return {
      title: "Documentation",
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
  const found = getPage(section, slug);

  if (!found) {
    notFound();
  }

  const PageComponent = found.page.component;

  return (
    <DocsShell
      sectionId={found.section.id}
      page={{
        slug: found.page.slug,
        title: found.page.title,
        description: found.page.description,
      }}
    >
      {found.section.comingSoon ? (
        <>
          <H1>SDK em breve</H1>
          <P>
            A documentação completa do SDK ainda está bloqueada. Estamos finalizando os guias, exemplos e referência de
            API para publicar em breve.
          </P>
          <div className="mt-8 inline-flex rounded-full border border-violet/25 bg-violet-soft px-4 py-2 text-sm font-semibold text-violet">
            Em breve
          </div>
        </>
      ) : (
        <PageComponent />
      )}
    </DocsShell>
  );
}
