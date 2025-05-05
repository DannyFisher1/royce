// FILE: royce/components/pillar-radar-chart.tsx
// --------------------------------------------------------------------------------
"use client";

import { PillarDetail } from "@/lib/types";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Text // Added Text
} from 'recharts';
import { useTheme } from 'next-themes';
import { cn } from "@/lib/utils"; // Import cn for conditional classes

// Updated Props to include interactivity
interface PillarRadarChartProps {
    pillars: { [key: string]: PillarDetail };
    selectedPillar: string | null; // To know which pillar is currently selected
    onPillarSelect: (pillarName: string) => void; // Callback when a pillar is clicked
    height?: number; // Allow parent to suggest height
}

// Define colors for better contrast in light/dark mode if needed
// Added selected color state
const RADAR_COLORS = {
    light: {
        stroke: "hsl(var(--primary))",
        fill: "hsl(var(--primary) / 0.4)", // Slightly less opacity for light mode
        axis: "hsl(var(--muted-foreground))",
        axisSelected: "hsl(var(--primary))",
        grid: "hsl(var(--border) / 0.5)", // Lighter grid lines
        tooltipBg: "hsl(var(--popover))",
        tooltipText: "hsl(var(--popover-foreground))",
        tooltipBorder: "hsl(var(--border))",
    },
    dark: {
        stroke: "hsl(var(--primary))",
        fill: "hsl(var(--primary) / 0.6)", // Increased opacity for dark mode
        axis: "hsl(var(--muted-foreground))",
        axisSelected: "hsl(var(--primary))", // Use primary color for selected text in dark too for consistency
        grid: "hsl(var(--border) / 0.4)", // Slightly lighter grid lines in dark
        tooltipBg: "hsl(var(--popover))",
        tooltipText: "hsl(var(--popover-foreground))",
        tooltipBorder: "hsl(var(--border))",
    },
};

// Custom Tick component for PolarAngleAxis
const InteractiveAngleTick = (props: any) => {
    const { x, y, payload, selectedPillar, onPillarSelect, colors } = props;
    const pillarName = payload.value;
    const isSelected = pillarName === selectedPillar;

    return (
        <Text
            x={x}
            y={y}
            dy={y > 150 ? 16 : -4} // Adjust vertical positioning based on location (rough estimate)
            textAnchor="middle"
            // Use cn to apply conditional styling
            className={cn(
                "text-[11px] sm:text-[12px] cursor-pointer transition-colors duration-150 font-medium",
                isSelected ? "font-bold" : "font-normal" // Make selected bold
            )}
            fill={isSelected ? colors.axisSelected : colors.axis} // Change color if selected
            onClick={() => onPillarSelect(pillarName)} // Call callback on click
        >
            {pillarName}
        </Text>
    );
};


export function PillarRadarChart({
    pillars,
    selectedPillar,
    onPillarSelect,
    height = 350 // Default height if none provided by parent
}: PillarRadarChartProps) {
    const { resolvedTheme } = useTheme();
    const colors = RADAR_COLORS[resolvedTheme === 'dark' ? 'dark' : 'light'];

    const data = Object.entries(pillars)
        .map(([name, detail]) => ({
            pillar: name,
            score: typeof detail?.score === 'number' ? detail.score : 0,
            fullMark: 10,
        }));

    // Handle case with fewer than 3 pillars gracefully
    if (data.length < 3) {
        return (
            <div className="text-sm text-muted-foreground p-4 border rounded-lg text-center flex items-center justify-center" style={{ height: `${height}px` }}>
                Radar chart requires at least 3 data points (pillars).
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={height}>
            <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={data}
                margin={{ top: 20, right: 35, bottom: 20, left: 35 }}
            >
                <PolarGrid stroke={colors.grid} gridType="polygon" />
                <PolarAngleAxis
                    dataKey="pillar"
                    // Use the custom tick component
                    tick={(props) => (
                        <InteractiveAngleTick
                            {...props}
                            selectedPillar={selectedPillar}
                            onPillarSelect={onPillarSelect}
                            colors={colors}
                        />
                    )}
                    axisLine={false} // Hide the axis line itself for cleaner look
                />
                <PolarRadiusAxis
                    angle={90}
                    domain={[0, 10]}
                    tickCount={6}
                    tick={{ fill: colors.axis, fontSize: 10 }}
                    axisLine={{ stroke: colors.grid }} // Use lighter grid color for axis line too
                    tickLine={{ stroke: colors.grid }} 
                />
                <Radar
                    name="Score"
                    dataKey="score"
                    stroke={colors.stroke}
                    fill={colors.fill}
                    fillOpacity={1} // Let the color define the opacity via HSLA
                    strokeWidth={2}
                />
                <Tooltip
                    cursor={{ stroke: colors.stroke, strokeDasharray: '3 3', strokeWidth: 1.5 }} // Make cursor slightly bolder
                    contentStyle={{
                        backgroundColor: colors.tooltipBg,
                        borderColor: colors.tooltipBorder,
                        color: colors.tooltipText,
                        fontSize: '12px',
                        borderRadius: 'var(--radius-md)', // Use theme radius
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Softer shadow
                        padding: '8px 12px',
                        borderWidth: '1px',
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)} / 10`, null]} // Simplified label
                    labelFormatter={(label: string) => <span className="font-semibold">{label}</span>} // Make label bold
                />
                {/* Legend removed for cleaner look, interaction is via axis */}
            </RadarChart>
        </ResponsiveContainer>
    );
}