"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { ContentItem } from "@/lib/content";
import { News } from "@/lib/constants";
import { createNewsSlug } from "@/lib/news";
import SafeHtml from "@/components/news/SafeHtml";
import NewsShareButtons from "@/components/news/NewsShareButtons";

function ArticleAudioPlayer({ title, html }: { title: string; html: string }) {
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [rate, setRate] = useState(1);
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setSupported("speechSynthesis" in window));
    return () => {
      window.cancelAnimationFrame(frame);
      window.speechSynthesis?.cancel();
    };
  }, []);

  if (!supported) return null;

  const listen = () => {
    window.speechSynthesis.cancel();
    const articleText = new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";
    const narration = new SpeechSynthesisUtterance(`${title}. ${articleText}`);
    narration.rate = rate;
    narration.onstart = () => setSpeaking(true);
    narration.onend = () => setSpeaking(false);
    narration.onerror = () => {
      setSpeaking(false);
      toast.error("Audio playback could not be started");
    };
    utterance.current = narration;
    window.speechSynthesis.speak(narration);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    utterance.current = null;
    setSpeaking(false);
  };

  return (
    <div className="my-7 flex flex-wrap items-center gap-3 rounded-sm border bg-[#f7f6f5] p-3">
      <button type="button" onClick={speaking ? stop : listen} className="rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary/90">
        {speaking ? "Stop listening" : "▶ Listen to this article"}
      </button>
      {speaking && (
        <button type="button" onClick={stop} className="rounded-sm border px-3 py-2 text-xs font-semibold text-muted-foreground">
          Stop
        </button>
      )}
      <label className="ml-auto flex items-center gap-2 text-xs font-semibold text-muted-foreground">
        Speed
        <input
          type="range"
          min="0.7"
          max="1.6"
          step="0.1"
          value={rate}
          onChange={(event) => setRate(Number(event.target.value))}
          aria-label="Audio playback speed"
          className="accent-primary"
        />
        {rate.toFixed(1)}×
      </label>
    </div>
  );
}

export default function NewsArticle({ id: slug }: { id: string }) {
  const [article, setArticle] = useState<ContentItem | null>(null);
  const [related, setRelated] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadArticle = async () => {
      try {
        const item = await apiRequest<ContentItem>(`/content/news/${encodeURIComponent(slug)}`);
        if (active) setArticle(item);
      } catch (requestError) {
        const fallback = News.find((item) =>
          item.id === slug || createNewsSlug(item.title) === slug,
        );
        if (active && fallback) {
          setArticle({
            _id: fallback.id,
            slug: createNewsSlug(fallback.title),
            kind: "news",
            title: fallback.title,
            description: fallback.content,
            publisher: fallback.publisher,
            date: String(fallback.date),
            approved: true,
          });
        } else if (active) {
          setError(requestError instanceof Error ? requestError.message : "Could not load this article");
        }
      } finally {
        if (active) setLoading(false);
      }
    };
    const loadRelated = async () => {
      try {
        const items = await apiRequest<ContentItem[]>("/content/news");
        if (active) setRelated(items.filter((item) => (item.slug || item._id) !== slug).slice(0, 3));
      } catch (requestError) {
        const message = requestError instanceof Error ? requestError.message : "Could not load related articles";
        if (active) {
          setRelated(News.filter((item) => createNewsSlug(item.title) !== slug).slice(0, 3).map((item) => ({
            _id: item.id,
            slug: createNewsSlug(item.title),
            kind: "news",
            title: item.title,
            description: item.content,
            category: "News",
            approved: true,
          })));
          toast.error(message);
        }
      }
    };
    void loadArticle();
    void loadRelated();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) return <main className="mx-auto min-h-[50vh] max-w-4xl px-5 py-16 text-sm text-muted-foreground">Loading article...</main>;
  if (!article) {
    return (
      <main className="mx-auto min-h-[50vh] max-w-4xl px-5 py-16">
        <p className="rounded border p-5 text-sm text-muted-foreground">{error || "Article not found"}</p>
        <Link href="/media#news" className="mt-5 inline-block font-semibold text-primary hover:underline">Back to newsroom</Link>
      </main>
    );
  }

  const publishedDate = article.date ? new Date(article.date) : null;
  const dateLabel = publishedDate && !Number.isNaN(publishedDate.getTime())
    ? publishedDate.toLocaleDateString("en-NG", { year: "numeric", timeZone: "UTC" })
    : "";
  const locationLabel = article.location?.toUpperCase();

  return (
    <>
      <header className="bg-[#191919] px-5 pb-12 pt-8 text-white sm:pb-16 sm:pt-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-5 text-xs text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            {" / "}
            <Link href="/media#news" className="hover:text-white">Media &amp; Publications</Link>
            {article.category && ` / ${article.category}`}
          </p>
          {article.category && (
            <span className="inline-block bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
              {article.category}
            </span>
          )}
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">
            {article.title}
          </h1>
          {article.summary && <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">{article.summary}</p>}
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/50">
            {[dateLabel, locationLabel].filter(Boolean).join(" · ")}
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6">
        {article.image && (
          <figure className="relative z-10 -mt-6 overflow-hidden rounded-sm bg-white shadow-sm">
            <Image src={article.image} alt={article.imageCaption || article.title} width={1600} height={800} data-width={article.imageWidth ?? 100} data-align={article.imageAlignment ?? "center"} className="news-lead-image mx-auto block max-h-[30rem] max-w-full object-cover" />
            {article.imageCaption && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-4 pb-3 pt-8 text-xs text-white">
                {article.imageCaption}
              </figcaption>
            )}
          </figure>
        )}

        <article className="mx-auto mt-10 max-w-[35rem]">
          <ArticleAudioPlayer title={article.title} html={article.description ?? ""} />
          <SafeHtml html={article.description ?? ""} className="news-rich-content news-article-body" />
          <div className="mt-10 border-t pt-5">
            <NewsShareButtons title={article.title} />
          </div>
          <div className="mt-6 flex flex-wrap gap-3 border-t pt-5">
            <Link href="/media#news" className="rounded-sm border border-primary px-4 py-2.5 text-xs font-bold text-primary hover:bg-primary/5">
              ← All news
            </Link>
            <Link href="/partner-with-us" className="rounded-sm bg-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-primary/90">
              Work with us
            </Link>
          </div>
        </article>
      </main>

      {related.length > 0 && (
        <section className="bg-[#f7f6f5] px-5 py-12 sm:py-16">
          <div className="mx-auto max-w-5xl">
            <p className="mb-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-primary">Keep reading</p>
            <div className="mb-6 h-0.5 w-12 bg-primary" />
            <div className="grid gap-4 md:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item._id}
                  href={`/media/news/${item.slug || item._id}`}
                  className="group flex min-h-56 flex-col rounded-sm border bg-white p-5 transition-colors hover:border-primary/50"
                >
                  <span className="text-xs font-extrabold tracking-wide text-primary">{item.category || "News"}</span>
                  <h2 className="mt-3 text-base font-bold leading-snug text-foreground group-hover:text-primary">{item.title}</h2>
                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {(item.summary || item.description || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}
                  </p>
                  <span className="mt-auto pt-4 text-xs font-bold text-primary">Read →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
