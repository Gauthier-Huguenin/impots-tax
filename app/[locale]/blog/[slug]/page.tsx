import NextLink from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { StructuredData } from "@/components/detail/structured-data";
import {
  buildBlogPostingJsonLd,
  formatBlogDate,
  getBlogPost,
  getBlogSlugs,
  getRelatedModules,
} from "@/lib/blog";
import { buildArticleSeoMetadata } from "@/lib/seo";
import type { Locale } from "@/lib/i18n/config";
import { locales } from "@/lib/i18n/config";
import { localePath } from "@/lib/url";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getBlogSlugs().map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, slug } = await params;
  const post = getBlogPost(locale as Locale, slug);

  if (!post) {
    return {};
  }

  return buildArticleSeoMetadata({
    title: `${post.metadata.title} | impots.tax`,
    description: post.metadata.description,
    locale: locale as Locale,
    path: post.path,
    publishedTime: post.metadata.publishedAt,
    modifiedTime: post.metadata.updatedAt,
    tags: post.metadata.tags,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const typedLocale = locale as Locale;
  const post = getBlogPost(typedLocale, slug);

  if (!post) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "blog" });
  const td = await getTranslations({ locale, namespace: "detail" });
  const relatedModules = getRelatedModules(typedLocale, post.metadata.relatedModules);
  const Content = post.Content;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <StructuredData
        locale={typedLocale}
        pageTitle={post.metadata.title}
        pagePath={post.path}
        homeLabel={td("backToDashboard")}
        description={post.metadata.description}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBlogPostingJsonLd(post)) }}
      />

      <div className="sticky top-0 z-50">
        <div className="flex h-1">
          <div className="flex-1 bg-tricolore-blue" />
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-tricolore-red" />
        </div>
        <Header />
      </div>

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">
        <NextLink
          href={localePath("/blog", typedLocale)}
          className="mb-6 inline-flex font-mono text-xs uppercase tracking-wider text-info transition-colors hover:text-white"
        >
          ‹ {t("backToBlog")}
        </NextLink>

        <article className="border border-slate-800 bg-panel p-5 sm:p-7">
          <header className="mb-8 border-b border-slate-800 pb-6">
            <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-muted">
              <span>{post.metadata.category}</span>
              <span>{t("readingTime", { time: post.metadata.readingTime })}</span>
              <span>
                {t("updated", {
                  date: formatBlogDate(post.metadata.updatedAt, typedLocale),
                })}
              </span>
            </div>
          </header>

          <Content />

          <footer className="mt-10 border-t border-slate-800 pt-6">
            <section className="mb-8">
              <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-blanc">
                {t("sources")}
              </h2>
              <ul className="space-y-2 font-mono text-xs leading-6 text-slate-300">
                {post.metadata.sources.map((source) => (
                  <li key={source} className="border-l border-slate-700 pl-3">
                    {source}
                  </li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="mb-3 font-display text-lg font-bold uppercase tracking-wider text-blanc">
                {t("relatedModules")}
              </h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {relatedModules.map((module) => (
                  <NextLink
                    key={module.slug}
                    href={localePath(`/${module.slug}`, typedLocale)}
                    className="border border-slate-800 bg-background p-4 transition-colors hover:border-info/40 hover:bg-info/5"
                  >
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-blanc">
                      {module.title}
                    </h3>
                    <p className="mt-2 font-mono text-xs leading-6 text-slate-300">
                      {module.description}
                    </p>
                  </NextLink>
                ))}
              </div>
            </section>
          </footer>
        </article>
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
