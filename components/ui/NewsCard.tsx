import Link from "next/link";
import { NewTypes } from "@/lib/types";
import { isExternalNewsItem } from "@/lib/news";

type NewsCardProps = NewTypes & {
  href: string;
  variant?: "homepage" | "archive";
};

const plainText = (content: string) =>
  content
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const NewsCard = ({
  content,
  summary,
  date,
  title,
  newsType,
  sourceName,
  sourceUrl,
  href,
  category,
  variant = "homepage",
}: NewsCardProps) => {
  const publishedAt = new Date(date);
  const formattedDate = Number.isNaN(publishedAt.getTime())
    ? ""
    : publishedAt
        .toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "UTC",
        })
        .toUpperCase();
  const description = plainText(summary || content);
  const isArchive = variant === "archive";
  const publisherLabel = isExternalNewsItem({ newsType, sourceUrl })
    ? sourceName || "External coverage"
    : "BBYDI";
  const kindLabel = category || (newsType === "external" ? "Media coverage" : "News report");

  return (
    <article className={`grid w-full gap-3 text-foreground sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-8 ${isArchive ? "border-b-0 py-5 md:py-6" : "border-b border-black/15 py-6 md:py-7"}`}>
      <p className="pt-1 text-xs font-bold tracking-[0.1em] text-muted-foreground">
        {formattedDate}
      </p>
      <div className="flex min-w-0 flex-col items-start gap-1.5">
        {publisherLabel && (
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">
            {publisherLabel}
          </p>
        )}
        <h3 className={`font-bold leading-6 ${isArchive ? "text-base" : "text-base sm:text-lg"}`}>
          <Link href={href} className="hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            {title}
          </Link>
        </h3>
        {description && (
          <p className="line-clamp-2 text-sm leading-6 text-foreground/75">
            {description}
          </p>
        )}
        {isArchive ? (
          <span className="mt-1 inline-flex rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            {kindLabel}
          </span>
        ) : (
          <Link
            href={href}
            className="mt-1 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-[0.1em] text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            Read more <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
};

export default NewsCard;
