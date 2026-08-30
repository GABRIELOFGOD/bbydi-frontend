import { cn } from "@/lib/utils";

const SectionTitle = ({ title, showLine = true, className }: { title: string, showLine?: boolean, className?: string }) => {
  return (
    <div className={cn("flex flex-col gap-3 w-fit", className)}>
      <h2 className="text-primary uppercase text-xs font-semibold">{title}</h2>
      {showLine && (<div className="w-13 h-1 bg-primary" />)}
    </div>
  )
}

export default SectionTitle;