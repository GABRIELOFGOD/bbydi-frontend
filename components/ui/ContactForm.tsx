"use client";

import Input from "./input";
import { Button } from "./button";

const ContactForm = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold text-sm">Your name</label>
        <Input className="rounded" placeholder="Full name" value="" onChange={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="organization" className="font-semibold text-sm">Organization</label>
        <Input className="rounded" placeholder="Organization name" value="" onChange={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-semibold text-sm">Email</label>
        <Input className="rounded" placeholder="your@organization.org" value="" onChange={() => {}} />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="writing-as" className="font-semibold text-sm">I am writing as a...</label>
        <select className="rounded h-10 py-2 px-3 border" value="" onChange={() => {}}>
          <option value="">--select an option--</option>
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-semibold text-sm">Message</label>
        <textarea className="rounded border focus:border-primary p-3" placeholder="Tell us briefly what you have in mind" value="" onChange={() => {}}></textarea>
      </div>
      <Button className="p-3 w-fit h-fit font-bold rounded">Send message</Button>
    </div>
  )
}

export default ContactForm;