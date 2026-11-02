import Image from "next/image";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import Link from "next/link";

const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="w-full">
      <Container className="flex flex-col gap-5 py-20">
      <SectionTitle title="Who We Are" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <ColumnTitle text="A civic organisation built around rights, opportunity and accountable governance." />
          <p className="text-lg text-muted-foreground">
            BBYDI was officially registered in Nigeria in 2018 and works with young people, women, girls and communities across West and Central Africa. We bring together research, public education, grassroots engagement, policy advocacy and technology to address challenges affecting people’s rights, opportunities and participation. In 2025 we delivered programmes in ten Nigerian states and ran engagements across five countries.
          </p>
          <p>
            We empower young people and local communities to drive sustainable development from the grassroots, using data-driven and evidence-based analysis to hold government accountable. We work in coalition — with civil society, media, traditional institutions and government itself — because durable change is never delivered alone.
          </p>
          <Link
            href="/about"
            className="mt-5 inline-flex h-11 w-fit items-center justify-center rounded-sm border-2 border-primary bg-transparent px-6 text-sm font-bold text-primary transition-colors hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
          >
            More about BBYDI
          </Link>
        </div>
        <div className="relative flex aspect-3/2 w-full justify-end p-2">
          <Image
            src="/images/who-we-are.jpg"
            alt="BBYDI team and Padded Girls participants with a community leader at the project close-out"
            fill
            className="rounded object-cover"
          />
        </div>
      </div>
      </Container>
    </section>
  )
}

export default WhoWeAre;