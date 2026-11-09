"use client";

import { useCountUp } from "@/hooks/useCountUp";

const CountUpCard = ({
  value,
  text,
  suffix,
  format = true,
  scale = 1,
  decimalPlaces = 0,
  textClassName = "text-muted/60 text-sm",
}: {
  value: number;
  text: string;
  suffix?: string;
  format?: boolean;
  scale?: number;
  decimalPlaces?: number;
  textClassName?: string;
}) => {
  const animatedNumber = useCountUp(value);
  const scaledNumber = animatedNumber / scale;
  const formattedNumber = decimalPlaces > 0
    ? scaledNumber.toFixed(decimalPlaces)
    : format
      ? new Intl.NumberFormat("en-US").format(scaledNumber)
      : scaledNumber;

  return (
    <div className="flex flex-col gap-3">
      <h3 className="md:text-4xl text-2xl font-extrabold">{formattedNumber}{suffix}</h3>
      <p className={textClassName}>{text}</p>
    </div>
  )
}

export default CountUpCard;