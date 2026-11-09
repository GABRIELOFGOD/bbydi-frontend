import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Governed } from "@/lib/constants";

const GovernanceAccordion = () => {
  return (
    <Accordion defaultValue={["1"]} className="gap-2">
      {Governed.map((itm) => (
        <AccordionItem className="rounded-sm border border-black/10 px-4" value={itm.id} key={itm.id}>
          <AccordionTrigger className="font-bold no-underline hover:no-underline">{itm.topic}</AccordionTrigger>
          <AccordionContent className="text-sm leading-6 text-foreground/75">
            {itm.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default GovernanceAccordion;