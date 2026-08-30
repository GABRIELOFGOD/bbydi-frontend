import { cn } from "@/lib/utils";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";

const OurStory = () => {
  return (
    <Container className="flex flex-col py-20 gap-5">
      <SectionTitle title="Our story" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-5 my-auto">
          <h3 className="font-extrabold text-2xl">Technology, Artificial Intelligence and Civic Engagement in Africa</h3>
          <p className="text-gray-700 text-medium">Practices and an emerging framework — BBYDI's own research, launched to national press in Abuja, with a companion brief: <span className="italic">Why AI-Supported Civic Technologies Are Not Yet Transforming Participation.</span></p>
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
    </Container>
  )
}

export default OurStory;