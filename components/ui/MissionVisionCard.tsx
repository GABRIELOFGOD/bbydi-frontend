import { MissionVisionType } from "@/lib/types";
import Link from "next/link";

const MissionVisionCard = ({ track, title, desc, cta }: MissionVisionType) => {
  return (
    <div className="border hover:border-primary duration-300 top-0 hover:-top-10 p-6 leading-12 tracking-wide bg-white flex flex-col gap-3">
      <p className="text-xs text-primary font-semibold">{track}</p>
      <h3 className="text-lg font-bold">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
      {cta && (
        <Link href={cta.link || ""} className="text-primary tracking-wide font-semibold text-xs">
          {cta.text}
        </Link>
      )}
    </div>
  )
}

export default MissionVisionCard;