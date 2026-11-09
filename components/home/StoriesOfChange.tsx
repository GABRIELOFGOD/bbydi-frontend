import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import { ImpactStories } from "@/lib/constants";
import Link from "next/link";

const homepageStoryNames = new Set([
  "Mogaji Alalubosa",
  "Mrs Alli Barakat",
  "JONAPWD Kwara",
]);

export default function StoriesOfChange() {
  const homepageStories = ImpactStories.filter((story) =>
    homepageStoryNames.has(story.name),
  );

  return (
    <section className="w-full bg-white">
      <Container className="flex flex-col gap-7 py-12 md:py-14">
        <div className="flex flex-col gap-5">
          <SectionTitle title="Stories of change" />
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold leading-tight tracking-tight">
              What changed, and for whom
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-foreground/75">
              Outcomes rather than outputs — changes recorded in our 2025 Annual
              Report, in the words of the people who made them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {homepageStories.map((story) => (
            <article
              key={story.name}
              className="flex min-h-[344px] flex-col items-start border-t-2 border-primary pt-4"
            >
              <span className="inline-flex rounded-full border border-black/15 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {story.category}
              </span>
              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                {story.name}
              </p>
              <h3 className="mt-2 text-base font-bold leading-5 tracking-tight">
                {story.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-foreground/80">
                {story.story}
              </p>
              <p className="mt-auto pt-3 text-xs text-muted-foreground">
                {story.location}
              </p>
            </article>
          ))}
        </div>
        <Link
          href="/impact-stories"
          className="inline-flex min-h-11 w-fit items-center justify-center gap-1 rounded-sm border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          All stories of change <span aria-hidden="true">→</span>
        </Link>
      </Container>
    </section>
  );
}
