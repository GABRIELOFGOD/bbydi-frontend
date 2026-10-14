import { publicPageUrl } from "@/lib/publicContent";

export const dynamic = "force-dynamic";

export function GET() {
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /dashboard/",
    "Disallow: /login",
    "Disallow: /auth/",
    `Sitemap: ${publicPageUrl("/sitemap.xml")}`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
