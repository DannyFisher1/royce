"use client";

import React from 'react';

interface ScoreDialProps {
    score: number; // Assuming score is 0-10
    size?: number; // Diameter of the dial
    strokeWidth?: number;
}

export function ScoreDial({ score, size = 48, strokeWidth = 4 }: ScoreDialProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const validScore = typeof score === 'number' && !isNaN(score) ? Math.max(0, Math.min(10, score)) : 0;
    const offset = circumference - (validScore / 10) * circumference;

    // Determine color based on score (example thresholds)
    let colorClass = "text-muted-foreground"; // Default/low score
    if (validScore >= 8.5) {
        colorClass = "text-green-500";
    } else if (validScore >= 6.5) {
        colorClass = "text-yellow-500";
    } else if (validScore > 0) {
        colorClass = "text-orange-500";
    }

    return (
        <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                className="-rotate-90 transform"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="text-border/50 dark:text-border/30" // Use theme-aware border color
                    fill="transparent"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className={`transition-all duration-500 ease-in-out ${colorClass}`}
                    fill="transparent"
                />
            </svg>
            {/* Score text in the center */}
            <span className={`absolute text-xs font-semibold ${colorClass}`}>
                {typeof score === 'number' && !isNaN(score) ? score.toFixed(1) : 'N/A'}
            </span>
        </div>
    );
} 