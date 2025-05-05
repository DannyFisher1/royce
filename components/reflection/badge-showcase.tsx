// FILE: royce/components/reflection/badge-showcase.tsx
// --------------------------------------------------------------------------------
"use client";

import { motion } from "framer-motion";
import { ShieldCheck, DatabaseZap, Scale, Lock } from "lucide-react";
import { cn } from "@/lib/utils"; // Assuming cn utility is available

// Define the badges data (adjust icons/names as needed)
const badges = [
    { name: 'SOC-2 Type 2', icon: <ShieldCheck className="w-5 h-5" />, color: "text-blue-500 dark:text-blue-400" },
    { name: 'ISO 27001', icon: <DatabaseZap className="w-5 h-5" />, color: "text-emerald-500 dark:text-emerald-400" },
    { name: 'EU AI Act Ready', icon: <Scale className="w-5 h-5" />, color: "text-purple-500 dark:text-purple-400" }, // Example update
    { name: 'NIST AI RMF Aligned', icon: <Lock className="w-5 h-5" />, color: "text-orange-500 dark:text-orange-400" }, // Example update
];

// Animation variants for staggering items
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function BadgeShowcase() {
  return (
    <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        variants={containerVariants}
        initial="hidden"
        // Animate when it comes into view if needed, or use parent animation trigger
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation when 30% visible
    >
      {badges.map((badge) => (
        <motion.div
          key={badge.name}
          variants={itemVariants}
          whileHover={{ y: -5, scale: 1.05, transition: { type: 'spring', stiffness: 300 } }}
          className="p-4 border rounded-lg flex flex-col items-center text-center bg-card hover:shadow-md transition-shadow cursor-default" // Use bg-card
        >
          <div className={cn("mb-2", badge.color)}>{badge.icon}</div>
          <span className="text-xs sm:text-sm font-medium text-foreground">{badge.name}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};