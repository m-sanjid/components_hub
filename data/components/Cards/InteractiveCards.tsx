"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandX,
  IconMail,
  IconHeart,
  IconBookmark,
  IconShare,
  IconEye,
  IconCalendar,
  IconMapPin,
  IconClock,
} from "@tabler/icons-react";

// Sample card data for different use cases
interface CardItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  category?: string;
  tags?: string[];
  stats?: {
    views?: number;
    likes?: number;
    shares?: number;
    bookmarks?: number;
  };
  metadata?: {
    date?: string;
    location?: string;
    duration?: string;
    author?: string;
  };
  actions?: {
    primary: string;
    secondary?: string;
  };
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    mail?: string;
  };
}

// Sample data for different card types
const ProductCards: CardItem[] = [
  {
    id: 1,
    title: "Premium Headphones",
    subtitle: "Wireless Noise Cancelling",
    description:
      "Experience premium sound quality with our latest wireless headphones featuring advanced noise cancellation technology and 30-hour battery life.",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
    category: "Electronics",
    tags: ["Audio", "Wireless", "Premium"],
    stats: { views: 1234, likes: 89, bookmarks: 45 },
    metadata: { date: "2024-01-15", author: "TechReviews" },
    actions: { primary: "Buy Now", secondary: "Add to Cart" },
  },
  {
    id: 2,
    title: "Smart Watch Pro",
    subtitle: "Health & Fitness Tracker",
    description:
      "Monitor your health and stay connected with our advanced smartwatch featuring heart rate monitoring, GPS tracking, and 7-day battery life.",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
    category: "Wearables",
    tags: ["Health", "Fitness", "Smart"],
    stats: { views: 2156, likes: 167, bookmarks: 89 },
    metadata: { date: "2024-01-10", author: "WearableTech" },
    actions: { primary: "Shop Now", secondary: "Learn More" },
  },
  {
    id: 3,
    title: "Laptop Stand",
    subtitle: "Ergonomic Workspace Solution",
    description:
      "Improve your workspace ergonomics with our adjustable laptop stand. Made from premium aluminum with multiple angle adjustments.",
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
    category: "Accessories",
    tags: ["Ergonomic", "Workspace", "Aluminum"],
    stats: { views: 987, likes: 54, bookmarks: 32 },
    metadata: { date: "2024-01-05", author: "OfficeGear" },
    actions: { primary: "Order Now", secondary: "Compare" },
  },
];

const BlogCards: CardItem[] = [
  {
    id: 4,
    title: "The Future of Web Development",
    subtitle: "Trends and Technologies to Watch",
    description:
      "Explore the latest trends in web development including AI integration, WebAssembly, and the evolution of JavaScript frameworks.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    category: "Technology",
    tags: ["Web Dev", "AI", "JavaScript"],
    stats: { views: 3421, likes: 234, shares: 67 },
    metadata: {
      date: "2024-01-20",
      duration: "8 min read",
      author: "Sarah Chen",
    },
    actions: { primary: "Read Article", secondary: "Save for Later" },
  },
  {
    id: 5,
    title: "Design Systems at Scale",
    subtitle: "Building Consistent User Experiences",
    description:
      "Learn how to create and maintain design systems that scale across large organizations while maintaining consistency and efficiency.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=400&h=300&fit=crop",
    category: "Design",
    tags: ["Design Systems", "UX", "Scalability"],
    stats: { views: 2187, likes: 189, shares: 43 },
    metadata: {
      date: "2024-01-18",
      duration: "12 min read",
      author: "Alex Rivera",
    },
    actions: { primary: "Read More", secondary: "Download Guide" },
  },
];

const EventCards: CardItem[] = [
  {
    id: 6,
    title: "Tech Conference 2024",
    subtitle: "Innovation in the Digital Age",
    description:
      "Join industry leaders and innovators for a day of inspiring talks, networking, and hands-on workshops covering the latest in technology.",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    category: "Conference",
    tags: ["Technology", "Networking", "Innovation"],
    stats: { views: 5432, likes: 387, bookmarks: 156 },
    metadata: {
      date: "March 15, 2024",
      location: "San Francisco, CA",
      duration: "Full Day",
    },
    actions: { primary: "Register Now", secondary: "View Agenda" },
  },
];

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

const StatsDisplay = ({ stats }: { stats?: CardItem["stats"] }) => {
  if (!stats) return null;

  return (
    <div className="text-muted-foreground flex items-center space-x-4 text-sm">
      {stats.views && (
        <div className="flex items-center space-x-1">
          <IconEye size={16} />
          <span>{stats.views.toLocaleString()}</span>
        </div>
      )}
      {stats.likes && (
        <div className="flex items-center space-x-1">
          <IconHeart size={16} />
          <span>{stats.likes}</span>
        </div>
      )}
      {stats.shares && (
        <div className="flex items-center space-x-1">
          <IconShare size={16} />
          <span>{stats.shares}</span>
        </div>
      )}
      {stats.bookmarks && (
        <div className="flex items-center space-x-1">
          <IconBookmark size={16} />
          <span>{stats.bookmarks}</span>
        </div>
      )}
    </div>
  );
};

const MetadataDisplay = ({ metadata }: { metadata?: CardItem["metadata"] }) => {
  if (!metadata) return null;

  return (
    <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-sm">
      {metadata.date && (
        <div className="flex items-center space-x-1">
          <IconCalendar size={16} />
          <span>{metadata.date}</span>
        </div>
      )}
      {metadata.location && (
        <div className="flex items-center space-x-1">
          <IconMapPin size={16} />
          <span>{metadata.location}</span>
        </div>
      )}
      {metadata.duration && (
        <div className="flex items-center space-x-1">
          <IconClock size={16} />
          <span>{metadata.duration}</span>
        </div>
      )}
      {metadata.author && (
        <div className="flex items-center space-x-1">
          <span>by {metadata.author}</span>
        </div>
      )}
    </div>
  );
};

export function InteractiveCards({
  cards,
  type,
}: {
  cards: CardItem[];
  type?: "products" | "blog" | "events";
}) {
  const [selectedCard, setSelectedCard] = useState<CardItem | null>(null);
  const [hovered, setIsHovered] = useState<number | null>(null);
  const [currentSection, setCurrentSection] = useState<
    "products" | "blog" | "events"
  >("products");

  const getCurrentCards = () => {
    switch (currentSection) {
      case "products":
        return ProductCards;
      case "blog":
        return BlogCards;
      case "events":
        return EventCards;
      default:
        return ProductCards;
    }
  };

  // Handle esc key
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

  const handleCardClick = (card: CardItem) => {
    setSelectedCard(card);
  };

  const handleBack = () => {
    setSelectedCard(null);
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-8">
      <div className="mb-8 text-center">
        <h2 className="mb-4 text-3xl font-bold">Interactive Card Gallery</h2>
        <p className="text-muted-foreground mb-6">
          Explore different card layouts and interactions
        </p>

        {/* Section Switcher */}
        <div className="bg-muted inline-flex rounded-lg p-1">
          {[
            { key: "products", label: "Products" },
            { key: "blog", label: "Blog Posts" },
            { key: "events", label: "Events" },
          ].map((section) => (
            <button
              key={section.key}
              onClick={() => setCurrentSection(section.key as any)}
              className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                currentSection === section.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="popLayout">
        {selectedCard ? (
          // Expanded view of a card
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            onClick={handleBack}
            className="bg-primary/20 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-[2px]"
          >
            <motion.div
              key="expanded-card"
              layoutId={`card-container-${selectedCard.id}`}
              initial={{ opacity: 0.8 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-background mx-auto max-w-4xl overflow-hidden rounded-2xl border shadow-xl"
            >
              <div className="flex flex-col items-center md:flex-row">
                <motion.div
                  layoutId={`card-image-${selectedCard.id}`}
                  className="bg-secondary/80 h-full w-full overflow-hidden p-2 md:w-2/5"
                >
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="h-64 w-full rounded-[8px] object-cover md:h-full"
                  />
                </motion.div>

                <div className="w-full p-6 md:w-3/5 md:p-8">
                  <motion.button
                    onClick={handleBack}
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                      delay: 0.1,
                    }}
                    className="text-muted-foreground hover:text-primary mb-4 flex items-center transition-colors"
                  >
                    <IconArrowLeft size={20} className="mr-2" />
                    <span>Back to gallery</span>
                  </motion.button>

                  {selectedCard.category && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="mb-2"
                    >
                      <span className="bg-primary/10 text-primary rounded-full px-2 py-1 text-xs font-medium">
                        {selectedCard.category}
                      </span>
                    </motion.div>
                  )}

                  <motion.h3
                    layoutId={`card-title-${selectedCard.id}`}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="mb-1 text-start text-2xl font-bold"
                  >
                    {selectedCard.title}
                  </motion.h3>

                  <motion.p
                    layoutId={`card-subtitle-${selectedCard.id}`}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="text-muted-foreground mb-4 text-start font-medium"
                  >
                    {selectedCard.subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-4"
                  >
                    <p className="text-muted-foreground text-start text-sm">
                      {selectedCard.description}
                    </p>

                    {selectedCard.tags && (
                      <div className="flex flex-wrap gap-2">
                        {selectedCard.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="space-y-3">
                      <StatsDisplay stats={selectedCard.stats} />
                      <MetadataDisplay metadata={selectedCard.metadata} />
                    </div>

                    {selectedCard.actions && (
                      <div className="flex gap-3 pt-4">
                        <button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 font-medium transition-colors">
                          {selectedCard.actions.primary}
                        </button>
                        {selectedCard.actions.secondary && (
                          <button className="border-input bg-background hover:bg-accent rounded-md border px-6 py-2 font-medium transition-colors">
                            {selectedCard.actions.secondary}
                          </button>
                        )}
                      </div>
                    )}

                    {selectedCard.socials && (
                      <div className="border-t pt-4">
                        <div
                          onMouseLeave={() => setIsHovered(null)}
                          className="flex items-center space-x-4"
                        >
                          {Object.entries(selectedCard.socials).map(
                            ([platform, url], index) => (
                              <div
                                onMouseEnter={() => setIsHovered(index)}
                                key={platform}
                                className="bg-primary relative flex cursor-pointer items-center rounded-full p-2"
                              >
                                <SocialIcon
                                  key={platform}
                                  type={platform}
                                  url={url}
                                />
                                {hovered === index && (
                                  <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    layoutId="hover"
                                    transition={{
                                      duration: 0.3,
                                      ease: "easeInOut",
                                    }}
                                    className="bg-primary/20 absolute -right-4 -bottom-5 rounded-full px-2 py-px text-xs backdrop-blur-sm"
                                  >
                                    {platform}
                                  </motion.div>
                                )}
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          // Grid view of all cards
          <motion.div
            key="grid-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {getCurrentCards().map((card) => (
              <motion.div
                layoutId={`card-container-${card.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                key={card.id}
                onClick={() => handleCardClick(card)}
                className="bg-card cursor-pointer overflow-hidden rounded-3xl border p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <motion.div
                  layoutId={`card-image-${card.id}`}
                  className="bg-secondary/80 relative h-48 w-full overflow-hidden rounded-[16px] border"
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                  {card.category && (
                    <div className="absolute top-2 left-2">
                      <span className="bg-background/90 text-foreground rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm">
                        {card.category}
                      </span>
                    </div>
                  )}
                </motion.div>

                <div className="space-y-3 p-4">
                  <div>
                    <motion.h3
                      layoutId={`card-title-${card.id}`}
                      className="line-clamp-1 text-lg font-bold"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`card-subtitle-${card.id}`}
                      className="text-muted-foreground line-clamp-1 text-sm"
                    >
                      {card.subtitle}
                    </motion.p>
                  </div>

                  <p className="text-muted-foreground line-clamp-2 text-sm">
                    {card.description}
                  </p>

                  <div className="space-y-2">
                    <StatsDisplay stats={card.stats} />
                    <MetadataDisplay metadata={card.metadata} />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
