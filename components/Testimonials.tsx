"use client";

import { Star } from "lucide-react";
import React from "react";
import { motion } from "motion/react";
import { testimonials } from "@/lib/constants";
import Image from "next/image";

const Testimonials = () => {
  return (
    <section className="px-4 py-20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <motion.h2
            className="mb-4 text-3xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Developers Are Saying
          </motion.h2>
          <motion.p
            className="text-muted-foreground mx-auto max-w-2xl text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Don&apos;t just take our word for it.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-card rounded-lg p-6 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="mb-4 flex items-center gap-4">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                &quot;{testimonial.quote}&quot;
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-card mx-auto mt-12 max-w-2xl rounded-lg p-6 shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="mb-4 flex items-center justify-center gap-4">
            <div className="text-warning flex">
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
            </div>
            <p className="font-medium">4.9/5 rating on GitHub</p>
          </div>
          <p className="text-muted-foreground text-center">
            Join over 5,000 developers who love our component library.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
