import DashboardGuard from "@/components/dashboard/DashboardGuard";
import { UserProvider } from "@/providers/userProvider";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false, noarchive: true },
};
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