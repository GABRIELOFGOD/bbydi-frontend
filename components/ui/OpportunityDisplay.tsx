import { OtherOpportunities, TopOpportunities } from "@/lib/constants";
import OpportunityCard from "./OpportunityCard";
import Container from "../Container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ColumnTitle from "./ColumnTitle";
import { cn } from "@/lib/utils";

const OpportunityDisplay = () => {
  return (
    <Container className="flex flex-col gap-5 py-20">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {TopOpportunities.map((top) => (
          <OpportunityCard
            key={top.id}
            // image={top.image}
            // status={top.status}
            // title={top.title}
            // desc={top.desc || ""}
            // link={top.link}
            // id={top.id}
            {...top}
          />
        ))}
      </div>

      <div className="flex gap-5 flex-col mt-5">
        <ColumnTitle text="All current calls" />
        <Table>
          <TableHeader>
            <TableRow className="border-b-black">
              <TableHead className="text-xs text-gray-500 uppercase">Opportunity</TableHead>
              <TableHead className="text-xs text-gray-500 uppercase">Type</TableHead>
              <TableHead className="text-xs text-gray-500 uppercase">Location</TableHead>
              <TableHead className="text-xs text-gray-500 uppercase">Deadline</TableHead>
              <TableHead className="text-xs text-gray-500 uppercase">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OtherOpportunities.map((invoice) => (
              <TableRow className="mt-10" key={invoice.id}>
                <TableCell className="font-bold pb-10">{invoice.title}</TableCell>
                <TableCell className="capitalize">{invoice.type}</TableCell>
                <TableCell>{invoice.location}</TableCell>
                <TableCell>{invoice.deadline}</TableCell>
                <TableCell><p  className={cn("uppercase text-xs w-fit h-fit px-3 py-1 font-semibold", invoice.status === "open" ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700")}>{invoice.status}</p></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Container>
  )
}

export default OpportunityDisplay;