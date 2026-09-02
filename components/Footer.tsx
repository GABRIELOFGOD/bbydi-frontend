import Image from "next/image";
import Container from "./Container";
import { GetInvolved, Organisation, Socials, Work } from "@/lib/constants";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-foreground text-white flex py-20 gap-5">
      <Container className="flex flex-col gap-10">
        <div className="grid grid-cols-1 gap-5 md:gap-10 md:grid-cols-5">
          <div className="flex flex-col gap-5 md:col-span-2">
            <Image
              src={"/images/logo-white.png"}
              alt="White-logo"
              height={50}
              width={140}
            />
            <p>A non-partisan, not-for-profit organisation advancing inclusive governance, youth empowerment and gender equality across Nigeria since 2014.</p>
            <div className="flex gap-2">
              {Socials.map((social) => (
                <Link
                  key={social.id}
                  href={social.link}
                  className="border border-gray-500 text-muted-foreground hover:text-muted hover:bg-primary rounded h-7 w-7 flex justify-center items-center text-xs"
                >{social.icon}</Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <h4 className="font-bold uppercase">Organization</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              {Organisation.map((organ) => (
                <Link
                  key={organ.id}
                  href={organ.path}
                  className="hover:text-white"
                >{organ.text}</Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <h4 className="font-bold uppercase">Our work</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              {Work.map((organ) => (
                <Link
                  key={organ.id}
                  href={organ.path}
                  className="hover:text-white"
                >{organ.text}</Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <h4 className="font-bold uppercase">Get Involved</h4>
            <div className="flex flex-col gap-2 text-muted-foreground">
              {GetInvolved.map((organ) => (
                <Link
                  key={organ.id}
                  href={organ.path}
                  className="hover:text-white"
                >{organ.text}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full bg-muted-foreground h-[0.5px]" />

        <div className="flex justify-between gap-5 text-sm text-muted-foreground">
          <div className="flex gap-2">
            <span>&copy;</span>
            <p>2026 Brain Builders Youth Development Initiative.</p>
          </div>
          <p>Privacy · Safeguarding · Terms</p>
        </div>
      </Container>
    </div>
  )
}

export default Footer;