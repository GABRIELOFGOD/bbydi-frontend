import { AccountabilityData } from "@/lib/constants";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import PublicationCard from "../ui/PublicationCard";
import SectionTitle from "../ui/SectionTitle";

const Accountability = () => {
  return (
    <div>
      <Container className="flex flex-col gap-5 py-20">
        <SectionTitle title="Accountability" />
        <ColumnTitle text="Annual reports & audited accounts" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {AccountabilityData.map((year) => (
            <PublicationCard
              key={year.text}
              desc="To publish"
              title={year.topic}
              id={year.text}
              text={year.text}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Accountability;