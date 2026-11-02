"use client";

import { useMemo, useState } from "react";
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

const ARTICLES_PER_PAGE = 15;
const HOMEPAGE_ARTICLES = 4;

const mapNews = (item: ContentItem): NewTypes => ({
  id: item._id,
  slug: item.slug,
  date: item.date ?? "",
  title: item.title,
  content: item.description ?? "",
  category: item.category,
  summary: item.summary,
  newsType: item.newsType ?? "internal",
  sourceName: item.sourceName,
  sourceUrl: item.sourceUrl,
  publisher: item.publisher,
  publisherUser: item.publisherUser,
});

type NewsRoomProps = {
  variant?: "homepage" | "archive";
};

const getNewsTimestamp = (item: NewTypes) => {
  const timestamp = new Date(item.date).getTime();
  return Number.isNaN(timestamp) ? 0 : timestamp;
};

const getNewsOutlet = (item: NewTypes) =>
  item.newsType === "external" || item.sourceUrl
    ? item.sourceName || item.publisher || "External coverage"
    : item.publisher || "BBYDI";

const getNewsYear = (item: NewTypes) => {
  const timestamp = getNewsTimestamp(item);
  return timestamp ? String(new Date(timestamp).getUTCFullYear()) : "";
};

const NewsRoom = ({ variant = "homepage" }: NewsRoomProps) => {
  const { items, loading } = usePublicContent("news", News, mapNews);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [year, setYear] = useState("all");
  const [outlet, setOutlet] = useState("all");
  const [kind, setKind] = useState("all");
  const [sort, setSort] = useState("newest");
  const isArchive = variant === "archive";
  const sortedNews = useMemo(
    () => [...items].sort((a, b) => getNewsTimestamp(b) - getNewsTimestamp(a)),
    [items],
  );
  const years = useMemo(
    () => [...new Set(sortedNews.map(getNewsYear).filter(Boolean))].sort((a, b) => b.localeCompare(a)),
    [sortedNews],
  );
  const outlets = useMemo(
    () => [...new Set(sortedNews.map(getNewsOutlet))].sort((a, b) => a.localeCompare(b)),
    [sortedNews],
  );
  const filteredNews = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase();
    const filtered = sortedNews.filter((entry) => {
      const matchesQuery =
        !normalizedQuery ||
        [
          entry.title,
          entry.summary,
          entry.content,
          entry.category,
          getNewsOutlet(entry),
          entry.publisherUser?.name,
        ]
          .filter(Boolean)
          .some((value) => value!.toLocaleLowerCase().includes(normalizedQuery));
      const matchesYear = year === "all" || getNewsYear(entry) === year;
      const matchesOutlet = outlet === "all" || getNewsOutlet(entry) === outlet;
      const entryKind =
        entry.newsType === "external" || entry.sourceUrl ? "external" : "internal";
      const matchesKind = kind === "all" || entryKind === kind;
      return matchesQuery && matchesYear && matchesOutlet && matchesKind;
    });

    if (sort === "oldest") return filtered.sort((a, b) => getNewsTimestamp(a) - getNewsTimestamp(b));
    if (sort === "title") return filtered.sort((a, b) => a.title.localeCompare(b.title));
    return filtered;
  }, [kind, outlet, query, sort, sortedNews, year]);
  const pageCount = Math.max(1, Math.ceil(filteredNews.length / ARTICLES_PER_PAGE));
  const currentPage = Math.min(page, pageCount);
  const visibleNews = isArchive
    ? filteredNews.slice((currentPage - 1) * ARTICLES_PER_PAGE, currentPage * ARTICLES_PER_PAGE)
    : sortedNews.slice(0, HOMEPAGE_ARTICLES);
  const firstResult = filteredNews.length ? (currentPage - 1) * ARTICLES_PER_PAGE + 1 : 0;
  const lastResult = Math.min(currentPage * ARTICLES_PER_PAGE, filteredNews.length);
  const resetFilters = () => {
    setQuery("");
    setYear("all");
    setOutlet("all");
    setKind("all");
    setSort("newest");
    setPage(1);
  };

  return (
    <section id={isArchive ? undefined : "news"} className="w-full bg-white">
      <Container className={`flex flex-col ${isArchive ? "gap-6 py-12 md:py-16" : "gap-5 py-12 md:py-16"}`}>
        {!isArchive && <SectionTitle title="Newsroom" />}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          {!isArchive && <ColumnTitle text="Latest from BBYDI" className="my-auto" />}
          {!isArchive && (
            <Link
              href="/news"
              className="inline-flex h-12 items-center justify-center self-start rounded-sm border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:self-auto"
            >
              All news
            </Link>
          )}
        </div>

        {isArchive && (
          <div className="flex flex-col gap-4">
            <SectionTitle title="Newsroom" />
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                Search the newsroom
                <input
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Headline, outlet, topic or author"
                  className="h-[38px] w-full rounded-md border border-black/15 px-3 text-sm font-normal normal-case tracking-normal text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
                <label className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Year
                  <select
                    value={year}
                    onChange={(event) => {
                      setYear(event.target.value);
                      setPage(1);
                    }}
                    className="h-[42px] rounded-md border border-black/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">All years</option>
                    {years.map((itemYear) => (
                      <option key={itemYear} value={itemYear}>{itemYear}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Outlet
                  <select
                    value={outlet}
                    onChange={(event) => {
                      setOutlet(event.target.value);
                      setPage(1);
                    }}
                    className="h-[42px] rounded-md border border-black/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">All outlets</option>
                    {outlets.map((itemOutlet) => (
                      <option key={itemOutlet} value={itemOutlet}>{itemOutlet}</option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Kind
                  <select
                    value={kind}
                    onChange={(event) => {
                      setKind(event.target.value);
                      setPage(1);
                    }}
                    className="h-[42px] rounded-md border border-black/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="all">All kinds</option>
                    <option value="internal">BBYDI news</option>
                    <option value="external">Media coverage</option>
                  </select>
                </label>
                <label className="flex flex-col gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  Sort
                  <select
                    value={sort}
                    onChange={(event) => {
                      setSort(event.target.value);
                      setPage(1);
                    }}
                    className="h-[42px] rounded-md border border-black/15 bg-white px-3 text-sm font-normal normal-case tracking-normal text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="title">Headline A–Z</option>
                  </select>
                </label>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-auto h-[42px] rounded-sm border border-primary px-4 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Reset
                </button>
              </div>
              <p className="text-sm text-muted-foreground" aria-live="polite">
                Showing {firstResult}–{lastResult} of {filteredNews.length} entries
              </p>
            </div>
          </div>
        )}

        {loading && sortedNews.length === 0 ? (
          <p className="py-6 text-sm text-muted-foreground" role="status">
            Loading newsroom...
          </p>
        ) : visibleNews.length > 0 ? (
          <div className="flex flex-col">
            {visibleNews.map((entry) => (
              <NewsCard
                key={entry.id}
                {...entry}
                href={`/news/${entry.slug || createNewsSlug(entry.title)}`}
                variant={isArchive ? "archive" : "homepage"}
              />
            ))}
          </div>
        ) : (
          <p className="py-6 text-sm text-muted-foreground">
            No newsroom articles have been published yet.
          </p>
        )}

        {isArchive && pageCount > 1 && (
          <nav
            aria-label="Newsroom pagination"
            className="flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-5"
          >
            <p className="text-sm text-muted-foreground" aria-live="polite">
              Page {currentPage} of {pageCount}
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="rounded-sm border border-black/15 px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage(Math.min(pageCount, currentPage + 1))}
                disabled={currentPage === pageCount}
                className="rounded-sm border border-black/15 px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </nav>
        )}
      </Container>
    </section>
  );
};

export default NewsRoom;
