import Link from "next/link";
import Container from "../Container";
import { Button } from "../ui/button";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import { Projects } from "@/lib/constants";
import ProjectCard from "../ui/ProjectCard";
import { ProjectCardTypes } from "@/lib/types";

const CurrentProjects = () => {
  return (
    <Container className="flex flex-col gap-5 py-20">
      <SectionTitle title="Current projects" />
      <div className="flex justify-between">
        <ColumnTitle text="Work in the field right now" />
        <Link href={"projects"}>
          <Button className="w-fit my-auto mt-5 p-6 rounded bg-transparent hover:bg-primary/10 border-2 border-primary text-primary font-bold">
            All projects
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {Projects.slice(0, 3).map((project: ProjectCardTypes) => (
          <ProjectCard
            category={project.category}
            context={project.context}
            desc={project.desc}
            id={project.id}
            image={project.image}
            status={project.status}
            title={project.title}
            key={project.id}
          />
        ))}
      </div>
    </Container>
  )
}

export default CurrentProjects;