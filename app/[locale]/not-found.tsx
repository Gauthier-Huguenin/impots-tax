import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="sticky top-0 z-50">
        <div className="flex h-1">
          <div className="flex-1 bg-tricolore-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-tricolore-red" />
        </div>
        <Header />
      </div>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center px-4 py-16 text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-danger/60">
          ERREUR 404 — PAGE NON TROUVÉE
        </p>
        <h1 className="mt-4 font-display text-7xl font-bold tracking-wider text-danger md:text-9xl">
          404
        </h1>
        <p className="mt-6 max-w-md font-mono text-lg text-gray-400">
          Cette page a été prélevée à la source. Il n&apos;en reste plus rien.
        </p>
        <p className="mt-2 font-mono text-sm text-gray-600">
          This page has been taxed out of existence.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:gap-6">
          <Link
            href="/"
            className="border border-info/30 bg-info/10 px-6 py-3 font-mono text-sm uppercase tracking-wider text-info transition-colors hover:bg-info/20"
          >
            Retour au QG / Back to HQ
          </Link>
          <Link
            href="/comparison"
            className="border border-gray-700 px-6 py-3 font-mono text-sm uppercase tracking-wider text-gray-400 transition-colors hover:border-gray-500 hover:text-gray-200"
          >
            Comparaison OCDE
          </Link>
        </div>
      </main>

      <Footer />

      <div className="flex h-1">
        <div className="flex-1 bg-tricolore-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-tricolore-red" />
      </div>
    </div>
  );
}
