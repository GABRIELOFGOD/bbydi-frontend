"use client"

import Link from 'next/link';
import Container from '../Container';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Projects } from '@/lib/constants';
import ProjectCard from '../ui/ProjectCard';
import { ProjectCardTypes } from '@/lib/types';
import { usePublicContent } from '@/lib/usePublicContent';
import { ContentItem } from '@/lib/content';
import { slugify } from "@/lib/utils";
import { ProgrammingAreas } from "@/lib/constants";

const getProjectStatus = (status: string) =>
  status.toLowerCase() === "completed" ? "completed" : "active";

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

const ProjectsContainer = () => {
  const { items: projects } = usePublicContent("project", Projects, mapProject);
  const searchParams = useSearchParams();
  const activeTheme = searchParams.get("theme") ?? searchParams.get("category") ?? "";
  const activeStatus = searchParams.get("status") ?? "";
  const statusCounts = projects.reduce(
    (counts, project) => {
      counts[getProjectStatus(project.status)] += 1;
      return counts;
    },
    { active: 0, completed: 0 },
  );
  const filteredProjects = projects.filter((project) => {
    const matchesStatus = !activeStatus || getProjectStatus(project.status) === activeStatus;
    const area = ProgrammingAreas.find((program) => program.project === activeTheme);
    const matchesTheme =
      !activeTheme ||
      Boolean(
        area &&
          (project.thematicAreas?.some(
            (thematicArea) => thematicArea.toLowerCase() === area.title.toLowerCase(),
          ) ||
            project.category.toLowerCase() === area.project.toLowerCase()),
      );
    return matchesStatus && matchesTheme;
  });
  const filterHref = (status: string, theme: string) => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (theme) params.set("theme", theme);
    const query = params.toString();
    return query ? `/projects?${query}` : "/projects";
  };
  
  return (
    <Container className="flex flex-col gap-7 py-12 md:py-20">
        <div className="flex flex-wrap gap-2">
          {[
            { label: `All (${projects.length})`, value: "" },
            { label: `Active (${statusCounts.active})`, value: "active" },
            { label: `Completed (${statusCounts.completed})`, value: "completed" },
          ].map((status) => (
            <Link
              key={status.value || "all"}
              href={filterHref(status.value, activeTheme)}
              aria-current={activeStatus === status.value ? "page" : undefined}
              className={cn(
                "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                activeStatus === status.value
                  ? "border-[#191919] bg-[#191919] text-white"
                  : "border-black/15 bg-white text-foreground hover:border-black/40",
              )}
            >
              {status.label}
            </Link>
          ))}
        </div>

        <nav aria-label="Filter projects by thematic area" className="flex flex-wrap gap-2">
          <Link
            href={filterHref(activeStatus, "")}
            aria-current={!activeTheme ? "page" : undefined}
            className={cn(
              "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
              !activeTheme
                ? "border-[#191919] bg-[#191919] text-white"
                : "border-black/15 bg-white text-foreground hover:border-black/40",
            )}
          >
            All projects
          </Link>
          {ProgrammingAreas.map((area) => (
              <Link
                key={area.project}
                href={filterHref(activeStatus, area.project)}
                aria-current={activeTheme === area.project ? "page" : undefined}
                className={cn(
                  "rounded-full border px-5 py-2 text-sm font-semibold transition-colors",
                  activeTheme === area.project
                    ? "border-[#191919] bg-[#191919] text-white"
                    : "border-black/15 bg-white text-foreground hover:border-black/40",
                )}
              >
                {area.title}
              </Link>
          ))}
        </nav>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 items-stretch gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
          </div>
        ) : (
          <p className="rounded-sm border border-dashed border-black/20 p-6 text-sm text-muted-foreground">
            No projects match the selected filters.
          </p>
        )}
      </Container>
  )
}

export default ProjectsContainer;