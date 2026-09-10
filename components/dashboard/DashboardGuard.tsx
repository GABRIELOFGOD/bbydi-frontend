"use client";

import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useUser } from "@/providers/userProvider";
import Loading from "../Loading";

const DashboardGuard = ({ children } : { children: ReactNode }) => {
  const { loading } = useUser();

  if (loading) return <Loading />
  
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

export default DashboardGuard;