import NewsRoom from "@/components/home/NewsRoom";
import PublicationLibrary from "@/components/home/PublicationLibrary";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media & Publications",
  description: "News, reports, toolkits and resources — the searchable archive that makes an organisation citable.",
};

const MediaPage = () => {
  return (
    <div>
      <PageHeader
        page="Media & Publications"
        header="Media & Publications"
        description="News, reports, toolkits and resources — the searchable archive that makes an organisation citable."
      />
      <NewsRoom />
      <PublicationLibrary />
    </div>
  )
}

export default MediaPage;