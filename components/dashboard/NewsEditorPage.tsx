"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import { apiRequest } from "@/lib/api";
import { ContentItem, StaffAccount } from "@/lib/content";
import { useUser } from "@/providers/userProvider";
import NewsRichTextEditor, { NewsRichTextEditorHandle } from "@/components/dashboard/NewsRichTextEditor";
import SafeHtml from "@/components/news/SafeHtml";
import { toast } from "sonner";
import { createNewsSlug } from "@/lib/news";

type NewsEditorPageProps = { newsId?: string; kind?: "news" | "blog" };

export default function NewsEditorPage({ newsId, kind = "news" }: NewsEditorPageProps) {
  const contentName = kind === "blog" ? "blog post" : "news article";
  const dashboardPath = `/dashboard/${kind}`;
  const publicPath = kind === "blog" ? "/blog" : "/media/news";
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const editorRef = useRef<NewsRichTextEditorHandle>(null);
  const coverPreviewUrl = useRef("");
  const [title, setTitle] = useState("");
  const [posterId, setPosterId] = useState("");
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([]);
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [summary, setSummary] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [imageCaption, setImageCaption] = useState("");
  const [imageWidth, setImageWidth] = useState(100);
  const [imageAlignment, setImageAlignment] = useState<"left" | "center" | "right">("center");
  const [featured, setFeatured] = useState(false);
  const [content, setContent] = useState("");
  const [loaded, setLoaded] = useState(!newsId);
  const [loadError, setLoadError] = useState("");
  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    void apiRequest<{ data: StaffAccount[] }>("/staff/accounts/all")
      .then((result) => { if (active) setStaffAccounts(result.data.filter((staff) => !staff.isBlocked)); })
      .catch((error: unknown) => { if (active) toast.error(error instanceof Error ? error.message : "Could not load staff accounts"); });
    return () => { active = false; };
  }, [isAdmin]);

  useEffect(() => {
    if (!newsId || !user?._id) return;
    let active = true;
    void apiRequest<ContentItem[]>(`/content/${kind}/all`)
      .then((items) => {
        const item = items.find((candidate) => candidate._id === newsId);
        if (!item) throw new Error(`${kind === "blog" ? "Blog post" : "News article"} not found`);
        if (!active) return;
        setTitle(item.title);
        setPosterId(item.postedBy?._id ?? "");
        setDate(item.date?.slice(0, 10) ?? "");
        setCategory(item.category ?? "");
        setSummary(item.summary ?? "");
        setLocation(item.location ?? "");
        setImage(item.image ?? "");
        setImageCaption(item.imageCaption ?? "");
        setImageWidth(item.imageWidth ?? 100);
        setImageAlignment(item.imageAlignment ?? "center");
        setFeatured(Boolean(item.featured));
        setContent(item.description ?? "");
        setLoaded(true);
      })
      .catch((error: unknown) => {
        if (active) {
          const message = error instanceof Error ? error.message : "Could not load article";
          setLoadError(message);
          toast.error(message);
        }
      })
      .finally(() => {
        if (active) setLoaded(true);
      });
    return () => {
      active = false;
    };
  }, [isAdmin, kind, newsId, user?._id]);

  useEffect(() => () => {
    if (coverPreviewUrl.current) URL.revokeObjectURL(coverPreviewUrl.current);
  }, []);

  const save = async (publish: boolean, event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (!title.trim()) {
      toast.error(`Add a ${contentName} title before saving`);
      return;
    }
    if (!content.replace(/<[^>]*>/g, "").trim() && !/<img\b/i.test(content)) {
      toast.error(`Add some ${kind === "blog" ? "post" : "article"} content before saving`);
      return;
    }

    setSaving(true);
    const editorHandle = editorRef.current;
    try {
      if (!editorHandle) throw new Error("The article editor is not ready. Please try again.");
      editorHandle.setEditable(false);
      const description = await editorHandle.uploadPendingImages();
      let savedImage = image;
      if (coverFile) {
        const formData = new FormData();
        formData.append("image", coverFile);
        const result = await apiRequest<{ data: { url: string } }>(`/content/${kind}/images`, {
          method: "POST",
          body: formData,
        });
        savedImage = result.data.url;
      }
      const path = newsId ? `/content/${kind}/${newsId}` : `/content/${kind}`;
      const result = await apiRequest<{ message: string; data?: { slug?: string } }>(path, {
        method: newsId ? "PATCH" : "POST",
        body: {
          title: title.trim(),
          description,
          date,
          category: category.trim(),
          summary: summary.trim(),
          location: location.trim(),
          image: savedImage,
          imageCaption: imageCaption.trim(),
          imageWidth,
          imageAlignment,
          ...(isAdmin ? { posterId: posterId || user?._id } : {}),
          approved: publish,
          ...(isAdmin ? { featured } : {}),
        },
      });
      toast.success(result.data?.slug
        ? `${result.message}. URL: ${publicPath}/${result.data.slug}`
        : result.message);
      router.push(dashboardPath);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save article");
    } finally {
      editorHandle?.setEditable(true);
      setSaving(false);
    }
  };

  const selectCover = (file: File) => {
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.type) || file.size > 10 * 1024 * 1024) {
      toast.error("Choose a JPG, PNG, WebP, or GIF image no larger than 10 MB");
      return;
    }
    if (coverPreviewUrl.current) URL.revokeObjectURL(coverPreviewUrl.current);
    const previewUrl = URL.createObjectURL(file);
    coverPreviewUrl.current = previewUrl;
    setCoverPreview(previewUrl);
    setCoverFile(file);
  };

  const savingDisabled = saving;

  if (userLoading) return <p className="text-sm text-muted-foreground">Loading {contentName} editor...</p>;
  if (!user) return <p className="rounded border p-5 text-sm text-muted-foreground">Please sign in to write or edit {contentName}s.</p>;
  if (!loaded) return <p className="text-sm text-muted-foreground">Loading {contentName} editor...</p>;
  if (loadError) {
    return (
      <main className="space-y-4">
        <p className="rounded border p-5 text-sm text-destructive">{loadError}</p>
        <Link href={dashboardPath} className="font-semibold text-primary hover:underline">Back to {kind === "blog" ? "blog" : "newsroom"}</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <Link href={dashboardPath} className="text-sm font-semibold text-primary hover:underline">← Back to {kind === "blog" ? "blog" : "newsroom"}</Link>
          <h1 className="mt-2 text-2xl font-bold">{newsId ? `Edit ${contentName}` : `Write a ${contentName}`}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Format the story visually, add images or tables, then preview before publishing.</p>
        </div>
        <button type="button" onClick={() => setPreview((current) => !current)} className="rounded border px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
          {preview ? "Back to editor" : `Preview ${kind === "blog" ? "post" : "article"}`}
        </button>
      </div>

      {preview && (
        <div className="overflow-hidden rounded border">
          <header className="bg-[#191919] px-5 pb-12 pt-8 text-white sm:px-10">
            <p className="mb-4 text-xs text-white/50">{kind === "blog" ? `Home / Blog / ${category || "Blog"}` : `Home / Media & Publications / ${category || "News"}`}</p>
            {category && <span className="inline-block bg-primary px-2 py-1 text-[10px] font-bold uppercase tracking-widest">{category}</span>}
            <h2 className="mt-3 max-w-3xl text-3xl font-bold leading-tight sm:text-4xl">{title || "Article title"}</h2>
            {summary && <p className="mt-3 max-w-2xl text-sm text-white/70">{summary}</p>}
            <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-white/50">{date ? new Date(`${date}T00:00:00`).getFullYear() : ""}{location ? ` · ${location}` : ""}</p>
          </header>
          <article className="-mt-6 mx-auto max-w-3xl px-4 pb-10 sm:px-8">
            {(coverPreview || image) && <figure className="relative z-10">
              <Image src={coverPreview || image} alt={imageCaption || title} width={1600} height={800} data-width={imageWidth} data-align={imageAlignment} className="news-lead-image mx-auto block max-h-104 max-w-full rounded object-cover" unoptimized={Boolean(coverPreview)} />
              {imageCaption && <figcaption className="bg-black/70 px-3 py-2 text-xs text-white">{imageCaption}</figcaption>}
            </figure>}
            <p className="mt-8 rounded-sm border-l-2 border-primary bg-primary/5 p-3 text-xs text-primary">This is a preview of the published {kind === "blog" ? "post" : "article"} layout.</p>
            <SafeHtml html={content} className="news-rich-content mt-8" allowLocalBlobImages />
          </article>
          <div className="mx-auto flex max-w-3xl flex-wrap gap-3 px-4 pb-8 sm:px-8">
            <button type="button" onClick={() => setPreview(false)} className="rounded border px-4 py-2.5 text-sm font-semibold">
              Back to editor
            </button>
            <button type="button" onClick={() => void save(false)} disabled={savingDisabled} className="rounded border px-4 py-2.5 text-sm font-semibold disabled:opacity-60">
              {saving ? "Saving..." : "Save as draft"}
            </button>
            <button type="button" onClick={() => void save(true)} disabled={savingDisabled} className="rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : newsId ? "Save and publish" : kind === "blog" ? "Publish post" : "Publish article"}
            </button>
          </div>
        </div>
      )}
      <form className={`${preview ? "hidden " : ""}space-y-5 rounded border bg-white p-5 sm:p-7`} onSubmit={(event) => event.preventDefault()}>
          <label className="block space-y-1.5 text-sm font-semibold">
            <span>{kind === "blog" ? "Post title" : "Article title"}</span>
            <input value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200} required className="h-12 w-full rounded border px-3 text-base" placeholder="Give your story a clear headline" />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm font-semibold">
              <span>{isAdmin ? "Posted by" : "Your byline"}</span>
              {isAdmin ? <select value={posterId || user._id || ""} onChange={(event) => setPosterId(event.target.value)} className="h-10 w-full rounded border px-3">
                {user?._id && <option value={user._id}>{user.name} (you)</option>}
                {staffAccounts.map((staff) => (
                  <option key={staff._id} value={staff._id}>{staff.name}{staff.position ? ` — ${staff.position}` : ""}</option>
                ))}
              </select> : <span className="block rounded border px-3 py-2">{user.name}</span>}
              <span className="block text-xs font-normal text-muted-foreground">{isAdmin ? "Choose an author for this article." : "This article will be published under your account."}</span>
            </label>
            <label className="block space-y-1.5 text-sm font-semibold">
              <span>Publication date</span>
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} className="h-10 w-full rounded border px-3" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-1.5 text-sm font-semibold">
              <span>Category</span>
              {kind === "blog" ? <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 w-full rounded border px-3">
                <option value="">Select a category</option>
                {["Analysis", "Opinion", "Field notes", "Explainers", "Commentary"].map((item) => <option key={item} value={item}>{item}</option>)}
              </select> : <input value={category} onChange={(event) => setCategory(event.target.value)} maxLength={80} className="h-10 w-full rounded border px-3" placeholder="e.g. Gender justice" />}
            </label>
            <label className="block space-y-1.5 text-sm font-semibold">
              <span>Location / dateline</span>
              <input value={location} onChange={(event) => setLocation(event.target.value)} maxLength={120} className="h-10 w-full rounded border px-3" placeholder="e.g. Kwara State" />
            </label>
          </div>
          <label className="block space-y-1.5 text-sm font-semibold">
            <span>{kind === "blog" ? "Post summary" : "Article summary"}</span>
            <textarea value={summary} onChange={(event) => setSummary(event.target.value)} maxLength={300} rows={2} className="w-full rounded border p-3" placeholder="A short introduction shown below the headline" />
          </label>
          {isAdmin && <label className="flex items-center gap-2 text-sm font-semibold">
            <input type="checkbox" checked={featured} onChange={(event) => setFeatured(event.target.checked)} className="size-4 accent-primary" />
            Feature this {kind === "blog" ? "post on the blog" : "article"}
          </label>}
          <div className="space-y-2">
            <label className="block text-sm font-semibold" htmlFor="news-cover">Lead image</label>
            {(coverPreview || image) && <Image src={coverPreview || image} alt={imageCaption || "Article lead image preview"} width={1200} height={600} data-width={imageWidth} data-align={imageAlignment} className="news-lead-image mx-auto block max-h-60 max-w-full rounded object-cover" unoptimized={Boolean(coverPreview)} />}
            <input id="news-cover" type="file" accept="image/jpeg,image/png,image/webp,image/gif" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) selectCover(file);
              event.target.value = "";
            }} className="block w-full text-sm" />
            {(image || coverFile) && <button type="button" onClick={() => { setImage(""); setCoverFile(null); setCoverPreview(""); if (coverPreviewUrl.current) URL.revokeObjectURL(coverPreviewUrl.current); coverPreviewUrl.current = ""; }} className="text-xs font-semibold text-destructive hover:underline">Remove lead image</button>}
            <label className="block space-y-1.5 text-sm font-semibold">
              <span>Image caption</span>
              <input value={imageCaption} onChange={(event) => setImageCaption(event.target.value)} maxLength={240} className="h-10 w-full rounded border px-3" placeholder="Describe the photograph" />
            </label>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1.5 text-sm font-semibold">Lead image width
                <select value={imageWidth} onChange={(event) => setImageWidth(Number(event.target.value))} className="h-10 w-full rounded border px-3">
                  {[25, 33, 50, 75, 100].map((width) => <option key={width} value={width}>{width}%</option>)}
                </select>
              </label>
              <label className="block space-y-1.5 text-sm font-semibold">Lead image position
                <select value={imageAlignment} onChange={(event) => setImageAlignment(event.target.value as typeof imageAlignment)} className="h-10 w-full rounded border px-3">
                  <option value="left">Left</option><option value="center">Center</option><option value="right">Right</option>
                </select>
              </label>
            </div>
          </div>
          <p className="rounded bg-muted/40 p-3 text-xs text-muted-foreground">
            {kind === "blog" ? "Blog URL: " : "Article URL: "}<span className="font-semibold text-foreground">{publicPath}/{title.trim() ? createNewsSlug(title) : "your-headline"}</span>
            <span className="ml-1">(generated from the headline; made unique when saved)</span>
          </p>
          <div className="space-y-1.5 text-sm font-semibold">
            <span>Article content</span>
            {loaded && <NewsRichTextEditor ref={editorRef} key={`${kind}-${newsId ?? "new"}`} kind={kind} initialContent={content} onChange={setContent} />}
          </div>
          <div className="flex flex-wrap gap-3 border-t pt-5">
            <button type="button" onClick={() => void save(false)} disabled={savingDisabled} className="rounded border px-4 py-2.5 text-sm font-semibold disabled:opacity-60">
              {saving ? "Saving..." : "Save as draft"}
            </button>
            <button type="button" onClick={() => setPreview(true)} disabled={savingDisabled} className="rounded bg-primary px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60">
              Preview before publishing
            </button>
          </div>
      </form>
    </main>
  );
}
