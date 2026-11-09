import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";

const OurStory = () => {
  return (
    <div id="story" className="scroll-mt-24">
      <Container className="flex flex-col py-20 gap-5">
        <SectionTitle title="Our story" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          <div className="flex flex-col gap-5 my-auto">
            <h3 className="font-extrabold text-2xl">From a commitment to civic participation to an organisation advancing rights, opportunities and accountable governance</h3>
            <p className="text-medium">Brain Builders Youth Development Initiative (BBYDI) is a women-led, non-partisan civic organisation working with young people, women, girls and communities across West and Central Africa.</p>
            <p className="text-medium">Officially registered in Nigeria in 2018, BBYDI has developed into an organisation advancing gender justice, inclusive governance, digital rights, education, environmental sustainability and public accountability.</p>
            <p className="text-medium">Our work brings together research, public education, grassroots engagement, policy advocacy and technology to address challenges affecting people’s rights, opportunities and participation in society.</p>
            <p className="text-medium">Over the years, we have expanded our programmes, developed civic technology solutions, produced research and policy resources, and worked with communities, civil society organisations, public institutions and development partners.</p>
            <p className="text-medium">Our approach is grounded in the belief that lasting development requires informed citizens, inclusive institutions and meaningful opportunities for people to participate in decisions that affect their lives.</p>
            <p className="text-medium">Today, BBYDI continues to build on this commitment, combining community-level engagement with research, advocacy and practical solutions that support social change across the communities we serve.</p>
            <p className="text-medium">One continuous strand runs through that development: every year we mark International Youth Day with programming that tracks the national conversation — from The Road to 2030 in 2016 and <span className="italic">Youth Building Peace in 2017, through Safe Spaces for Youth, Transforming Education and Climate Action, to From Clicks to Progress in 2024.</span></p>
            <div className="px-4 border-l-3">
              <p className="text-sm text-gray-500"><span className="font-bold text-foreground">Before registration.</span> BBYDI’s work began informally in 2014 as a student initiative at the University of Ilorin. Those activities preceded the organisation’s formal establishment in 2018.</p>
            </div>
            <div className="px-4 border-l-3 border-primary">
              <p className="text-lg font-semibold">&quot;We empower young people and local communities to catalyse sustainable development from the grassroots, and to champion socio-political transformation across Nigeria.&quot;</p>
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
    </div>
  )
}

export default OurStory;