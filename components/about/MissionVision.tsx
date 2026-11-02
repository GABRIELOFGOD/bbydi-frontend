import { MissionVisionApproach } from "@/lib/constants";
import Container from "../Container";
import MissionVisionCard from "../ui/MissionVisionCard";

const MissionVision = () => {
  return (
    <div id="mission-vision" className="w-full scroll-mt-24 bg-muted flex py-20 gap-5">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {MissionVisionApproach.map((item) => (
          <MissionVisionCard key={item.id} {...item} />
        ))}
      </Container>
    </div>
  )
}

export default MissionVision;