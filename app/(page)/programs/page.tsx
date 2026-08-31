import Container from "@/components/Container";
import PageHeader from "@/components/ui/PageHeader";
import ProgramCard from "@/components/ui/ProgramCard";
import { ProgrammingAreas } from "@/lib/constants";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programming Areas",
  description: "Seven domains, one theory of change: when young people and women hold information, skills and a seat at the table, governance improves and development follows.",
};

const ProgramsPage = () => {
  return (
    <div>
      <PageHeader
        header="Programming Areas"
        page="Programming Areas"
        description="Seven domains, one theory of change: when young people and women hold information, skills and a seat at the table, governance improves and development follows."
      />

      <Container className="flex flex-col gap-5 py-20">
        <div className="flex flex-col gap-10">
          {ProgrammingAreas.map((project) => (
            <ProgramCard
              key={project.sn}
              {...project}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default ProgramsPage;