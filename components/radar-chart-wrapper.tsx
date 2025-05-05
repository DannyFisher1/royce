// FILE: royce/components/radar-chart-wrapper.tsx
// --------------------------------------------------------------------------------
"use client";

import { PillarRadarChart } from "./pillar-radar-chart";
import { PillarDetail } from "@/lib/types";

// Update props to include interaction handlers
interface RadarChartWrapperProps {
    pillars: { [key: string]: PillarDetail };
    selectedPillar: string | null; // Pass down selection state
    onPillarSelect: (pillarName: string) => void; // Pass down selection handler
    height?: number;
}

// This component acts as a client boundary and passes props through
export function RadarChartWrapper({
    pillars,
    selectedPillar,
    onPillarSelect,
    height
}: RadarChartWrapperProps) {
    // Simply pass all props down to the actual chart component
    return (
        <PillarRadarChart
            pillars={pillars}
            selectedPillar={selectedPillar}
            onPillarSelect={onPillarSelect}
            height={height}
        />
    );
}