"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { ContentItem } from "@/lib/content";
import PageHeader from "../ui/PageHeader";
import SectionTitle from "../ui/SectionTitle";
import Divider from "../ui/Divider";

const categories = ["All", "Analysis", "Opinion", "Field notes", "Explainers", "Commentary"];
const POSTS_PER_PAGE = 12;

const excerptFor = (item: ContentItem) =>
  (item.summary || item.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const dateFor = (item: ContentItem) => {
  const date = item.date || item.createdAt ? new Date(item.date || item.createdAt || "") : null;
  return date && !Number.isNaN(date.getTime())
    ? date.toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" })
    : "";
};

const readTimeFor = (item: ContentItem) => {
  const text = (item.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

function BlogCard({ item, featured = false }: { item: ContentItem; featured?: boolean }) {
  const excerpt = excerptFor(item);
  const publisher = item.publisherUser;
  return (
    <Link href={`/blog/${item.slug}`} className={`group overflow-hidden rounded-sm border bg-white transition-shadow hover:shadow-lg ${featured ? "grid md:grid-cols-2" : "flex flex-col"}`}>
      {item.image ? (
        <div className={`relative overflow-hidden bg-muted ${featured ? "min-h-64 md:min-h-80" : "aspect-[16/10]"}`}>
          <Image src={item.image} alt={item.imageAlt || item.imageCaption || item.title} fill unoptimized sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      ) : (
        <div className={`flex items-center justify-center bg-[#f0ede8] text-primary ${featured ? "min-h-64 md:min-h-80" : "aspect-[16/10]"}`}>
          <span className="text-5xl font-bold" aria-hidden="true">B</span>
        </div>
      )}
      <div className={`flex flex-col ${featured ? "justify-center p-6 sm:p-10" : "flex-1 p-5"}`}>
        <div className="w-full px-2 bg-primary/20 rounded-xs">
          <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{item.category || "Blog"}</span>
        </div>
        <h2 className={`mt-3 font-bold leading-tight text-foreground transition-colors group-hover:text-primary ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>{item.title}</h2>
        <p className={`mt-3 text-sm leading-6 text-muted-foreground ${featured ? "line-clamp-4" : "line-clamp-3"}`}>{excerpt}</p>
        <Divider className="mt-4" />
        <div className="mt-5 flex flex-col gap-2 text-xs text-muted-foreground">
          {publisher && (
            <div className="flex items-center gap-2.5">
              <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-muted">
                {publisher.avatar
                  ? <Image src={publisher.avatar} alt="" fill unoptimized sizes="40px" className="object-cover" />
                  : <span className="flex size-full items-center justify-center font-bold text-foreground" aria-hidden="true">{publisher.name.charAt(0).toUpperCase()}</span>}
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-foreground">{publisher.name}</p>
                <p>{[publisher.position, dateFor(item), item.readingTime || readTimeFor(item)].filter(Boolean).join(" · ")}</p>
              </div>
            </div>
          )}
          {!publisher && (
            <p>{[dateFor(item), item.readingTime || readTimeFor(item)].filter(Boolean).join(" · ")}</p>
          )}
        </div>
        {featured && <span className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Read the story →</span>}
      </div>
    </Link>
  );
}

export default function BlogIndex({ initialPosts = [] }: { initialPosts?: ContentItem[] }) {
  const [posts, setPosts] = useState<ContentItem[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(initialPosts.length === 0);

  useEffect(() => {
    let active = true;
    apiRequest<ContentItem[]>("/content/blog")
      .then((items) => { if (active) setPosts(items); })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load blog posts");
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const featured = posts.find((post) => post.featured) ?? posts[0];
  const filtered = useMemo(
    () => posts.filter((post) => post._id !== featured?._id && (activeCategory === "All" || post.category?.toLowerCase() === activeCategory.toLowerCase())),
    [activeCategory, featured?._id, posts],
  );
  const pageCount = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const visiblePage = Math.min(currentPage, Math.max(pageCount, 1));
  const pagePosts = filtered.slice(
    (visiblePage - 1) * POSTS_PER_PAGE,
    visiblePage * POSTS_PER_PAGE,
  );

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <PageHeader
        // topNote="Ideas, evidence & perspectives"
        header="The BBYDI Blog"
        page="Blog"
        description="Analysis and stories from the people working for inclusive governance, youth empowerment and gender equality across Nigeria."
      />
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {loading ? <p className="py-16 text-center text-sm text-muted-foreground">Loading stories...</p> : posts.length === 0 ? (
          <p className="rounded-sm border bg-white p-8 text-center text-sm text-muted-foreground">There are no published blog posts yet. Please check back soon.</p>
        ) : (
          <>
            {featured && <div className="mb-12 flex flex-col gap-5">
              <SectionTitle title="Featured" />
              <BlogCard item={featured} featured />
            </div>}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              {/* <h2 className="text-2xl font-bold">Latest stories</h2> */}
              <div className="flex flex-wrap gap-2" aria-label="Filter blog stories by category">
                {categories.map((category) => (
                  <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => { setActiveCategory(category); setCurrentPage(1); }} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${activeCategory === category ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-foreground hover:border-primary hover:text-primary"}`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {filtered.length === 0 ? <p className="rounded-sm border bg-white p-8 text-center text-sm text-muted-foreground">No stories in this category yet.</p> : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {pagePosts.map((post) => <BlogCard key={post._id} item={post} />)}
                </div>
                {pageCount > 1 && (
                  <nav
                    className="mt-8 flex flex-wrap items-center justify-between gap-4"
                    aria-label="Blog pages"
                  >
                    <p className="text-sm text-muted-foreground" aria-live="polite">
                      Showing {(visiblePage - 1) * POSTS_PER_PAGE + 1}–
                      {Math.min(visiblePage * POSTS_PER_PAGE, filtered.length)} of{" "}
                      {filtered.length} stories
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                        disabled={visiblePage === 1}
                        className="rounded-sm border bg-white px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Previous
                      </button>
                      <span className="px-2 text-sm text-muted-foreground" aria-current="page">
                        Page {visiblePage} of {pageCount}
                      </span>
                      <button
                        type="button"
                        onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}
                        disabled={visiblePage === pageCount}
                        className="rounded-sm border bg-white px-3 py-2 text-sm font-semibold text-foreground hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </nav>
                )}
              </>
            )}
          </>
        )}
      </section>
    </main>
  );
}
