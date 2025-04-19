"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandWhatsapp, IconBrandX } from "@tabler/icons-react";
import Link from "next/link";

const SocialLinks = () => {
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    
    return (
      <div className="flex gap-3 flex-wrap justify-center">
        {socialLink.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="relative"
          >
            <Link href={item.link} target="_blank" rel="noopener noreferrer">
              <motion.div
                whileHover={{ 
                  scale: 1.1,
                  backgroundColor: item.color,
                  color: "#ffffff"
                }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
                className="relative p-3 bg-black/10 dark:bg-white/10 hover:shadow-lg backdrop-blur-sm rounded-full transition-all duration-300"
              >
                {item.icon}
              </motion.div>
            </Link>
            
            <AnimatePresence>
              {hoverIndex === index && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: -5, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute text-nowrap left-1/2 -translate-x-1/2 -top-10 py-1 px-3 text-xs bg-black dark:bg-white text-white dark:text-black backdrop-blur-sm rounded-md z-10 shadow-md"
                  style={{ 
                    boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
                    minWidth: "max-content"
                  }}
                >
                  {item.name}
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-black dark:bg-white rotate-45"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    );
  };

const phone = process.env.NEXT_PUBLIC_PHONE;

const socialLink = [
    {
      name: "GitHub",
      icon: <IconBrandGithub />,
      link: "https://github.com/m-sanjid",
      color: "#000000"
    },
    {
      name: "Twitter",
      icon: <IconBrandX />,
      link: "https://x.com/sanjid357",
      color: "#000000"
    },
    {
      name: "Linkedin",
      icon: <IconBrandLinkedin />,
      link: "https://www.linkedin.com/in/muhammedsanjid1/",
      color: "#0B66C2"
    },{
      name: "WhatsApp",
      link: `https://api.whatsapp.com/send?phone=91${phone}&text=Hi%20how%20are%20you?`,
      icon: <IconBrandWhatsapp size={20} />,
      color: "#25D366"
    },
  ];
export default SocialLinks;