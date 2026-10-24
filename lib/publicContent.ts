import type { ContentKind } from "@/lib/types";

export type PublicContentItem = {
  _id: string;
  slug?: string;
  kind: ContentKind;
  title: string;
  description?: string;
  summary?: string;
  category?: string;
  theme?: string;
  language?: string;
  series?: string;
  type?: string;
  featured?: boolean;
  image?: string;
  imageCaption?: string;
  imageAlt?: string;
  date?: string;
  createdAt?: string;
  publisherUser?: { _id?: string; name: string; position?: string; avatar?: string };
  publisher?: string;
  authorRole?: string;
  readingTime?: string;
  wordCount?: number;
  tags?: string[];
  sourceUrl?: string;
  document?: string;
  link?: string;
  approved: boolean;
};

export type PublicStaffProfile = {
  _id: string;
  name: string;
  position: string;
  image?: string;
  category: "leadership" | "staff" | "volunteer";
  bio?: string;
};

export type PublicStaffProfileResponse = {
  profile: PublicStaffProfile;
  posts: PublicContentItem[];
};

export function publicPageUrl(path: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || "https://thebrainbuilders.org";
  const normalizedSiteUrl = siteUrl.startsWith("http") ? siteUrl : `https://${siteUrl}`;
  return new URL(path, normalizedSiteUrl).toString();
}

export async function fetchPublicApi<T>(path: string): Promise<T | null> {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (!apiUrl) throw new Error("NEXT_PUBLIC_BASE_URL is required to load public SEO content");
  const response = await fetch(`${apiUrl}${path}`, { next: { revalidate: 300 } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Public content request failed with status ${response.status}`);
  return response.json() as Promise<T>;
}

export function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
