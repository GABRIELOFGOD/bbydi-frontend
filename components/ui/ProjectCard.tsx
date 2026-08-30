import { ProjectCardTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./button";
import Link from "next/link";

interface privateProjectCardType extends ProjectCardTypes {
  className?: string
}

const ProjectCard = ({ category, context, desc, id, image, status, title, className }: privateProjectCardType) => {
  return (
    <div className={cn("w-full border rounded relative h-full", className)}>
      <div className="relative h-50 w-full">
        <Image
          src={image}
          alt={`Project image - ${title}`}
          layout="fill"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="p-5 flex flex-col gap-2">
        <p className="w-full bg-primary/15 text-primary text-xs px-2 py-1 font-semibold rounded uppercase">
          <span>{category}</span> . <span>{status}</span>
        </p>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-black/80 text-sm leading-7 tracking-wide line-clamp-3">{context}</p>
        <div className="h-px w-full bg-gray-200 my-5" />
        <div className="bottom-0 flex flex-col my-auto">
          <p className="text-sm text-primary font-bold">{desc}</p>
          <Link href={`/projects/${id}`}>
            <Button className="w-full my-auto mt-5 p-5 rounded bg-transparent hover:bg-primary/10 border-2 border-primary text-primary font-bold">
              Open project page →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard;