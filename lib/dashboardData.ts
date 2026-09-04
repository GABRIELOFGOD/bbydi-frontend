import { Projects } from "./constants";
import { AdminTeamData, StaffTeamData } from "./team";
import { CardTypes } from "./types";

export const DashboardCardData: CardTypes[] = [
  {
    id: 1,
    title: "Projects",
    text: "Manage your projects and tasks",
    value: Projects.length,
  },
  {
    id: 2,
    title: "Tasks",
    text: "Manage your tasks and deadlines",
    value: 0,

  },
  {
    id: 3,
    title: "Team Members",
    text: "Manage your team members and their roles",
    value: AdminTeamData.length + StaffTeamData.length
  },
  {
    id: 4,
    title: "Programs",
    text: "Manage your programs and initiatives",
    value: 0
  }
]