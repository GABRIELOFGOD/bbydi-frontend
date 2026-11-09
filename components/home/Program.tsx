import { ProgrammingAreas } from "@/lib/constants";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";

const Program = () => {
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
          {ProgrammingAreas.map((program) => (
            <Link
              key={program.sn}
              href={`/projects?theme=${encodeURIComponent(program.project)}`}
              className="w-full rounded-sm border border-black/10 bg-white p-6 transition-colors hover:border-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <p className="text-xs font-bold tracking-[0.2em] text-primary">
                {program.sn}
              </p>
              <h3 className="mt-2 text-lg font-bold leading-6">{program.title}</h3>
              <p className="mt-2 text-[14.4px] leading-[1.6] text-black/70">
                {program.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default Program;