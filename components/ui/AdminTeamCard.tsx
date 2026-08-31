import { TeamDataType } from "@/lib/team";
import Image from "next/image";

const AdminTeamCard = ({ image, category, id, name, role } : TeamDataType) => {
  return (
    <div className="w-full p-5 border flex gap-5 bg-white">
      {image ? (
        <Image
          src={image}
          alt={`Image - ${name}`}
          quality={100}
          width={80}
          height={80}
        />
      ) : (
        <div className="w-20 h-20 bg-primary text-white font-extrabold text-5xl flex justify-center items-center">
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

export default AdminTeamCard;