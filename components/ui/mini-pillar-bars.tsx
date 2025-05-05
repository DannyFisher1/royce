// FILE: royce/components/ui/mini-pillar-bars.tsx
// --------------------------------------------------------------------------------
"use client"; // Needs client for potential future interactions, safer default

import { PillarScores } from '@/lib/types';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Added Tooltip

interface MiniPillarBarsProps {
    pillars: PillarScores;
    className?: string;
}

// Consistent color helper logic (Tailwind background classes)
const getScoreBgClass = (score: number | undefined | null): string => {
    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
    // Using slightly less saturated colors for bars might look better
    if (validScore >= 8.5) return "bg-green-500/80 dark:bg-green-400/70";
    if (validScore >= 7.0) return "bg-yellow-500/80 dark:bg-yellow-400/70";
    if (validScore >= 5.0) return "bg-orange-500/80 dark:bg-orange-400/70";
    if (validScore > 0) return "bg-red-500/80 dark:bg-red-400/70";
    return "bg-muted"; // Default for 0 or N/A
}

// Corresponding text color helper
const getScoreTextClass = (score: number | undefined | null): string => {
    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
    if (validScore >= 8.5) return "text-green-700 dark:text-green-400";
    if (validScore >= 7.0) return "text-yellow-700 dark:text-yellow-400";
    if (validScore >= 5.0) return "text-orange-700 dark:text-orange-400";
    if (validScore > 0) return "text-red-700 dark:text-red-400";
    return "text-muted-foreground"; // Default for 0 or N/A
}

// Define the standard order of pillars
const PILLAR_ORDER: (keyof PillarScores)[] = ["Content", "Bias", "Privacy", "Security", "Ethics"];

export function MiniPillarBars({ pillars, className }: MiniPillarBarsProps) {

    return (
        <TooltipProvider delayDuration={150}> {/* Wrap in provider for tooltips */}
            <div className={cn("space-y-2", className)}> {/* Reduced spacing */}
                {PILLAR_ORDER.map((pillarName) => {
                    const score = pillars[pillarName];
                    // Ensure score is treated as 0 if undefined/null/NaN for calculation
                    const validScore = typeof score === 'number' && !isNaN(score) ? Math.max(0, Math.min(10, score)) : 0;
                    const percentage = validScore * 10; // Convert score (0-10) to percentage (0-100)
                    const bgColorClass = getScoreBgClass(score);
                    const textColorClass = getScoreTextClass(score);

                    return (
                        <Tooltip key={pillarName}>
                            <TooltipTrigger asChild>
                                <div className="flex items-center gap-2 text-xs"> {/* Reduced gap and text size */}
                                    <span className="w-14 flex-shrink-0 font-medium text-muted-foreground truncate" title={pillarName}>
                                        {pillarName}
                                    </span>
                                    <Progress
                                        value={percentage}
                                        className={cn("h-1.5 flex-grow", "bg-secondary")}
                                        style={{
                                            ["--progress-background" as any]: bgColorClass.split(" ")[0]
                                        }}
                                    />
                                    <span className={cn("w-7 text-right font-semibold", textColorClass)}>
                                        {typeof score === 'number' && !isNaN(score) ? score.toFixed(1) : 'N/A'}
                                    </span>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent side="left" className="text-xs">
                                <p>{pillarName}: {typeof score === 'number' && !isNaN(score) ? score.toFixed(1) : 'N/A'} / 10</p>
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