import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const DashboardLayout = ({ children }:{ children: ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <div className="flex flex-col w-full">
          <DashboardHeader />
          <div className="p-4">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  )
}

export default DashboardLayout;