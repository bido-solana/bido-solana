import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, AlertTriangle, Info, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function flattenChildren(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map(flattenChildren).join("");
  }
  if (node && typeof node === "object" && "props" in node) {
    const childNode = (node as { props?: { children?: ReactNode } }).props?.children;
    return flattenChildren(childNode);
  }
  return "";
}

export function H1({ children }: { children: ReactNode }) {
  return <h1 className="mb-6 mt-2 text-4xl font-bold tracking-tight text-foreground">{children}</h1>;
}

export function H2({ children }: { children: ReactNode }) {
  const id = slugify(flattenChildren(children));
  return (
    <h2
      id={id}
      data-toc="h2"
      className="mb-4 mt-14 scroll-mt-28 text-2xl font-bold tracking-tight text-foreground"
    >
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  const id = slugify(flattenChildren(children));
  return (
    <h3
      id={id}
      data-toc="h3"
      className="mb-3 mt-8 scroll-mt-28 text-lg font-semibold text-foreground"
    >
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="my-4 leading-7 text-muted-foreground">{children}</p>;
}

export function UL({ children }: { children: ReactNode }) {
  return <ul className="my-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-violet">{children}</ul>;
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="my-4 list-decimal space-y-2 pl-6 text-muted-foreground marker:text-violet">{children}</ol>
  );
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="rounded-md border border-border/70 bg-surface-2 px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
      {children}
    </code>
  );
}

export function CodeBlock({
  children,
  language,
}: {
  children: string;
  language?: string;
}) {
  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-border bg-surface-2/70">
      {language ? (
        <div className="border-b border-border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {language}
        </div>
      ) : null}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[13px] leading-relaxed text-foreground">
        <code>{children}</code>
      </pre>
    </div>
  );
}

type CalloutType = "info" | "warning" | "tip";

const calloutConfig: Record<CalloutType, { icon: typeof Info; className: string }> = {
  info: {
    icon: Info,
    className: "border-sky-500/25 bg-sky-500/8 text-sky-700 dark:text-sky-300",
  },
  warning: {
    icon: AlertTriangle,
    className: "border-amber-500/25 bg-amber-500/8 text-amber-700 dark:text-amber-300",
  },
  tip: {
    icon: Lightbulb,
    className: "border-violet/35 bg-violet-soft text-violet",
  },
};

export function Callout({
  type = "info",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const { icon: Icon, className } = calloutConfig[type];
  return (
    <div className={cn("my-6 flex gap-3 rounded-2xl border p-4", className)}>
      <Icon className="mt-0.5 size-4 shrink-0" />
      <div className="text-sm">
        {title ? <div className="mb-1 font-semibold">{title}</div> : null}
        <div className="text-foreground/85">{children}</div>
      </div>
    </div>
  );
}

export function CardGrid({ children }: { children: ReactNode }) {
  return <div className="my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function CardLink({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative block rounded-2xl border border-border bg-surface-2/50 p-5 transition-colors hover:border-violet/40 hover:bg-surface-2"
    >
      <div className="text-lg font-semibold text-foreground">{title}</div>
      {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      <ArrowRight className="absolute bottom-4 right-4 size-5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-violet" />
    </Link>
  );
}

export function Steps({ children }: { children: ReactNode }) {
  return <ol className="my-6 space-y-6 border-l border-border pl-6 [counter-reset:step]">{children}</ol>;
}

export function Step({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="relative [counter-increment:step]">
      <span className="absolute -left-[33px] flex size-6 items-center justify-center rounded-full border border-border bg-surface-2 font-mono text-xs text-foreground before:content-[counter(step)]" />
      <div className="font-semibold text-foreground">{title}</div>
      <div className="mt-2 text-muted-foreground">{children}</div>
    </li>
  );
}
