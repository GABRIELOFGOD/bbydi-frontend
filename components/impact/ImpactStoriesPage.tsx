"use client";

import { useMemo, useState } from "react";
import Container from "@/components/Container";
import { ImpactStories } from "@/lib/constants";
import Link from "next/link";

const filters = [
  { label: "All stories", value: "" },
  {
    label: "Gender Justice & Women Economic Empowerment",
    value: "Gender justice",
  },
  {
    label: "Good Governance, Democracy & Accountability",
    value: "Governance & democracy",
  },
  {
    label: "AI Literacy, Digital Rights & Inclusion",
    value: "AI & digital rights",
  },
];

export default function ImpactStoriesPage() {
  const [activeFilter, setActiveFilter] = useState("");
  const visibleStories = useMemo(
    () =>
      !activeFilter
        ? ImpactStories
        : ImpactStories.filter((story) => story.category === activeFilter),
    [activeFilter],
  );

  return (
    <main>
      <header className="border-b border-black/10 bg-muted py-12 md:py-16">
        <Container className="flex flex-col gap-5">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap gap-1.5 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span>/</span>
            <Link href="/projects" className="hover:text-primary">
              Our Work
            </Link>
            <span>/</span>
            <span>Impact Stories</span>
          </nav>
          <h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
            Impact Stories
          </h1>
          <p className="max-w-3xl text-lg leading-7 text-muted-foreground">
            What changed, and for whom. Each of these is an outcome rather than
            an output — something a person or an institution did differently
            afterwards, in their own words where we have them.
          </p>
        </Container>
      </header>

      <Container className="flex flex-col gap-6 py-10 md:py-14">
        <div className="rounded-r-sm border-l-[3px] border-primary bg-primary/10 px-5 py-4 text-sm leading-6 text-primary">
          <strong>Where these come from. </strong>
          Every story on this page is drawn from BBYDI&apos;s 2025 Annual
          Report. Names and places are as recorded there. For the figures
          behind them, see{" "}
          <Link href="/our-impact" className="font-bold hover:underline">
            Our Impact
          </Link>
          .
        </div>

        <nav
          aria-label="Filter stories by thematic area"
          className="flex flex-wrap gap-2"
        >
          {filters.map((filter) => (
            <button
              key={filter.value || "all"}
              type="button"
              aria-pressed={activeFilter === filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`rounded-full border px-5 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary ${
                activeFilter === filter.value
                  ? "border-[#191919] bg-[#191919] text-white"
                  : "border-black/15 bg-white text-foreground hover:border-black/40"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </nav>

        <p className="text-sm text-muted-foreground" aria-live="polite">
          {visibleStories.length} stories, from the 2025 Annual Report.
        </p>

        <div className="grid gap-x-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleStories.map((story) => (
            <article
              key={`${story.name}-${story.title}`}
              className="flex flex-col items-start gap-2 border-t-2 border-primary py-4"
            >
              <p className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-black/60">
                {story.category}
              </p>
              <p className="pt-1 text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
                {story.name}
              </p>
              <h2 className="text-base font-bold leading-6">{story.title}</h2>
              <p className="text-sm leading-6 text-foreground/75">
                {story.story}
              </p>
              <p className="pt-1 text-xs text-muted-foreground">
                {story.location}
              </p>
            </article>
          ))}
        </div>
      </Container>

      <section className="bg-muted/50">
        <Container className="flex flex-col items-center gap-3 py-12 text-center md:py-14">
          <h2 className="text-3xl font-bold tracking-tight">
            The numbers behind the stories
          </h2>
          <p className="text-sm text-muted-foreground">
            Outcomes, reach and what we have not yet measured.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-3">
            <Link
              href="/our-impact"
              className="inline-flex min-h-11 items-center justify-center rounded-sm bg-primary px-6 text-sm font-bold text-white transition-colors hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              Our Impact
            </Link>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center justify-center rounded-sm border border-primary px-6 text-sm font-bold text-primary transition-colors hover:bg-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
            >
              All projects
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
