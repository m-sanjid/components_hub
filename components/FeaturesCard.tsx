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
      className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow border border-gray-100"
      variants={fadeIn(animationDelay)}
    >
      <div className="bg-primary/10 text-primary p-3 rounded-lg inline-block mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;
