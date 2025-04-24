"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import clsx from "clsx";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "onDrag"> {
  variant?: "default" | "outline" | "elevated";
  hoverable?: boolean;
  clickable?: boolean;
  rounded?: boolean;
  shadow?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = "default",
      hoverable = false,
      clickable = false,
      rounded = true,
      shadow = true,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={clsx(
          "relative overflow-hidden",
          {
            // Variants
            "bg-card text-card-foreground": variant === "default",
            "border border-border bg-background": variant === "outline",
            "bg-background shadow-lg": variant === "elevated",
            // Other
            "rounded-lg": rounded,
            "shadow-sm": shadow,
            "cursor-pointer": clickable,
          },
          className
        )}
        whileHover={hoverable ? { y: -4, transition: { duration: 0.2 } } : undefined}
        whileTap={clickable ? { scale: 0.98 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, title, description, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("flex flex-col space-y-1.5 p-6", className)}
        {...props}
      >
        {title && (
          <motion.h3
            className="text-2xl font-semibold leading-none tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        )}
        {description && (
          <motion.p
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
        {children}
      </div>
    );
  }
);

CardHeader.displayName = "CardHeader";

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("p-6 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = "CardContent";

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx("flex items-center p-6 pt-0", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = "CardFooter"; 