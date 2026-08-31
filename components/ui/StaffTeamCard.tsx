
import { TeamDataType } from "@/lib/team";
import Image from "next/image";

const StaffTeamCard = ({ image, category, id, name, role }: TeamDataType) => {
  return (
    <div className="w-full flex flex-col gap-5">
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
    </div>
  )
}

export default StaffTeamCard;