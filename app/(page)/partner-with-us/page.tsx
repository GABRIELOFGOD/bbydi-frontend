import Container from "@/components/Container";
import ContactForm from "@/components/ui/ContactForm";
import PageHeader from "@/components/ui/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partner With Us",
  description: "Funders, implementing partners, media and volunteers — tell us which you are and we will route you to the right person.",
  alternates: { canonical: "/partner-with-us" },
}

const PartnerWithUs = () => {
  return (
    <div>
      <PageHeader
        header="Partner With Us"
        page="Partner With Us"
        description="Funders, implementing partners, media and volunteers — tell us which you are and we will route you to the right person."
      />
      <Container className="grid grid-cols-1 items-start gap-8 py-12 md:grid-cols-2 md:gap-14 md:py-16">
        <ContactForm />
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-5 rounded-sm border border-primary/70 bg-white p-6 shadow-sm md:p-7">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Head office — Ilorin</h2>
              <p className="text-sm leading-6 text-foreground/70">
                2 Catchment Road, Opposite Forest, Along Sydney Restaurant,
                GRA, Ilorin, Kwara State, Nigeria
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Abuja office</h2>
              <p className="text-sm leading-6 text-foreground/70">
                No. 12 T.O.S. Benson Crescent, Utako, Abuja, Nigeria
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Email &amp; phone</h2>
              <div className="flex flex-col items-start text-sm leading-6 text-foreground/70">
                <a className="underline decoration-foreground/30 underline-offset-2 hover:text-primary" href="mailto:info@thebrainbuilders.org">
                  info@thebrainbuilders.org
                </a>
                <a className="underline decoration-foreground/30 underline-offset-2 hover:text-primary" href="tel:+2347068775529">
                  +234 706 877 5529
                </a>
                <a className="underline decoration-foreground/30 underline-offset-2 hover:text-primary" href="tel:+2348168583387">
                  +234 816 858 3387
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold">Online</h2>
              <div className="flex flex-col text-sm leading-6 text-foreground/70">
                <a className="hover:text-primary hover:underline" href="https://thebrainbuilders.org" target="_blank" rel="noopener noreferrer">
                  thebrainbuilders.org
                </a>
                <p>X / Twitter: @BrainBuilders01</p>
                <p>Facebook: Brain Builders Youth Development Initiative</p>
              </div>
            </div>
          </div>
          <p className="border-l-[3px] border-primary bg-primary/10 px-4 py-4 text-sm leading-6 text-primary/90">
            Registered national NGO in Nigeria · Women-led · Youth-led ·
            Member, Girls Not Brides
          </p>
        </div>
      </Container>
    </div>
  )
}

export default PartnerWithUs;