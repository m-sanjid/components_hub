import { Variants } from 'motion/react';

export const fadeIn = (delay: number = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      delay,
      duration: 0.5
    }
  }
});

export const slideInFromBottom = (delay: number = 0): Variants => ({
  hidden: { y: 50, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay
    }
  }
});

export const slideInFromLeft = (delay: number = 0): Variants => ({
  hidden: { x: -100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay
    }
  }
});

export const slideInFromRight = (delay: number = 0): Variants => ({
  hidden: { x: 100, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay
    }
  }
});

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const scaleUp = (delay: number = 0): Variants => ({
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      delay
    }
  }
});

export const hoverScale = {
  scale: 1.05,
  transition: { duration: 0.2 }
};

export const buttonTap = {
  scale: 0.95,
  transition: { duration: 0.1 }
};
