"use client";

import { NewTypes } from "@/lib/types";
import { useEffect, useState } from "react";

const NewsCard = ({ content, date, id, title, publisher }: NewTypes) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // Render a placeholder or skeletal state on the server
    return <span>Loading date...</span>; 
  }

  return (
    <div className="w-full py-5 border-b cursor-pointer border-muted flex flex-col md:flex-row gap-5 md:gap-10 text-foreground hover:text-primary">
      <p className="text-muted-foreground text-xs pt-2 font-semibold">{new Date(date).toLocaleDateString()}</p>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-black/80 text-sm">{content}</p>
      </div>
    </div>
  )
}

export default NewsCard;