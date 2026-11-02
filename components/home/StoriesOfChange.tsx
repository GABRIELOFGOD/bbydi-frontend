import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import { ImpactStories } from "@/lib/constants";

export default function StoriesOfChange() {
  return (
    <section className="w-full bg-white">
      <Container className="flex flex-col gap-8 py-10 md:py-14">
        <div className="flex flex-col gap-3">
          <SectionTitle title="Stories of change" />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              What changed, and for whom
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
              Outcomes rather than outputs — changes recorded in our 2025 Annual
              Report, in the words of the people who made them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {ImpactStories.map((story) => (
            <article
              key={story.name}
              className="flex flex-col items-start gap-2 border-t-2 border-primary pt-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                {story.category}
              </p>
              <p className="text-xs font-semibold text-muted-foreground">
                {story.name}
              </p>
              <h3 className="text-sm font-bold leading-5">{story.title}</h3>
              <p className="text-sm leading-6 text-muted-foreground">
                {story.story}
              </p>
              <p className="mt-auto pt-1 text-xs text-muted-foreground">
                {story.location}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
