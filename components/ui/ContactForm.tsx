import Input from "./Input";

const ContactForm = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-semibold text-sm">Your name</label>
        <Input placeholder="Full name" value="" onChange={() => {}} />
      </div>
    </div>
  )
}

export default ContactForm;