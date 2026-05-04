"use client";

interface QuickAnswerProps {
  title: string;
  answer: string;
}

export function QuickAnswer({ title, answer }: QuickAnswerProps) {
  return (
    <section className="mb-10 rounded border border-info/30 bg-info/5 p-5">
      <p className="font-mono text-xs font-bold uppercase tracking-wider text-info">
        {title}
      </p>
      <p className="mt-3 font-mono text-sm leading-relaxed text-blanc">
        {answer}
      </p>
    </section>
  );
}
