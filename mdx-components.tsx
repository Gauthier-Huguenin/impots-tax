import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1
        className="mb-5 font-display text-3xl font-black uppercase tracking-wider text-blanc sm:text-4xl"
        {...props}
      />
    ),
    h2: (props) => (
      <h2
        className="mb-4 mt-10 border-l-2 border-danger pl-3 font-display text-xl font-bold uppercase tracking-wider text-blanc"
        {...props}
      />
    ),
    h3: (props) => (
      <h3
        className="mb-3 mt-8 font-display text-lg font-bold uppercase tracking-wider text-blanc"
        {...props}
      />
    ),
    p: (props) => (
      <p className="mb-5 font-mono text-sm leading-7 text-slate-300" {...props} />
    ),
    a: (props) => (
      <a
        className="text-info underline decoration-info/40 underline-offset-4 transition-colors hover:text-white"
        {...props}
      />
    ),
    ul: (props) => (
      <ul
        className="mb-6 list-disc space-y-2 pl-5 font-mono text-sm leading-7 text-slate-300"
        {...props}
      />
    ),
    li: (props) => <li className="pl-1" {...props} />,
    table: (props) => (
      <div className="mb-8 overflow-x-auto rounded border border-slate-700">
        <table className="w-full min-w-[560px] border-collapse font-mono text-sm" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-panel-light text-blanc" {...props} />,
    th: (props) => (
      <th
        className="border-b border-slate-700 px-4 py-3 text-left text-xs uppercase tracking-wider"
        {...props}
      />
    ),
    td: (props) => (
      <td className="border-b border-slate-800 px-4 py-3 text-slate-300" {...props} />
    ),
    strong: (props) => <strong className="font-bold text-blanc" {...props} />,
    code: (props) => (
      <code
        className="rounded border border-slate-700 bg-panel-light px-1.5 py-0.5 font-mono text-xs text-info"
        {...props}
      />
    ),
    ...components,
  };
}
