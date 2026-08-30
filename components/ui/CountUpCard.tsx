"use client";

import { useCountUp } from "@/hooks/useCountUp";

const CountUpCard = ({ value, text, suffix, format = true }: { value: number, text: string, suffix?: string, format?: boolean }) => {
  const animatedNumber = useCountUp(value);
  const formattedNumber = format ? new Intl.NumberFormat("en-US").format(animatedNumber) : animatedNumber;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-4xl font-extrabold">{formattedNumber}{suffix}</h3>
      <p className="text-muted/60 text-sm">{text}</p>
    </div>
  )
}

export default CountUpCard;