"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { useUser } from "@/providers/userProvider";

type ContactSubmission = {
  _id: string;
  name: string;
  organization: string;
  email: string;
  writingAs: string;
  message: string;
  status: "new" | "handled";
  createdAt: string;
};

export default function ContactInbox() {
  const { user } = useUser();
  const [messages, setMessages] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMessages = useCallback(async () => {
    setLoading(true);
    try {
      setMessages(await apiRequest<ContactSubmission[]>("/contact"));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not load contact messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") void loadMessages();
  }, [loadMessages, user?.role]);

  const updateStatus = async (message: ContactSubmission) => {
    try {
      await apiRequest(`/contact/${message._id}`, {
        method: "PATCH",
        body: { status: message.status === "new" ? "handled" : "new" },
      });
      await loadMessages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not update message");
    }
  };

  const removeMessage = async (message: ContactSubmission) => {
    if (!window.confirm(`Delete the message from ${message.name}?`)) return;
    try {
      await apiRequest(`/contact/${message._id}`, { method: "DELETE" });
      toast.success("Message deleted");
      await loadMessages();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete message");
    }
  };

  if (user?.role !== "admin") {
    return <p className="rounded border p-5 text-sm">Only administrators can access the contact inbox.</p>;
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Contact inbox</h1>
        <button type="button" onClick={() => void loadMessages()} className="text-sm font-semibold text-primary">Refresh</button>
      </div>
      {loading ? <p className="text-sm text-muted-foreground">Loading messages...</p> : messages.length === 0 ? (
        <p className="rounded border p-5 text-sm text-muted-foreground">No messages received yet.</p>
      ) : (
        <div className="space-y-3">
          {messages.map((message) => (
            <article key={message._id} className="space-y-3 rounded border bg-white p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="font-semibold">{message.name} <span className="font-normal text-muted-foreground">({message.writingAs})</span></h2>
                  <p className="text-sm text-muted-foreground">{message.organization} · <a href={`mailto:${message.email}`} className="text-primary">{message.email}</a></p>
                </div>
                <span className={`rounded px-2 py-1 text-xs font-semibold ${message.status === "new" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"}`}>{message.status}</span>
              </div>
              <p className="whitespace-pre-wrap text-sm">{message.message}</p>
              <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleString()}</p>
              <div className="flex gap-2">
                <button type="button" onClick={() => void updateStatus(message)} className="rounded border px-3 py-1.5 text-sm">
                  Mark {message.status === "new" ? "handled" : "new"}
                </button>
                <button type="button" onClick={() => void removeMessage(message)} className="rounded border border-destructive px-3 py-1.5 text-sm text-destructive">Delete</button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
