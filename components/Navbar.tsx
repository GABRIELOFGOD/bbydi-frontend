import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import NavItems from "./ui/NavItems";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { MenuIcon } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex py-4 bg-white border-b-2 z-50 sticky top-0">
      <Container>
        <div className="flex w-full justify-between">
          <div>
            <Image
              src={"/images/logo.png"}
              alt="Logo"
              // className="h-10 w-10"
              height={50}
              width={140}
            />
          </div>

          <div className="my-auto hidden md:flex">
            <NavItems />
          </div>

          <Link href={"/partner-with-us"}><Button className="my-auto rounded md:flex hidden p-5 text-xs font-semibold">Partner With Us</Button></Link>
        </div>

        <Drawer swipeDirection="right">
          <DrawerTrigger className="flex md:hidden" render={<Button variant="outline" />}>
            <MenuIcon />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Are you absolutely sure?</DrawerTitle>
              <DrawerDescription>This action cannot be undone.</DrawerDescription>
            </DrawerHeader>
            <div className="p-4">
              <NavItems />
              <Link href={"/partner-with-us"}><Button className="my-auto w-full rounded md:flex hidden p-5 text-xs font-semibold">Partner With Us</Button></Link>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose render={<Button variant="outline" />}>Cancel</DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </Container>
      
    </div>
  )
}

export default Navbar;