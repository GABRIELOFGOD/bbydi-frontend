"use client";

import { cn } from "@/lib/utils";
import Container from "../Container";
import { Button } from "../ui/button";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import { News } from "@/lib/constants";
import NewsCard from "../ui/NewsCard";
import Link from "next/link";
import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import { NewTypes } from "@/lib/types";

const mapNews = (item: ContentItem): NewTypes => ({
  id: item._id,
  date: item.date ?? "",
  title: item.title,
  content: item.description ?? "",
  publisher: item.publisher,
});

const NewsRoom = () => {
  const { items: news } = usePublicContent("news", News, mapNews);

  return (
    <Container className="flex flex-col gap-5 py-20">
      <SectionTitle title="NewsRoom" />
      <div className="flex justify-between">
        <ColumnTitle text="Latest from BBYDI" className="my-auto" />
        <Button className={cn("w-fit my-auto mt-5 p-6 rounded bg-transparent hover:bg-primary/10 border-2 border-primary text-primary font-bold")}>All news</Button>
      </div>
      <div className="flex flex-col gap-2">
        {news.map((entry) => (
          <Link key={entry.id} href="/media" className="w-full">
            <NewsCard {...entry} />
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default NewsRoom;