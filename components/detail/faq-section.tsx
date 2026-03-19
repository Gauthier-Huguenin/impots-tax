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
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group rounded border border-gray-800 bg-[#0f1218]"
          >
            <summary className="cursor-pointer px-5 py-4 font-mono text-sm font-medium text-gray-200 transition-colors hover:text-info">
              <span className="text-info mr-2">▸</span>
              {faq.question}
            </summary>
            <div className="border-t border-gray-800 px-5 py-4 font-mono text-sm leading-relaxed text-slate-300">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
