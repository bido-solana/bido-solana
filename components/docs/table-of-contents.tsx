"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Heading = {
  id: string;
  text: string;
  level: 2 | 3;
};

export function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-toc]"));
    const frame = window.requestAnimationFrame(() => {
      setHeadings(
        nodes.map((node) => ({
          id: node.id,
          text: node.textContent ?? "",
          level: node.dataset.toc === "h3" ? 3 : 2,
        })),
      );
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  if (!headings.length) {
    return null;
  }

  return (
    <aside className="sticky top-24 hidden h-[calc(100vh-7rem)] w-56 shrink-0 overflow-y-auto pl-4 xl:block">
      <div className="mb-3 text-sm font-semibold text-foreground">On this page</div>
      <ul className="space-y-1.5 border-l border-border">
        {headings.map((heading) => (
          <li key={heading.id} className={cn(heading.level === 3 && "pl-3")}>
            <a
              href={`#${heading.id}`}
              className={cn(
                "-ml-px block border-l border-transparent pl-3 text-sm transition-colors",
                activeId === heading.id
                  ? "border-violet text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
