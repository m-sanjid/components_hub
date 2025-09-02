"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
} from "@tabler/icons-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  socials: {
    linkedin: string;
    github: string;
    twitter: string;
    mail: string;
  };
}

const SocialIcon = ({ type, url }: { type: string; url: string }) => {
  const iconProps = { size: 20, className: "text-secondary" };

  switch (type) {
    case "linkedin":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <IconBrandLinkedin {...iconProps} />
        </a>
      );
    case "github":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <IconBrandGithub {...iconProps} />
        </a>
      );
    case "twitter":
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <IconBrandX {...iconProps} />
        </a>
      );
    case "mail":
      return (
        <a href={`mailto:${url}`} target="_blank" rel="noopener noreferrer">
          <IconMail {...iconProps} />
        </a>
      );
    default:
      return null;
  }
};

const TeamGallery = ({ teamMembers }: { teamMembers: TeamMember[] }) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [hovered, setIsHovered] = useState<number | null>(null);

  //handle esc key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleBack();
      }
    };
    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member);
  };

  const handleBack = () => {
    setSelectedMember(null);
  };

  return (
    <div className="mx-auto min-h-[calc(100vh-12rem)] max-w-5xl px-4 py-8">
      <h2 className="mb-12 text-center text-3xl font-bold">Our Team</h2>

      <AnimatePresence mode="popLayout">
        {selectedMember ? (
          // Expanded view of a team member
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={handleBack}
            className="bg-primary/10 fixed inset-0 z-50 flex items-center justify-center p-2 backdrop-blur-[4px]"
          >
            <motion.div
              key="expanded-card"
              layoutId={`card-container-${selectedMember.id}`}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-secondary mx-auto max-w-4xl overflow-hidden rounded-2xl border p-2 shadow-xl"
            >
              <div className="flex flex-col items-center md:flex-row">
                <motion.div
                  layoutId={`card-image-${selectedMember.id}`}
                  className="bg-secondary/80 h-full w-full overflow-hidden p-2 md:w-2/5"
                >
                  <img
                    src={selectedMember.image}
                    alt={selectedMember.name}
                    className="h-64 w-full rounded-[8px] object-cover md:h-full"
                  />
                </motion.div>

                <div className="mt-1 w-full p-2 md:w-3/5 md:pl-6">
                  <motion.button
                    onClick={handleBack}
                    initial={{
                      opacity: 0,
                      x: -40,
                      filter: "blur(4px)",
                      scale: 0.9,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      filter: "blur(0px)",
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -40,
                      filter: "blur(4px)",
                      scale: 0.9,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.2,
                    }}
                    className="text-muted-foreground hover:text-primary mb-4 flex items-center text-xs transition-colors"
                  >
                    <IconArrowLeft size={16} className="mr-2" />
                    <span>Back to team</span>
                  </motion.button>

                  <motion.div
                    layoutId={`card-name-${selectedMember.id}`}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mb-1 text-start text-2xl font-bold"
                  >
                    {selectedMember.name}
                  </motion.div>

                  <motion.div
                    layoutId={`card-role-${selectedMember.id}`}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-muted-foreground mb-4 text-start font-medium"
                  >
                    {selectedMember.role}
                  </motion.div>

                  <motion.div
                    initial={{
                      opacity: 0,
                      scale: 0.9,
                      filter: "blur(4px)",
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.9,
                      filter: "blur(4px)",
                      y: 20,
                    }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="text-muted-foreground mb-6 text-start text-sm">
                      {selectedMember.bio}
                    </div>

                    <div className="flex items-center justify-between border-t pt-6">
                      <div className="text-muted-foreground text-sm font-medium">
                        Connect with{" "}
                        <span className="text-primary text-base font-semibold tracking-tight">
                          {selectedMember.name.split(" ")[0]}
                        </span>
                      </div>
                      <div
                        onMouseLeave={() => setIsHovered(null)}
                        className="flex w-full items-center justify-center space-x-2 md:space-x-4"
                      >
                        {Object.entries(selectedMember.socials).map(
                          ([platform, url], index) => (
                            <div
                              onMouseEnter={() => setIsHovered(index)}
                              key={platform}
                              className="bg-primary relative flex cursor-pointer items-center rounded-lg p-2"
                            >
                              <SocialIcon
                                key={platform}
                                type={platform}
                                url={url}
                              />
                              {hovered === index && (
                                <motion.div
                                  layoutId="hover"
                                  transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                  }}
                                  className="bg-primary/20 absolute -right-4 bottom-10 rounded-[6px] px-2 py-px text-xs backdrop-blur-sm"
                                >
                                  <motion.div
                                    initial={{
                                      opacity: 0,
                                      x: -20,
                                      filter: "blur(4px)",
                                      scale: 0.9,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      x: 0,
                                      filter: "blur(0px)",
                                      scale: 1,
                                    }}
                                    exit={{
                                      opacity: 0,
                                      x: -20,
                                      filter: "blur(4px)",
                                      scale: 0.9,
                                    }}
                                    transition={{ duration: 0.1 }}
                                  >
                                    {platform}
                                  </motion.div>
                                </motion.div>
                              )}
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Grid view of all team members
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2"
          >
            {teamMembers.map((member) => (
              <motion.div
                layoutId={`card-container-${member.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={member.id}
                onClick={() => handleCardClick(member)}
                className="cursor-pointer overflow-hidden rounded-3xl border bg-white p-2 shadow-md transition-shadow hover:shadow-xl dark:bg-zinc-900"
              >
                <motion.div
                  layoutId={`card-image-${member.id}`}
                  className="bg-secondary/80 h-64 w-full overflow-hidden rounded-[16px] border"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    height={64}
                    width={64}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
                <div className="p-4">
                  <motion.div
                    layoutId={`card-name-${member.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="mb-1 text-xl font-bold"
                  >
                    {member.name}
                  </motion.div>
                  <motion.div
                    layoutId={`card-role-${member.id}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-muted-foreground"
                  >
                    {member.role}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeamGallery;
