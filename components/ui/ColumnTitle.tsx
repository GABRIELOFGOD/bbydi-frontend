import { cn } from "@/lib/utils"

const ColumnTitle = ({ text, className }: { text: string, className?: string }) => {
  return (
    <h2 className={cn("text-3xl font-bold", className)}>
      {text}
    </h2>
  )
}

export default ColumnTitle