export function createNewsSlug(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 100)
    .replace(/-+$/g, "") || "news";
}

export function safeExternalNewsUrl(value?: string): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

export function isExternalNewsItem(item: {
  newsType?: "internal" | "external";
  sourceUrl?: string;
}): boolean {
  return item.newsType === "external" || (!item.newsType && Boolean(item.sourceUrl));
}
