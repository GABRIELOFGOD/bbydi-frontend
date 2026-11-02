import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import { OurExpertiseData } from "@/lib/constants";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Expertise",
  description:
    "What BBYDI can be commissioned to do, and what we bring that cannot easily be sourced from outside the communities we work in.",
  alternates: { canonical: "/our-expertise" },
};

const crossCuttingCapabilities = [
  {
    title: "Research & Policy",
    description:
      "Original evidence, policy briefs and knowledge products that inform decisions and strengthen advocacy.",
    evidence:
      "98 published knowledge products, including four TFGBV research reports covering West and Central Africa, and policy briefs on INEC’s AI division and indigenous-language content moderation.",
  },
  {
    title: "Technology for Good",
    description:
      "Civic technology we design, build and run ourselves rather than campaigning for others to build.",
    evidence:
      "Eleven tools in the BBYDI ecosystem, including MyAIFactChecker (9,468 users in 2025) and KEMI (2,305 users across 11 countries).",
  },
  {
    title: "Advocacy & Civic Engagement",
    description:
      "Community dialogue, coalition building and public campaigning that turns evidence into institutional change.",
    evidence:
      "Five Kwara communities running their own GBV prevention systems; persons with disabilities formally included in Kwara’s 2026 budget process.",
    badge: "No separate programme record",
  },
  {
    title: "Community Mobilisation & Sustainability",
    description:
      "Organising at community level, and handing over to the people who stay — local ownership so that structures, step-down training and volunteer networks carry the work on after a project closes.",
    evidence:
      "A Mogaji in Alalubosa built a Community Marriage Agreement, a GBV Reporting Desk and five inaugurated ambassadors of his own accord; Kwara’s Iyaloja General ran her own step-down budget sessions for market association leaders across the state.",
  },
];

function CapabilityLabel({ children }: { children: string }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
      {children}
    </p>
  );
}

export default function OurExpertise() {
  return (
    <div>
      <header className="w-full border-b border-black/10 bg-[#f7f6f5]">
        <Container className="flex flex-col gap-5 py-8 md:py-8">
          <nav
            aria-label="Breadcrumb"
            className="flex gap-1.5 text-xs text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <span>Our Expertise</span>
          </nav>
          <div className="max-w-2xl pb-4">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
              Our Expertise
            </h1>
            <p className="mt-4 text-base leading-7 text-foreground/75 md:text-lg">
              What BBYDI can be commissioned to do, and what we bring that
              cannot easily be sourced from outside the communities we work in.
            </p>
          </div>
        </Container>
      </header>

      <main>
        <Container className="flex flex-col gap-6 py-14 md:py-[72px]">
          <div className="flex flex-col gap-5">
            <CapabilityLabel>How we work</CapabilityLabel>
            <div>
              <h2 className="text-3xl font-bold leading-tight tracking-tight">
                Four capabilities that run across every thematic area
              </h2>
              <p className="mt-2 text-sm leading-6 text-foreground/70 md:text-base">
                These are not separate programmes. They are the ways we work
                inside all six thematic areas.
              </p>
              <span className="mt-1 inline-flex rounded-full border border-amber-500/40 bg-amber-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em] text-amber-800">
                Proposed framing
              </span>
            </div>
          </div>

          <div className="grid gap-x-7 gap-y-6 md:grid-cols-2">
            {crossCuttingCapabilities.map((capability) => (
              <article
                key={capability.title}
                className="border-t-[3px] border-primary pt-4"
              >
                <h3 className="text-base font-bold">{capability.title}</h3>
                <p className="mt-2 text-sm leading-6 text-foreground/75">
                  {capability.description}
                  {capability.badge && (
                    <>
                      {" "}
                      <span className="inline-flex rounded-full border border-amber-500/40 bg-amber-50 px-2 py-0.5 align-middle text-[9px] font-bold uppercase tracking-[0.12em] text-amber-800">
                        {capability.badge}
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-2 text-[13px] leading-5 text-foreground/65">
                  <strong className="font-bold text-foreground/85">
                    Evidence:
                  </strong>{" "}
                  {capability.evidence}
                </p>
              </article>
            ))}
          </div>

          <figure className="relative mt-1 overflow-hidden rounded-sm">
            <Image
              src="/images/program/gender.jpg"
              alt="Women taking part in a community townhall on technology-facilitated gender-based violence"
              width={900}
              height={600}
              className="h-auto max-h-[560px] w-full object-cover"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-black/70 px-4 py-3 text-xs text-white md:text-sm">
              Community townhall on TFGBV, with Urgent Action Fund
            </figcaption>
          </figure>

          <div className="grid gap-5 md:grid-cols-2">
            {OurExpertiseData.map((item) => (
              <article
                key={item.id}
                className="rounded-sm border border-black/10 bg-white p-6 md:min-h-40"
              >
                <p className="text-xs font-bold tracking-[0.12em] text-primary">
                  {item.id}
                </p>
                <h3 className="mt-3 text-lg font-bold">
                  {item.id === "06"
                    ? "Advocacy & public engagement"
                    : item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-foreground/75">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </Container>

        <section className="bg-primary">
          <Container className="flex flex-col items-center justify-center gap-5 py-14 text-center text-white md:py-20">
            <h2 className="w-full text-center text-2xl font-bold md:text-3xl">
              Looking for an implementing partner in Nigeria?
            </h2>
            <p className="max-w-190 text-base leading-7 md:text-lg">
              We hold a decade of grassroots relationships, presence in all 36
              states, and a track record with international funders.
            </p>
            <Link href="/partner-with-us">
              <Button className="w-fit rounded bg-white p-5 font-bold text-primary hover:bg-white/90">
                Start a conversation
              </Button>
            </Link>
          </Container>
        </section>
      </main>
    </div>
  );
}
