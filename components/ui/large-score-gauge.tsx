// FILE: royce/components/ui/large-score-gauge.tsx
// Note: Creating a new component based on ScoreDial logic, but enhanced.
// --------------------------------------------------------------------------------
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface LargeScoreGaugeProps {
    score: number | undefined | null; // Allow undefined/null
    size?: number; // Diameter of the gauge
    strokeWidth?: number;
    className?: string; // Allow custom classes
}

export function LargeScoreGauge({
    score,
    size = 120, // Default larger size
    strokeWidth = 8, // Default thicker stroke
    className
}: LargeScoreGaugeProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    // Handle potentially undefined/null score gracefully
    const validScore = typeof score === 'number' && !isNaN(score) ? Math.max(0, Math.min(10, score)) : 0;
    const scorePercentage = validScore / 10;
    const offset = circumference * (1 - scorePercentage);

    // Enhanced color logic using HSL for smoother transitions potentially
    // Or stick with Tailwind classes, ensuring they are defined in globals/tailwind.config
    let colorClass = "text-muted-foreground"; // Default/low score
    let progressColorClass = "stroke-muted-foreground"; // Default progress color stroke
    if (validScore >= 8.5) {
        colorClass = "text-green-600 dark:text-green-400";
        progressColorClass = "stroke-green-500 dark:stroke-green-400";
    } else if (validScore >= 7.0) { // Adjusted threshold
        colorClass = "text-yellow-600 dark:text-yellow-400";
        progressColorClass = "stroke-yellow-500 dark:stroke-yellow-400";
    } else if (validScore >= 5.0) { // Adjusted threshold
        colorClass = "text-orange-600 dark:text-orange-400";
        progressColorClass = "stroke-orange-500 dark:stroke-orange-400";
    } else if (validScore > 0) {
        colorClass = "text-red-600 dark:text-red-400"; // Added red for very low
        progressColorClass = "stroke-red-500 dark:stroke-red-400";
    }

    // Animation variants for the progress circle
    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: scorePercentage,
            opacity: 1,
            transition: {
                pathLength: { type: "spring", duration: 1.5, bounce: 0 },
                opacity: { duration: 0.01 } // Fade in quickly
            }
        }
    };

    return (
        <div className={cn("relative flex items-center justify-center", className)} style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="-rotate-90 transform" // Keep rotation to start from top
            >
                {/* Background circle - subtle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="stroke-border/40 dark:stroke-border/30" // Use stroke-* classes
                    fill="transparent"
                />
                {/* Animated Progress circle using motion.circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    // strokeDashoffset={offset} // Offset is handled by pathLength animation
                    strokeLinecap="round"
                    className={cn("origin-center", progressColorClass)} // Apply color via stroke class
                    fill="transparent"
                    variants={draw}
                    initial="hidden"
                    animate="visible"
                    // Apply custom property for animation if needed, but pathLength is better
                    // style={{ pathLength: scorePercentage }} // Animate pathLength instead of offset
                />
            </svg>
            {/* Score text in the center - larger */}
            <span className={cn(
                "absolute text-3xl font-bold", // Increased font size and weight
                colorClass // Apply text color class
            )}>
                {typeof score === 'number' && !isNaN(score) ? score.toFixed(1) : 'N/A'}
            </span>
        </div>
    );
}