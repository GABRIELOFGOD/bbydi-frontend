import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import NewsShareButtons from "@/components/news/NewsShareButtons";
import { fetchPublicApi, plainText, publicPageUrl, PublicContentItem } from "@/lib/publicContent";

type PageProps = { params: Promise<{ slug: string }> };

const getPublication = async (slug: string) => {
  const encodedSlug = encodeURIComponent(slug);
  const [publication, report] = await Promise.all([
    fetchPublicApi<PublicContentItem>(`/content/publication/${encodedSlug}`),
    fetchPublicApi<PublicContentItem>(`/content/report/${encodedSlug}`),
  ]);
  return publication ?? report;
};

const yearFor = (item: PublicContentItem) => {
  const date = item.date || item.createdAt;
  return date && !Number.isNaN(new Date(date).getTime())
    ? new Date(date).getUTCFullYear().toString()
    : "";
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const publication = await getPublication(slug);
  if (!publication) return { title: "Publication not found", robots: { index: false, follow: false } };

  const description = plainText(publication.summary || publication.description || "").slice(0, 300);
  const canonical = `/publications/${encodeURIComponent(publication.slug || slug)}`;
  return {
    title: publication.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: publication.title,
      description,
      url: canonical,
      ...(publication.image ? { images: [{ url: publication.image, alt: publication.imageCaption || publication.title }] } : {}),
      ...(publication.date || publication.createdAt ? { publishedTime: publication.date || publication.createdAt } : {}),
    },
    twitter: {
      card: publication.image ? "summary_large_image" : "summary",
      title: publication.title,
      description,
      ...(publication.image ? { images: [publication.image] } : {}),
    },
  };
}

function PublicationCover({ publication }: { publication: PublicContentItem }) {
  return (
    <div className="relative flex aspect-[3/4] w-full max-w-44 flex-col justify-between overflow-hidden rounded-sm border-t-4 border-white/40 bg-gradient-to-br from-slate-700 to-slate-950 p-5 text-white shadow-sm">
      <div>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em]">BBYDI</p>
        <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white/75">{publication.category || publication.type || "Publication"}</p>
      </div>
      <div>
        <p className="line-clamp-6 text-base font-extrabold leading-tight">{publication.title}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.18em] text-white/75">{yearFor(publication) || "Knowledge product"}</p>
      </div>
    </div>
  );
}

function RelatedCard({ publication }: { publication: PublicContentItem }) {
  return (
    <article className="min-w-0">
      <Link href={`/publications/${encodeURIComponent(publication.slug || publication._id)}`} className="block">
        <PublicationCover publication={publication} />
      </Link>
      <h3 className="mt-3 text-base font-bold leading-snug">
        <Link href={`/publications/${encodeURIComponent(publication.slug || publication._id)}`} className="hover:text-primary">{publication.title}</Link>
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{publication.category || publication.type || "Publication"}{yearFor(publication) ? ` · ${yearFor(publication)}` : ""}</p>
      {publication.document && <a href={publication.document} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-sm font-bold text-primary hover:underline">Download PDF ↓</a>}
    </article>
  );
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const publication = await getPublication(slug);
  if (!publication) notFound();

  const [publications, reports] = await Promise.all([
    fetchPublicApi<PublicContentItem[]>("/content/publication"),
    fetchPublicApi<PublicContentItem[]>("/content/report"),
  ]);
  const relatedItems = [...(publications ?? []), ...(reports ?? [])]
    .filter((item) => item._id !== publication._id);
  const sameSeries = publication.series
    ? relatedItems.filter((item) => item.series === publication.series).slice(0, 4)
    : [];
  const relatedByTheme = publication.theme
    ? relatedItems.filter((item) => item.theme === publication.theme && !sameSeries.some((seriesItem) => seriesItem._id === item._id)).slice(0, 4)
    : [];
  const schema = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: publication.title,
    description: plainText(publication.summary || publication.description || ""),
    datePublished: publication.date || publication.createdAt,
    inLanguage: publication.language,
    author: publication.publisherUser
      ? { "@type": "Person", name: publication.publisherUser.name }
      : { "@type": "Organization", name: publication.publisher || "Brain Builders Youth Development Initiative" },
    publisher: { "@type": "Organization", name: "Brain Builders Youth Development Initiative" },
    mainEntityOfPage: publicPageUrl(`/publications/${encodeURIComponent(publication.slug || slug)}`),
  };
  const year = yearFor(publication);
  const details = [
    ["Type", publication.category || publication.type],
    ["Theme", publication.theme],
    ["Programme", publication.series],
    ["Author / contributor", publication.publisherUser?.name || publication.publisher],
    ["Format", publication.document ? "PDF" : undefined],
    ["Language", publication.language],
    ["Access", publication.document || publication.link ? "Public — free to access" : "Contact BBYDI to request a copy"],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <header className="bg-[#191919] px-5 py-8 text-white sm:py-10">
        <div className="mx-auto max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-2 text-sm text-white/55">
            <Link href="/" className="hover:text-white">Home</Link><span>/</span>
            <Link href="/publications" className="hover:text-white">Publications</Link><span>/</span>
            <span>{publication.category || publication.type || "Publication"}</span>
          </nav>
          <span className="inline-block bg-primary px-2 py-1 text-xs font-bold uppercase tracking-widest">
            {publication.category || publication.type || "Publication"}
          </span>
          <h1 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">{publication.title}</h1>
          {year && <p className="mt-4 text-xs font-bold uppercase tracking-widest text-white/50">Published: {year}</p>}
        </div>
      </header>

      <main className="mx-auto grid w-full max-w-5xl gap-8 px-5 py-12 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-7 sm:py-16">
        <PublicationCover publication={publication} />
        <div className="min-w-0">
          <p className="text-base leading-7 text-muted-foreground">{plainText(publication.summary || publication.description || "Publication details have not been added yet.")}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {publication.link && <a href={publication.link} target="_blank" rel="noopener noreferrer" className="rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary/90">Read online ▸</a>}
            {publication.document && <a href={publication.document} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-primary px-4 py-2.5 text-sm font-bold text-primary hover:bg-primary/5">Download PDF ↓</a>}
            {!publication.link && !publication.document && <p className="text-sm text-muted-foreground">The publication file is not available online yet.</p>}
          </div>
          <dl className="mt-5 divide-y border-y">
            {details.map(([label, value]) => (
              <div key={label} className="grid gap-1 py-2.5 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4">
                <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">{label}</dt>
                <dd className="text-sm text-foreground">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="text-sm text-muted-foreground">Share:</span>
            <NewsShareButtons title={publication.title} />
          </div>
        </div>
      </main>

      {sameSeries.length > 0 && (
        <section className="bg-[#f7f6f5] px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">More in this series</p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {sameSeries.map((item) => <RelatedCard key={item._id} publication={item} />)}
            </div>
          </div>
        </section>
      )}

      {relatedByTheme.length > 0 && (
        <section className="px-5 py-10 sm:py-14">
          <div className="mx-auto max-w-5xl">
            <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.2em] text-primary">Related by theme</p>
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
              {relatedByTheme.map((item) => <RelatedCard key={item._id} publication={item} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
