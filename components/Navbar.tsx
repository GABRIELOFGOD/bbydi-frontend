"use client";

import { useState } from "react";
import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import NavItems from "./ui/NavItems";
import Link from "next/link";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 flex border-b border-black/10 bg-white py-5">
      <Container>
        <div className="flex w-full items-center">
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Brain Builders Youth Development Initiative"
              height={50}
              width={140}
            />
          </Link>

          <div className="my-auto ml-auto mr-10 hidden xl:flex">
            <NavItems />
          </div>

          <Link
            href="/partner-with-us"
            className="hidden h-10 items-center justify-center rounded border border-transparent bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary xl:flex"
          >
            Partner With Us
          </Link>
        </div>

        <Drawer
          open={mobileMenuOpen}
          onOpenChange={setMobileMenuOpen}
          swipeDirection="right"
        >
          <DrawerTrigger className="flex xl:hidden" render={<Button variant="outline" />}>
            <MenuIcon aria-hidden="true" />
            <span className="sr-only">Open navigation menu</span>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <Image
                src="/images/logo.png"
                alt="Brain Builders Youth Development Initiative"
                height={50}
                width={140}
              />
            </DrawerHeader>
            <div className="p-4">
              <NavItems mobile onNavigate={() => setMobileMenuOpen(false)} />
              <Link
                href="/partner-with-us"
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-primary p-5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Partner With Us
              </Link>
            </div>
          </DrawerContent>
        </Drawer>
      </Container>
    </header>
  );
};

export default Navbar;