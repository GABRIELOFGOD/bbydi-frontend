import { MissionVisionApproach } from "@/lib/constants";
import Container from "../Container";
import MissionVisionCard from "../ui/MissionVisionCard";

const MissionVision = () => {
  return (
    <div className="w-full bg-muted flex py-20 gap-5">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MissionVisionApproach.map((item) => (
          <MissionVisionCard key={item.id} {...item} />
        ))}
      </Container>
    </div>
  )
}

export default MissionVision;