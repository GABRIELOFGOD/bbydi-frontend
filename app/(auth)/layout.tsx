import AuthPageGuard from "@/components/AuthPageGuard";
import { UserProvider } from "@/providers/userProvider";
import { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false, noarchive: true },
};
const AuthLayout = ({ children }: { children: ReactNode }) => {
  
  return (
    <UserProvider>
      <AuthPageGuard>
        {children}
      </AuthPageGuard>
    </UserProvider>
  )
}

export default AuthLayout;