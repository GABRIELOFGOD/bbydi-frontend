"use client";

import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import { ProgrammingAreas } from "@/lib/constants";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import Link from "next/link";

const mapProgram = (item: ContentItem, index: number) => ({
  sn: String(index + 1).padStart(2, "0"),
  title: item.title,
  description: item.description ?? "",
  project: item.category ?? "",
  image: item.image || "/images/program/research.jpg",
});

const Program = () => {
  const { items: programs } = usePublicContent("program", ProgrammingAreas, mapProgram);

  return (
    <div className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-5">
        <SectionTitle title="Programming areas" />
        <ColumnTitle text="Seven domains where we work" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {programs.map((program) => (
            <Link className="hover:border border-primary hover:-top-0.5 duration-300 hover:shadow-sm" href={`/programs?category=${program.project}`} key={program.sn}>
              <Card numberOfCards={program.sn} title={program.title} description={program.description} cta={{ text: "explore" }} />
            </Link>
          ))}
          {/* <Link
            href="/programs"
          >
            <Card
              numberOfCards="Cross-cutting"
              title="Women & girls first"
              description="Women hold just 4.4% of elected positions in Nigeria. Every programme we run is designed to change that number."
              cta={{ text="See Space for Her" }}
            />
          </Link> */}
        </div>
      </Container>
    </div>
  )
}

export default Program;