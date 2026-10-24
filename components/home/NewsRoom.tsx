"use client";

import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import { News } from "@/lib/constants";
import NewsCard from "../ui/NewsCard";
import Link from "next/link";
import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import { NewTypes } from "@/lib/types";
import { createNewsSlug } from "@/lib/news";

const mapNews = (item: ContentItem): NewTypes => ({
  id: item._id,
  slug: item.slug,
  date: item.date ?? "",
  title: item.title,
  content: item.description ?? "",
  publisher: item.publisher,
  publisherUser: item.publisherUser,
});

const NewsRoom = () => {
  const { items: news } = usePublicContent("news", News, mapNews);

  return (
    <Container className="flex flex-col gap-5 py-20">
      <SectionTitle title="NewsRoom" />
      <div id="news" className="flex justify-between">
        <ColumnTitle text="Latest from BBYDI" className="my-auto" />
      </div>
      <div className="flex flex-col gap-2">
        {news.map((entry) => (
          <Link key={entry.id} href={`/news/${entry.slug || createNewsSlug(entry.title)}`} className="w-full rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            <NewsCard {...entry} />
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default NewsRoom;