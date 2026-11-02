import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/Container";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Civic Technology Tools",
  description:
    "Eleven tools BBYDI designed, built and runs. Learn who each tool is for, what is verified, and what still needs confirming.",
  alternates: { canonical: "/civic-technology" },
};

const tools = [
  {
    name: "MyAIFactChecker",
    classification: "BBYDI product",
    purpose: "A WhatsApp chatbot that checks forwarded claims against credible sources and returns a verdict with links, on very little data.",
    audience: "Anyone receiving forwarded claims on WhatsApp; fact-checkers; election observers.",
    area: "Good Governance, Democracy & Accountability",
    languages: "Seven languages reported: English, Hausa, Yoruba, Igbo, French, Arabic and Swahili.",
    use: "9,468 users across Nigeria and Cameroon in 2025; 320+ election-related claims checked during Cameroon’s presidential election.",
    link: "https://wa.me/18434381502",
    linkLabel: "Open in WhatsApp",
  },
  {
    name: "HerSafeSpace (KEMI)",
    classification: "BBYDI product",
    purpose: "An AI chatbot for women and girls experiencing technology-facilitated gender-based violence. It explains what has happened, sets out safety steps and routes users to vetted services.",
    audience: "Women and girls facing online abuse, image-based abuse, sextortion and harassment.",
    area: "Gender Justice & Women Economic Empowerment",
    languages: "Sources differ — one BBYDI article says five languages, another says six. Needs confirmation.",
    use: "2,305 users across 11 countries in 2025, many disclosing abuse for the first time.",
    note: "Not an emergency service. BBYDI’s published writing describes KEMI as keeping no names and no history — confirm against the service’s own privacy documentation before repeating that claim publicly.",
    link: "https://wa.me/2349124648826",
    linkLabel: "Message KEMI on WhatsApp",
  },
  {
    name: "YouthGovTracka",
    classification: "BBYDI product",
    purpose: "Tracks and evaluates the campaign promises of state governors, so commitments outlive the campaign.",
    audience: "Citizens, youth focal points, journalists and accountability organisations.",
    area: "Good Governance, Democracy & Accountability",
    languages: "English. Companion Citizen Accountability Toolkit also published in Hausa, Yoruba and Igbo.",
    use: "36 state focal points; more than 50 tracked promises.",
    link: "https://youthgovtracka.org/",
    linkLabel: "Visit youthgovtracka.org",
  },
  {
    name: "YVote Naija",
    classification: "BBYDI product",
    purpose: "Voter education and civic mobilisation around registration, election observation and informed participation.",
    audience: "First-time and young voters; citizen mobilisers.",
    area: "Good Governance, Democracy & Accountability",
    languages: "English.",
    use: "Reported reach of more than one million Nigerians.",
    link: "https://yvotenaija.org/",
    linkLabel: "Visit yvotenaija.org",
  },
  {
    name: "SaferNet",
    classification: "BBYDI product",
    purpose: "Digital rights and online safety resources built for Nigerian students and schools.",
    audience: "Secondary school students, teachers and school administrators.",
    area: "AI Literacy, Digital Rights & Inclusion",
    languages: "English.",
    use: "SaferNet impact reporting covers 8,800+ students.",
    link: "https://thesafernet.org/",
    linkLabel: "Visit thesafernet.org",
  },
  {
    name: "Conflict Report",
    classification: "BBYDI product",
    purpose: "Civic monitoring and reporting of conflict and insecurity incidents.",
    audience: "Researchers, journalists, civil society and security analysts.",
    area: "Good Governance, Democracy & Accountability",
    languages: "English.",
    use: "Content needed — no usage figures in the supplied material.",
    link: "https://conflictreport.org/",
    linkLabel: "Visit conflictreport.org",
  },
  {
    name: "EVIT",
    classification: "BBYDI product",
    purpose: "Election violence incident tracking.",
    audience: "Election observers, civil society and electoral stakeholders.",
    area: "Good Governance, Democracy & Accountability",
    languages: "English.",
    use: "Content needed — no usage figures in the supplied material.",
    link: "https://evit.ng/",
    linkLabel: "Visit evit.ng",
  },
  {
    name: "Ewabili Green Initiative",
    classification: "Coalition — confirm BBYDI’s role",
    purpose: "A coalition supporting women-led climate projects in Africa through crowdfunding, mentorship, grants and a Women4Climate Tech Incubator.",
    audience: "Women-led climate ventures and funders.",
    area: "Climate Change & Environmental Sustainability",
    languages: "English.",
    use: "Content needed — no usage figures in the supplied material.",
    note: "Listed among BBYDI’s tools in the 2025 report, but the ownership or partnership relationship is not stated. Confirm before describing it as a BBYDI product.",
    link: "https://ewabiligreeninitiative.org/",
    linkLabel: "Visit ewabiligreeninitiative.org",
  },
  {
    name: "FactCheck Champ Flashcards",
    classification: "BBYDI learning tool",
    purpose: "A gamified classroom tool for teaching people to spot misinformation, designed to work without a connection.",
    audience: "Teachers, students and community facilitators.",
    area: "AI Literacy, Digital Rights & Inclusion",
    languages: "Content needed.",
    use: "Content needed — no usage figures in the supplied material.",
    note: "No public link supplied",
  },
  {
    name: "Climate Champs Flashcards",
    classification: "BBYDI learning tool",
    purpose: "An interactive climate literacy tool that starts climate conversations in schools and communities.",
    audience: "Teachers and students.",
    area: "Climate Change & Environmental Sustainability",
    languages: "Content needed.",
    use: "Used in climate education reaching 2,768 students in Abuja and Maiduguri in 2025.",
    note: "No public link supplied",
  },
  {
    name: "AI Literacy Flashcards",
    classification: "BBYDI learning tool",
    purpose: "A gamified, offline-friendly tool for teaching AI literacy, used alongside the AI Literacy Curriculum and radio drama.",
    audience: "Teachers, parents, youth influencers and community groups.",
    area: "AI Literacy, Digital Rights & Inclusion",
    languages: "Materials reported in Yoruba, English and Pidgin across the AI literacy project.",
    use: "Part of the AI Literacy for Everyday People project; 182 ambassadors trained in 2025.",
    note: "No public link supplied",
  },
];

export default function CivicTechnologyPage() {
  return (
    <>
      <header className="w-full border-b border-black/10 bg-muted py-16 md:py-20">
        <Container className="flex flex-col gap-5">
          <nav aria-label="Breadcrumb" className="flex flex-wrap gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/publications" className="hover:text-primary">Research &amp; Resources</Link>
            <span>/</span>
            <span>Civic Technology</span>
          </nav>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Civic Technology Tools
          </h1>
          <p className="max-w-4xl text-lg leading-7 text-muted-foreground md:text-xl">
            Eleven tools BBYDI designed, built and runs. Each card states who it is
            for, what is verified, and what still needs confirming.
          </p>
        </Container>
      </header>

      <main>
        <Container className="flex flex-col gap-6 py-10 md:py-14">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {tools.map((tool) => (
              <article
                key={tool.name}
                className="flex h-full flex-col rounded-sm border border-black/10 bg-white p-5 md:min-h-[484px] md:p-[22px]"
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  {tool.classification}
                </p>
                <h2 className="mt-2 text-lg font-bold leading-tight">{tool.name}</h2>
                <dl className="mt-4 grid grid-cols-[120px_minmax(0,1fr)] gap-x-3 gap-y-1 text-[13px] leading-[1.5]">
                  <div className="contents">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Purpose</dt>
                    <dd>{tool.purpose}</dd>
                  </div>
                  <div className="contents">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Who it is for</dt>
                    <dd>{tool.audience}</dd>
                  </div>
                  <div className="contents">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Thematic area</dt>
                    <dd>{tool.area}</dd>
                  </div>
                  <div className="contents">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Languages</dt>
                    <dd>{tool.languages}</dd>
                  </div>
                  <div className="contents">
                    <dt className="text-[10px] font-bold uppercase tracking-[0.1em] text-muted-foreground">Use to date</dt>
                    <dd>{tool.use}</dd>
                  </div>
                </dl>
                {tool.note && (
                  <p className="mt-3 border-l-[3px] border-amber-500/50 bg-amber-50 px-3 py-2.5 text-[13px] leading-5 text-amber-900/80">
                    {tool.note}
                  </p>
                )}
                {tool.link ? (
                  <a
                    href={tool.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex min-h-12 w-fit items-center gap-1 rounded-sm bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                  >
                    {tool.linkLabel} <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                ) : null}
              </article>
            ))}
          </div>
          <p className="border-t border-black/10 pt-4 text-xs leading-5 text-muted-foreground">
            Usage figures are 2025 results from BBYDI’s Annual Report. Entries marked
            “Content needed” have no figure in the supplied material and should not
            be filled in without a source.
          </p>
        </Container>
      </main>
    </>
  );
}
