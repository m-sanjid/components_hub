"use client";

import { motion } from "motion/react";
import React from "react";
import { fadeIn } from "@/lib/animations";

const FeatureCard = ({
  icon,
  title,
  description,
  animationDelay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationDelay: number;
}) => {
  return (
    <motion.div
      className="rounded-xl border border-neutral-100 bg-white p-8 shadow-md transition-shadow hover:shadow-lg"
      variants={fadeIn(animationDelay)}
    >
      <div className="bg-primary/10 text-primary mb-4 inline-block rounded-lg p-3">
        {icon}
      </div>
      <h3 className="mb-3 text-xl font-semibold">{title}</h3>
      <p className="text-neutral-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
