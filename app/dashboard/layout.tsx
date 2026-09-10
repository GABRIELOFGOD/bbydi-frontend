import DashboardGuard from "@/components/dashboard/DashboardGuard";
import { UserProvider } from "@/providers/userProvider";
import { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <UserProvider>
      <DashboardGuard>
        {children}
      </DashboardGuard>
    </UserProvider>
  )
}

export default DashboardLayout;