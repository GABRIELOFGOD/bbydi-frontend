import OpportunityDisplay from "@/components/ui/OpportunityDisplay";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grants & Opportunities",
  description: "Open calls, fellowships, training cohorts and vacancies — one place people can be sent to, and come back to."
};

const Opportunities = () => {
  return (
    <div>
      <PageHeader
        header="Grants & Opportunities"
        page="Opportunities"
        description="Open calls, fellowships, training cohorts and vacancies — one place people can be sent to, and come back to."
      />

      <OpportunityDisplay />
    </div>
  )
}

export default Opportunities;