import { StaffTeamData } from "@/lib/team"

export const useCurrentUser = () => {
  return StaffTeamData[0]
}