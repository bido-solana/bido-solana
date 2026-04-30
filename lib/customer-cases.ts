export type CustomerCaseSection = {
  id: string;
  label: string;
  kind: "overview" | "problems" | "diagram" | "sequence" | "metrics" | "impact";
  title: string;
  eyebrow: string;
  quote?: string;
  body?: string[];
  aside?: {
    label: string;
    content: string;
    href?: string;
    hrefLabel?: string;
  }[];
  cards?: {
    title: string;
    description: string;
  }[];
  diagram?: {
    heading: string;
    sourceLabel: string;
    items: string[];
    outputLabel: string;
  };
  sequence?: {
    label: string;
    code: string;
  }[];
  agentAnswer?: string;
  metrics?: {
    name: string;
    description: string;
  }[];
  impacts?: {
    kpi: string;
    label: string;
  }[];
  oneLiner?: string;
};

export type CustomerCaseStudy = {
  slug: string;
  name: string;
  title: string;
  description: string;
  breadcrumbLabel: string;
  imageSrc: string;
  imageAlt: string;
  heroDescription: string;
  heroBadge: string;
  heroStats: {
    title: string;
    description: string;
  }[];
  meta: {
    title: string;
    description: string;
  };
  sections: CustomerCaseSection[];
};

export const CUSTOMER_CASE_SLUGS = ["solana"] as const;

export const CUSTOMER_CASE_META = {
  solana: {
    title: "Solana Protocols × Bido — Customer Story",
    description: "How Bido turns AI coding agents into a high-intent distribution channel for Solana protocols.",
    imageSrc: "/solana-logo.png",
  },
} as const;

export function isCustomerCaseSlug(slug: string): slug is (typeof CUSTOMER_CASE_SLUGS)[number] {
  return CUSTOMER_CASE_SLUGS.includes(slug as (typeof CUSTOMER_CASE_SLUGS)[number]);
}
