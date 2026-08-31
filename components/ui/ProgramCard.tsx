import { ProgrammingAreasTypes } from "@/lib/types";
import ColumnTitle from "./ColumnTitle";
import { Button } from "./button";
import Link from "next/link";
import Image from "next/image";

const ProgramCard = ({ image, title, description, project, sn }: ProgrammingAreasTypes) => {
  return (
    <div className="flex gap-5 flex-col">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 md:gap-10 mb-5">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-3">
            <p className="h-7 w-8 flex justify-center items-center rounded bg-secondary/20 text-primary text-xs font-semibold">{sn}</p>
            <ColumnTitle text={title} />
          </div>

          <p className="text-lg">{description}</p>

          <Link href={`/projects?category=${project}`}>
            <Button className="p-5 bg-transparent hover:bg-transparent border-2 border-primary rounded text-primary font-bold">Related projects</Button>
          </Link>
        </div>
        <div>
          <Image
            src={image}
            alt={`Image - ${title}`}
            width={500}
            height={500}
            className="rounded"
          />
        </div>
      </div>
      <div className="h-[0.5px] bg-gray-200 rounded w-full" />
    </div>
  )
}

export default ProgramCard;