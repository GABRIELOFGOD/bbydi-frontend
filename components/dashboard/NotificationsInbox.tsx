"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { useUser } from "@/providers/userProvider";

type NotificationItem = {
  _id: string;
  category: "contact" | "content" | "approval";
  title: string;
  message: string;
  href: string;
  read: boolean;
  createdAt: string;
};

export default function NotificationsInbox() {
  const { user } = useUser();
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadItems = useCallback(async () => {
    setLoading(true);
    try {
      setItems(await apiRequest<NotificationItem[]>("/notifications"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) void loadItems();
  }, [loadItems, user]);

  const markRead = async (item: NotificationItem) => {
    if (item.read) return;
    try {
      await apiRequest(`/notifications/${item._id}/read`, { method: "PATCH" });
      setItems((current) => current.map((entry) => entry._id === item._id ? { ...entry, read: true } : entry));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not mark notification as read");
    }
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Contact messages and content review updates.</p>
        </div>
        <button type="button" onClick={() => void loadItems()} className="text-sm font-semibold text-primary">Refresh</button>
      </div>
      {loading ? <p className="text-sm text-muted-foreground">Loading notifications...</p> : items.length === 0 ? (
        <p className="rounded border p-5 text-sm text-muted-foreground">You have no notifications.</p>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <article key={item._id} className={`rounded border p-4 ${item.read ? "bg-white" : "bg-primary/5"}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{item.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleString()} · {item.category}</p>
                </div>
                <div className="flex gap-3 text-sm">
                  <Link href={item.href} onClick={() => void markRead(item)} className="font-semibold text-primary">Open</Link>
                  {!item.read && <button type="button" onClick={() => void markRead(item)} className="text-muted-foreground">Mark read</button>}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
