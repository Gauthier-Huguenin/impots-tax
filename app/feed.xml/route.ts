import { getAllLocalizedBlogPosts } from "@/lib/blog";
import { buildUrl } from "@/lib/seo";
import { siteConfig } from "@/lib/config";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const posts = getAllLocalizedBlogPosts();
  const items = posts
    .map((post) => {
      const url = buildUrl(post.path, post.locale);

      return `
        <item>
          <title>${escapeXml(post.metadata.title)}</title>
          <link>${escapeXml(url)}</link>
          <guid>${escapeXml(url)}</guid>
          <description>${escapeXml(post.metadata.description)}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
          <category>${escapeXml(post.metadata.category)}</category>
        </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
      <channel>
        <title>impots.tax</title>
        <link>${escapeXml(siteConfig.url)}</link>
        <description>French tax intelligence reports, sourced and satirical.</description>
        <language>fr-FR</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
