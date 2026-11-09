import { Policies } from "@/lib/constants";
import Container from "../Container";
import SectionTitle from "../ui/SectionTitle";
import GovernanceAccordion from "./GovernanceAccordion";

const Governance = () => {
  return (
    <div id="governance" className="scroll-mt-24">
      <Container className="flex flex-col gap-5 py-14 md:py-20">
        <SectionTitle title="Governance" />
        <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
          How BBYDI is governed
        </h2>
        <div className="w-full max-w-xl">
          <GovernanceAccordion />
        </div>
        <div className="flex w-full max-w-xl flex-col gap-3">
          <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Policies &amp; safeguards
          </h3>
          <div className="flex flex-col gap-3">
            {Policies.map((policy) => (
              <article key={policy.id} className="rounded-sm border border-black/10 p-4">
                <h4 className="font-bold">{policy.title}</h4>
                <p className="mt-1 text-sm text-muted-foreground">Content to supply.</p>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Governance;