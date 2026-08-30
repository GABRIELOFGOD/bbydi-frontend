import { cn } from "@/lib/utils";
import Container from "../Container";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";
import { Button } from "../ui/button";
import Image from "next/image";
import { Publications } from "@/lib/constants";
import PublicationCard from "../ui/PublicationCard";

const PublicationLibrary = () => {
  return (
    <div id="publications" className="w-full bg-muted flex py-20 gap-5">
      <Container className="flex flex-col gap-10">
        <SectionTitle title="Publication Library" />
        <ColumnTitle text="Reports, toolkits & briefs" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-5 my-auto">
            <p className={cn("py-1 px-3 uppercase font-semibold bg-secondary/10 rounded text-primary text-xs w-fit")}>Flagship research · May 2026</p>
            <h3 className="font-extrabold text-2xl">Technology, Artificial Intelligence and Civic Engagement in Africa</h3>
            <p className="text-gray-700 text-medium">Practices and an emerging framework — BBYDI's own research, launched to national press in Abuja, with a companion brief: <span className="italic">Why AI-Supported Civic Technologies Are Not Yet Transforming Participation.</span></p>
            <div className="flex gap-5">
              <Button className="rounded p-5 text-white font-semibold border border-primary hover:bg-primary">Download report</Button>
              <Button className="rounded p-5 text-primary font-semibold border border-primary bg-transparent hover:bg-primary/10">Download brief</Button>
              {/* <Button va>Download report</Button> */}
            </div>
          </div>

          <div className="my-auto">
            <Image
            src="/images/publication.jpg"
            alt="Who We Are"
            width={500}
            height={500}
            className="rounded"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Publications.map((publication) => (
            <PublicationCard
              key={publication.id}
              {...publication}
            />
          ))}
        </div>
        
      </Container>
    </div>
  )
}

export default PublicationLibrary;