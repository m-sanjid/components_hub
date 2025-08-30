"use client";

import { useState, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { motion } from "motion/react";
import { toast } from "sonner";
import { IconCircleCheck, IconLoader2, IconSend } from "@tabler/icons-react";

// ----------------------
// Schema
// ----------------------
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters." }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
type FormValues = z.infer<typeof formSchema>;

// ----------------------
// Reusable Input Field
// ----------------------
const AnimatedFormField = ({
  name,
  label,
  placeholder,
  control,
  component: Component = "input",
  rows,
}: {
  name: keyof FormValues;
  label: string;
  placeholder: string;
  control: any;
  component?: "input" | "textarea";
  rows?: number;
}) => {
  const [focused, setFocused] = useState(false);

  const inputVariants = {
    focused: {
      scale: 1.01,
      boxShadow: "0 0 0 2px rgba(var(--primary-rgb), 0.25)",
    },
    unfocused: { scale: 1, boxShadow: "none" },
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <div className="flex flex-col space-y-1">
          <label
            htmlFor={name}
            className="flex items-center text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            {label}
            {formState.dirtyFields[name] && !fieldState.error && (
              <IconCircleCheck className="ml-2 h-3 w-3 text-green-500" />
            )}
          </label>
          <motion.div
            variants={inputVariants}
            animate={focused ? "focused" : "unfocused"}
          >
            {Component === "textarea" ? (
              <textarea
                {...field}
                id={name}
                rows={rows}
                placeholder={placeholder}
                aria-invalid={!!fieldState.error}
                aria-describedby={`${name}-error`}
                className="focus:border-primary w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-200 outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            ) : (
              <input
                {...field}
                id={name}
                type="text"
                placeholder={placeholder}
                aria-invalid={!!fieldState.error}
                aria-describedby={`${name}-error`}
                className="focus:border-primary w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-sm transition-all duration-200 outline-none dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-100"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            )}
          </motion.div>
          {fieldState.error && (
            <span id={`${name}-error`} className="text-xs text-red-500">
              {fieldState.error.message}
            </span>
          )}
          {name === "message" &&
            formState.dirtyFields.message &&
            field.value && (
              <div className="mt-1 flex justify-end">
                <span
                  className={`text-xs ${
                    field.value.length < 10
                      ? "text-red-500"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  {field.value.length} / 10+ characters
                </span>
              </div>
            )}
        </div>
      )}
    />
  );
};

// ----------------------
// Main Contact Form
// ----------------------
export default function FlowForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  // progress bar calc
  const formProgress = useMemo(() => {
    const { name, email, subject, message } = form.getValues();
    const valid = [
      name.length >= 2,
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      subject.length >= 5,
      message.length >= 10,
    ];
    return (valid.filter(Boolean).length / valid.length) * 100;
  }, [form.watch()]);

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Simulate now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      //   const res = await fetch("/api/send", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(data),
      //   });

      //   if (!res.ok) throw new Error("Failed request");
      toast.success("Message sent successfully");
      form.reset();
    } catch {
      toast.error("Failed to send message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="m-2 mx-auto max-w-xl space-y-6 rounded-xl border bg-neutral-50 p-4 dark:bg-neutral-950"
    >
      {/* Progress bar */}
      <div className="mb-6 h-1 w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-700">
        <motion.div
          className="bg-primary h-full"
          animate={{ width: `${formProgress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <AnimatedFormField
          name="name"
          label="Your Name"
          placeholder="John Doe"
          control={form.control}
        />
        <AnimatedFormField
          name="email"
          label="Your Email"
          placeholder="john@example.com"
          control={form.control}
        />
      </div>
      <AnimatedFormField
        name="subject"
        label="Subject"
        placeholder="Project Inquiry"
        control={form.control}
      />
      <AnimatedFormField
        name="message"
        label="Message"
        placeholder="Tell me about your project..."
        control={form.control}
        component="textarea"
        rows={5}
      />

      {/* Submit */}
      <motion.div whileHover={{ scale: formProgress === 100 ? 1.02 : 1 }}>
        <button
          type="submit"
          aria-label={isSubmitting ? "Sending message" : "Send message"}
          disabled={isSubmitting || formProgress !== 100}
          className={`relative flex w-full items-center justify-center rounded-md px-4 py-2 font-medium text-white shadow transition-all dark:text-black ${
            formProgress === 100
              ? "hover:bg-primary/90 bg-black dark:bg-white"
              : "cursor-not-allowed bg-black/70 dark:bg-white/70 dark:text-black"
          }`}
        >
          {isSubmitting ? (
            <>
              <IconLoader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <IconSend className="mr-2 h-4 w-4" /> Send Message
            </>
          )}
        </button>
      </motion.div>
    </form>
  );
}
