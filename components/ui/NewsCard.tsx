import { NewTypes } from "@/lib/types";
import Image from "next/image";

const NewsCard = ({ content, date, title, publisher, publisherUser }: NewTypes) => {
  const publishedAt = new Date(date);
  const formattedDate = Number.isNaN(publishedAt.getTime())
    ? ""
    : publishedAt.toLocaleDateString("en-NG", { dateStyle: "medium", timeZone: "UTC" });
  return (
    <article className="w-full py-5 border-b border-muted flex flex-col md:flex-row gap-5 md:gap-10 text-foreground hover:text-primary">
      <p className="text-muted-foreground text-xs pt-2 font-semibold">{formattedDate}</p>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        {publisherUser ? (
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <div className="relative size-9 shrink-0 overflow-hidden rounded-full bg-muted">
              {publisherUser.avatar
                ? <Image src={publisherUser.avatar} alt="" fill unoptimized sizes="36px" className="object-cover" />
                : <span className="flex size-full items-center justify-center font-bold text-foreground" aria-hidden="true">{publisherUser.name.charAt(0).toUpperCase()}</span>}
            </div>
            <div>
              <p className="font-semibold text-foreground">{publisherUser.name}</p>
              {publisherUser.position && <p>{publisherUser.position}</p>}
            </div>
          </div>
        ) : publisher && <p className="text-xs font-semibold text-muted-foreground">{publisher}</p>}
        <p className="text-black/80 text-sm">{content.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}</p>
      </div>
    </article>
  )
}

export default NewsCard;