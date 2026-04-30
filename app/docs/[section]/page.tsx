import { notFound, redirect } from "next/navigation";
import { getFirstPage, getSection } from "@/lib/docs-content";

export default async function DocsSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const sectionMeta = getSection(section);

  if (!sectionMeta) {
    notFound();
  }

  const firstPage = getFirstPage(section);
  if (!firstPage) {
    notFound();
  }

  redirect(`/docs/${section}/${firstPage.slug}`);
}
