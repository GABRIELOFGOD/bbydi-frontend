import Hero from "@/components/home/Hero";
import Program from "@/components/home/Program";
import WhoWeAre from "@/components/home/WhoWeAre";
import CurrentProjects from "../../components/home/CurrentProjects";
import TheProblem from "@/components/home/TheProblem";
import NewsRoom from "@/components/home/NewsRoom";
import Partners from "../../components/home/Partners";
import StoriesOfChange from "@/components/home/StoriesOfChange";
import FeaturedPublications from "@/components/home/FeaturedPublications";
import WorkWithUs from "@/components/home/WorkWithUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Advancing women’s rights and expanding opportunities",
  description: "BBYDI is a women-led, non-partisan civic organisation advancing inclusive governance, democracy, gender justice, digital rights and sustainable development across West and Central Africa.",
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
      <StoriesOfChange />
      <FeaturedPublications />
      <NewsRoom />
      <Partners />
      <WorkWithUs />
    </div>

  );
}
