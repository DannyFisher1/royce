// FILE: royce/components/ui/mini-pillar-bars.tsx
// --------------------------------------------------------------------------------
"use client"; // Needs client for potential future interactions, safer default

import { PillarScores } from '@/lib/types';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Added Tooltip
import { useEffect, useState } from 'react';

interface MiniPillarBarsProps {
    pillars: PillarScores;
    className?: string;
}

// Define color classes for different score ranges
const getScoreClasses = (score: number | undefined | null) => {
    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
    
    if (validScore >= 8.5) return {
        bg: "bg-emerald-500", 
        text: "text-emerald-700 dark:text-emerald-400"
    };
    if (validScore >= 7.0) return {
        bg: "bg-blue-500", 
        text: "text-blue-700 dark:text-blue-400"
    };
    if (validScore >= 5.0) return {
        bg: "bg-amber-500", 
        text: "text-amber-700 dark:text-amber-400"
    };
    if (validScore > 0) return {
        bg: "bg-red-500", 
        text: "text-red-700 dark:text-red-400"
    };
    
    return {
        bg: "bg-muted", 
        text: "text-muted-foreground"
    };
};

// Define the standard order of pillars
const PILLAR_ORDER: (keyof PillarScores)[] = ["Content", "Bias", "Privacy", "Security", "Ethics"];

export function MiniPillarBars({ pillars, className }: MiniPillarBarsProps) {
    // Use state to animate the bars
    const [animatedValues, setAnimatedValues] = useState<{[key: string]: number}>({});

    // Initialize with 0 and then animate to actual values
    useEffect(() => {
        // Small delay to ensure component is mounted
        const timer = setTimeout(() => {
            const values: {[key: string]: number} = {};
            PILLAR_ORDER.forEach(pillar => {
                values[pillar] = typeof pillars[pillar] === 'number' ? pillars[pillar] * 10 : 0;
            });
            setAnimatedValues(values);
        }, 100);
        
        return () => clearTimeout(timer);
    }, [pillars]);

    return (
        <TooltipProvider delayDuration={150}>
            <div className={cn("space-y-2", className)}>
                {PILLAR_ORDER.map((pillarName) => {
                    const score = pillars[pillarName];
                    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
                    const percentage = animatedValues[pillarName] || 0; // Use animated value
                    const { bg, text } = getScoreClasses(score);

                    return (
                        <Tooltip key={pillarName}>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-xs">
                                    <span className="w-14 flex-shrink-0 font-medium text-muted-foreground truncate" title={pillarName}>
                                        {pillarName}
                                    </span>
                                    <Progress
                                        value={percentage}
                                        className="h-1.5 flex-grow bg-secondary"
                                        indicatorClassName={bg}
                                    />
                                    <span className={cn("w-7 text-right font-semibold", text)}>
                                        {validScore.toFixed(1)}
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-xs">
                                <p>{pillarName}: {validScore.toFixed(1)} / 10</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </TooltipProvider>
    );
}

// Add this modification to your ui/progress.tsx if indicatorClassName is not supported
/**
 * In components/ui/progress.tsx, modify the Progress component like this:
 *
 * import { cn } from "@/lib/utils" // Make sure cn is imported
 *
 * const Progress = React.forwardRef<
 *   React.ElementRef<typeof ProgressPrimitive.Root>,
 *   React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { indicatorClassName?: string } // Add indicatorClassName prop
 * >(({ className, value, indicatorClassName, ...props }, ref) => (
 *   <ProgressPrimitive.Root
 *     ref={ref}
 *     className={cn(
 *       "relative h-4 w-full overflow-hidden rounded-full bg-secondary", // Or your default bg
 *       className
 *     )}
 *     {...props}
 *   >
 *     <ProgressPrimitive.Indicator
 *       className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)} // Apply indicatorClassName here
 *       style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
 *     />
 *   </ProgressPrimitive.Root>
 * ))
 */