"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { ContentItem } from "@/lib/content";
import { ContentKind } from "@/lib/types";

export function usePublicContent<T>(
  kind: ContentKind,
  fallback: T[],
  map: (item: ContentItem, index: number) => T,
) {
  const [items, setItems] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const result = await apiRequest<ContentItem[]>(`/content/${kind}`);
        if (active) setItems(result.map(map));
      } catch (error) {
        if (active) toast.error(error instanceof Error ? error.message : `Could not load ${kind}`);
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [kind, map]);

  return { items, loading };
}
