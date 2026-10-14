import NewsEditorPage from "@/components/dashboard/NewsEditorPage";

export default async function EditBlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NewsEditorPage newsId={id} kind="blog" />;
}
