import { cn } from "@/lib/utils";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";

const OurStory = () => {
  return (
    <Container className="flex flex-col py-20 gap-5">
      <SectionTitle title="Our story" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
        <div className="flex flex-col gap-5 my-auto">
          <h3 className="font-extrabold text-2xl">From a campus idea to a national institution</h3>
          <p className="text-medium">BBYDI started in 2014 as a student initiative on the campus of the University of Ilorin. It has grown into a women- and youth-led NGO promoting civic engagement, good governance and the Sustainable Development Goals through data-driven advocacy.</p>
          <p className="text-medium">For ten years we have marked International Youth Day with programming that tracks the national conversation — from The Road to 2030 in 2016 and Youth Building Peace in 2017, through <span className="italic">Safe Spaces for Youth, Transforming Education and Climate Action, to From Clicks to Progress in 2024.</span></p>
          <div className="px-4 border-l-3 border-primary">
            <p className="text-lg font-semibold tracking-widest">"We empower young people and local communities to catalyse sustainable development from the grassroots, and to champion socio-political transformation across Nigeria."</p>
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


    </Container>
  )
}

export default OurStory;