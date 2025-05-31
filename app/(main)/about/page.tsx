"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  IconBrandGithub,
  IconBrandTwitter,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import {
  fadeIn,
  slideInFromBottom,
  slideInFromLeft,
  slideInFromRight,
  staggerContainer,
} from "@/lib/animations";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    bio: "Alex has over 10 years of experience in UI/UX design and frontend development.",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Sarah Chen",
    role: "Lead Designer",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    bio: "Sarah specializes in creating beautiful, intuitive interfaces that users love.",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Michael Rodriguez",
    role: "Senior Developer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    bio: "Michael is an expert in React, Next.js, and modern frontend frameworks.",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
  {
    name: "Emily Taylor",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=80",
    bio: "Emily ensures our components meet the highest standards of quality and usability.",
    social: {
      github: "#",
      twitter: "#",
      linkedin: "#",
    },
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section
        className="container mx-auto mb-20 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={slideInFromBottom(0.2)}
        >
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            About Components Hub
          </h1>
          <p className="text-muted-foreground mb-8 text-xl">
            We&apos;re on a mission to make beautiful UI components accessible
            to everyone.
          </p>
        </motion.div>

        <motion.div
          className="relative mt-12 h-[300px] overflow-hidden rounded-2xl md:h-[400px]"
          variants={fadeIn(0.4)}
        >
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80"
            alt="Our team"
            fill
            className="object-cover"
          />
          <div className="from-background/80 absolute inset-0 bg-gradient-to-t to-transparent" />
          <div className="absolute bottom-0 left-0 p-8">
            <h2 className="mb-2 text-3xl font-bold text-white">Our Story</h2>
            <p className="max-w-lg text-white/90">
              Founded in 2023, Components Hub has grown from a small side
              project to a comprehensive library used by thousands of developers
              worldwide.
            </p>
          </div>
        </motion.div>
      </motion.section>

      {/* Mission Section */}
      <motion.section
        className="bg-card container mx-auto mb-20 rounded-3xl px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn()}
      >
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <motion.div variants={slideInFromLeft(0.2)}>
            <h2 className="mb-6 text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              We believe that great design should be accessible to everyone. Our
              mission is to provide high-quality, customizable UI components
              that help developers build beautiful applications faster.
            </p>
            <p className="text-muted-foreground text-lg">
              Every component in our library is crafted with attention to
              detail, accessibility, and performance in mind. We&apos;re
              constantly improving and expanding our offerings based on
              community feedback.
            </p>
          </motion.div>

          <motion.div
            className="relative h-[300px] overflow-hidden rounded-xl"
            variants={slideInFromRight(0.4)}
          >
            <Image
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="Our mission"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="container mx-auto mb-20 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn()}
      >
        <motion.div
          className="mb-16 text-center"
          variants={slideInFromBottom(0.1)}
        >
          <h2 className="mb-4 text-3xl font-bold">Meet Our Team</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            The talented individuals behind Components Hub who are passionate
            about creating the best UI components library.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer}
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              className="bg-card overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md"
              variants={fadeIn(0.1 * index)}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="relative h-64">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="mb-1 text-xl font-bold">{member.name}</h3>
                <p className="text-primary mb-3">{member.role}</p>
                <p className="text-muted-foreground mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  <a
                    href={member.social.github}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <IconBrandGithub className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <IconBrandTwitter className="h-5 w-5" />
                  </a>
                  <a
                    href={member.social.linkedin}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <IconBrandLinkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Values Section */}
      <motion.section
        className="bg-primary/5 container mx-auto mb-20 rounded-3xl px-4 py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeIn()}
      >
        <motion.div
          className="mb-16 text-center"
          variants={slideInFromBottom(0.1)}
        >
          <h2 className="mb-4 text-3xl font-bold">Our Values</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            The principles that guide everything we do at Components Hub.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={staggerContainer}
        >
          <motion.div
            className="bg-card rounded-xl p-8"
            variants={fadeIn(0.1)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="mb-4 text-xl font-bold">Quality First</h3>
            <p className="text-muted-foreground">
              We never compromise on quality. Every component is thoroughly
              tested and refined before release.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-xl p-8"
            variants={fadeIn(0.2)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="mb-4 text-xl font-bold">User-Centered</h3>
            <p className="text-muted-foreground">
              We design with users in mind, focusing on accessibility,
              usability, and delightful experiences.
            </p>
          </motion.div>

          <motion.div
            className="bg-card rounded-xl p-8"
            variants={fadeIn(0.3)}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <h3 className="mb-4 text-xl font-bold">Community Driven</h3>
            <p className="text-muted-foreground">
              We actively listen to feedback and involve our community in
              shaping the future of our library.
            </p>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
