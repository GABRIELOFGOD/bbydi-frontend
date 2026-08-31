import { PublicationType } from "@/lib/types";

const PublicationCard = ({ title, desc, text }: PublicationType) => {
  return (
    <div className="border p-4 bg-white flex gap-5 cursor-pointer hover:border-primary">
      <div className="h-full max-w-10 min-w-10 flex justify-center items-center text-white text-xs bg-foreground">{text ? text : "PDF"}</div>
      <div className="flex flex-col gap-2">
        <h4 className="text-medium font-extrabold">{title}</h4>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  )
}

export default PublicationCard;