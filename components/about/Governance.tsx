import { Policies } from "@/lib/constants";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import PublicationCard from "../ui/PublicationCard";

const Governance = () => {
  return (
    <div>
      <Container className="flex flex-col gap-5  py-20">
        <SectionTitle title="Governance" />
        <ColumnTitle text="How BBYDI is governed" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div></div>
          <div className="flex flex-col gap-3">
            <h2 className="text-gray-500 uppercase text-xs font-semibold">Policies & safeguards</h2>
            <div className="flex flex-col gap-3">
              {Policies.map((policy) => (
                <PublicationCard
                  key={policy.id}
                  desc="Placeholder · to upload"
                  title={policy.title}
                  id={policy.id}                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Governance;