"use client"

import Link from 'next/link';
import Container from '../Container';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Projects } from '@/lib/constants';
import ProjectCard from '../ui/ProjectCard';
import { ProjectCardTypes } from '@/lib/types';

const ProjectCategories = [
  {
    id: 1,
    name: "All",
    param: ""
  },
  {
    id: 2,
    name: "Governance",
    param: "governance"
  },
  {
    id: 3,
    name: "Education",
    param: "education"
  },
  {
    id: 4,
    name: "Gender",
    param: "gender"
  },
  {
    id: 5,
    name: "Climate",
    param: "climate"
  },
  {
    id: 6,
    name: "Digital",
    param: "digital"
  }
]

const ProjectsContainer = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [mappableProjects, setMappableProjects] = useState<ProjectCardTypes[]>(Projects);

  const params = useSearchParams().get("category");

  useEffect(() => {
    setActiveCategory(params || "");
    if (activeCategory === "" || null) {
      setMappableProjects(Projects);
    } else {
      setMappableProjects(Projects.filter(proj => proj.category === params));
    }
  }, [params])
  
  return (
    <Container className="py-20 flex flex-col gap-10">
        <div className="max-w-full overflow-x-auto">
          <div className="flex gap-2">
            {ProjectCategories.map((prodCat) => (
              <Link
                key={prodCat.id}
                href={prodCat.param == "" ? "/projects" : `?category=${prodCat.param}`}
                className={cn("py-1.75 px-4 text-primary font-semibold text-sm rounded border border-primary bg-transparent", activeCategory === prodCat.param && "bg-primary text-white")}
              >{prodCat.name}</Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {mappableProjects.map((project) => (
            <ProjectCard
              key={project.id}
              {...project}
            />
          ))}
        </div>
      </Container>
  )
}

export default ProjectsContainer;