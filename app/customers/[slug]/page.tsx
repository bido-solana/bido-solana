import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomerCasePage } from "@/components/customers/customer-case-page";
import { CUSTOMER_CASE_META, CUSTOMER_CASE_SLUGS, isCustomerCaseSlug } from "@/lib/customer-cases";

export function generateStaticParams() {
  return CUSTOMER_CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isCustomerCaseSlug(slug)) {
    return {
      title: "Case study not found | Bido",
    };
  }

  const study = CUSTOMER_CASE_META[slug];

  return {
    title: `${study.title} | Bido`,
    description: study.description,
    openGraph: {
      title: `${study.title} | Bido`,
      description: study.description,
      images: [study.imageSrc],
    },
  };
}

export default async function CustomerCaseRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!isCustomerCaseSlug(slug)) {
    notFound();
  }

  return <CustomerCasePage slug={slug} />;
}
