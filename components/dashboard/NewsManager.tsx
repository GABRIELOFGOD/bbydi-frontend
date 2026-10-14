"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { ContentItem } from "@/lib/content";
import { useUser } from "@/providers/userProvider";
import { toast } from "sonner";

export default function NewsManager({ kind = "news" }: { kind?: "news" | "blog" }) {
  const { user, loading: userLoading } = useUser();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await apiRequest<ContentItem[]>(`/content/${kind}/all`));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load news");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => {
    if (!user?._id) return;
    let active = true;
    const load = async () => {
      try {
        const result = await apiRequest<ContentItem[]>(`/content/${kind}/all`);
        if (active) setItems(result);
      } catch (error) {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load news");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [kind, user?._id]);

  const togglePublished = async (item: ContentItem) => {
    try {
      await apiRequest(`/content/${kind}/${item._id}/approval`, {
        method: "PATCH",
        body: { approved: !item.approved },
      });
      toast.success(item.approved ? `${kind === "blog" ? "Blog post" : "News"} unpublished` : `${kind === "blog" ? "Blog post" : "News"} published`);
      await loadNews();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update news");
    }
  };

  const deleteNews = async (item: ContentItem) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await apiRequest(`/content/${kind}/${item._id}`, { method: "DELETE" });
      toast.success(`${kind === "blog" ? "Blog post" : "News"} deleted`);
      await loadNews();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete news");
    }
  };

  if (userLoading || loading) {
    return <p className="text-sm text-muted-foreground">Loading {kind === "blog" ? "blog" : "newsroom"}...</p>;
  }
  if (!user) {
    return <p className="rounded border p-5 text-sm text-muted-foreground">Please sign in to manage your articles.</p>;
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">{kind === "blog" ? "Blog" : "Newsroom"}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{isAdmin ? `Write, preview, publish, and manage ${kind === "blog" ? "blog posts" : "newsroom articles"}.` : `Write and manage your own ${kind === "blog" ? "blog posts" : "newsroom articles"}.`}</p>
        </div>
        <Link href={`/dashboard/${kind}/new`} className="rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
          {kind === "blog" ? "Write a post" : "Write an article"}
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="rounded border p-6 text-sm text-muted-foreground">No {kind === "blog" ? "posts" : "articles"} yet. Write your first {kind === "blog" ? "blog post" : "news article"}.</p>
      ) : (
        <div className="space-y-3">
          {items.map((item) => (
            <article key={item._id} className="flex flex-col gap-4 rounded border bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-semibold">{item.title}</h2>
                <p className={`mt-2 text-xs font-semibold ${item.approved ? "text-green-700" : "text-amber-700"}`}>
                  {item.approved ? "Published" : "Draft"}
                </p>
                <p className="mt-1 break-all text-xs text-muted-foreground">
                  {kind === "blog" ? "/blog/" : "/media/news/"}{item.slug || item._id}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {item.approved && (
                  <Link href={kind === "blog" ? `/blog/${item.slug}` : `/media/news/${item.slug || item._id}`} target="_blank" rel="noopener noreferrer" className="rounded border px-3 py-2 text-sm hover:border-primary hover:text-primary">
                    View
                  </Link>
                )}
                {(isAdmin || item.postedBy?._id === user._id) && (
                  <Link href={`/dashboard/${kind}/${item._id}/edit`} className="rounded border px-3 py-2 text-sm hover:border-primary hover:text-primary">
                    Edit
                  </Link>
                )}
                {(isAdmin || item.postedBy?._id === user._id) && <>
                  <button type="button" onClick={() => void togglePublished(item)} className="rounded border px-3 py-2 text-sm hover:border-primary hover:text-primary">
                    {item.approved ? "Unpublish" : "Publish"}
                  </button>
                </>}
                {isAdmin && <>
                  <button type="button" onClick={() => void deleteNews(item)} className="rounded border border-destructive px-3 py-2 text-sm text-destructive">
                    Delete
                  </button>
                </>}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
