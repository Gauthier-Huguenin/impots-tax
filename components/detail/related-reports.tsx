"use client";

import { Link } from "@/lib/navigation";

export interface RelatedReport {
  href: string;
  title: string;
  description: string;
}

interface RelatedReportsProps {
  title: string;
  reports: RelatedReport[];
}

export function RelatedReports({ title, reports }: RelatedReportsProps) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
        {title}
      </h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {reports.map((report) => (
          <Link
            key={report.href}
            href={report.href}
            className="rounded border border-gray-800 bg-panel p-4 transition-colors hover:border-info/40 hover:bg-info/5"
          >
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-blanc">
              {report.title}
            </h3>
            <p className="mt-2 font-mono text-xs leading-relaxed text-slate-300">
              {report.description}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
