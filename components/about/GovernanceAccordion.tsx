import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Governed } from "@/lib/constants";

const GovernanceAccordion = () => {
  return (
    <Accordion defaultValue={["shipping"]} className="max-w-lg gap-5 p-3">
      {Governed.map((itm) => (
        <AccordionItem className={"border-2 p-3"} value={itm.id}>
          <AccordionTrigger className={"font-bold no-underline"}>{itm.topic}</AccordionTrigger>
          <AccordionContent>
            {itm.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default GovernanceAccordion;