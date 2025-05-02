"use client";

import { Star } from "lucide-react";
import React from "react";
import {motion} from "motion/react"
import { testimonials } from "@/lib/constants";

const Testimonials = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            What Developers Are Saying
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Don't just take our word for it.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              className="bg-card p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "{testimonial.quote}"
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 bg-card p-6 rounded-lg shadow-md max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          whileHover={{ y: -5 }}
        >
          <div className="flex items-center gap-4 justify-center mb-4">
            <div className="flex text-warning">
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
              <Star size={24} fill="currentColor" />
            </div>
            <p className="font-medium">4.9/5 rating on GitHub</p>
          </div>
          <p className="text-center text-muted-foreground">
            Join over 5,000 developers who love our component library.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
