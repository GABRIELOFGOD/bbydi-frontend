import { cn } from "@/lib/utils";

const Input = ({ placeholder, value, onChange, className, type = "text" }: { placeholder?: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string; type?: string }) => {
  return (
    <div>
      <input placeholder={placeholder} value={value} onChange={onChange} className={cn("border h-10 w-full px-3 py-1 active:border-primary", className)} type={type} />
    </div>
  )
}

export default Input;