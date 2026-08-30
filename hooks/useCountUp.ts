"use client";
import { useEffect, useState } from "react";

export function useCountUp(endValue: number, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      // Calculate progress percentage (capped at 1)
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Apply an easing function (ease-out quad) for smooth slowing down at the end
      const easeOutQuad = progressPercentage * (2 - progressPercentage);
      
      // Calculate and update current value
      const currentValue = Math.floor(easeOutQuad * endValue);
      setCount(currentValue);

      if (progress < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [endValue, duration]);

  return count;
}
