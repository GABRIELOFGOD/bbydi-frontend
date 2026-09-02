import { OpportunityTypes } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const OpportunityCard = ({ image, status, title, desc }: OpportunityTypes) => {
  return (
    <div className={cn("border relative w-full h-full border-t-3 hover:border-primary flex flex-col", status === "open" ? "border-t-primary" : "border-t-gray-400")}>
      {image && (
        <div className="relative w-full h-52 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      )}

      <div className="p-4 flex gap-3 flex-col relative z-10 bg-white">
        <p className={cn("w-fit px-3 py-1 text-xs font-semibold", status === "open" ? "bg-green-500/20 text-green-700" : "bg-gray-500/20 text-gray-700")}>{status}</p>
        {title && (
          <h3 className="text-lg font-bold">{title}</h3>
        )}
        {desc && (
          <p className="text-black/70 text-sm">{desc}</p>
        )}

        {status === "open" ? (
          <Link href="#" className="text-primary font-semibold text-sm">Apply →</Link>
        ) : (
          <p className="text-gray-500 font-semibold text-sm">Archived</p>
        )}
      </div>
    </div>
  )
}

export default OpportunityCard;