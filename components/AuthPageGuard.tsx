"use client";

import { useUser } from "@/providers/userProvider";
import { redirect } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Loading from "./Loading";

const AuthPageGuard = ({ children } : { children: ReactNode }) => {
  const { user, loading } = useUser();

  useEffect(() => {
    if (!loading && user !== null) return redirect("/dashboard");
  }, [loading]);

  if (loading) return <Loading />

  return (
    <div>
      {children}
    </div>
  )
}

export default AuthPageGuard;