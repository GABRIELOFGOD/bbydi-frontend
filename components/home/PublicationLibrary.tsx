"use client";

import { cn } from "@/lib/utils";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import { Publications } from "@/lib/constants";
import PublicationCard from "../ui/PublicationCard";
import { ContentItem } from "@/lib/content";
import { PublicationType } from "@/lib/types";
import { usePublicContent } from "@/lib/usePublicContent";

const mapPublication = (item: ContentItem): PublicationType => ({
  id: item._id,
  title: item.title,
  desc: item.description ?? item.summary ?? "",
  text: item.type,
  fileUrl: item.document,
});

const PublicationLibrary = () => {
  const { items: publications } = usePublicContent("publication", Publications, mapPublication);
  const { items: reports } = usePublicContent("report", [], mapPublication);
  const featuredReport =
    reports.find((report) => report.title === "Technology, Artificial Intelligence and Civic Engagement in Africa")
    ?? reports[0];
  const additionalReports = reports.filter((report) => report.id !== featuredReport?.id);

  return (
    <div id="publications" className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-10">
        <SectionTitle title="Publication Library" />
        <ColumnTitle text="Reports, toolkits & briefs" />

        {featuredReport && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="my-auto flex flex-col gap-4">
              <p className={cn("w-fit rounded bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase text-primary")}>{featuredReport.desc || "Featured report"}</p>
              <h3 className="text-2xl font-extrabold">{featuredReport.title}</h3>
              {featuredReport.fileUrl ? (
                <a href={featuredReport.fileUrl} target="_blank" rel="noreferrer" className="w-fit rounded border border-primary px-5 py-3 font-semibold text-primary hover:bg-primary/10">Download report</a>
              ) : (
                <p className="text-sm text-muted-foreground">Download file not available yet.</p>
              )}
            </div>
            <Image src="/images/publication.jpg" alt={featuredReport.title} width={500} height={500} className="rounded" />
          </div>
        )}

        {additionalReports.length > 0 && (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {additionalReports.map((report) => <PublicationCard key={report.id} {...report} />)}
          </div>
        )}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {publications.map((publication) => <PublicationCard key={publication.id} {...publication} />)}
        </div>
      </Container>
    </div>
  );
};

export default PublicationLibrary;
