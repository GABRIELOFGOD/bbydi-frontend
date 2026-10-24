"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { ContentItem, StaffAccount } from "@/lib/content";
import { ContentKind } from "@/lib/types";
import { useUser } from "@/providers/userProvider";

type ContentManagerProps = {
  kind: ContentKind;
  title: string;
};

type FormValues = {
  title: string;
  description: string;
  category: string;
  theme: string;
  language: string;
  series: string;
  context: string;
  summary: string;
  status: string;
  date: string;
  type: string;
  location: string;
  deadline: string;
  link: string;
  featured: string;
};

const emptyForm: FormValues = {
  title: "",
  description: "",
  category: "",
  theme: "",
  language: "",
  series: "",
  context: "",
  summary: "",
  status: "",
  date: "",
  type: "",
  location: "",
  deadline: "",
  link: "",
  featured: "false",
};

const kindFields: Record<ContentKind, (keyof FormValues)[]> = {
  program: ["category", "description"],
  project: ["category", "status", "context", "summary"],
  news: ["description", "date"],
  blog: ["category", "description", "date"],
  opportunity: ["description", "status", "type", "location", "deadline", "link"],
  report: ["category", "description", "date"],
  publication: ["category", "theme", "series", "language", "description", "date"],
  partner: ["description", "link"],
  innovation: ["description", "type", "link"],
};

const fieldLabels: Record<keyof FormValues, string> = {
  title: "Title / name",
  description: "Description",
  category: "Category",
  theme: "Theme",
  language: "Language",
  series: "Series",
  context: "Project context",
  summary: "Outcome / supporting detail",
  status: "Status",
  date: "Date",
  type: "Type",
  location: "Location",
  deadline: "Deadline",
  link: "External link",
  featured: "Featured on author profile",
};

const longFields: (keyof FormValues)[] = ["description", "context", "summary"];

export default function ContentManager({ kind, title }: ContentManagerProps) {
  const { user } = useUser();
  const isAdmin = user?.role === "admin";
  const [items, setItems] = useState<ContentItem[]>([]);
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([]);
  const [publisherId, setPublisherId] = useState("");
  const [form, setForm] = useState<FormValues>(emptyForm);
  const [image, setImage] = useState<File | null>(null);
  const [document, setDocument] = useState<File | null>(null);
  const [editing, setEditing] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadItems = useCallback(async () => {
    try {
      const result = await apiRequest<ContentItem[]>(`/content/${kind}/all`);
      setItems(result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Could not load ${title.toLowerCase()}`);
    } finally {
      setLoading(false);
    }
  }, [kind, title]);

  useEffect(() => {
    let active = true;
    void apiRequest<ContentItem[]>(`/content/${kind}/all`)
      .then((result) => { if (active) setItems(result); })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : `Could not load ${title.toLowerCase()}`);
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind, title]);

  useEffect(() => {
    if (!isAdmin) return;
    let active = true;
    void apiRequest<{ data: StaffAccount[] }>("/staff/accounts/all")
      .then((result) => {
        if (active) setStaffAccounts(result.data.filter((account) => !account.isBlocked));
      })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load staff accounts");
      });
    return () => { active = false; };
  }, [isAdmin]);

  const resetForm = () => {
    setForm(emptyForm);
    setPublisherId("");
    setImage(null);
    setDocument(null);
    setEditing(null);
  };

  const editItem = (item: ContentItem) => {
    setEditing(item);
    setPublisherId(item.publisherUser?._id ?? item.postedBy?._id ?? user?._id ?? "");
    setForm({
      title: item.title,
      description: item.description ?? "",
      category: item.category ?? "",
      theme: item.theme ?? "",
      language: item.language ?? "",
      series: item.series ?? "",
      context: item.context ?? "",
      summary: item.summary ?? "",
      status: item.status ?? "",
      date: item.date?.slice(0, 10) ?? "",
      type: item.type ?? "",
      location: item.location ?? "",
      deadline: item.deadline ?? "",
      link: item.link ?? "",
      featured: String(item.featured ?? false),
    });
    setImage(null);
    setDocument(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    const selectedPublisherId = publisherId || (editing ? editing.postedBy?._id : "");
    if (isAdmin && selectedPublisherId) body.append("publisherId", selectedPublisherId);
    if (image) body.append("image", image);
    if (document) body.append("document", document);

    try {
      const path = `/content/${kind}${editing ? `/${editing._id}` : ""}`;
      const result = await apiRequest<{ message: string }>(path, {
        method: editing ? "PATCH" : "POST",
        body,
      });
      toast.success(result.message);
      resetForm();
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : `Could not save ${title.toLowerCase()}`);
    } finally {
      setSaving(false);
    }
  };

  const setPublished = async (item: ContentItem) => {
    try {
      await apiRequest(`/content/${kind}/${item._id}/approval`, {
        method: "PATCH",
        body: { approved: !item.approved },
      });
      toast.success(item.approved ? "Content unpublished" : "Content published");
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update publication status");
    }
  };

  const removeItem = async (item: ContentItem) => {
    if (!window.confirm(`Delete "${item.title}"?`)) return;
    try {
      const result = await apiRequest<{ message: string }>(`/content/${kind}/${item._id}`, {
        method: "DELETE",
      });
      toast.success(result.message);
      await loadItems();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete content");
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(20rem,0.75fr)]">
      <section className="space-y-4">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <button type="button" className="text-sm font-semibold text-primary" onClick={() => void loadItems()}>
            Refresh
          </button>
        </div>
        {loading ? <p className="text-sm text-muted-foreground">Loading {title.toLowerCase()}...</p> : (
          items.length === 0 ? (
            <p className="rounded border p-5 text-sm text-muted-foreground">No entries yet.</p>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <article key={item._id} className="flex flex-col gap-3 rounded border bg-white p-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {item.description || item.context || item.summary || item.category || ""}
                    </p>
                    <p className={`mt-2 text-xs font-semibold ${item.approved ? "text-green-700" : "text-amber-700"}`}>
                      {item.approved ? "Published" : "Awaiting approval"}
                    </p>
                    {isAdmin && <p className="mt-1 text-xs text-muted-foreground">Posted by {item.postedBy?.name ?? "Uploader account unavailable"}</p>}
                    {item.featured && <p className="mt-1 text-xs font-semibold text-primary">Featured on author profile</p>}
                  </div>
                  {(isAdmin || item.postedBy?._id === user?._id) && (
                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button type="button" onClick={() => editItem(item)} className="rounded border px-3 py-1.5 text-sm">Edit</button>
                      {(isAdmin || item.postedBy?._id === user?._id) && <>
                        <button type="button" onClick={() => void setPublished(item)} className="rounded border px-3 py-1.5 text-sm">
                          {item.approved ? "Unpublish" : "Publish"}
                        </button>
                      </>}
                      {isAdmin && <>
                        <button type="button" onClick={() => void removeItem(item)} className="rounded border border-destructive px-3 py-1.5 text-sm text-destructive">Delete</button>
                      </>}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )
        )}
      </section>

      <section className="h-fit rounded border p-5">
        <h2 className="mb-4 font-bold">{editing ? `Edit ${title}` : `Add ${title}`}</h2>
        <form onSubmit={submit} className="space-y-4">
          {(["title", ...kindFields[kind]] as (keyof FormValues)[]).map((field) => (
            <label key={field} className="block space-y-1.5 text-sm font-medium">
              <span>
                {kind === "publication" && field === "category"
                  ? "Resource type"
                  : kind === "innovation" && field === "type"
                    ? "Status / link label"
                    : fieldLabels[field]}
              </span>
              {field === "status" && kind === "opportunity" ? (
                <select value={form[field]} onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))} className="h-10 w-full rounded border px-3">
                  <option value="">Select status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
              ) : longFields.includes(field) ? (
                <textarea value={form[field]} onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))} required={field === "title"} rows={4} className="w-full rounded border p-3" />
              ) : (
                <input
                  type={field === "date" ? "date" : "text"}
                  value={form[field]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                  required={field === "title"}
                  className="h-10 w-full rounded border px-3"
                />
              )}
            </label>
          ))}
          {isAdmin && (
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Publisher</span>
              <select value={publisherId} onChange={(event) => setPublisherId(event.target.value)} className="h-10 w-full rounded border px-3">
                <option value="">Same as poster</option>
                {user?._id && <option value={user._id}>{user.name} (you)</option>}
                {staffAccounts.map((account) => (
                  <option key={account._id} value={account._id}>{account.name}{account.position ? ` — ${account.position}` : ""}</option>
                ))}
              </select>
              <span className="block text-xs font-normal text-muted-foreground">The publisher is shown to readers. The original poster is tracked separately.</span>
            </label>
          )}
          {isAdmin && (
            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                checked={form.featured === "true"}
                onChange={(event) => setForm((current) => ({ ...current, featured: String(event.target.checked) }))}
                className="size-4 accent-primary"
              />
              Feature this item on its author&apos;s profile
            </label>
          )}
          {kind !== "news" && kind !== "opportunity" && kind !== "partner" && (
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Image</span>
              <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] ?? null)} className="block w-full text-sm" />
            </label>
          )}
          {(kind === "report" || kind === "publication") && (
            <label className="block space-y-1.5 text-sm font-medium">
              <span>PDF / downloadable file</span>
              <input type="file" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={(event) => setDocument(event.target.files?.[0] ?? null)} className="block w-full text-sm" />
              {editing?.document && <a href={editing.document} target="_blank" rel="noreferrer" className="block text-xs text-primary">Open current file</a>}
            </label>
          )}
          {kind === "partner" && (
            <label className="block space-y-1.5 text-sm font-medium">
              <span>Logo</span>
              <input type="file" accept="image/*" onChange={(event) => setImage(event.target.files?.[0] ?? null)} className="block w-full text-sm" />
            </label>
          )}
          <div className="flex gap-2">
            <button disabled={saving || !user} className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">
              {saving ? "Saving..." : editing ? "Save changes" : "Create"}
            </button>
            {editing && <button type="button" onClick={resetForm} className="rounded border px-4 py-2 text-sm">Cancel</button>}
          </div>
        </form>
      </section>
    </div>
  );
}
