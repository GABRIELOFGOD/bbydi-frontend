"use client";

import { useEffect, useRef, useState } from "react";
import { NavItemsList } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

const NavItems = ({
  mobile = false,
  onNavigate,
}: {
  mobile?: boolean;
  onNavigate?: () => void;
}) => {
  const path = usePathname();
  const navRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!navRef.current || navRef.current.contains(event.target as Node)) {
        return;
      }
      setOpenMenu(null);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const closeAndNavigate = () => {
    setOpenMenu(null);
    onNavigate?.();
  };

  return (
    <nav aria-label="Main navigation" ref={navRef}>
      <div
        className={cn(
          "my-auto flex gap-1",
          mobile ? "flex-col" : "flex-row items-center md:gap-2",
        )}
      >
        {NavItemsList.map((item) => {
          const children = item.children ?? [];
          const hasChildren = children.length > 0;
          const isActive =
            path === item.path ||
            children.some(
              (child) => {
                const childPath = child.path.split("#")[0];
                return path === childPath || path.startsWith(`${childPath}/`);
              },
            );
          const linkClass = cn(
            "whitespace-nowrap text-sm font-medium tracking-normal text-card-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
            mobile ? "text-base font-medium" : "",
            isActive && "font-bold text-primary",
          );

          if (!hasChildren) {
            return (
              <Link
                key={item.path}
                href={item.path}
                aria-current={path === item.path ? "page" : undefined}
                className={cn(
                  linkClass,
                  mobile ? "rounded px-3 py-2.5" : "py-2",
                )}
                onClick={closeAndNavigate}
              >
                {item.label}
              </Link>
            );
          }

          const isOpen = openMenu === item.label;

          return (
            <div key={item.path} className={cn("relative", mobile ? "w-full" : "") }>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenMenu((current) => (current === item.label ? null : item.label))}
                className={cn(
                  linkClass,
                  "flex items-center gap-1 rounded px-3 py-2",
                  mobile ? "w-full justify-between text-left text-base" : "",
                )}
              >
                <span>{item.label}</span>
                <ChevronDown
                  size={12}
                  aria-hidden="true"
                  className={cn("transition-transform", isOpen && "rotate-180")}
                />
              </button>

              {(isOpen || mobile) && (
                <div
                  className={cn(
                    "flex flex-col gap-1",
                    mobile ? "mt-1 rounded bg-muted/80 px-2 py-2" : "absolute left-0 top-full z-50 min-w-52 rounded-md border border-border bg-white p-2 shadow-lg",
                  )}
                >
                  {children.map((child) => (
                    <Link
                      key={`${item.path}-${child.label}`}
                      href={child.path}
                      aria-current={path === child.path ? "page" : undefined}
                      className={cn(
                        "rounded px-3 py-2 text-sm text-card-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
                        mobile && "text-base",
                      )}
                      onClick={closeAndNavigate}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default NavItems;