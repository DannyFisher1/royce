// FILE: royce/app/page.tsx
// --------------------------------------------------------------------------------
"use client"; // Needed for framer-motion

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SubtleLogoAnimation } from "@/components/ui/subtle-logo-animation"; // Import the new background
import {
    ShieldCheck, // Content
    Users,       // Bias
    Lock,        // Privacy
    DatabaseZap, // Security
    Scale,       // Ethics
    ArrowRight,  // For CTA button
} from "lucide-react";
import React from "react";

// --- Removed imports for deleted components ---
// import * as THREE from "three";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, useTexture } from "@react-three/drei";
// import dynamic from "next/dynamic";

// Pillar data
const pillarIcons = [
    { name: "Content", Icon: ShieldCheck, color: "text-blue-500 dark:text-blue-400" },
    { name: "Bias", Icon: Users, color: "text-amber-500 dark:text-amber-400" },
    { name: "Privacy", Icon: Lock, color: "text-emerald-500 dark:text-emerald-400" },
    { name: "Security", Icon: DatabaseZap, color: "text-red-500 dark:text-red-400" },
    { name: "Ethics", Icon: Scale, color: "text-purple-500 dark:text-purple-400" },
];

// Animation variants for staggering children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1, // Stagger delay between children
            delayChildren: 0.2, // Delay before starting children animation
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    },
};

export default function HomePage() {
    return (
        <>
            {/* New Subtle Background Animation */}
            <SubtleLogoAnimation />

            <motion.section
                className="relative z-10 container flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center gap-10 py-16 md:py-24" // Adjusted padding and min-height
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >

                <motion.div
                    variants={itemVariants}
                    className="max-w-3xl" // Increased max-width slightly
                >
                    <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/60">
                        Illuminating AI Safety
                    </h1>
                    <motion.p
                        variants={itemVariants} // Can stagger paragraphs too
                        className="max-w-xl mx-auto text-lg text-muted-foreground sm:text-xl mb-10"
                    >
                        An interactive exhibit comparing leading AI providers across key safety dimensions. Explore data, understand differences, and see who leads in responsible AI.
                    </motion.p>
                </motion.div>

                {/* Pillar Showcase - Enhanced Styling */}
                <motion.div
                    className="w-full max-w-3xl" // Increased max-width
                    variants={itemVariants} // Staggered container for pillars
                >
                    <h2 className="text-lg font-semibold uppercase text-muted-foreground tracking-wider mb-8">Key Safety Pillars</h2> {/* Increased margin */}
                    <div className="flex flex-wrap justify-center gap-6 md:gap-12"> {/* Increased gap */}
                        {pillarIcons.map(({ name, Icon, color }) => (
                            <motion.div
                                key={name}
                                className="flex flex-col items-center gap-2 text-center w-24 group" // Increased width
                                variants={itemVariants} // Apply item animation variant
                                whileHover={{ y: -4, scale: 1.05 }} // Add hover effect
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                {/* Added styled background circle */}
                                <div className={cn("p-4 rounded-full bg-card border shadow-sm group-hover:shadow-md transition-all", color)}>
                                     <Icon className="h-8 w-8 transform group-hover:scale-110 transition-transform" />
                                 </div>
                                <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action Button */}
                <motion.div
                    variants={itemVariants}
                    className="mt-10" // Increased margin
                >
                    <Link href="/providers">
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)' }} // Enhanced hover
                            whileTap={{ scale: 0.95 }}
                         >
                            <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-lg transition-all bg-gradient-to-r from-primary hover:from-primary/90 to-primary/80 hover:to-primary/70 text-primary-foreground dark:text-white dark:border dark:border-white">
                                Explore the Providers
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </motion.div>
                    </Link>
                </motion.div>

                 {/* Removed Scroll Indicator */}
                 {/* Removed Feature Cards Section */}
                 {/* Removed Live Metrics Section */}

            </motion.section>
        </>
    );
}