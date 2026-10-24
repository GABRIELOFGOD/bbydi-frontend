import type { Metadata } from "next";
import PublicationsContents from '@/components/publications/PublicationsContents';
import { fetchPublicApi, PublicContentItem } from "@/lib/publicContent";
import PageHeader from "@/components/ui/PageHeader";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Publications — Research, policy briefs and toolkits",
  description: "Explore BBYDI research reports, policy briefs, toolkits and training materials on governance, elections, gender justice, digital rights and education.",
  alternates: { canonical: "/publications" },
  openGraph: {
    type: "website",
    title: "BBYDI Publications",
    description: "Research reports, policy briefs, toolkits and training resources from Brain Builders Youth Development Initiative.",
  },
};

const Publications = async () => {
  const [publications, reports] = await Promise.all([
    fetchPublicApi<PublicContentItem[]>("/content/publication"),
    fetchPublicApi<PublicContentItem[]>("/content/report"),
  ]);
  const allItems = [...(publications ?? []), ...(reports ?? [])];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "BBYDI Publications",
    description: "Research reports, policy briefs, toolkits and training materials.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: allItems.length,
      itemListElement: allItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.title,
        url: item.slug ? `/publications/${encodeURIComponent(item.slug)}` : undefined,
      })),
    },
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList).replace(/</g, "\\u003c") }} />
      <PageHeader
        page="Publications"
        header="BBYDI Publications"
        description="Research reports, policy briefs, toolkits and training materials. 67 knowledge products, all free to access."
      />
      <PublicationsContents publications={publications ?? []} reports={reports ?? []} />
    </div>
  )
}

export default Publications;