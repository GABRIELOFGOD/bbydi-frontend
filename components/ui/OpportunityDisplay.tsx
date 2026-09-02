import { TopOpportunities } from "@/lib/constants";
import OpportunityCard from "./OpportunityCard";
import Container from "../Container";

const OpportunityDisplay = () => {
  return (
    <Container className="flex flex-col gap-5 py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {TopOpportunities.map((top) => (
          <OpportunityCard
            key={top.id}
            // image={top.image}
            // status={top.status}
            // title={top.title}
            // desc={top.desc || ""}
            // link={top.link}
            // id={top.id}
            {...top}
          />
        ))}
      </div>
    </Container>
  )
}

export default OpportunityDisplay;