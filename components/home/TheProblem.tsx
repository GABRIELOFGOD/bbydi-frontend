import { cn } from "@/lib/utils";
import Container from "../Container";
import { Button } from "../ui/button";
import ColumnTitle from "../ui/ColumnTitle";
import SectionTitle from "../ui/SectionTitle";

const TheProblem = () => {
  const data = [
    {
      id: "01",
      value: "4.4%",
      text: "of elected positions in Nigeria are held by women"
    },
    {
      id: "02",
      value: "27.3%",
      text: "is the sub-Saharan African average"
    },
    {
      id: "03",
      value: "15",
      text: "states with zero women in the state legislature"
    }
  ]
  
  return (
    <div className="bg-foreground py-20 flex flex-col w-full text-white">
      <Container className="grid grid-cols-1 md:grid-cols-2 md:gap-10 gap-5">
        <div className="flex flex-col gap-5">
          <SectionTitle showLine={false} title="The problem we exist for" />
          <ColumnTitle text="Nigeria ranks 180th out of 185 countries on women's parliamentary representation." className="text-white" />
          <p className="text-lg">Nearly half the population. 4.4% of elected positions. Fifteen states have not a single woman in their state legislature — not underrepresentation, zero.</p>
          <Button className={cn("bg-white text-primary font-bold p-5 rounded w-fit")}>How Space for Her answers it</Button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            {data.map((dt) => (
              <div key={dt.id} className="border-l-3 border-secondary p-3 flex flex-col gap-2">
                <p className="text-3xl font-extrabold">{dt.value}</p>
                <p className="text-muted-foreground text-sm">{dt.text}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Sources: IPU Parline (Feb 2024); PLAC; Agora Policy post-2023 election analysis.
          </p>
        </div>
      </Container>
    </div>
  )
}

export default TheProblem;