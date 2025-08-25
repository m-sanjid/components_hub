"use client";

import {
  ContactForm,
  ContactField,
  ContactTextArea,
  ContactSubmit,
} from "../code/contact-form";

export default function Page() {
  const handleSubmit = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { success: true, message: "Message sent successfully" };
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="mb-4 text-2xl font-bold">Contact Form</h1>
      <ContactForm onSubmit={handleSubmit} className="w-full max-w-md">
        <ContactField name="name" label="Name" />
        <ContactField name="email" label="Email" type="email" />
        <ContactField name="subject" label="Subject" />
        <ContactTextArea name="message" label="Message" />
        <ContactSubmit>Send Message</ContactSubmit>
      </ContactForm>
    </div>
  );
}
