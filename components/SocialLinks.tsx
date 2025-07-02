import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandWhatsapp,
  IconBrandX,
} from "@tabler/icons-react";
import Link from "next/link";

const SocialLinks = () => {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-wrap justify-center gap-3">
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
                color: "#ffffff",
              }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              className="relative rounded-full bg-black/10 p-3 backdrop-blur-sm transition-all duration-300 hover:shadow-lg dark:bg-white/10"
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
                className="absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-md bg-black px-3 py-1 text-xs text-nowrap text-white shadow-md backdrop-blur-sm dark:bg-white dark:text-black"
                style={{
                  boxShadow: `0 4px 12px rgba(0,0,0,0.1)`,
                  minWidth: "max-content",
                }}
              >
                {item.name}
                <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-black dark:bg-white"></div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SocialLinks;

const phone = process.env.NEXT_PUBLIC_PHONE;

const socialLink = [
  {
    name: "GitHub",
    icon: <IconBrandGithub />,
    link: "https://github.com/m-sanjid",
    color: "#000000",
  },
  {
    name: "Twitter",
    icon: <IconBrandX />,
    link: "https://x.com/sanjid357",
    color: "#000000",
  },
  {
    name: "Linkedin",
    icon: <IconBrandLinkedin />,
    link: "https://www.linkedin.com/in/muhammedsanjid1/",
    color: "#0B66C2",
  },
  {
    name: "WhatsApp",
    link: `https://api.whatsapp.com/send?phone=91${phone}&text=Hi%20how%20are%20you?`,
    icon: <IconBrandWhatsapp size={20} />,
    color: "#25D366",
  },
];
