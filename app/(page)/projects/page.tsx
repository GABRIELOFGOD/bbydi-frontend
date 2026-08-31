import ProjectsContainer from "@/components/project/ProjectsContainer";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "A browsable record of what BBYDI is delivering, where, with whom, and what it has changed."
}

const ProjectsPage = () => {
  return (
    <div>
      <PageHeader
        header="Current Projects"
        page="Projects"
        description="A browsable record of what BBYDI is delivering, where, with whom, and what it has changed."
      />

      <ProjectsContainer />
    </div>
  )
}

export default ProjectsPage;