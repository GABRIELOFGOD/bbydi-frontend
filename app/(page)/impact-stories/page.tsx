import ImpactStoriesPage from "@/components/impact/ImpactStoriesPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impact Stories",
  description:
    "Stories from BBYDI's published work, showing what changed and for whom.",
  alternates: { canonical: "/impact-stories" },
};

export default function ImpactStoriesRoute() {
  return <ImpactStoriesPage />;
}
