"use client";

import Link from "next/link";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import { Projects } from "@/lib/constants";
import ProjectCard from "../ui/ProjectCard";
import { ProjectCardTypes } from "@/lib/types";
import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import { slugify } from "@/lib/utils";

const mapProject = (item: ContentItem): ProjectCardTypes => ({
  id: item._id,
  slug: item.slug || `${slugify(item.title)}-${item._id}`,
  category: item.category ?? "",
  status: item.status ?? "",
  title: item.title,
  context: item.context ?? item.description ?? "",
  desc: item.summary ?? "",
  image: item.image,
  period: item.period,
  funder: item.funder,
  location: item.location,
  thematicAreas: item.thematicAreas,
  on2026Register: item.on2026Register,
});

const CurrentProjects = () => {
  const { items: projects } = usePublicContent("project", Projects, mapProject);
  return (
    <Container className="flex flex-col gap-5 py-20">
      <SectionTitle title="Current projects" />
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h2 className="text-2xl font-bold leading-tight md:text-3xl">
          Work in the field right now
        </h2>
        <Link
          href="/projects"
          className="inline-flex h-11 w-fit items-center justify-center rounded-sm border-2 border-primary bg-transparent px-6 text-sm font-bold text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
        >
          Full project archive
        </Link>
      </div>
      <p className="text-sm leading-6 text-muted-foreground">
        22 projects are running now. 4 more are closed out and kept in the project archive.
      </p>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 6).map((project: ProjectCardTypes) => (
          <ProjectCard
            {...project}
            key={project.id}
          />
        ))}
      </div>
    </Container>
  )
}

export default CurrentProjects;