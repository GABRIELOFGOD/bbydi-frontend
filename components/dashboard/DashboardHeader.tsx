"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";
import Link from "next/link";
import { BellIcon, ChevronRightIcon, Loader, SettingsIcon } from "lucide-react";
import Image from "next/image";
import { useUser } from "@/providers/userProvider";
import { useEffect } from "react";
import { redirect } from "next/navigation";

const DashboardHeader = () => {
  const path = usePathname();
  const { user, loading } = useUser();


  useEffect(() => {
    if (!loading && !user) {
      redirect("/login");
    }
  }, [loading]);
  
  return (
    <div className="flex gap-5 sticky bg-white top-0 justify-between w-full py-2 border-b border-border px-4">
      <div className="flex gap-3">
        <SidebarTrigger />
        <div className="flex gap-3 text-xs text-muted-foreground my-auto">
          <div>{path === "/dashboard" ? (
            <span className="font-semibold">Dashboard</span>
          ) : (
            <div className="flex gap-3">
              <Link href="/dashboard" className="hover:text-primary font-bold">
                Dashboard
              </Link>
              <span>
                <ChevronRightIcon size={14} />
              </span>
              <span className="capitalize">{path.split("/").pop()}</span>
            </div>
          )}
          </div>
        </div>
      </div>

      <div className="flex gap-5 my-auto">
        <Link href="/dashboard/settings" className="text-sm hover:text-primary my-auto">
          <SettingsIcon size={16} />
        </Link>
        <Link href="/dashboard/notifications" className="text-sm hover:text-primary my-auto">
          <BellIcon size={16} />
        </Link>

        {loading || user === null ? (
          <div className="w-50 bg-gray-500 rounded-full flex gap-5">
            <Loader />
            <p className="text-foreground text-xs font-bold my-auto">loading ..</p>
          </div>
        ) : (<div className="flex gap-2 relative">
          {user?.avatar ? (
            <Image
              src={user?.avatar}
              width={24}
              height={24}
              alt="Profile"
              className="h-6 w-6 rounded-full object-cover my-auto"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-bold">{user?.name.charAt(0)}</span>
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-xs font-bold">{user?.name}</span>
            <span className="text-[10px] text-muted-foreground">{user?.position}</span>
          </div>
        </div>)}
      </div>
    </div>
  )
}

export default DashboardHeader;