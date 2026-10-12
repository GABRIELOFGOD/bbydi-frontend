import { cn } from "@/lib/utils";

const EmptyState = ({  className, label } : { className?: string, label?: string }) => {
  return (
    <div className={cn("min-h-25 w-full h-full flex justify-center items-center")}>
      <p className="text-lg text-center italic text-gray-500 font-bold">{label ? label : "No Data"}</p>
    </div>
  )
}

export default EmptyState;