import Image from "next/image";
import Container from "../Container";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import CountUpCard from "../ui/CountUpCard";

const Hero = () => {
  return (
    <div className="w-full h-screen py-20 relative">
      <Image
        src="/images/hero.jpg"
        alt="Hero Image"
        layout="fill"
        objectFit="cover"
        quality={100}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/70 to-black/50 bg-opacity-50 items-center justify-center flex w-full py-20">
        <Container className="flex flex-col gap-15">
          <div className="text-white w-full md:max-w-[70%] flex flex-col gap-8">
            <div className="border-secondary border-2 rounded-full bg-primary/30 w-fit">
              <p className="text-secondary/80 uppercase text-xs px-4 py-2 font-bold">Youth-led · Women-led · Since 2014</p>
            </div>
            <h1
              className="text-4xl font-extrabold md:text-[51.58px] leading-[1.15] tracking-[-0.025em]"
            >
              Building the civic power of Nigeria's <span className="text-secondary">young people</span>.
            </h1>

            <p className="text-[21px] text-muted/80">BBYDI is a non-partisan, not-for-profit organisation advancing inclusive governance, youth empowerment and gender equality — with evidence, at scale, from the grassroots up.</p>

            <div className="flex gap-5">
              <Button className={cn("text-primary hover:bg-white bg-white border-2 border-white rounded p-6 font-bold")}>Explore our work</Button>
              <Button className={cn("text-white hover:bg-white/10 bg-white/10 border-2 border-gray-500 rounded p-6 font-bold")}>Open opportunities</Button>
            </div>
          </div>
          <div className="w-full border-b border-gray-600" />
          <div className="grid grid-cols-2 md:grid-cols-4 md:gap-20 gap-5 text-white">
            <CountUpCard value={2014} text="Founded as a student initiative at the University of Ilorin" format={false} />
            <CountUpCard value={100000} text="Young people trained in digital and leadership skills" suffix="+" />
            <CountUpCard value={36} text="States with trained youth governance focal points" />
            <CountUpCard value={187200} text="Constituents represented by a Space for Her alumna" />
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Hero;