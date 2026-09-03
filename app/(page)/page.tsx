import Hero from "@/components/home/Hero";
import Program from "@/components/home/Program";
import WhoWeAre from "@/components/home/WhoWeAre";
import Image from "next/image";
import CurrentProjects from "../../components/home/CurrentProjects";
import TheProblem from "@/components/home/TheProblem";
import NewsRoom from "@/components/home/NewsRoom";
import Partners from "../../components/home/Partners";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <Program />
      <CurrentProjects />
      <TheProblem />
      <NewsRoom />
      <Partners />
    </div>

  );
}
