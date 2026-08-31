import { AdminTeamData, StaffTeamData } from "@/lib/team";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import AdminTeamCard from "../ui/AdminTeamCard";
import StaffTeamCard from "../ui/StaffTeamCard";

const OurTeam = () => {
  return (
    <div className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-5">
        <SectionTitle title="Our team" />
        <div className="flex flex-col gap-5 w-full md:w-175">
          <ColumnTitle text="People behind the work" />
          <p className="text-lg text-gray-700">Twenty-three people across programmes, research, finance, communications and operations — led by women, staffed by young Nigerians.</p>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-gray-500 uppercase text-[10px] tracking-wider font-semibold">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {AdminTeamData.map((team) => (
              <AdminTeamCard
                key={team.id}
                {...team}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-gray-500 uppercase text-[10px] tracking-wider font-semibold">Programmes, research & operations</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {StaffTeamData.map((team) => (
              <StaffTeamCard
                key={team.id}
                {...team}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default OurTeam;