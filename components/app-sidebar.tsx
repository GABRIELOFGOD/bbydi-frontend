import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Separator } from "./ui/separator";
import DashboardSidebarItems from "./ui/DashboardSidebarItems";


export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <Image
            src={"/images/logo.png"}
            alt="Logo"
            // className="h-10 w-10"
            height={50}
            width={140}
          />
        </div>
        <Separator />
      </SidebarHeader>
      <DashboardSidebarItems />
      <SidebarFooter />
    </Sidebar>
  )
}