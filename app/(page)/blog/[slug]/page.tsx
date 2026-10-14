import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NewsArticle from "@/components/news/NewsArticle";
import { fetchPublicApi, plainText, publicPageUrl, PublicContentItem } from "@/lib/publicContent";

type PageProps = { params: Promise<{ slug: string }> };

async function getBlogPost(slug: string) {
  return fetchPublicApi<PublicContentItem>(`/content/blog/${encodeURIComponent(slug)}`);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Blog post not found", robots: { index: false, follow: false } };
  const description = plainText(post.summary || post.description || "").slice(0, 300);
  const canonical = `/blog/${encodeURIComponent(post.slug || slug)}`;
  return {
    title: post.title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: post.title,
      description,
      url: canonical,
      ...(post.image ? { images: [{ url: post.image, alt: post.imageCaption || post.title }] } : {}),
      ...(post.date || post.createdAt ? { publishedTime: post.date || post.createdAt } : {}),
      ...((post.postedBy?.name || post.publisher) ? { authors: [post.postedBy?.name || post.publisher || ""] } : {}),
      ...(post.category ? { section: post.category } : {}),
    },
    twitter: {
      card: post.image ? "summary_large_image" : "summary",
      title: post.title,
      description,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: plainText(post.summary || post.description || ""),
    image: post.image,
    datePublished: post.date || post.createdAt,
    author: post.postedBy || post.publisher
      ? { "@type": "Person", name: post.postedBy?.name || post.publisher, jobTitle: post.postedBy?.position || post.authorRole }
      : { "@type": "Organization", name: "Brain Builders Youth Development Initiative" },
    publisher: { "@type": "Organization", name: "Brain Builders Youth Development Initiative" },
    mainEntityOfPage: publicPageUrl(`/blog/${encodeURIComponent(post.slug || slug)}`),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <NewsArticle id={slug} kind="blog" initialArticle={post} />
    </>
  );
}
