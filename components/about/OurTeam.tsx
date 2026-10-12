"use client";

import { AdminTeamData, StaffTeamData } from "@/lib/team";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import AdminTeamCard from "../ui/AdminTeamCard";
import StaffTeamCard from "../ui/StaffTeamCard";
import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { StaffProfile } from "@/lib/content";
import { TeamDataType } from "@/lib/team";
import { toast } from "sonner";

const OurTeam = () => {
  const fallbackTeam = [
    ...AdminTeamData,
    ...StaffTeamData,
  ];
  const [team, setTeam] = useState<TeamDataType[]>(fallbackTeam);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const profiles = await apiRequest<StaffProfile[]>("/staff/profiles");
        if (active) {
          setTeam(profiles.map((profile) => ({
            id: profile._id,
            name: profile.name,
            role: profile.position,
            image: profile.image,
            category: profile.category === "leadership" ? "admin" : "staff",
          })));
        }
      } catch (error) {
        if (active) toast.error(error instanceof Error ? error.message : "Could not load team profiles");
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, []);
  const leaders = team.filter((person) => person.category === "admin");
  const staff = team.filter((person) => person.category === "staff");

  return (
    <div className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-5">
        <SectionTitle title="Our team" />
        <div className="flex flex-col gap-5 w-full md:w-175">
          <ColumnTitle text="People behind the work" />
          <p className="text-lg text-gray-700">{team.length} people across programmes, research, finance, communications and operations — led by women, staffed by young Nigerians.</p>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-gray-500 uppercase text-[10px] tracking-wider font-semibold">Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {leaders.map((team) => (
              <AdminTeamCard
                key={team.id}
                {...team}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <h2 className="text-gray-500 uppercase text-[10px] tracking-wider font-semibold">Programmes, research & operations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {staff.map((team) => (
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