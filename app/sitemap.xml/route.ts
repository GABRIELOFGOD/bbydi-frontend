import { fetchPublicApi, PublicContentItem, PublicStaffProfile, publicPageUrl } from "@/lib/publicContent";

export const dynamic = "force-dynamic";

const staticPaths = [
  "/",
  "/about",
  "/accessibility",
  "/blog",
  "/news",
  "/publications",
  "/opportunities",
  "/our-expertise",
  "/partner-with-us",
  "/programs",
  "/projects",
];

type SitemapEntry = { loc: string; lastmod?: string };

export async function GET() {
  const origin = new URL(publicPageUrl("/")).origin;
  const [staffResult, blogResult, newsResult, publicationResult, reportResult] = await Promise.allSettled([
    fetchPublicApi<PublicStaffProfile[]>("/staff/profiles"),
    fetchPublicApi<PublicContentItem[]>("/content/blog"),
    fetchPublicApi<PublicContentItem[]>("/content/news"),
    fetchPublicApi<PublicContentItem[]>("/content/publication"),
    fetchPublicApi<PublicContentItem[]>("/content/report"),
  ]);
  const dynamicEntries: SitemapEntry[] = [];

  if (staffResult.status === "fulfilled") {
    for (const profile of staffResult.value ?? []) {
      dynamicEntries.push({ loc: `${origin}/about/team/${encodeURIComponent(profile._id)}` });
    }
  } else {
    console.error("Could not include staff profiles in sitemap", staffResult.reason);
  }
  for (const [kind, result] of [["blog", blogResult], ["news", newsResult]] as const) {
    if (result.status !== "fulfilled") {
      console.error(`Could not include ${kind} content in sitemap`, result.reason);
      continue;
    }
    for (const [kind, result] of [["publication", publicationResult], ["report", reportResult]] as const) {
      if (result.status !== "fulfilled") {
        console.error(`Could not include ${kind} content in sitemap`, result.reason);
        continue;
      }
      for (const item of result.value ?? []) {
        if (!item.slug) continue;
        const lastmod = item.date || item.createdAt;
        dynamicEntries.push({
          loc: `${origin}/publications/${encodeURIComponent(item.slug)}`,
          ...(lastmod && !Number.isNaN(new Date(lastmod).getTime()) ? { lastmod: new Date(lastmod).toISOString() } : {}),
        });
      }
    }
    for (const item of result.value ?? []) {
      const slug = item.slug || (kind === "news" ? item._id : undefined);
      if (!slug) continue;
      const loc = kind === "blog"
        ? `${origin}/blog/${encodeURIComponent(slug)}`
        : `${origin}/news/${encodeURIComponent(slug)}`;
      const lastmod = item.date || item.createdAt;
      dynamicEntries.push({
        loc,
        ...(lastmod && !Number.isNaN(new Date(lastmod).getTime()) ? { lastmod: new Date(lastmod).toISOString() } : {}),
      });
    }
  }

  const entries: SitemapEntry[] = [
    ...staticPaths.map((path) => ({ loc: `${origin}${path}` })),
    ...dynamicEntries,
  ];
  const xmlEntries = entries.map(({ loc, lastmod }) =>
    `<url><loc>${loc.replace(/&/g, "&amp;")}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
  ).join("");
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlEntries}</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
