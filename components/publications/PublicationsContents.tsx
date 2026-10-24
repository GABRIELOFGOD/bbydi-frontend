"use client";

import { FormEvent, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ContentItem } from "@/lib/content";

type Publication = ContentItem;

type PublicationFilters = {
  search: string;
  type: string;
  theme: string;
  year: string;
  language: string;
  sort: "newest" | "oldest" | "title";
};

const series = [
  { title: "Digital Democracy Initiative", year: "2026", count: 4 },
  { title: "Osun State Election", year: "2026", count: 2 },
  { title: "YVoteNaija", year: "2025", count: 5 },
  { title: "YouthGovTracka", year: "2025", count: 2 },
  { title: "Debt and Tax Justice Campaign", year: "2024", count: 2 },
  { title: "Information Pollution Research – Diagnostic Analysis", year: "2024", count: 2 },
  { title: "Changing the Narratives through EdTech and Research Project", year: "2023", count: 2 },
  { title: "EVIT", year: "2023", count: 2 },
  { title: "Gender-Based Violence Prevention and Advocacy in Kwara State", year: "Undated", count: 2 },
];

const coverThemes = [
  "from-slate-700 to-slate-950",
  "from-red-700 to-red-950",
  "from-neutral-800 to-black",
  "from-rose-700 to-red-950",
];

const publicationYear = (publication: Publication) => {
  if (!publication.date) return "";
  const date = new Date(publication.date);
  return Number.isNaN(date.getTime()) ? "" : String(date.getUTCFullYear());
};

const displayDate = (publication: Publication) => {
  if (!publication.date) return "";
  const date = new Date(publication.date);
  return Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-NG", { month: "short", year: "numeric", timeZone: "UTC" });
};

function PublicationCover({ publication, index, featured = false }: { publication: Publication; index: number; featured?: boolean }) {
  const year = publicationYear(publication);
  const type = publication.category || publication.type || "Publication";
  const gradient = coverThemes[index % coverThemes.length];

  return (
    <div className={`relative flex aspect-[3/4] w-full flex-col justify-between overflow-hidden rounded-sm border-t-4 border-white/40 bg-gradient-to-br ${gradient} p-4 text-white shadow-sm sm:p-5 ${featured ? "max-w-[18rem]" : ""}`}>
      {publication.image ? (
        <Image src={publication.image} alt="" fill unoptimized className="object-cover opacity-20" aria-hidden="true" />
      ) : null}
      <div className="relative z-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em]">BBYDI</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/75">{type}</p>
      </div>
      <div className="relative z-10">
        <p className="line-clamp-5 text-base font-extrabold leading-tight sm:text-lg">{publication.title}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/75">{year || "Knowledge product"}</p>
      </div>
    </div>
  );
}

function PublicationCard({ publication, index }: { publication: Publication; index: number }) {
  return (
    <article className="min-w-0">
      <Link href={`/publications/${encodeURIComponent(publication.slug || publication._id)}`} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary" aria-label={`Read ${publication.title}`}>
        <PublicationCover publication={publication} index={index} />
      </Link>
      <h3 className="mt-3 text-lg font-extrabold leading-snug">
        <Link href={`/publications/${encodeURIComponent(publication.slug || publication._id)}`} className="hover:text-primary">{publication.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{publication.category || publication.type || "Publication"}{displayDate(publication) ? ` · ${displayDate(publication)}` : ""}</p>
      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm font-bold">
        {publication.document
          ? <a href={publication.document} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Download PDF ↓</a>
          : <span className="text-muted-foreground">PDF coming soon</span>}
        <Link href={`/publications/${encodeURIComponent(publication.slug || publication._id)}`} className="text-primary hover:underline">Publication details</Link>
      </div>
    </article>
  );
}

const selectClasses = "h-12 w-full rounded-sm border border-gray-300 bg-white px-3 text-base outline-none focus:border-primary focus:ring-1 focus:ring-primary";
const initialFilters: PublicationFilters = { search: "", type: "", theme: "", year: "", language: "", sort: "newest" };

export default function PublicationsContents({ publications, reports = [] }: { publications: Publication[]; reports?: Publication[] }) {
  const [filters, setFilters] = useState<PublicationFilters>(initialFilters);
  const records = useMemo(() => {
    const unique = new Map<string, Publication>();
    [...publications, ...reports].forEach((item) => unique.set(item._id, item));
    return [...unique.values()];
  }, [publications, reports]);

  const latest = useMemo(
    () => [...records].sort((a, b) => new Date(b.date ?? b.createdAt ?? 0).getTime() - new Date(a.date ?? a.createdAt ?? 0).getTime()),
    [records],
  );
  const featured = latest.find((item) => item.featured) ?? latest[0];
  const types = [...new Set(records.map((item) => item.category || item.type).filter((value): value is string => Boolean(value)))].sort();
  const themes = [...new Set(records.map((item) => item.theme).filter((value): value is string => Boolean(value)))].sort();
  const years = [...new Set(records.map(publicationYear).filter(Boolean))].sort((a, b) => Number(b) - Number(a));
  const languages = [...new Set(records.map((item) => item.language).filter((value): value is string => Boolean(value)))].sort();
  const filtered = useMemo(() => {
    const search = filters.search.trim().toLocaleLowerCase();
    const result = records.filter((item) => {
      const searchable = [item.title, item.description, item.summary, item.category, item.type, item.theme, item.series, item.publisher]
        .filter(Boolean).join(" ").toLocaleLowerCase();
      return (!search || searchable.includes(search))
        && (!filters.type || (item.category || item.type) === filters.type)
        && (!filters.theme || item.theme === filters.theme)
        && (!filters.year || publicationYear(item) === filters.year)
        && (!filters.language || item.language === filters.language);
    });
    if (filters.sort === "title") return result.sort((a, b) => a.title.localeCompare(b.title));
    return result.sort((a, b) => {
      const difference = new Date(b.date ?? b.createdAt ?? 0).getTime() - new Date(a.date ?? a.createdAt ?? 0).getTime();
      return filters.sort === "newest" ? difference : -difference;
    });
  }, [filters, records]);
  const latestVisible = latest.filter((item) => item._id !== featured?._id).slice(0, 5);
  const hasFilters = Object.entries(filters).some(([key, value]) => key === "sort" ? value !== "newest" : Boolean(value));

  const clearFilters = (event?: FormEvent) => {
    event?.preventDefault();
    setFilters(initialFilters);
  };

  return (
    <>
      {featured && (
        <section className="bg-white px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-6xl">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Featured</p>
            <div className="grid items-center gap-6 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
              <PublicationCover publication={featured} index={0} featured />
              <div>
                <span className="inline-flex rounded-sm bg-primary/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-primary">
                  {featured.category || featured.type || "Publication"}{publicationYear(featured) ? ` · ${publicationYear(featured)}` : ""}
                </span>
                <h2 className="mt-3 max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">{featured.summary || featured.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {featured.link && <a href={featured.link} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90">Read online ▸</a>}
                  {featured.document && <a href={featured.document} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-primary px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">Download PDF ↓</a>}
                  <Link href={`/publications/${encodeURIComponent(featured.slug || featured._id)}`} className="rounded-sm border border-primary px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">Publication details</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="bg-[#f7f6f5] px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Latest publications</p>
          {latestVisible.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 xl:grid-cols-5">
              {latestVisible.map((item, index) => <PublicationCard key={item._id} publication={item} index={index + 1} />)}
            </div>
          ) : <p className="rounded-sm border bg-white p-5 text-sm text-muted-foreground">No publications have been added yet.</p>}
        </div>
      </section>

      <section className="bg-white px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Series</p>
          <div className="mb-3 mt-2 h-0.5 w-9 bg-primary" />
          <h2 className="text-2xl font-extrabold sm:text-3xl">Publications that run across a programme</h2>
          <p className="mt-2 max-w-2xl text-base leading-7 text-muted-foreground">Where a programme has produced more than one knowledge product, they are grouped as a series — so you can see the latest and everything that came before it.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {series.map((item) => (
              <article key={item.title} className="flex min-h-24 flex-col justify-between border border-gray-200 p-4">
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-primary">Series</p>
                  <h3 className="mt-1 text-lg font-extrabold leading-snug">{item.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">Latest edition: <strong className="text-foreground">{item.year}</strong><br /><strong className="text-foreground">{item.count}</strong> publications</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="all-publications" className="scroll-mt-20 bg-[#f7f6f5] px-5 py-10 sm:py-14">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary">All publications</p>
          <div className="mb-4 mt-2 h-0.5 w-9 bg-primary" />
          <form onSubmit={clearFilters} className="space-y-3">
            <label className="block space-y-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Search
              <input value={filters.search} onChange={(event) => setFilters((current) => ({ ...current, search: event.target.value }))} placeholder="Search publications, themes, and series" className={selectClasses} />
            </label>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[repeat(5,minmax(0,1fr))_auto]">
              <label className="space-y-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Type
                <select value={filters.type} onChange={(event) => setFilters((current) => ({ ...current, type: event.target.value }))} className={selectClasses}>
                  <option value="">All types</option>{types.map((type) => <option key={type} value={type}>{type}</option>)}
                </select>
              </label>
              <label className="space-y-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Theme
                <select value={filters.theme} onChange={(event) => setFilters((current) => ({ ...current, theme: event.target.value }))} className={selectClasses}>
                  <option value="">All themes</option>{themes.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
                </select>
              </label>
              <label className="space-y-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Year
                <select value={filters.year} onChange={(event) => setFilters((current) => ({ ...current, year: event.target.value }))} className={selectClasses}>
                  <option value="">All years</option>{years.map((year) => <option key={year} value={year}>{year}</option>)}
                </select>
              </label>
              <label className="space-y-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Language
                <select value={filters.language} onChange={(event) => setFilters((current) => ({ ...current, language: event.target.value }))} className={selectClasses}>
                  <option value="">All languages</option>{languages.map((language) => <option key={language} value={language}>{language}</option>)}
                </select>
              </label>
              <label className="space-y-1.5 text-sm font-bold uppercase tracking-wide text-muted-foreground">Sort
                <select value={filters.sort} onChange={(event) => setFilters((current) => ({ ...current, sort: event.target.value as PublicationFilters["sort"] }))} className={selectClasses}>
                  <option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option>
                </select>
              </label>
              <button type="submit" disabled={!hasFilters} className="mt-5 h-12 rounded-sm border border-primary px-4 text-sm font-bold text-primary hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-50">Clear filters</button>
            </div>
          </form>
          <p className="mb-4 mt-4 text-sm text-muted-foreground">Showing {filtered.length} of {records.length} publications</p>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {filtered.map((item, index) => <PublicationCard key={item._id} publication={item} index={index} />)}
            </div>
          ) : <p className="rounded-sm border bg-white p-8 text-center text-sm text-muted-foreground">No publications match these filters. Try a different search or clear the filters.</p>}
        </div>
      </section>
    </>
  );
}
