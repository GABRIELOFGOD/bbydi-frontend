import Container from "@/components/Container";
import PageHeader from "@/components/ui/PageHeader";
import SectionTitle from "@/components/ui/SectionTitle";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Impact",
  description:
    "What changed, what BBYDI delivered, and what its published impact records have not yet measured.",
  alternates: { canonical: "/our-impact" },
};

const outcomes = [
  {
    value: "22.9% to 90.7%",
    label:
      "Budget literacy among trained citizens in Kwara. Market leaders went on to run their own step-down sessions for other traders.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "3.11 to 4.32",
    label:
      "Teacher confidence using AI in the classroom, on a five-point scale, across Kwara and Osun.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "14% to 72%",
    label:
      "Participants’ confidence in identifying misinformation after a single training session, ahead of the Anambra governorship election.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "28% to 78%",
    label:
      "Participants saying they would verify a claim before sharing it, after Anambra community sessions.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "Five communities",
    label:
      "In Kwara now run their own GBV prevention systems — marriage agreements, reporting desks and social charters, led by their own traditional rulers.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "State approval",
    label:
      "The Osun State Government approved extending digital safety education into public schools.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "Two ministries",
    label: "Kwara and Osun formally endorsed BBYDI’s AI Literacy Curriculum.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
  {
    value: "First inclusion",
    label:
      "Persons with disabilities secured formal inclusion in Kwara’s 2026 state budget process for the first time.",
    source: "2025 · BBYDI 2025 Annual Report",
  },
];

const knowledgeProducts = [
  { value: "122", label: "Knowledge products in the inventory, all years" },
  { value: "98", label: "Published and publicly available" },
  { value: "38", label: "Research reports" },
  { value: "13", label: "Policy briefs" },
  { value: "14", label: "Toolkits" },
  { value: "12", label: "Educational resources" },
  { value: "9", label: "Learning and evaluation reports" },
  { value: "10", label: "Products in Hausa, Yoruba or Igbo" },
];

const capacityFigures = [
  { value: "182", label: "AI Literacy Ambassadors trained — teachers, parents, youth" },
  { value: "247", label: "Male allies inaugurated across five communities" },
  { value: "175", label: "Fiscal accountability participants, Kwara" },
  { value: "135+", label: "Teachers trained in digital safety and EdTech" },
  { value: "115", label: "Young people trained in fact-checking, Anambra" },
  { value: "85", label: "Local government officials trained, Oyo" },
  { value: "36", label: "Youth focal points, one per state · YouthGovTracka" , source: "Project record" },
  { value: "20", label: "Space for Her fellows, Cohort 1", source: "2022 · Project record" },
];

const reachFigures = [
  { value: "1M+", label: "Nigerians reached by YVote Naija", source: "Reported reach · BBYDI 2025 Annual Report" },
  { value: "9,468", label: "MyAIFactChecker users across Nigeria and Cameroon", source: "2025 · BBYDI 2025 Annual Report" },
  { value: "5,500+", label: "Students reached across all programmes", source: "2025 · BBYDI 2025 Annual Report" },
  { value: "2,305", label: "People who reached KEMI, across 11 countries", source: "2025 · BBYDI 2025 Annual Report" },
  { value: "2,768", label: "Students in climate education, Abuja and Maiduguri", source: "2025 · BBYDI 2025 Annual Report" },
  { value: "400+", label: "Stakeholders at the GBV statewide event, Ilorin", source: "February 2025 · BBYDI 2025 Annual Report" },
  { value: "11", label: "Civic technology tools in the BBYDI ecosystem", source: "2025 · BBYDI 2025 Annual Report" },
];

const civilSocietyFigures = [
  { value: "2,000+", label: "Civil society organisations trained", source: "Figure supplied by the programmes team" },
  { value: "700+", label: "CSO leaders developed", source: "Figure supplied by the programmes team" },
  { value: "10+", label: "CSOs in the Consultative Platform", source: "Platform runs from July 2025 · Figure supplied by the programmes team" },
  { value: "5+", label: "Partnerships or MoUs formalised", source: "Figure supplied by the programmes team" },
];

const annualTotals = [
  {
    year: "2022",
    report: "BBYDI 2022 Annual Report",
    items: [
      [{ text: "10,000+", bold: true }, { text: " youths directly engaged" }],
      [{ text: "50+", bold: true }, { text: " communities directly reached" }],
      [{ text: "11", bold: true }, { text: " states reached" }],
      [{ text: "15", bold: true }, { text: " projects executed" }],
      [{ text: "20,000+", bold: true }, { text: " citizens through the voter registration help desk" }],
      [{ text: "108", bold: true }, { text: " community mobilisers trained" }],
      [{ text: "54", bold: true }, { text: " radio episodes · " }, { text: "12", bold: true }, { text: " documents published" }],
    ],
  },
  {
    year: "2023",
    report: "BBYDI 2023 Annual Report",
    items: [
      [{ text: "100,000+", bold: true }, { text: " individuals trained in essential digital skills" }],
      [{ text: "15,000+", bold: true }, { text: " young Nigerians reached by campaign" }],
      [{ text: "36", bold: true }, { text: " Youth Focal Points across all 36 states" }],
      [{ text: "180+", bold: true }, { text: " educators engaged nationwide" }],
      [{ text: "500+", bold: true }, { text: " students from 35 schools at Teens Speak Out" }],
      [{ text: "400", bold: true }, { text: " women and girls in menstrual hygiene" }],
      [{ text: "20", bold: true }, { text: " organisations in a new CSO coalition" }],
    ],
  },
  {
    year: "2024",
    report: "BBYDI 2024 Annual Report",
    items: [
      [{ text: "1.2M+", bold: true }, { text: " people reached" }],
      [{ text: "6M+", bold: true }, { text: " radio listeners engaged" }],
      [{ text: "8,874", bold: true }, { text: " students trained on online safety across 45 schools" }],
      [{ text: "100+", bold: true }, { text: " traditional rulers mobilised · " }, { text: "33", bold: true }, { text: " public pledges" }],
      [{ text: "5,000+", bold: true }, { text: " people with clean water in Oke-Alafia" }],
      [{ text: "150+", bold: true }, { text: " community members sensitised on FGM, Moro LGA" }],
      [{ text: "35", bold: true }, { text: " teachers trained across six states and the FCT" }],
    ],
  },
  {
    year: "2025",
    report: "BBYDI 2025 Annual Report",
    items: [
      [{ text: "1M+", bold: true }, { text: " Nigerians reached by YVote Naija" }],
      [{ text: "5,500+", bold: true }, { text: " students reached across all programmes" }],
      [{ text: "2,305", bold: true }, { text: " people reached KEMI across 11 countries" }],
      [{ text: "2,768", bold: true }, { text: " students in climate education" }],
      [{ text: "400+", bold: true }, { text: " stakeholders at the GBV statewide event" }],
      [{ text: "247", bold: true }, { text: " male allies inaugurated across five countries" }],
      [{ text: "182", bold: true }, { text: " AI literacy ambassadors trained" }],
    ],
  },
];

type Metric = {
  value: string;
  label: string;
  source?: string;
};

function MetricGrid({
  items,
  columns = 4,
}: {
  items: Metric[];
  columns?: 2 | 4;
}) {
  return (
    <div
      className={`grid gap-4 ${
        columns === 2 ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"
      }`}
    >
      {items.map((item) => (
        <article
          key={`${item.value}-${item.label}`}
          className="flex min-h-40 flex-col border border-black/10 bg-white p-5"
        >
          <p className="text-3xl font-extrabold leading-none tracking-tight text-[#191919]">
            {item.value}
          </p>
          <p className="mt-2 text-sm leading-5 text-foreground/80">
            {item.label}
          </p>
          {item.source && (
            <p className="mt-auto pt-4 text-xs leading-4 text-muted-foreground">
              {item.source}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

function NeededMetric({ label, note }: { label: string; note: string }) {
  return (
    <article className="flex min-h-32 flex-col border border-dashed border-amber-500/50 bg-amber-50/40 p-5">
      <p className="text-xl font-bold text-amber-800">Needed</p>
      <p className="mt-1 text-sm leading-5 text-foreground/80">{label}</p>
      <p className="mt-auto pt-4 text-xs leading-4 text-amber-800">{note}</p>
    </article>
  );
}

export default function OurImpactPage() {
  return (
    <>
      <PageHeader
        page="Our Work"
        header="Our Impact"
        description="What changed, what we delivered, and what we have not yet measured. Every figure names its source and its reporting period."
      />
      <main>
        <section aria-label="How to read this page" className="bg-white">
          <Container className="py-12 md:py-16">
            <p className="max-w-2xl rounded-r-lg border-l-[3px] border-primary bg-muted/60 px-5 py-4 text-sm leading-6 text-foreground/80">
              <strong className="text-foreground">How to read this page. </strong>
              The first section records <strong>outcomes</strong> — changes in
              what people know, decide or are able to do. The sections after it
              record <strong>outputs and reach</strong> — what was delivered
              and how many people it touched. The two are not the same, and
              attendance is not impact. Cards marked in amber have no figure in
              our current records and should not be filled in without a source.
            </p>
          </Container>
        </section>

        <section aria-labelledby="outcomes-heading" className="bg-white">
          <Container className="flex flex-col gap-5 pb-12 md:pb-16">
            <SectionTitle title="Outcomes" />
            <div>
              <h2 id="outcomes-heading" className="text-3xl font-bold tracking-tight">
                What changed
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Measured shifts and institutional decisions, rather than counts of people in rooms.
              </p>
            </div>
            <div className="grid gap-x-5 md:grid-cols-2">
              {outcomes.map((item) => (
                <article
                  key={item.value}
                  className="flex min-h-36 flex-col border-y-2 border-primary py-4"
                >
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {item.value}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-foreground/75">
                    {item.label}
                  </p>
                  <p className="mt-auto pt-2 text-xs text-muted-foreground">
                    {item.source}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="published-heading" className="bg-muted/50">
          <Container className="flex flex-col gap-5 py-12 md:py-16">
            <SectionTitle title="Knowledge and policy" />
            <h2 id="published-heading" className="text-3xl font-bold tracking-tight">
              What we published
            </h2>
            <MetricGrid items={knowledgeProducts.map((item) => ({
              ...item,
              source: "Knowledge Products Inventory · October 2026",
            }))} />
            <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[calc(50%-0.5rem)]">
              <NeededMetric
                label="Policies influenced or adopted"
                note="Distinct from briefs published · Figure needed — not in supplied material"
              />
              <NeededMetric
                label="Citations of BBYDI research"
                note="Figure needed — not in supplied material"
              />
            </div>
            <Link
              href="/publications"
              className="inline-flex min-h-12 w-fit items-center justify-center rounded-sm border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Browse all 105 publications
            </Link>
          </Container>
        </section>

        <section aria-labelledby="capacity-heading" className="bg-white">
          <Container className="flex flex-col gap-5 py-12 md:py-16">
            <SectionTitle title="Capacity built" />
            <h2 id="capacity-heading" className="text-3xl font-bold tracking-tight">
              People trained and equipped
            </h2>
            <MetricGrid items={capacityFigures} />
          </Container>
        </section>

        <section aria-labelledby="reach-heading" className="bg-muted/50">
          <Container className="flex flex-col gap-5 py-12 md:py-16">
            <SectionTitle title="Reach" />
            <h2 id="reach-heading" className="text-3xl font-bold tracking-tight">
              People and communities reached
            </h2>
            <MetricGrid items={reachFigures} />
            <div className="grid gap-4 sm:grid-cols-2 lg:max-w-[calc(50%-0.5rem)]">
              <NeededMetric
                label="Communities reached"
                note="Figure needed — not in supplied material"
              />
            </div>
          </Container>
        </section>

        <section aria-labelledby="organisations-heading" className="bg-white">
          <Container className="flex flex-col gap-5 py-12 md:py-16">
            <SectionTitle title="Civil society strengthening" />
            <div>
              <h2 id="organisations-heading" className="text-3xl font-bold tracking-tight">
                Working with other organisations
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
                BBYDI convenes the CSO Consultative Platform and has published
                a civil society position paper on tax justice in Kwara.
              </p>
            </div>
            <MetricGrid items={civilSocietyFigures} />
          </Container>
        </section>

        <section aria-labelledby="annual-totals-heading" className="bg-white">
          <Container className="flex flex-col gap-7 py-12 md:py-16">
            <div className="flex flex-col gap-5">
              <SectionTitle title="Year by year" />
              <div className="max-w-2xl">
                <h2 id="annual-totals-heading" className="text-3xl font-bold tracking-tight">
                  Where the totals come from
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The headline totals on our homepage are summed across four annual
                  reports. This is what each one records, so every figure can be
                  traced to its source.
                </p>
                <p className="mt-2 rounded-r-lg border-l-[3px] border-primary bg-muted/60 px-5 py-4 text-sm leading-6 text-foreground/80">
                  <strong className="text-foreground">A caution on totals. </strong>
                  Reports from different years count different things, and a person
                  reached in one year may be counted again in another. These totals
                  are an indication of scale, not a de-duplicated headcount.
                </p>
              </div>
            </div>
            <div className="grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {annualTotals.map((year) => (
                <article key={year.year} className="flex flex-col border-t-[3px] border-primary pt-4">
                  <h3 className="text-2xl font-extrabold tracking-tight">{year.year}</h3>
                  <ul className="mt-3 flex flex-1 list-disc flex-col gap-1.5 pl-4 text-sm leading-6 text-foreground/75">
                    {year.items.map((item, index) => (
                      <li key={`${year.year}-${index}`}>
                        {item.map((part, partIndex) => (
                          part.bold ? (
                            <strong key={partIndex} className="font-bold text-foreground">
                              {part.text}
                            </strong>
                          ) : (
                            <span key={partIndex}>{part.text}</span>
                          )
                        ))}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-black/10 pt-3 text-xs leading-5 text-muted-foreground">
                    {year.report}
                  </p>
                </article>
              ))}
            </div>
          </Container>
        </section>

        <section aria-labelledby="behind-numbers-heading" className="bg-muted/50">
          <Container className="flex flex-col items-start gap-5 py-12 md:py-16">
            <SectionTitle title="Behind the numbers" />
            <div>
              <h2 id="behind-numbers-heading" className="text-3xl font-bold tracking-tight">
                The people these figures describe
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Six accounts of what changed, in the words of the people who made the change.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="/impact-stories"
                className="inline-flex min-h-12 items-center justify-center rounded-sm bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Read the stories of change
              </Link>
              <Link
                href="/where-we-work"
                className="inline-flex min-h-12 items-center justify-center rounded-sm border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
              >
                Where we work
              </Link>
            </div>
          </Container>
        </section>
      </main>
    </>
  );
}
