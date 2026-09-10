import AuthPageGuard from "@/components/AuthPageGuard";
import { UserProvider } from "@/providers/userProvider";
import { ReactNode } from "react";

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