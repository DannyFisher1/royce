"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export function PageTransition({ 
    children, 
    className = ""
}: { 
    children: React.ReactNode,
    className?: string
}) {
    // Improved animation variants with more subtle and polished feel
    const variants = {
        hidden: { 
            opacity: 0,
            y: 20,
            scale: 0.98
        },
        visible: { 
            opacity: 1, 
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier easing
                staggerChildren: 0.05,
            }
        },
        exit: { 
            opacity: 0, 
            y: -10,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={React.useId()}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={variants}
                className={className}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
} 