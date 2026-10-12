"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { ContentItem, StaffProfile } from "@/lib/content";
import { CardTypes } from "@/lib/types";
import DashboardHomeCard from "./DashboardHomeCard"

const DashboardCardDisplay = () => {
  const [cards, setCards] = useState<CardTypes[]>([]);

  useEffect(() => {
    const loadCounts = async () => {
      try {
        const [projects, programs, team] = await Promise.all([
          apiRequest<ContentItem[]>("/content/project/all"),
          apiRequest<ContentItem[]>("/content/program/all"),
          apiRequest<StaffProfile[]>("/staff/profiles"),
        ]);
        setCards([
          { id: 1, title: "Projects", text: "Manage your projects and initiatives", value: projects.length },
          { id: 2, title: "Team Members", text: "Manage public team profiles", value: team.length },
          { id: 3, title: "Programs", text: "Manage your programs and initiatives", value: programs.length },
        ]);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Could not load dashboard counts");
      }
    };
    void loadCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.length > 0 ? cards.map((card) => (
        <DashboardHomeCard key={card.id} {...card} />
      )) : (
        <p className="text-sm text-muted-foreground">Loading dashboard overview...</p>
      )}
    </div>
  )
}

export default DashboardCardDisplay