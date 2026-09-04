"use client";

import Link from "next/link";
import { SidebarContent, SidebarGroup, SidebarGroupLabel } from "./sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { CalendarsIcon, CheckCheckIcon, ClipboardMinusIcon, FolderKanbanIcon, HandshakeIcon, LayoutDashboardIcon, NewspaperIcon, ProportionsIcon, UserRoundPenIcon, UsersIcon, WifiPenIcon } from "lucide-react";

const DashboardSidebarItems = () => {
  const path = usePathname()
  
const DASHBOARD_ITEMS = [
  {
    id: 1,
    item: "Dashboard",
    path: "/dashboard",
    icon: <LayoutDashboardIcon size={16} />
  },
  {
    id: 2,
    item: "Tasks",
    path: "/dashboard/tasks",
    icon: <CheckCheckIcon size={16} />
  },
  {
    id: 3,
    item: "Staffs",
    path: "/dashboard/staffs",
    icon: <UsersIcon size={16} />
  },
  {
    id: 4,
    item: "Contact",
    path: "/dashboard/contact",
    icon: <UserRoundPenIcon size={16} />
  },
];

const CONTENT_ITEMS = [
  {
    id: 1,
    item: "Programs",
    path: "/dashboard/programs",
    icon: <CalendarsIcon size={16} />
  },
  {
    id: 2,
    item: "Projects",
    path: "/dashboard/projects",
    icon: <FolderKanbanIcon size={16} />
  },
  {
    id: 3,
    item: "News",
    path: "/dashboard/news",
    icon: <NewspaperIcon size={16} />
  },
  {
    id: 4,
    item: "Opportunities",
    path: "/dashboard/opportunities",
    icon: <ProportionsIcon size={16} />
  },
  {
    id: 5,
    item: "Reports",
    path: "/dashboard/reports",
    icon: <ClipboardMinusIcon size={16} />
  },
  {
    id: 6,
    item: "Publications",
    path: "/dashboard/publications",
    icon: <WifiPenIcon size={16} />
  },
  {
    id: 7,
    item: "Partners",
    path: "/dashboard/partners",
    icon: <HandshakeIcon size={16} />
  }
];

  return (
    <SidebarContent className="px-3">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <div className="flex flex-col gap-1">
            {DASHBOARD_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={cn("w-full py-3 px-4 font-semibold text-xs flex gap-2", item.path === path ? "bg-primary/20 text-primary rounded" : "text-muted-foreground")}
              >
                {item.icon}
                {item.item}
              </Link>
            ))}
          </div>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Contents</SidebarGroupLabel>
          <div className="flex flex-col gap-1">
            {CONTENT_ITEMS.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={cn("w-full py-3 px-4 font-semibold text-xs flex gap-2", item.path === path ? "bg-primary/20 text-primary rounded" : "text-muted-foreground")}
              >
                {item.icon}
                {item.item}
              </Link>
            ))}
          </div>
        </SidebarGroup>
      </SidebarContent>
  )
}

export default DashboardSidebarItems