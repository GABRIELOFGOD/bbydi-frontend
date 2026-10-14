"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { ContentItem } from "@/lib/content";

const categories = ["All", "Analysis", "Opinion", "Field notes", "Explainers", "Commentary"];

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
  return (
    <Link href={`/blog/${item.slug}`} className={`group overflow-hidden rounded-sm border bg-white transition-shadow hover:shadow-lg ${featured ? "grid md:grid-cols-2" : "flex flex-col"}`}>
      {item.image ? (
        <div className={`relative overflow-hidden bg-muted ${featured ? "min-h-64 md:min-h-80" : "aspect-[16/10]"}`}>
          <Image src={item.image} alt={item.imageCaption || item.title} fill sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"} className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      ) : (
        <div className={`flex items-center justify-center bg-[#f0ede8] text-primary ${featured ? "min-h-64 md:min-h-80" : "aspect-[16/10]"}`}>
          <span className="text-5xl font-bold" aria-hidden="true">B</span>
        </div>
      )}
      <div className={`flex flex-col ${featured ? "justify-center p-6 sm:p-10" : "flex-1 p-5"}`}>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{item.category || "Blog"}</span>
        <h2 className={`mt-3 font-bold leading-tight text-foreground transition-colors group-hover:text-primary ${featured ? "text-2xl sm:text-3xl" : "text-lg"}`}>{item.title}</h2>
        <p className={`mt-3 text-sm leading-6 text-muted-foreground ${featured ? "line-clamp-4" : "line-clamp-3"}`}>{excerpt}</p>
        <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-muted-foreground">
          {item.postedBy?.name && <span className="font-semibold text-foreground">{item.postedBy.name}</span>}
          {item.postedBy?.position && <span>· {item.postedBy.position}</span>}
          {dateFor(item) && <span>· {dateFor(item)}</span>}
          <span>· {readTimeFor(item)}</span>
        </div>
        {featured && <span className="mt-6 text-xs font-bold uppercase tracking-wider text-primary">Read the story →</span>}
      </div>
    </Link>
  );
}

export default function BlogIndex({ initialPosts = [] }: { initialPosts?: ContentItem[] }) {
  const [posts, setPosts] = useState<ContentItem[]>(initialPosts);
  const [activeCategory, setActiveCategory] = useState("All");
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

  return (
    <main className="min-h-screen bg-[#faf9f7]">
      <header className="bg-[#191919] px-5 py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-primary">Ideas, evidence &amp; perspectives</p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-6xl">The BBYDI Blog</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">Analysis and stories from the people working for inclusive governance, youth empowerment and gender equality across Nigeria.</p>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-5 py-10 sm:py-14">
        {loading ? <p className="py-16 text-center text-sm text-muted-foreground">Loading stories...</p> : posts.length === 0 ? (
          <p className="rounded-sm border bg-white p-8 text-center text-sm text-muted-foreground">There are no published blog posts yet. Please check back soon.</p>
        ) : (
          <>
            {featured && <div className="mb-12">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Featured story</p>
              <BlogCard item={featured} featured />
            </div>}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-2xl font-bold">Latest stories</h2>
              <div className="flex flex-wrap gap-2" aria-label="Filter blog stories by category">
                {categories.map((category) => (
                  <button key={category} type="button" aria-pressed={activeCategory === category} onClick={() => setActiveCategory(category)} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${activeCategory === category ? "border-primary bg-primary text-white" : "border-gray-300 bg-white text-foreground hover:border-primary hover:text-primary"}`}>
                    {category}
                  </button>
                ))}
              </div>
            </div>
            {filtered.length === 0 ? <p className="rounded-sm border bg-white p-8 text-center text-sm text-muted-foreground">No stories in this category yet.</p> : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post) => <BlogCard key={post._id} item={post} />)}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
