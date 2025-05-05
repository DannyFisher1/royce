import { PillarScores } from '@/lib/types';
import { Progress } from "@/components/ui/progress";
import { cn } from '@/lib/utils';

interface PillarScoreSnapshotProps {
    pillars: PillarScores;
    className?: string;
}

// Helper to get color class based on score (tailwind background classes)
const getScoreBgClass = (score: number | undefined | null): string => {
    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
    if (validScore >= 8.5) return "bg-green-500 dark:bg-green-400";
    if (validScore >= 7.0) return "bg-yellow-500 dark:bg-yellow-400";
    if (validScore >= 5.0) return "bg-orange-500 dark:bg-orange-400";
    if (validScore > 0) return "bg-red-500 dark:bg-red-400";
    return "bg-muted"; // Default for 0 or N/A
}

// Helper to get corresponding text color class
const getScoreTextClass = (score: number | undefined | null): string => {
    const validScore = typeof score === 'number' && !isNaN(score) ? score : 0;
     if (validScore >= 8.5) return "text-green-600 dark:text-green-400";
     if (validScore >= 7.0) return "text-yellow-600 dark:text-yellow-400";
     if (validScore >= 5.0) return "text-orange-600 dark:text-orange-400";
     if (validScore > 0) return "text-red-600 dark:text-red-400";
     return "text-muted-foreground"; // Default for 0 or N/A
}


export function PillarScoreSnapshot({ pillars, className }: PillarScoreSnapshotProps) {
    const pillarOrder: (keyof PillarScores)[] = ["Content", "Bias", "Privacy", "Security", "Ethics"];

    return (
        <div className={cn("space-y-3", className)}>
            {pillarOrder.map((pillarName) => {
                const score = pillars[pillarName];
                const validScore = typeof score === 'number' && !isNaN(score) ? Math.max(0, Math.min(10, score)) : 0;
                const percentage = validScore * 10;
                const bgColorClass = getScoreBgClass(score); // Get background color class
                const textColorClass = getScoreTextClass(score); // Get text color class

                return (
                    <div key={pillarName} className="flex items-center gap-3 text-sm">
                        <span className="w-16 sm:w-20 flex-shrink-0 font-medium text-muted-foreground text-xs sm:text-sm truncate">{pillarName}</span>
                        {/* FIX: Apply background color class directly to Progress component */}
                        {/* This might not work perfectly depending on Shadcn's implementation; CSS override might be needed */}
                         {/* Forcing color via style - more robust if className doesn't work */}
                        <Progress
                             value={percentage}
                             className="h-2 flex-grow"
                             // Attempting style override - requires theme setup for --color-primary
                             // style={{ '--color-primary': `hsl(var(--${bgColorClass.replace('bg-', '')}))`} as React.CSSProperties}
                             // Simpler approach: rely on default primary color if direct class doesn't work
                             // className={cn("h-2 flex-grow", bgColorClass)} // Try applying directly
                        />
                        <span className={cn("w-8 text-right font-semibold", textColorClass)}> {/* Use text color class */}
                            {typeof score === 'number' && !isNaN(score) ? score.toFixed(1) : 'N/A'}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}