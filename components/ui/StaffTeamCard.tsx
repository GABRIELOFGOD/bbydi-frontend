
import { TeamDataType } from "@/lib/team";
import Image from "next/image";
import Link from "next/link";

const StaffTeamCard = ({ image, id, name, role }: TeamDataType) => {
  return (
    <Link href={`/about/team/${encodeURIComponent(id)}`} aria-label={`Read more about ${name}`} className="w-full flex flex-col gap-5 rounded-sm p-2 transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
      {image ? (
        <Image
          src={image}
          alt={`Image - ${name}`}
          quality={100}
          width={200}
          height={200}
        />
      ) : (
        <div className="w-50 h-50 bg-primary text-white font-extrabold text-5xl flex justify-center items-center">
          {name.split(" ").map(name => name.slice(0, 1))}
        </div>
      )}

      <div className="flex flex-col gap-1">
        <h4 className="font-extrabold">{name}</h4>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </Link>
  )
}

export default StaffTeamCard;