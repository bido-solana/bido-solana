import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/components/providers/i18n-provider";

export function FaqsSection({ variant = "sponsors" }: { variant?: "sponsors" | "devs" }) {
  const { messages } = useI18n();
  const faq = variant === "devs" ? messages.devs.faq : messages.faq;
  const questions = faq.questions;

  return (
    <section className="border-t border-border/60 py-32">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="space-y-5">
            <div className="inline-flex items-center rounded-full border border-violet/25 bg-violet-soft/35 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-violet">
              {faq.badge}
            </div>
            <div className="space-y-3">
              <h2 className="max-w-xl text-4xl font-bold tracking-tight sm:text-5xl">
                {faq.title}
              </h2>
              <p className="max-w-2xl text-lg text-muted-foreground">
                {faq.description}
              </p>
            </div>
            <p className="text-sm text-muted-foreground">
              {faq.contactLead}
              <a
                href="mailto:hello@bido.ai"
                className="text-violet transition-colors hover:text-foreground"
              >
                hello@usebido.ai
              </a>
            </p>
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full rounded-2xl border border-border bg-surface-2/80 p-2 shadow-2xl shadow-black/40"
            defaultValue="item-1"
          >
            {questions.map((item) => (
              <AccordionItem
                value={item.id}
                key={item.id}
                className="rounded-xl border-x-0 border-b border-border/80 bg-transparent px-2 last:border-b-0"
              >
                <AccordionTrigger className="px-4 py-5 text-left text-base font-semibold leading-6 text-foreground hover:no-underline">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 text-base leading-7 text-muted-foreground">
                  {item.content}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
