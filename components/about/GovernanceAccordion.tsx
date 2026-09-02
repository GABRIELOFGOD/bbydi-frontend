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

export default GovernanceAccordion
      // </AccordionItem>
      // ))}
      {/* <AccordionItem value="shipping">
        <AccordionTrigger>What are your shipping options?</AccordionTrigger>
        <AccordionContent>
          We offer standard (5-7 days), express (2-3 days), and overnight
          shipping. Free shipping on international orders.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>What is your return policy?</AccordionTrigger>
        <AccordionContent>
          Returns accepted within 30 days. Items must be unused and in original
          packaging. Refunds processed within 5-7 business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="support">
        <AccordionTrigger>How can I contact customer support?</AccordionTrigger>
        <AccordionContent>
          Reach us via email, live chat, or phone. We respond within 24 hours
          during business days.
        </AccordionContent>
      </AccordionItem> */}
//     </Accordion>
//   )
// }

// export default GovernanceAccordion