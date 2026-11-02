import Link from "next/link";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";

const destinations = [
  {
    audience: "Researchers & journalists",
    title: "Read the research",
    description: "Sixty-seven reports, policy briefs and toolkits, filterable by theme, year and language.",
    href: "/publications",
  },
  {
    audience: "Digital product users",
    title: "Use our tools",
    description: "Eleven civic technology products, from fact-checking to survivor support.",
    href: "/civic-technology",
  },
  {
    audience: "Young people, women & girls",
    title: "Find an opportunity",
    description: "Fellowships, training cohorts and open calls.",
    href: "/opportunities",
  },
  {
    audience: "Partners & funders",
    title: "Discuss a partnership",
    description: "Tell us which route you need and we will direct you to the right person.",
    href: "/partner-with-us",
  },
];

export default function WorkWithUs() {
  return (
    <section className="w-full bg-white">
      <Container className="flex flex-col gap-6 py-12 md:py-16">
        <div className="flex flex-col gap-5">
          <SectionTitle title="Work with us" />
          <h2 className="text-3xl font-bold leading-tight md:text-4xl">
            Where would you like to start?
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <Link
              key={destination.href}
              href={destination.href}
              className="flex min-h-36 flex-col rounded-sm border border-black/10 bg-white p-5 transition-colors hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                {destination.audience}
              </span>
              <h3 className="mt-2 text-base font-bold">{destination.title}</h3>
              <p className="mt-2 text-sm leading-5 text-muted-foreground">
                {destination.description}
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
