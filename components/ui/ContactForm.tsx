"use client";

import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { Input } from "./Input";
import { Button } from "./button";

const emptyForm = {
  name: "",
  organization: "",
  email: "",
  writingAs: "",
  message: "",
};

const ContactForm = () => {
  const [form, setForm] = useState(emptyForm);
  const [sending, setSending] = useState(false);

  const update = (field: keyof typeof emptyForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    try {
      const result = await apiRequest<{ message: string }>("/contact", {
        method: "POST",
        body: form,
      });
      toast.success(result.message);
      setForm(emptyForm);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send your message");
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="font-semibold text-sm">Your name</label>
        <Input id="contact-name" className="rounded" placeholder="Full name" value={form.name} onChange={(event) => update("name", event.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-organization" className="font-semibold text-sm">Organization</label>
        <Input id="contact-organization" className="rounded" placeholder="Organization name" value={form.organization} onChange={(event) => update("organization", event.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="font-semibold text-sm">Email</label>
        <Input id="contact-email" type="email" className="rounded" placeholder="your@organization.org" value={form.email} onChange={(event) => update("email", event.target.value)} required />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-writing-as" className="font-semibold text-sm">I am writing as a...</label>
        <select id="contact-writing-as" className="rounded h-10 py-2 px-3 border" value={form.writingAs} onChange={(event) => update("writingAs", event.target.value)} required>
          <option value="">--select an option--</option>
          <option value="Funder">Funder</option>
          <option value="Implementing partner">Implementing partner</option>
          <option value="Media">Media</option>
          <option value="Volunteer">Volunteer</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="font-semibold text-sm">Message</label>
        <textarea id="contact-message" className="rounded border focus:border-primary p-3" placeholder="Tell us briefly what you have in mind" value={form.message} onChange={(event) => update("message", event.target.value)} required rows={5} />
      </div>
      <Button disabled={sending} type="submit" className="p-3 w-fit h-fit font-bold rounded">
        {sending ? "Sending..." : "Send message"}
      </Button>
    </form>
  );
};

export default ContactForm;
