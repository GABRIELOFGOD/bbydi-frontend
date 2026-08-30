"use client";

import { NavItemsList } from "@/lib/constants"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation";

const NavItems = () => {
  const path = usePathname();
  
  return (
    <div className="flex flex-col my-auto gap-3 md:flex-row">
      {NavItemsList.map((item, index) => (
        <Link
          key={index}
          href={item.path}
          className={cn("capitalize text-xs text-card-foreground font-medium hover:text-primary", {
            "text-primary font-bold": path === item.path
          })}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default NavItems