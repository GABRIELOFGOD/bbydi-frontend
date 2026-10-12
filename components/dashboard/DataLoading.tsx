import { cn } from "@/lib/utils"
import { Loader } from "lucide-react"

const DataLoading = ({
  className, label
} : { className?: string, label?: string }) => {
  return (
    <div className={cn("w-full h-full px-6 py-10 flex flex-col gap-5 justify-center items-center", className)}>
      <Loader className="text-primary" />
      <p className="text-xs text-center text-gray-500 font-bold">{label ? label : "Loading data..."}</p>
    </div>
  )
}

export default DataLoading;