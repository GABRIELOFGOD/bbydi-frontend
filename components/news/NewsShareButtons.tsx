"use client";

import { Check, Copy, Mail, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function NewsShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [articleUrl, setArticleUrl] = useState("");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setArticleUrl(window.location.href));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      toast.success("Article link copied");
    } catch {
      toast.error("Could not copy the article link");
    }
  };

  const share = async () => {
    if (!navigator.share) {
      await copyLink();
      return;
    }
    try {
      await navigator.share({ title, url: window.location.href });
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Could not share this article");
      }
    }
  };

  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2" aria-label="Share this article">
      <button type="button" onClick={() => void share()} className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
        <Share2 size={16} /> Share
      </button>
      <button type="button" onClick={() => void copyLink()} className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
        {copied ? <Check size={16} /> : <Copy size={16} />}
        {copied ? "Copied" : "Copy link"}
      </button>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
      >
        X
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
      >
        WhatsApp
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="inline-flex items-center gap-2 rounded border px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary"
      >
        <Mail size={16} /> Email
      </a>
    </div>
  );
}
