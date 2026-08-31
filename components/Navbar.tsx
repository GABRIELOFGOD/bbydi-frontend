import Image from "next/image";
import Container from "./Container";
import { Button } from "./ui/button";
import NavItems from "./ui/NavItems";

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

          <NavItems />

          <Button className="my-auto rounded p-5 text-xs font-semibold">Partner With Us</Button>
        </div>
      </Container>
    </div>
  )
}

export default Navbar;