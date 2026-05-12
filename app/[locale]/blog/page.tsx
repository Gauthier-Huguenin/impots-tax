import NextLink from "next/link";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/detail/structured-data";
import { buildBlogJsonLd, formatBlogDate, getAllBlogPosts } from "@/lib/blog";
import { buildSeoMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { localePath } from "@/lib/url";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });

  return buildSeoMetadata({
    title: t("metaTitle"),
    description: t("metaDescription"),
    locale: locale as Locale,
    path: "/blog",
  });
}

export default async function BlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const t = await getTranslations({ locale, namespace: "blog" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const posts = getAllBlogPosts(typedLocale);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={t("title")}
        pagePath="/blog"
        homeLabel={td("backToDashboard")}
        description={t("metaDescription")}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogJsonLd(typedLocale, posts)) }}
      />

      <div className="sticky top-0 z-50">
        <div className="flex h-1">
          <div className="flex-1 bg-tricolore-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-tricolore-red" />
        </div>
        <Header />
      </div>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        <section className="mb-8 border border-slate-800 bg-panel p-5">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-danger">
            {t("subtitle")}
          </div>
          <h1 className="font-display text-3xl font-black uppercase tracking-wider text-blanc sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-4 max-w-3xl font-mono text-sm leading-7 text-slate-300">
            {t("intro")}
          </p>
        </section>

        <section>
          <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-wider text-blanc">
            {t("latest")}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.metadata.slug}
                className="flex min-h-[280px] flex-col border border-slate-800 bg-panel p-5 transition-colors hover:border-info/40 hover:bg-info/5"
              >
                <div className="mb-4 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
                  <span>{post.metadata.category}</span>
                  <span>{t("readingTime", { time: post.metadata.readingTime })}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-wider text-blanc">
                  <NextLink href={localePath(post.path, typedLocale)}>{post.metadata.title}</NextLink>
                </h3>
                <p className="mt-4 flex-1 font-mono text-sm leading-7 text-slate-300">
                  {post.metadata.description}
                </p>
                <div className="mt-5 border-t border-slate-800 pt-4">
                  <p className="font-mono text-xs text-muted">
                    {t("published", {
                      date: formatBlogDate(post.metadata.publishedAt, typedLocale),
                    })}
                  </p>
                  <NextLink
                    href={localePath(post.path, typedLocale)}
                    className="mt-3 inline-flex font-mono text-xs font-semibold uppercase tracking-wider text-info transition-colors hover:text-white"
                  >
                    {t("readArticle")} ▸
                  </NextLink>
                </div>
              </article>
            ))}
          </div>
        </section>
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
