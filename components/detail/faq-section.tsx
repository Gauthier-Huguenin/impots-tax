import type { FaqItem } from "@/lib/seo";

interface FaqSectionProps {
  title: string;
  faqs: FaqItem[];
}

export function FaqSection({ title, faqs }: FaqSectionProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-6 font-display text-xl font-bold uppercase tracking-wider text-gray-100">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded border border-gray-800 bg-panel transition-colors open:border-blanc/20"
          >
            <summary className="flex cursor-pointer items-start gap-3 px-5 py-4 font-mono text-sm font-medium text-gray-200 transition-colors hover:text-blanc [&::-webkit-details-marker]:hidden">
              <svg
                className="mt-0.5 h-4 w-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-90"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M6 4l4 4-4 4" />
              </svg>
              {faq.question}
            </summary>
            <div className="border-t border-gray-800 px-5 py-4 pl-12 font-mono text-sm leading-relaxed text-slate-300">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
