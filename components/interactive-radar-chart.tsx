"use client";

import dynamic from 'next/dynamic';
import { PillarDetail } from "@/lib/types";
// Removed recharts bar chart imports: BarChart, Bar, XAxis, YAxis, Cell
// Removed useTheme as bar chart colors are gone

// Define props for interactivity
interface InteractiveRadarChartProps {
    pillars: { [key: string]: PillarDetail };
    selectedPillar: string | null;
    onPillarSelect: (pillarName: string) => void;
    height?: number; // Allow parent to suggest height, default fallback in child
}

// Dynamically import the actual chart component that will handle interaction
// We assume RadarChartWrapper will be updated to handle the new props.
const DynamicInteractiveRadar = dynamic(() =>
    import('@/components/radar-chart-wrapper').then(mod => mod.RadarChartWrapper),
    {
        ssr: false,
        loading: () => (
            <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground bg-background/30 backdrop-blur-sm z-10">
                Loading Radar Chart...
            </div>
        ),
    }
);

// Renamed function to reflect its purpose
export function InteractiveRadarChart({
    pillars,
    selectedPillar,
    onPillarSelect,
    height // Pass height down if provided
}: InteractiveRadarChartProps) {

    // Removed bar chart data preparation and theme logic

    // Main container is simpler, focusing only on the radar chart
    // Adjust height dynamically or use parent suggestion. Added relative positioning for loading overlay.
    return (
        <div className="relative w-full h-full">
            <DynamicInteractiveRadar
                pillars={pillars}
                selectedPillar={selectedPillar} // Pass down selection state
                onPillarSelect={onPillarSelect} // Pass down selection handler
                height={height} // Pass down height override
            />
        </div>
    );
}