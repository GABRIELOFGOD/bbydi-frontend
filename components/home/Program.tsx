"use client";

import { usePublicContent } from "@/lib/usePublicContent";
import { ContentItem } from "@/lib/content";
import { ProgrammingAreas } from "@/lib/constants";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
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
    <section className="w-full bg-muted">
      <Container className="flex flex-col py-16">
        <SectionTitle title="Programming areas" />
        <ColumnTitle
          text="Six thematic areas"
          className="mt-7 text-4xl leading-tight"
        />
        <p className="mt-1 max-w-3xl text-base leading-6 text-muted-foreground">
          The areas we work in, and the projects, research and tools we run inside each.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {programs.slice(0, 6).map((program) => (
            <Link
              key={program.sn}
              href={`/projects?theme=${encodeURIComponent(
                ProgrammingAreas.find((area) => area.title === program.title)?.project ??
                  program.project,
              )}`}
              className="w-full rounded-sm border border-black/10 bg-white p-6 transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <p className="text-xs font-bold tracking-[0.2em] text-primary">
                {program.sn}
              </p>
              <h3 className="mt-2 text-lg font-bold leading-6">{program.title}</h3>
              <p className="mt-2 text-base leading-[1.6] text-black/70">
                {program.description}
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article className="w-full rounded-sm bg-primary p-7 text-white">
            <p className="text-xs font-bold tracking-[0.12em]">Cross-cutting</p>
            <h3 className="mt-4 text-lg font-bold">Women &amp; girls first</h3>
            <p className="mt-2 text-base leading-[1.6]">
              Women hold just 4.4% of seats in Nigeria’s National Assembly. Every
              programme we run is designed to change that number.
            </p>
            <Link
              href="/space-for-her"
              className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              See Space for Her <span aria-hidden="true">→</span>
            </Link>
          </article>
        </div>
      </Container>
    </section>
  )
}

export default Program;