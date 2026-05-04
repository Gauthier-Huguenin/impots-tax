import { ImageResponse } from "next/og";
import { locales, type Locale } from "@/lib/i18n/config";
import {
  isOgImageSlug,
  OG_IMAGE_SIZE,
  OgImageTemplate,
} from "@/lib/og-images";

export const contentType = "image/png";

interface RouteContext {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function GET(_request: Request, { params }: RouteContext) {
  const { locale, slug } = await params;

  if (!locales.includes(locale as Locale) || !isOgImageSlug(slug)) {
    return new Response("Not found", { status: 404 });
  }

  return new ImageResponse(
    <OgImageTemplate locale={locale as Locale} slug={slug} />,
    OG_IMAGE_SIZE,
  );
}
