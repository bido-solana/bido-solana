import { notFound, redirect } from "next/navigation";
import { getFirstPageSlug, isDocSectionId } from "@/lib/docs-content";

export default async function DocsSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!isDocSectionId(section)) {
    notFound();
  }

  const firstPage = getFirstPageSlug(section);
  if (!firstPage) {
    notFound();
  }

  redirect(`/docs/${section}/${firstPage}`);
}
