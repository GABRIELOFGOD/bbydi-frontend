import ProjectsContainer from "@/components/project/ProjectsContainer";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "A browsable record of what BBYDI is delivering, where, with whom, and what it has changed.",
  alternates: { canonical: "/projects" },
}

const ProjectsPage = () => {
  return (
    <div>
      <PageHeader
        header="Projects"
        page="Projects"
        description="Everything BBYDI is running now, and the work already closed out. Filter by thematic area or by status."
      />

      <Suspense fallback={null}>
        <ProjectsContainer />
      </Suspense>
    </div>
  )
}

export default ProjectsPage;