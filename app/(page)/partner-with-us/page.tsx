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
      <Container className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10 py-20">
        <ContactForm />
        <div className="border p-4 md:p-10 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Head office</h3>
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm">Ilorin, Kwara State, Nigeria</p>
              <p className="text-primary text-sm">2, Crescent road, along Noktel Hotel, GRA</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Abuja office</h3>
            <div className="flex flex-col gap-2">
              <p className="text-primary text-sm">Address to supply</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Email & phone</h3>
            <div className="flex flex-col gap-2">
              <p className="text-primary text-sm">To supply</p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-xl font-bold">Online</h3>
            <div className="flex flex-col gap-2">
              <p className="text-gray-500 text-sm">thebrainbuilders.org</p>
              <p className="text-gray-500 text-sm">X / Twitter: @BrainBuilders01</p>
              <p className="text-gray-500 text-sm">Facebook: Brain Builders Youth Development Initiative</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default PartnerWithUs;