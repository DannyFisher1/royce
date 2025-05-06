"use client";

import dynamic from 'next/dynamic';
import { PillarDetail } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

interface InteractiveRadarChartProps {
    pillars: { [key: string]: PillarDetail };
    selectedPillar: string | null;
    onPillarSelect: (pillarName: string) => void;
    height?: number;
    className?: string;
}

const DynamicInteractiveRadar = dynamic(
    () => import('@/components/radar-chart-wrapper').then(mod => mod.RadarChartWrapper),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                <div className="text-center space-y-2">
                    <Skeleton className="h-6 w-6 mx-auto rounded-full" />
                    <Skeleton className="h-4 w-32 mx-auto" />
                </div>
            </div>
        ),
    }
);

export function InteractiveRadarChart({
    pillars,
    selectedPillar,
    onPillarSelect,
    height,
    className = ""
}: InteractiveRadarChartProps) {
    return (
        <div className={`relative w-full ${height ? `h-[${height}px]` : 'h-[400px]'} ${className}`}>
            <DynamicInteractiveRadar
                pillars={pillars}
                selectedPillar={selectedPillar}
                onPillarSelect={onPillarSelect}
                height={height}
            />
            
            {/* Optional overlay for empty state */}
            {Object.keys(pillars).length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm rounded-lg">
                    <p className="text-muted-foreground text-sm">No pillar data available</p>
                </div>
            )}
        </div>
    );
}