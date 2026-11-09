import Container from "@/components/Container";
import Link from "next/link";
import type { Metadata } from "next";
import SectionTitle from "@/components/ui/SectionTitle";

export const metadata: Metadata = {
  title: "Space for Her",
  description:
    "A political leadership fellowship moving women from the audience to the ballot and into elected office.",
  alternates: { canonical: "/space-for-her" },
};

const representationFigures = [
  { value: "4.4%", label: "of National Assembly seats in Nigeria held by women" },
  { value: "27.3%", label: "sub-Saharan African average" },
  { value: "15", label: "states with zero women in the state legislature" },
  { value: "180/185", label: "global ranking, IPU Parline" },
];

const kwaraFigures = [
  { value: "24 of 24", label: "state assembly seats held by men in the assembly elected in 2019" },
  { value: "0 of 9", label: "of Kwara’s three Senate and six House of Representatives seats held by women in 2019" },
  { value: "1 and 4", label: "female senators and federal representatives Kwara produced in the twenty years to 2019" },
  { value: "56%", label: "of state appointive positions held by women from 2019, against 10% in 1999–2003" },
];

const barriers = [
  {
    title: "Party gatekeeping",
    description:
      "The barrier isn’t that women don’t know how to run. It’s access to the informal networks — financing, patronage, party machinery — that male candidates build over years. Expression-of-interest and nomination fees alone can be prohibitive.",
  },
  {
    title: "Appointed, not elected",
    description:
      "Our Kwara research found women holding 56% of state appointive positions while holding none of the elected ones. Appointment is in the gift of an administration. A seat has to be won, and that is the door that stays shut.",
  },
  {
    title: "Gendered disinformation",
    description:
      "Women who declare political ambitions face coordinated online attacks. This is documented and growing, and it connects directly to our digital rights work.",
  },
  {
    title: "The visibility gap",
    description:
      "In fifteen states, young women have never seen a woman represent them. That absence is self-reinforcing — and one election starts to undo it.",
  },
];

const modelSteps = [
  {
    title: "Selection",
    description:
      "Open to women aged 25 to 45 resident in Kwara State, with twenty places advertised. More than 1,300 applied. We recruit for genuine electoral intent, not general interest.",
  },
  {
    title: "Six weeks of training",
    description:
      "Stakeholder mapping and engagement, resource mobilisation, political storytelling, leadership development, political communication, campaign strategy and lobbying — taught by ten speakers drawn from politics, academia and civil society.",
  },
  {
    title: "Inside the institutions",
    description:
      "Fellows observed a plenary session at the Kwara State House of Assembly and met serving representatives. The cohort also took the argument outside the classroom, onto Diamond FM and into the Oja Oba and Mandate markets on a voter registration drive.",
  },
  {
    title: "Deliver something",
    description:
      "No fellow graduates on theory. In four teams, fellows designed and ran their own community projects in Kwara schools — so they practised mobilising a room before they ever had to do it as a candidate.",
  },
];

const teams = [
  {
    name: "Team 01",
    details: [
      <>Kwara State School for Special Needs, Apata Yakuba, Ilorin East</>,
      <>12 June 2022</>,
      <><strong>149</strong> deaf students from JSS3 to SSS3</>,
      <>Personal development in leadership, and overcoming barriers — delivered alongside a sign language interpreter</>,
    ],
    note: "Led by Alabi Tawakalitu Omolara",
  },
  {
    name: "Team 02",
    details: [
      <>Community Secondary School, Ogele</>,
      <>20 June 2022</>,
      <>Session titled <strong>Inspire to Lead</strong></>,
      <>Gender socialisation, discrimination and inequality, built from the team’s own problem-solving survey of the community</>,
    ],
    note: "Adolescent girls, Ogele community",
  },
  {
    name: "Team 03",
    details: [
      <>Queen Elizabeth School, Ilorin</>,
      <>17 June 2022</>,
      <>SS3 students</>,
      <>Women in leadership and governance, women in politics, and drug abuse — several fellows taught from their own careers</>,
    ],
    note: "Including Shittu Rukayat, later elected to the state assembly",
  },
  {
    name: "Team 04",
    details: [
      <>Pakata Girls’ Day Secondary School and Flora Schools, Tanke</>,
      <>6 July 2022</>,
      <><strong>56</strong> and <strong>68</strong> students respectively</>,
      <>Influence, leading with courage and the qualities of a leader, taught with printed placards as teaching aids</>,
    ],
    note: "Led by Balqees Temitope Hamzat",
  },
];

const cohortFigures = [
  { value: "500", label: "Female students reached across five Kwara schools", source: "2022 · Space for Her project report" },
  { value: "1,300+", label: "Applications for twenty fellowship places", source: "April 2022 · Space for Her project report" },
  { value: "1M+", label: "Reach of the launch press conference, as reported by BBYDI", source: "30 April 2022 · BBYDI’s own estimate, not independently audited" },
  { value: "5,000+", label: "Diamond FM 88.7 listenership in Kwara State", source: "7 May 2022 · Space for Her project report" },
];

const research = [
  {
    type: "Research report · 2022",
    title: "An Assessment of Women Elected and Appointed to Political Positions in Kwara State, 1999–2019",
    description:
      "A political economy analysis of every administration since the return of democracy, with state-by-state and assembly-by-assembly figures the fellowship was built against.",
  },
  {
    type: "Research report · 2022",
    title: "Factors Responsible for Voters’ Apathy and Strategies for Improving Voter Participation in Nigeria",
    description:
      "A survey of 36,855 respondents, disaggregated by age, state, gender and academic level, run with YVote Naija. 82.2% were registered voters; 80.3% said elections had never been transparent.",
  },
  {
    type: "Project report · 2022",
    title: "SpaceforHer: Empowering Young Women in Leadership and Politics",
    description:
      "The full record of the first cohort — activities, lecture series, community projects, impact evaluation, the challenges we hit, and the case for scaling up.",
  },
];

const recommendations = [
  "Political parties should give room for the active participation of women, rather than using them for the campaign only.",
  "The 35% affirmative action slot in the National Gender Policy should be approved and used for both elective and appointive offices.",
  "An enabling environment is needed that allows women to engage meaningfully in decision-making and high-profile activity.",
  "The cost of expression-of-interest forms should be subsidised for female aspirants across all political parties.",
  "The position of state deputy governor should be reserved for women in law.",
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

function FigureGrid({
  items,
  dark = false,
}: {
  items: { value: string; label: string; source?: string }[];
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((figure) => (
        <article
          key={figure.value}
          className={`border-l-[3px] ${dark ? "border-[#d66b61]" : "border-primary"} px-4 py-2`}
        >
          <p className={`text-3xl font-extrabold tracking-tight ${dark ? "text-white" : "text-foreground"}`}>
            {figure.value}
          </p>
          <p className={`mt-2 text-sm leading-5 ${dark ? "text-white/60" : "text-foreground/70"}`}>
            {figure.label}
          </p>
          {figure.source && (
            <p className="mt-4 text-xs leading-5 text-muted-foreground">{figure.source}</p>
          )}
        </article>
      ))}
    </div>
  );
}

export default function SpaceForHerPage() {
  return (
    <main>
      <section className="bg-[#191919] text-white">
        <Container className="flex flex-col items-start gap-4 py-14 md:py-16">
          <nav aria-label="Breadcrumb" className="flex gap-1 text-xs text-white/50">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-white">Projects</Link>
            <span>/</span>
            <span>Space for Her</span>
          </nav>
          <span className="bg-primary px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em]">
            Gender · Active
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Space for Her
          </h1>
          <p className="max-w-3xl text-base leading-7 text-white/75 md:text-lg">
            A political leadership fellowship that moves women from the audience
            to the ballot. More than 1,300 women applied for twenty places in the
            first cohort. One of those twenty now sits in the Kwara State House
            of Assembly.
          </p>
          <p className="text-sm leading-6 text-white/50">
            Kwara State, 2022 onwards. Conceived by BBYDI in collaboration with
            GYMobilization.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-8 py-12 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-12 md:py-16">
          <div>
            <SectionTitle title="The result" />
            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight">
              From fellowship to legislature
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/75">
              In April 2022 we selected twenty young women in Kwara State, from
              more than 1,300 applicants, for a six-week political leadership
              fellowship. Two of them went on to contest the 2023 general
              elections. One of them won.
            </p>
            <p className="mt-4 text-sm leading-6">
              <strong>Rukayat Shittu</strong> won the Owode-Onire seat in the
              Kwara State House of Assembly, representing a constituency of
              around 187,200 people in Asa Local Government Area, and becoming
              the assembly’s youngest member. The assembly she joined had been
              entirely male for the previous four years.
            </p>
            <p className="mt-4 text-sm leading-6">
              <strong>Oluwatoni Adeleke</strong> took the Labour Party ticket
              for the Irepodun/Isin/Oke Ero/Ekiti federal constituency and
              stood for the House of Representatives. She was elected Vice
              President for the Africa Region of the International Federation
              of Social Workers during the fellowship.
            </p>
          </div>
          <PhotoSlot label="Space for Her cohort or alumna" />
        </Container>
      </section>

      <section className="bg-[#191919] text-white">
        <Container className="flex flex-col gap-8 py-12 md:py-16">
          <div className="max-w-2xl">
            <SectionTitle title="The problem" className="text-[#d66b61]" />
            <h2 className="mt-5 text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Nigeria ranks 180th of 185 countries on women’s parliamentary
              representation.
            </h2>
          </div>
          <FigureGrid items={representationFigures} dark />
          <p className="text-xs leading-5 text-white/45">
            Sources: IPU Parline (February 2024); Policy and Legal Advocacy
            Centre (PLAC); Agora Policy post-2023 election analysis.
          </p>
          <div className="mt-5 border-t border-white/10 pt-10">
            <SectionTitle title="And in Kwara" className="text-[#d66b61]" />
            <h3 className="mt-5 text-2xl font-bold tracking-tight">
              Women in Kwara get appointed. They do not get elected.
            </h3>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
              We did not take this from a secondary source. Before designing
              the fellowship, BBYDI assessed every woman elected or appointed
              to political office in Kwara State between 1999 and 2019, to
              establish the baseline we would be measured against.
            </p>
            <div className="mt-7">
              <FigureGrid items={kwaraFigures} dark />
            </div>
            <p className="mt-6 text-xs leading-5 text-white/45">
              Source: <em>Space for Her: An Assessment of Women Elected and
              Appointed to Political Positions in Kwara State (1999–2019)</em>,
              BBYDI, 2022.
            </p>
            <Link
              href="/publications"
              className="mt-7 inline-flex min-h-11 items-center justify-center rounded-sm border border-white/50 px-6 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#191919] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            >
              Read the assessment <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="flex flex-col gap-6 py-12 md:py-16">
          <SectionTitle title="Why generic leadership training doesn’t work" />
          <h2 className="text-3xl font-bold tracking-tight">
            The barriers are structural, not informational
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {barriers.map((barrier, index) => (
              <article
                key={barrier.title}
                className="min-h-72 rounded-sm border border-black/10 bg-white p-6"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-primary">
                  Barrier {String(index + 1).padStart(2, "0")}
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
          <div>
            <SectionTitle title="The model" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              Not a workshop — a pipeline
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              What the 2022 cohort in Kwara actually went through.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {modelSteps.map((step, index) => (
              <article
                key={step.title}
                className="min-h-80 rounded-sm border border-black/10 bg-white p-6"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-primary">
                  Step {String(index + 1).padStart(2, "0")}
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
        <Container className="flex flex-col gap-6 py-12 md:py-16">
          <div>
            <SectionTitle title="What the fellows did" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              Twenty fellows, four teams, five schools
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-foreground/75">
              Each team chose its own community, designed its own session and
              delivered it. Together they reached around 500 female students.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <article key={team.name} className="flex flex-col">
                <div className="border-t-[3px] border-primary pt-4">
                  <h3 className="text-2xl font-extrabold tracking-tight">{team.name}</h3>
                </div>
                <ul className="mt-3 flex flex-1 list-disc flex-col gap-1.5 pl-4 text-sm leading-6 text-foreground/75">
                  {team.details.map((detail, index) => (
                    <li key={`${team.name}-${index}`}>{detail}</li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-black/10 pt-3 text-xs leading-5 text-muted-foreground">
                  {team.note}
                </p>
              </article>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cohortFigures.map((figure) => (
              <article
                key={figure.value}
                className="flex min-h-40 flex-col border border-black/10 bg-white p-5"
              >
                <p className="text-3xl font-extrabold leading-none tracking-tight">
                  {figure.value}
                </p>
                <p className="mt-2 text-sm leading-5 text-foreground/80">
                  {figure.label}
                </p>
                <p className="mt-auto pt-4 text-xs leading-4 text-muted-foreground">
                  {figure.source}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-muted/50">
        <Container className="flex flex-col gap-6 py-12 md:py-16">
          <div>
            <SectionTitle title="In their own words" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              What the fellows said afterwards
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <figure className="border-l-[3px] border-primary pl-6">
              <blockquote className="text-lg font-medium leading-7">
                Being a candidate of my party, I have been able to implement
                the lessons I got from the training. My priority areas include
                the strengthening of public institutions, accountability,
                enforcement of the Child’s Rights Act, and empowering people
                with information.
              </blockquote>
              <figcaption className="mt-4 text-sm leading-6 text-muted-foreground">
                Shittu Rukayat Motunrayo — now a member of the Kwara State House
                of Assembly for Owode-Onire
              </figcaption>
            </figure>
            <figure className="border-l-[3px] border-primary pl-6">
              <blockquote className="text-lg font-medium leading-7">
                The Space for Her fellowship opened my eyes to the benefits of
                quality leadership and taught me valuable skill sets to lead in
                my chosen field.
              </blockquote>
              <figcaption className="mt-4 text-sm leading-6 text-muted-foreground">
                Dr Adebusola Ogunmodede — psychiatrist and mental health
                advocate, who went on to run a mental health literacy boot camp
                for over 220 participants
              </figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="flex flex-col gap-6 py-12 md:py-16">
          <div>
            <SectionTitle title="The research behind it" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              Three documents, all public
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              The fellowship was designed from evidence we gathered ourselves,
              and documented so it can be checked and reused.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {research.map((document) => (
              <article
                key={document.title}
                className="flex min-h-72 flex-col rounded-sm border border-black/10 bg-white p-6"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-primary">
                  {document.type}
                </p>
                <h3 className="mt-4 text-lg font-bold leading-6">
                  {document.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-foreground/70">
                  {document.description}
                </p>
                <Link
                  href="/publications"
                  className="mt-auto inline-flex min-h-11 items-center gap-2 pt-4 text-sm font-bold text-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  Open the publication <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#191919] text-white">
        <Container className="flex flex-col gap-7 py-12 md:py-16">
          <div className="max-w-3xl">
            <SectionTitle title="What we are asking for" className="text-[#d66b61]" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight md:text-4xl">
              Five recommendations from the Kwara assessment
            </h2>
          </div>
          <ol className="grid gap-x-10 gap-y-5 md:grid-cols-2">
            {recommendations.map((recommendation, index) => (
              <li
                key={recommendation}
                className="flex gap-3 border-l-[3px] border-[#d66b61] py-1 pl-4 text-sm leading-6 text-white/60"
              >
                <strong className="shrink-0 text-white">
                  {String(index + 1).padStart(2, "0")}
                </strong>
                <span>{recommendation}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs leading-5 text-white/45">
            Recommendations as published in BBYDI’s 2022 Kwara assessment. The
            deputy governor proposal was the subject of national press coverage
            at the project’s launch.
          </p>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid gap-8 py-12 md:grid-cols-2 md:items-center md:gap-12 md:py-16">
          <PhotoSlot label="training session" />
          <div>
            <SectionTitle title="What’s next" />
            <h2 className="mt-5 text-3xl font-bold tracking-tight">
              Space for Her 2.0
            </h2>
            <p className="mt-4 text-base leading-7 text-foreground/80">
              The first cohort ran in one state and put one woman in a
              legislature that had none. The next phase takes that model to the
              states where the gap is widest — starting with those that have
              never elected a single woman to their assembly.
            </p>
            <p className="mt-4 text-base leading-7 text-foreground/80">
              BBYDI’s own review of the first cohort was candid about what
              constrained it: funding limited how many women could be taken on,
              and the programme has to hold the attention of women who are
              already working, studying and running households.
            </p>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Full 2.0 targets, cohort size and states are still being finalised.
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
  );
}
