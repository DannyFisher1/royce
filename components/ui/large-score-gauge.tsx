// FILE: royce/components/ui/large-score-gauge.tsx
import { cn } from "@/lib/utils";

interface LargeScoreGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  textClassName?: string;
}

export function LargeScoreGauge({
  score,
  size = 48,
  strokeWidth = 5,
  className,
  textClassName = "text-[0.65rem] font-bold" // Smaller text size
}: LargeScoreGaugeProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 10) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
      >
        <circle
          className="text-muted-foreground/20"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={cn("transition-all duration-500 ease-in-out", className)}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <span className={cn(
        "absolute text-center text-foreground",
        textClassName
      )}>
        {score.toFixed(1)}
      </span>
    </div>
  );
}