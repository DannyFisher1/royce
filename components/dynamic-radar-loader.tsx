"use client";

import dynamic from 'next/dynamic';
import { PillarDetail } from "@/lib/types";

// Define the props expected by the loader
interface DynamicRadarLoaderProps {
    pillars: { [key: string]: PillarDetail };
    height?: number;
}

// Dynamically import the actual chart wrapper inside this client component
const DynamicRadarChart = dynamic(() => 
    import('@/components/radar-chart-wrapper').then(mod => mod.RadarChartWrapper),
    {
        ssr: false, // ssr: false is allowed here
        loading: () => <div className="h-[300px] flex items-center justify-center text-sm text-muted-foreground">Loading chart...</div>
    }
);

// The loader component simply renders the dynamically imported chart
export function DynamicRadarLoader({ pillars, height }: DynamicRadarLoaderProps) {
    return <DynamicRadarChart pillars={pillars} height={height} />;
} 