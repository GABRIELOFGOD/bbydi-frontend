import type { Metadata } from "next";
import NewsArticle from "@/components/news/NewsArticle";
import { fetchPublicApi, plainText, publicPageUrl, PublicContentItem } from "@/lib/publicContent";

type PageProps = { params: Promise<{ slug: string }> };

async function getNewsArticle(slug: string) {
  return fetchPublicApi<PublicContentItem>(`/content/news/${encodeURIComponent(slug)}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return { title: "News article not found", robots: { index: false, follow: false } };
  const description = plainText(article.summary || article.description || "").slice(0, 300);
  const canonical = `/media/news/${encodeURIComponent(article.slug || slug)}`;
  return {
    title: article.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: article.title,
      description,
      url: canonical,
      ...(article.image ? { images: [{ url: article.image, alt: article.imageCaption || article.title }] } : {}),
      ...(article.date || article.createdAt ? { publishedTime: article.date || article.createdAt } : {}),
      ...(article.postedBy?.name ? { authors: [article.postedBy.name] } : {}),
      ...(article.category ? { section: article.category } : {}),
    },
    twitter: {
      card: article.image ? "summary_large_image" : "summary",
      title: article.title,
      description,
      ...(article.image ? { images: [article.image] } : {}),
    },
  };
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getNewsArticle(slug);
  if (!article) return <NewsArticle id={slug} />;
  const schema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: plainText(article.summary || article.description || ""),
    image: article.image,
    datePublished: article.date || article.createdAt,
    author: article.postedBy ? { "@type": "Person", name: article.postedBy.name } : { "@type": "Organization", name: "Brain Builders Youth Development Initiative" },
    publisher: { "@type": "Organization", name: "Brain Builders Youth Development Initiative" },
    mainEntityOfPage: publicPageUrl(`/media/news/${encodeURIComponent(article.slug || slug)}`),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <NewsArticle id={slug} initialArticle={article} />
    </>
  );
}
