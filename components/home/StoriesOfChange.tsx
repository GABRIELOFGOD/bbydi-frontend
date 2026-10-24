import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";

const stories = [
  {
    name: "Mogaji Alalubosa",
    title: "The Mogaji who rewrote the rules",
    story:
      "He came to the statewide GBV event as one of four hundred. He went home and built something: a Community Marriage Agreement compulsory for intending couples, a GBV Reporting Desk, and five inaugurated ambassadors. Six couples have signed. A survivor used the Desk to report harassment and the case reached the police.",
    location: "Alalubosa, Kwara State",
  },
  {
    name: "Hajia Adenike Lambe",
    title: "The Iyal oja who had never seen a budget",
    story:
      "Kwara’s Iyal oja General had heard market women complain about taxes that seemed to vanish, and had no way to answer them. After the Budget Literacy Workshop she ran her own step-down sessions for market association leaders across the state, in language traders understood.",
    location: "Kwara State",
  },
  {
    name: "Okolowo Road Drivers",
    title: "The drivers who got a dangerous road onto the budget",
    story:
      "They had watched accidents happen for years and felt helpless. Budget literacy training taught them that road maintenance has a line item, that named officials are responsible, and that citizens have procedures. Officials inspected the site and the Governor promised to include it in the 2026 budget.",
    location: "Okolowo, Kwara State",
  },
  {
    name: "Mrs Alli Barakat",
    title: "The teacher who stopped racing the clock",
    story:
      "Outdated textbooks, hours on assessment questions, late nights on lesson plans. After the AI literacy training she generated a poster on natural selection live in class. “AI has become my partner in educational progress. It has freed me to focus on what I love most: actually teaching.”",
    location: "Kwara State",
  },
  {
    name: "Jonapwd Kwara",
    title: "A seat at the budget table",
    story:
      "Members of the disability rights network felt invisible in government planning. After the budget literacy workshop they wrote formally to the Ministry of Economic Planning requesting inclusion. The Ministry agreed. For the first time, persons with disabilities will take part in the 2026 budget formulation.",
    location: "Kwara State",
  },
  {
    name: "Mrs Sururoh Adesina",
    title: "From seizing phones to guiding children",
    story:
      "Her approach to her children’s online life had been to take the phone away, without asking what they were doing. A community dialogue changed her mind. “We parents must guide our children, not just seize their phones.”",
    location: "Ifon, Osun State",
  },
];

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
              Outcomes rather than outputs — six of the changes recorded in our
              2025 Annual Report, in the words of the people who made them.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-5 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {stories.map((story) => (
            <article
              key={story.name}
              className="flex flex-col items-start gap-2 border-t-2 border-primary pt-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
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
