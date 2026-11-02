import Container from "@/components/Container";
import PageHeader from "@/components/ui/PageHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Where We Work",
  description:
    "BBYDI's programme footprint, regional engagements, and digital product reach.",
  alternates: { canonical: "/where-we-work" },
};

export default function WhereWeWorkPage() {
  return (
    <>
      <PageHeader
        page="Our Work"
        header="Where We Work"
        description="BBYDI is headquartered in Ilorin, Kwara State. Our reach differs by type of involvement, so this page separates the three."
      />
      <main>
        <Container className="flex flex-col gap-6 py-12 md:py-16">
          <section className="grid items-stretch gap-5 md:grid-cols-3">
            <article className="rounded-sm border border-black/10 bg-white p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
                Implemented programmes
              </p>
              <h2 className="mt-3 text-base font-bold">Nigeria</h2>
              <h3 className="mt-1 text-base font-bold leading-6">
                All 36 states and the Federal Capital Territory.
              </h3>
              <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">
                BBYDI works nationwide, with headquarters in Kwara State.
                States named in the 2025 Annual Report for specific 2025
                activity:
              </p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-foreground/80">
                <li>Kwara State <em>(headquarters)</em></li>
                <li>Osun State</li>
                <li>Oyo State</li>
                <li>Ekiti State</li>
                <li>Anambra State</li>
                <li>Borno State</li>
                <li>Federal Capital Territory, Abuja</li>
              </ul>
              <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">
                Election observation in 2026 adds Bauchi and Delta. The Annual
                Report itemises a 2025 footprint of ten or more states rather
                than the full national coverage.
              </p>
            </article>
            <article className="rounded-sm border border-black/10 bg-white p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
                Programme engagement across borders
              </p>
              <h2 className="mt-3 text-base font-bold">West &amp; Central Africa</h2>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-foreground/80">
                <li>Nigeria</li>
                <li>Ghana</li>
                <li>Togo</li>
                <li>Benin</li>
                <li>Cameroon</li>
              </ul>
              <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">
                Five countries with international engagements in 2025,
                including MyAIFactChecker deployment during Cameroon&apos;s
                presidential election. This does not mean BBYDI holds an
                office or a resident team in each country.
              </p>
            </article>
            <article className="rounded-sm border border-black/10 bg-white p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-primary">
                Digital product reach
              </p>
              <h2 className="mt-3 text-base font-bold">Eleven countries</h2>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm leading-6 text-foreground/80">
                <li>KEMI reached users in 11 countries in 2025</li>
              </ul>
              <p className="mt-3 text-sm leading-[1.55] text-muted-foreground">
                Digital reach is where people used a BBYDI tool, not where
                BBYDI ran a programme. The eleven countries are not itemised
                in the supplied material.
              </p>
            </article>
          </section>
          <p className="border-l-[3px] border-primary bg-primary/10 px-5 py-4 text-sm leading-6 text-primary">
            Figures are drawn from BBYDI&apos;s 2025 Annual Report. A
            production site should state the reporting period beside each
            figure and refresh it annually.
          </p>
        </Container>
      </main>
    </>
  );
}
