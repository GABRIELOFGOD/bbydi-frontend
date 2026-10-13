import { NewTypes } from "@/lib/types";

const NewsCard = ({ content, date, title, publisher }: NewTypes) => {
  const publishedAt = new Date(date);
  const formattedDate = Number.isNaN(publishedAt.getTime())
    ? ""
    : publishedAt.toLocaleDateString("en-NG", { dateStyle: "medium", timeZone: "UTC" });

  return (
    <article className="w-full py-5 border-b border-muted flex flex-col md:flex-row gap-5 md:gap-10 text-foreground hover:text-primary">
      <p className="text-muted-foreground text-xs pt-2 font-semibold">{formattedDate}</p>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {publisher && <p className="text-xs font-semibold text-muted-foreground">{publisher}</p>}
        <p className="text-black/80 text-sm">{content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}</p>
      </div>
    </article>
  )
}

export default NewsCard;