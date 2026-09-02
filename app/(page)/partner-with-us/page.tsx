import Container from "@/components/Container";
import ContactForm from "@/components/ui/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Funders, implementing partners, media and volunteers — tell us which you are and we will route you to the right person."
}

const PartnerWithUs = () => {
  return (
    <div>
      <PageHeader
        header="Partner With Us"
        page="Partner With Us"
        description="Funders, implementing partners, media and volunteers — tell us which you are and we will route you to the right person."
      />
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-5 py-20">
        <ContactForm />
      </Container>
    </div>
  )
}

export default PartnerWithUs;