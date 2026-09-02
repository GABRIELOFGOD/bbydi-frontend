import Container from "@/components/Container";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/Card";
import ColumnTitle from "@/components/ui/ColumnTitle";
import PageHeader from "@/components/ui/PageHeader";
import { OurExpertiseData } from "@/lib/constants";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Expertise",
  description: "What BBYDI can be commissioned to do — the capability page funders and partners read before they write to you."
};

const OurExpertise = () => {
  return (
    <div>
      <PageHeader
        header="Our Expertise"
        page="Our Expertise"
        description="What BBYDI can be commissioned to do — the capability page funders and partners read before they write to you."
      />

      <Container className="py-20 flex flex-col gap-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {OurExpertiseData.map((item) => (
            <Card key={item.id} numberOfCards={item.id} description={item.desc} title={item.title} />
          ))}
        </div>
      </Container>
      <div className="bg-primary flex flex-col gap-5">
        <Container className="py-20 flex flex-col gap-5 text-white text-center items-center justify-center">
          <ColumnTitle text="Looking for an implementing partner in Nigeria?" className="text-center w-full text-white" />
          <p className="text-lg max-w-190">We hold a decade of grassroots relationships, presence in all 36 states, and a track record with international funders.</p>

          <Link href="/partner-with-us" className="w-full flex justify-center"><Button className="text-primary hover:bg-white/90 bg-white p-5 rounded font-bold w-fit">Start a conversation</Button></Link>
        </Container>
      </div>
    </div>
  )
}

export default OurExpertise;