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
  period: string;
  funder: string;
  thematicAreas: string;
  on2026Register: string;
  relatedProjectIds: string;
  date: string;
  type: string;
  location: string;
  deadline: string;
  link: string;
  featured: string;
  newsType: string;
  sourceName: string;
  sourceUrl: string;
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
  period: "",
  funder: "",
  thematicAreas: "",
  on2026Register: "false",
  relatedProjectIds: "",
  date: "",
  type: "",
  location: "",
  deadline: "",
  link: "",
  featured: "false",
  newsType: "internal",
  sourceName: "",
  sourceUrl: "",
};

const kindFields: Record<ContentKind, (keyof FormValues)[]> = {
  program: ["category", "description"],
  project: ["category", "status", "context", "summary", "period", "funder", "location", "thematicAreas", "on2026Register"],
  news: ["newsType", "sourceName", "sourceUrl", "summary", "description", "date"],
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
  period: "Project period",
  funder: "Funder",
  thematicAreas: "Thematic areas (one per line)",
  on2026Register: "On the 2026 project register",
  relatedProjectIds: "Related projects",
  newsType: "News type",
  sourceName: "Source publication",
  sourceUrl: "External article URL",
};

const longFields: (keyof FormValues)[] = ["description", "context", "summary", "thematicAreas"];

export default function ContentManager({ kind, title }: ContentManagerProps) {
  const { user } = useUser();
  const isAdmin = user?.role === "admin";
  const [items, setItems] = useState<ContentItem[]>([]);
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>([]);
  const [projectOptions, setProjectOptions] = useState<ContentItem[]>([]);
  const [homepageFeatures, setHomepageFeatures] = useState<ContentItem[]>([]);
  const [featureTarget, setFeatureTarget] = useState<ContentItem | null>(null);
  const [replacementId, setReplacementId] = useState("");
  const [updatingHomepageFeature, setUpdatingHomepageFeature] = useState(false);
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

  const fetchHomepageFeatures = useCallback(async () => {
    if (!isAdmin || (kind !== "publication" && kind !== "report")) return [];
    const [publications, reports] = await Promise.all([
      apiRequest<ContentItem[]>("/content/publication/all"),
      apiRequest<ContentItem[]>("/content/report/all"),
    ]);
    return [...publications, ...reports].filter((item) => item.homepageFeatured && item.approved);
  }, [isAdmin, kind]);

  const loadHomepageFeatures = useCallback(async () => {
    try {
      setHomepageFeatures(await fetchHomepageFeatures());
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load homepage-featured publications");
    }
  }, [fetchHomepageFeatures]);

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

  useEffect(() => {
    if (kind !== "publication") return;
    let active = true;
    void apiRequest<ContentItem[]>("/content/project/all")
      .then((result) => { if (active) setProjectOptions(result); })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load projects for publication links");
      });
    return () => { active = false; };
  }, [kind]);

  useEffect(() => {
    let active = true;
    void fetchHomepageFeatures()
      .then((features) => { if (active) setHomepageFeatures(features); })
      .catch((error: unknown) => {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load homepage-featured publications");
      });
    return () => { active = false; };
  }, [fetchHomepageFeatures]);

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
      period: item.period ?? "",
      funder: item.funder ?? "",
      thematicAreas: item.thematicAreas?.join("\n") ?? "",
      on2026Register: String(item.on2026Register ?? false),
      relatedProjectIds: item.relatedProjectIds?.join(",") ?? "",
      date: item.date?.slice(0, 10) ?? "",
      type: item.type ?? "",
      location: item.location ?? "",
      deadline: item.deadline ?? "",
      link: item.link ?? "",
      featured: String(item.featured ?? false),
      newsType: item.newsType ?? (item.sourceUrl ? "external" : "internal"),
      sourceName: item.sourceName ?? (item.sourceUrl ? item.publisher ?? "" : ""),
      sourceUrl: item.sourceUrl ?? "",
    });
    setImage(null);
    setDocument(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (["period", "funder", "thematicAreas", "on2026Register"].includes(key) && kind !== "project") return;
      if (key === "relatedProjectIds" && kind !== "publication") return;
      if (["newsType", "sourceName", "sourceUrl"].includes(key) && kind !== "news") return;
      body.append(key, value);
    });
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

  const updateHomepageFeature = async (item: ContentItem, featured: boolean, replaceId?: string) => {
    setUpdatingHomepageFeature(true);
    try {
      await apiRequest(`/content/${item.kind}/${item._id}/homepage-featured`, {
        method: "PATCH",
        body: { featured, ...(replaceId ? { replaceId } : {}) },
      });
      toast.success(featured ? "Publication featured on the homepage" : "Homepage feature removed");
      setFeatureTarget(null);
      setReplacementId("");
      await Promise.all([loadItems(), loadHomepageFeatures()]);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update homepage feature");
      await loadHomepageFeatures();
    } finally {
      setUpdatingHomepageFeature(false);
    }
  };

  const requestHomepageFeature = (item: ContentItem) => {
    if (!isAdmin || (item.kind !== "publication" && item.kind !== "report")) return;
    if (!item.approved) {
      toast.error("Publish this item before featuring it on the homepage");
      return;
    }
    if (item.homepageFeatured) {
      void updateHomepageFeature(item, false);
      return;
    }
    if (homepageFeatures.length >= 4) {
      setFeatureTarget(item);
      setReplacementId("");
      return;
    }
    void updateHomepageFeature(item, true);
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
                    {isAdmin && <p className="mt-1 text-xs text-muted-foreground">Posted by {item.postedBy?.name ?? item.publisherUser?.name ?? "Uploader account unavailable"}</p>}
                    {item.featured && <p className="mt-1 text-xs font-semibold text-primary">Featured on author profile</p>}
                    {isAdmin && (kind === "publication" || kind === "report") && (
                      <button
                        type="button"
                        disabled={!item.approved || updatingHomepageFeature}
                        onClick={() => requestHomepageFeature(item)}
                        className="mt-2 text-xs font-semibold text-primary hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {item.homepageFeatured ? "Remove from homepage features" : "Feature on homepage"}
                      </button>
                    )}
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
          {(["title", ...kindFields[kind]] as (keyof FormValues)[])
            .filter((field) => !(kind === "news" && ["sourceName", "sourceUrl"].includes(field) && form.newsType !== "external"))
            .map((field) => (
            <label key={field} className="block space-y-1.5 text-sm font-medium">
              <span>
                {kind === "publication" && field === "category"
                  ? "Resource type"
                  : kind === "innovation" && field === "type"
                    ? "Status / link label"
                    : kind === "news" && field === "description"
                      ? "Article body / excerpt"
                    : fieldLabels[field]}
              </span>
              {field === "newsType" && kind === "news" ? (
                <select
                  value={form.newsType}
                  onChange={(event) => setForm((current) => ({ ...current, newsType: event.target.value }))}
                  className="h-10 w-full rounded border px-3"
                >
                  <option value="internal">Internal BBYDI news</option>
                  <option value="external">External media coverage</option>
                </select>
              ) : field === "status" && kind === "opportunity" ? (
                <select value={form[field]} onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))} className="h-10 w-full rounded border px-3">
                  <option value="">Select status</option>
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                  <option value="archived">Archived</option>
                </select>
              ) : field === "on2026Register" ? (
                <input
                  type="checkbox"
                  checked={form.on2026Register === "true"}
                  onChange={(event) => setForm((current) => ({ ...current, on2026Register: String(event.target.checked) }))}
                  className="size-4 accent-primary"
                />
              ) : longFields.includes(field) ? (
                <textarea value={form[field]} onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))} required={field === "title"} rows={4} className="w-full rounded border p-3" />
              ) : (
                <input
                  type={field === "date" ? "date" : field === "sourceUrl" ? "url" : "text"}
                  value={form[field]}
                  onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
                  required={field === "title" || (kind === "news" && form.newsType === "external" && ["sourceName", "sourceUrl"].includes(field))}
                  placeholder={field === "sourceUrl" ? "https://..." : undefined}
                  className="h-10 w-full rounded border px-3"
                />
              )}
            </label>
          ))}
          {kind === "news" && (
            <p className="text-xs leading-5 text-muted-foreground">
              For external coverage, enter the excerpt in the article body and provide the publication name and original article URL. Readers will see the excerpt on BBYDI before following the source link.
            </p>
          )}
          {kind === "publication" && (
            <label className="block space-y-1.5 text-sm font-medium">
              <span>{fieldLabels.relatedProjectIds}</span>
              <select
                multiple
                value={form.relatedProjectIds ? form.relatedProjectIds.split(",").filter(Boolean) : []}
                onChange={(event) => setForm((current) => ({
                  ...current,
                  relatedProjectIds: Array.from(event.target.selectedOptions, (option) => option.value).join(","),
                }))}
                className="min-h-36 w-full rounded border px-3 py-2"
              >
                {projectOptions.map((project) => (
                  <option key={project._id} value={project._id}>{project.title}</option>
                ))}
              </select>
              <span className="block text-xs font-normal text-muted-foreground">Select one or more projects to show this publication on their detail pages.</span>
            </label>
          )}
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
      {featureTarget && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !updatingHomepageFeature) {
              setFeatureTarget(null);
              setReplacementId("");
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="homepage-feature-title"
            className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl"
          >
            <h2 id="homepage-feature-title" className="text-lg font-bold">
              Replace a featured publication?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              The homepage already has four featured publications. Choose which one to remove so “{featureTarget.title}” can take its place.
            </p>
            <fieldset className="mt-4 max-h-64 space-y-2 overflow-y-auto">
              <legend className="sr-only">Choose a featured publication to replace</legend>
              {homepageFeatures.map((publication) => (
                <label key={publication._id} className="flex cursor-pointer items-start gap-3 rounded border p-3 text-sm hover:bg-muted/50">
                  <input
                    type="radio"
                    name="homepage-feature-replacement"
                    value={publication._id}
                    checked={replacementId === publication._id}
                    onChange={() => setReplacementId(publication._id)}
                    className="mt-1 accent-primary"
                  />
                  <span>
                    <span className="block font-semibold">{publication.title}</span>
                    <span className="mt-0.5 block text-xs text-muted-foreground">
                      {publication.kind === "report" ? "Report" : "Publication"}
                    </span>
                  </span>
                </label>
              ))}
            </fieldset>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                disabled={updatingHomepageFeature}
                onClick={() => {
                  setFeatureTarget(null);
                  setReplacementId("");
                }}
                className="rounded border px-4 py-2 text-sm font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!replacementId || updatingHomepageFeature}
                onClick={() => void updateHomepageFeature(featureTarget, true, replacementId)}
                className="rounded bg-primary px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
              >
                {updatingHomepageFeature ? "Updating..." : "Replace and feature"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
