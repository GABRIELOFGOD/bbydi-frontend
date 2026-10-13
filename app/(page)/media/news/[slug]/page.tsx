import NewsArticle from "@/components/news/NewsArticle";

export default async function NewsArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NewsArticle id={slug} />;
}
