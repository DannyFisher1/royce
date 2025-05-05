"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoadingAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  color?: "default" | "primary" | "secondary";
}

export function LoadingAnimation({
  className,
  size = "md",
  color = "primary"
}: LoadingAnimationProps) {
  // Size classes based on prop
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-20 h-20"
  };

  // Color classes based on prop
  const colorClasses = {
    default: "text-foreground",
    primary: "text-primary",
    secondary: "text-secondary"
  };

  // Dots animation
  const dotsVariants = {
    initial: {
      opacity: 0,
      y: 0
    },
    animate: (i: number) => ({
      opacity: [0.5, 1, 0.5],
      y: [0, -10, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        delay: i * 0.15,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          custom={i}
          variants={dotsVariants}
          initial="initial"
          animate="animate"
          className={cn(
            "rounded-full bg-current",
            sizeClasses[size].replace(/w-|h-/g, "w-[calc($1/3)] h-"),
            colorClasses[color]
          )}
        />
      ))}
    </div>
  );
}

// Container for page loading with branding
export function PageLoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50"
    >
      <div className="flex flex-col items-center gap-6">
        <LoadingAnimation size="lg" />
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-medium text-primary"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
} 