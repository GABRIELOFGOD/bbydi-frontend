import NewsEditorPage from "@/components/dashboard/NewsEditorPage";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <NewsEditorPage newsId={id} />;
}
