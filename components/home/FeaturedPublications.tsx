"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import { ContentItem } from "@/lib/content";
import { PublicationType } from "@/lib/types";
import { usePublicContent } from "@/lib/usePublicContent";

const mapPublication = (item: ContentItem): PublicationType & {
  kind: string;
  category?: string;
  date?: string;
  slug?: string;
  image?: string;
  homepageFeatured?: boolean;
} => ({
  id: item._id,
  title: item.title,
  desc: item.description ?? item.summary ?? "",
  text: item.category || item.type || (item.kind === "report" ? "Research report" : "Policy brief"),
  fileUrl: item.document,
  kind: item.kind,
  category: item.category || item.type,
  date: item.date,
  slug: item.slug,
  image: item.image,
  homepageFeatured: item.homepageFeatured,
});

const yearFor = (date?: string) => {
  if (!date) return "";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : parsed.getUTCFullYear().toString();
};

function PublicationTile({
  publication,
  index,
}: {
  publication: ReturnType<typeof mapPublication>;
  index: number;
}) {
  const year = yearFor(publication.date);
  const detailHref = `/publications/${encodeURIComponent(publication.slug || publication.id)}`;
  const cardTone = index === 3 ? "from-red-700 to-red-950" : "from-slate-700 to-slate-950";

  return (
    <article className="min-w-0">
      <Link
        href={detailHref}
        className={`relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-sm border-t-4 border-white/40 bg-gradient-to-br ${cardTone} p-4 text-white shadow-sm transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary sm:p-5`}
      >
        {publication.image && (
          <Image
            src={publication.image}
            alt=""
            fill
            unoptimized
            className="object-cover opacity-20"
            aria-hidden="true"
          />
        )}
        <div className="relative z-10">
          <p className="text-[9px] font-extrabold uppercase tracking-[0.2em]">BBYDI</p>
          <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-white/75">
            {publication.text || "Publication"}
          </p>
        </div>
        <div className="relative z-10">
          <p className="line-clamp-5 text-sm font-extrabold leading-tight">{publication.title}</p>
          {year && <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/75">{year}</p>}
        </div>
      </Link>
      <h3 className="mt-3 text-sm font-extrabold leading-snug">
        <Link href={detailHref} className="hover:text-primary">{publication.title}</Link>
      </h3>
      <p className="mt-2 text-xs text-muted-foreground">
        {publication.text || "Publication"}{year ? ` · ${year}` : ""}
      </p>
      {publication.fileUrl && (
        <a
          href={publication.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs font-bold text-primary hover:underline"
        >
          Download PDF ↓
        </a>
      )}
    </article>
  );
}

export default function FeaturedPublications() {
  const { items: publications } = usePublicContent("publication", [], mapPublication);
  const { items: reports } = usePublicContent("report", [], mapPublication);
  const allItems = [...publications, ...reports];
  const featuredItems = allItems.filter((item) => item.homepageFeatured).slice(0, 4);

  return (
    <section className="w-full bg-muted">
      <Container className="flex flex-col py-16">
        <SectionTitle title="Research & policy" />
        <div className="mt-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <ColumnTitle text="Evidence we generated ourselves" className="text-4xl leading-tight" />
          <Link
            href="/publications"
            className="inline-flex h-11 items-center justify-center rounded-sm border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            All {allItems.length || 105} publications
          </Link>
        </div>
        {featuredItems.length > 0 && (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredItems.map((publication, index) => (
              <PublicationTile key={publication.id} publication={publication} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
