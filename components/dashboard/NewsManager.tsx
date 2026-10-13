"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";
import { ContentItem } from "@/lib/content";
import { useUser } from "@/providers/userProvider";
import { toast } from "sonner";

export default function NewsManager() {
  const { user, loading: userLoading } = useUser();
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const isAdmin = user?.role === "admin";

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await apiRequest<ContentItem[]>("/content/news/all"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load news");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    const load = async () => {
      try {
        const result = await apiRequest<ContentItem[]>("/content/news/all");
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
  }, [isAdmin]);

  const togglePublished = async (item: ContentItem) => {
    try {
      await apiRequest(`/content/news/${item._id}/approval`, {
        method: "PATCH",
        body: { approved: !item.approved },
      });
      toast.success(item.approved ? "News unpublished" : "News published");
      await loadNews();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update news");
    }
  };

  const deleteNews = async (item: ContentItem) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      await apiRequest(`/content/news/${item._id}`, { method: "DELETE" });
      toast.success("News deleted");
      await loadNews();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete news");
    }
  };

  if (userLoading || (isAdmin && loading)) {
    return <p className="text-sm text-muted-foreground">Loading newsroom...</p>;
  }
  if (!isAdmin) {
    return <p className="rounded border p-5 text-sm text-muted-foreground">Only administrators can manage newsroom articles.</p>;
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Newsroom</h1>
          <p className="mt-1 text-sm text-muted-foreground">Write, preview, and publish news for your readers.</p>
        </div>
        <Link href="/dashboard/news/new" className="rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary/90">
          Write an article
        </Link>
      </div>
      {items.length === 0 ? (
        <p className="rounded border p-6 text-sm text-muted-foreground">No articles yet. Write your first newsroom article.</p>
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
                  /media/news/{item.slug || item._id}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {item.approved && (
                  <Link href={`/media/news/${item.slug || item._id}`} target="_blank" rel="noopener noreferrer" className="rounded border px-3 py-2 text-sm hover:border-primary hover:text-primary">
                    View
                  </Link>
                )}
                <Link href={`/dashboard/news/${item._id}/edit`} className="rounded border px-3 py-2 text-sm hover:border-primary hover:text-primary">
                  Edit
                </Link>
                <button type="button" onClick={() => void togglePublished(item)} className="rounded border px-3 py-2 text-sm hover:border-primary hover:text-primary">
                  {item.approved ? "Unpublish" : "Publish"}
                </button>
                <button type="button" onClick={() => void deleteNews(item)} className="rounded border border-destructive px-3 py-2 text-sm text-destructive">
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
