import Image from "next/image";
import Container from "../Container";
import { Button } from "../ui/button";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";

const WhoWeAre = () => {
  return (
    <Container className="flex flex-col py-20 gap-5">
      <SectionTitle title="Who We Are" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <ColumnTitle text="A decade of turning young Nigerians into decision-makers." />
          <p className="text-lg text-muted-foreground">
            What began in 2014 as a student initiative on the campus of the University of Ilorin is now a women- and youth-led national NGO working across all 36 states.
          </p>
          <p>
            We empower young people and local communities to drive sustainable development from the grassroots, using data-driven and evidence-based analysis to hold government accountable. We work in coalition — with civil society, media, traditional institutions and government itself — because durable change is never delivered alone.
          </p>
          <Button className="w-fit mt-5 p-6 rounded bg-transparent hover:bg-primary/10 border-2 border-primary text-primary font-bold">
            More about BBYDI
          </Button>
        </div>
        <div className="p-2 justify-end flex">
          <Image
            src="/images/who-we-are.jpg"
            alt="Who We Are"
            width={500}
            height={500}
            className="rounded"
          />
        </div>
      </div>
    </Container>
  )
}

export default WhoWeAre;