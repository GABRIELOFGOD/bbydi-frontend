import OurStory from "@/components/about/OurStory";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About us",
  description: "A non-partisan, not-for-profit civic organisation with a decade-long record of advocating for inclusive policies that prioritise women and youth.",
};

const AboutPage = () => {
  return (
    <div>
      <PageHeader
        header="About BBYDI"
        page="About"
        description="A non-partisan, not-for-profit civic organisation with a decade-long record of advocating for inclusive policies that prioritise women and youth."
      />
      <OurStory />
    </div>
  )
}

export default AboutPage;