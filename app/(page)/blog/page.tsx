import type { Metadata } from "next";
import BlogIndex from "@/components/blog/BlogIndex";
import { fetchPublicApi, PublicContentItem } from "@/lib/publicContent";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog — Analysis, opinion and field notes",
  description: "Read analysis, opinion, field notes, explainers and commentary from Brain Builders Youth Development Initiative.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    title: "The BBYDI Blog",
    description: "Analysis and stories on inclusive governance, youth empowerment and gender equality in Nigeria.",
  },
};

export default async function BlogPage() {
  const posts = await fetchPublicApi<PublicContentItem[]>("/content/blog");
  return <BlogIndex initialPosts={posts ?? []} />;
}
