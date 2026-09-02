import { cn } from "@/lib/utils";
import { MoveRightIcon } from "lucide-react";
import Link from "next/link";

const Card = ({ numberOfCards, title, description, cta, className } : {
  numberOfCards?: string;
  title?: string;
  description?: string;
  cta?: {
    text: string;
    href?: string;
  };
  className?: string;
}) => {
  return (
    <div className={cn("bg-white p-6 border w-full", className)}>
      {numberOfCards && (
        <div className="text-xs font-semibold text-primary">{numberOfCards}</div>
      )}
      {title && (
        <h3 className="text-lg font-bold mt-2">{title}</h3>
      )}
      {description && (
        <p className="text-black/70 text-sm mt-2 line-clamp-2 leading-6">{description}</p>
      )}
      {cta && (
        <Link
          href={cta.href || ""}
          className="text-primary capitalize font-semibold text-xs mt-4 flex gap-2"
        >
          {cta.text}
          <MoveRightIcon size={14} className="text-primary my-auto" />
        </Link>
      )}
    </div>
  )
}

export default Card;