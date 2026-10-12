"use client";

import Container from "@/components/Container";
import ProgramCard from "@/components/ui/ProgramCard";
import { ProgrammingAreas } from "@/lib/constants";
import { ContentItem } from "@/lib/content";
import { ProgrammingAreasTypes } from "@/lib/types";
import { usePublicContent } from "@/lib/usePublicContent";

const mapProgram = (item: ContentItem, index: number): ProgrammingAreasTypes => ({
  sn: String(index + 1).padStart(2, "0"),
  title: item.title,
  description: item.description ?? "",
  project: item.category ?? "",
  image: item.image || "/images/program/research.jpg",
});

export default function ProgramsList() {
  const { items } = usePublicContent("program", ProgrammingAreas, mapProgram);
  return (
    <Container className="flex flex-col gap-5 py-20">
      <div className="flex flex-col gap-10">
        {items.map((program) => <ProgramCard key={program.sn} {...program} />)}
      </div>
    </Container>
  );
}
