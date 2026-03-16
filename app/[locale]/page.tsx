import { getTranslations } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "home" });

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="font-mono text-4xl font-bold tracking-tight text-cyan-400">
        {t("title")}
      </h1>
    </main>
  );
}
