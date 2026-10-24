import Hero from "@/components/home/Hero";
import Program from "@/components/home/Program";
import WhoWeAre from "@/components/home/WhoWeAre";
import CurrentProjects from "../../components/home/CurrentProjects";
import TheProblem from "@/components/home/TheProblem";
import NewsRoom from "@/components/home/NewsRoom";
import Partners from "../../components/home/Partners";
import StoriesOfChange from "@/components/home/StoriesOfChange";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inclusive governance, youth empowerment and gender equality",
  description: "Brain Builders Youth Development Initiative advances inclusive governance, youth empowerment and gender equality across Nigeria through evidence, advocacy and civic technology.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <WhoWeAre />
      <Program />
      <CurrentProjects />
      <TheProblem />
      <NewsRoom />
      <StoriesOfChange />
      <Partners />
    </div>

  );
}
