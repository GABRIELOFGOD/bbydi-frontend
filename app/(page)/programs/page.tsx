import ProgramsList from "@/components/programs/ProgramsList";
import InnovationsSection from "@/components/programs/InnovationsSection";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Programming Areas",
  description: "Seven domains, one theory of change: when young people and women hold information, skills and a seat at the table, governance improves and development follows.",
  alternates: { canonical: "/programs" },
};

const ProgramsPage = () => {
  return (
    <div>
      <PageHeader
        header="Programming Areas"
        page="Programming Areas"
        description="Seven domains, one theory of change: when young people and women hold information, skills and a seat at the table, governance improves and development follows."
      />

      <ProgramsList />
      <InnovationsSection />
    </div>
  )
}

export default ProgramsPage;