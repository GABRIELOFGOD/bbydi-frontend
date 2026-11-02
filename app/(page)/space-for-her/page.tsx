import Container from "@/components/Container";
import PageHeader from "@/components/ui/PageHeader";
import Link from "next/link";
import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Space for Her",
  description:
    "A political leadership fellowship moving women from the audience to the ballot, and into elected office.",
  alternates: { canonical: "/space-for-her" },
};

const representationFigures = [
  { value: "4.4%", label: "of National Assembly seats in Nigeria held by women" },
  { value: "27.3%", label: "sub-Saharan African average" },
  { value: "15", label: "states with zero women in the state legislature" },
  { value: "180/185", label: "global ranking, IPU Parline" },
];

const barriers = [
  {
    number: "Barrier 01",
    title: "Party gatekeeping",
    description:
      "The barrier isn't that women don't know how to run. It's access to the informal networks — financing, patronage, party machinery — that male candidates build over years. Nomination fees alone can be prohibitive.",
  },
  {
    number: "Barrier 02",
    title: "Gendered disinformation",
    description:
      "Women who declare political ambitions face coordinated online attacks. This is documented and growing, and it connects directly to our digital rights work.",
  },
  {
    number: "Barrier 03",
    title: "The visibility gap",
    description:
      "In fifteen states, young women have never seen a woman represent them. That absence is self-reinforcing — and one election starts to undo it.",
  },
];

const modelSteps = [
  {
    number: "Step 01",
    title: "Selection",
    description:
      "We recruit women with genuine electoral ambitions — women who intend to stand for office — and target the states where the gap is widest.",
  },
  {
    number: "Step 02",
    title: "Six-week training",
    description:
      "Campaign strategy, constituency engagement, navigating party structures, media and political storytelling. Fellows visit the State House of Assembly during the programme.",
  },
  {
    number: "Step 03",
    title: "Mentorship",
    description:
      "Each fellow is paired with an experienced political figure — someone who knows how to win elections, not a motivational speaker.",
  },
  {
    number: "Step 04",
    title: "Campaign support",
    description:
      "Support continues through declaration, primaries and election day rather than ending at graduation.",
  },
];

function PhotoSlot({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`Photo slot — ${label}`}
      className="flex aspect-[4/3] items-center justify-center rounded-sm bg-[repeating-linear-gradient(135deg,#f0efed_0px,#f0efed_10px,#e6e4e1_10px,#e6e4e1_20px)] px-6 text-center"
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
        Photo slot — {label}
      </span>
    </div>
  );
}

function SectionLabel({ children }: { children: string }) {
  return (
    <div className="flex flex-col gap-3 text-primary">
      <p className="text-xs font-bold uppercase tracking-[0.16em]">{children}</p>
      <span className="h-1 w-13 bg-primary" aria-hidden="true" />
    </div>
  );
}

export default function SpaceForHerPage() {
  return (
    <>
      <PageHeader
        page="Our Work"
        header="Space for Her"
        description="A political leadership fellowship that moves women from the audience to the ballot — and, in one case already, to the floor of a state assembly."
      />
      <main>
        <section className="bg-white">
          <Container className="grid gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16">
            <div>
              <SectionLabel>The result</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight">
                From fellowship to legislature
              </h2>
              <p className="mt-4 text-base leading-7 text-foreground/75">
                In 2022 we selected 20 young women in Kwara State for a
                six-week political leadership fellowship. One of them, Rukayat
                Shittu, won a seat in the Kwara State House of Assembly in
                2023.
              </p>
              <p className="mt-4 text-base leading-7 text-foreground/75">
                She represents the Owode-Onire constituency of Asa Local
                Government Area — around 187,200 constituents — in a state
                whose previous assembly had no women at all.
              </p>
            </div>
            <PhotoSlot label="Space for Her cohort or alumna" />
          </Container>
        </section>

        <section className="bg-[#191919] text-white">
          <Container className="flex flex-col gap-6 py-12 md:py-16">
            <SectionTitle showLine={false} title="The problem" className="text-secondary" />
            <h2 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Nigeria ranks 180th of 185 countries on women&apos;s parliamentary
              representation.
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {representationFigures.map((figure) => (
                <article
                  key={figure.value}
                  className="border-l-[3px] border-secondary px-4 py-2"
                >
                  <p className="text-3xl font-extrabold tracking-tight">
                    {figure.value}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-white/60">
                    {figure.label}
                  </p>
                </article>
              ))}
            </div>
            <p className="text-xs leading-5 text-white/45">
              Sources: IPU Parline (February 2024); Policy and Legal Advocacy
              Centre (PLAC); Agora Policy post-2023 election analysis.
            </p>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="flex flex-col gap-6 py-12 md:py-16">
            <SectionLabel>Why generic leadership training doesn&apos;t work</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">
              The barriers are structural, not informational
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              {barriers.map((barrier) => (
                <article
                  key={barrier.number}
                  className="rounded-sm border border-black/10 bg-white p-6"
                >
                  <p className="text-xs font-bold tracking-[0.12em] text-primary">
                    {barrier.number}
                  </p>
                  <h3 className="mt-3 text-lg font-bold">{barrier.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    {barrier.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-muted/50">
          <Container className="flex flex-col gap-6 py-12 md:py-16">
            <SectionLabel>The model</SectionLabel>
            <h2 className="text-3xl font-bold tracking-tight">
              Not a workshop — a pipeline
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {modelSteps.map((step) => (
                <article
                  key={step.number}
                  className="min-h-64 rounded-sm border border-black/10 bg-white p-6"
                >
                  <p className="text-xs font-bold tracking-[0.12em] text-primary">
                    {step.number}
                  </p>
                  <h3 className="mt-3 text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/70">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section className="bg-white">
          <Container className="grid gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16">
            <PhotoSlot label="training session" />
            <div>
              <SectionLabel>What&apos;s next</SectionLabel>
              <h2 className="mt-5 text-3xl font-bold tracking-tight">
                Space for Her 2.0
              </h2>
              <p className="mt-4 text-base leading-7 text-foreground/75">
                The next phase takes the model that produced this result and
                deploys it where the need is greatest — starting with the
                states that have never elected a single woman to their
                legislature.
              </p>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Full 2.0 targets are still being finalised.
              </p>
              <Link
                href="/partner-with-us"
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Partner on Space for Her 2.0
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
