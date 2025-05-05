// FILE: components/provider-compare-chart.tsx
// --------------------------------------------------------------------------------
"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from 'next-themes';

interface ProviderCompareChartProps {
    data: { name: string; [providerName: string]: number | string }[]; // e.g., { name: 'Content', 'OpenAI': 9.0, 'Google': 6.5 }
    providerKeys: string[]; // Array of provider names used as keys in the data objects
}

// Define distinct colors for providers - add more if needed
// Using HSL values for better theming potential
const PROVIDER_COLORS_LIGHT = [
    "hsl(210, 40%, 50%)", // Blue
    "hsl(140, 40%, 50%)", // Green
    "hsl(30, 80%, 55%)",  // Orange
    "hsl(340, 70%, 55%)", // Pink
    "hsl(260, 50%, 60%)", // Purple
    "hsl(50, 60%, 50%)",  // Yellow-ish
];
const PROVIDER_COLORS_DARK = [
    "hsl(210, 60%, 70%)", // Lighter Blue
    "hsl(140, 50%, 65%)", // Lighter Green
    "hsl(30, 90%, 70%)",  // Lighter Orange
    "hsl(340, 80%, 70%)", // Lighter Pink
    "hsl(260, 60%, 75%)", // Lighter Purple
    "hsl(50, 70%, 65%)",  // Lighter Yellow-ish
];


export function ProviderCompareChart({ data, providerKeys }: ProviderCompareChartProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const colors = isDark ? PROVIDER_COLORS_DARK : PROVIDER_COLORS_LIGHT;

    // Assign colors to providers consistently
    const providerColorMap = new Map<string, string>();
    providerKeys.forEach((key, index) => {
        providerColorMap.set(key, colors[index % colors.length]); // Cycle through colors
    });

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 10, // Increased left margin for Y-axis labels
                    bottom: 5,
                }}
                layout="vertical" // Pillars on Y-axis, Scores on X-axis
                barCategoryGap="20%" // Gap between pillar groups
                barGap={4} // Gap between bars within a group
            >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                <XAxis
                    type="number"
                    domain={[0, 10]} // Scores are 0-10
                    tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                    stroke="hsl(var(--muted-foreground))"
                    allowDecimals={false} // Show integer ticks
                    tickCount={6} // e.g., 0, 2, 4, 6, 8, 10
                 />
                <YAxis
                    dataKey="name" // Pillar names
                    type="category"
                    width={80} // Ensure enough space for pillar names
                    tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                    stroke="hsl(var(--muted-foreground))"
                     axisLine={false}
                     tickLine={false}
                 />
                <Tooltip
                    cursor={{ fill: 'hsl(var(--muted) / 0.3)' }}
                    contentStyle={{
                        backgroundColor: 'hsl(var(--popover))',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--popover-foreground))',
                        fontSize: '12px',
                        borderRadius: 'var(--radius-md)',
                        padding: '8px 12px',
                        boxShadow: 'var(--shadow-sm)',
                    }}
                     formatter={(value: number, name: string) => [`${value.toFixed(1)} / 10`, name]} // Format score
                     labelStyle={{ fontWeight: 'bold', marginBottom: '4px', display: 'block' }} // Style pillar name in tooltip
                 />
                <Legend iconSize={10} wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />

                {/* Render a Bar component for each selected provider */}
                {providerKeys.map((key) => (
                    <Bar key={key} dataKey={key} fill={providerColorMap.get(key) || "#8884d8"} radius={[3, 3, 0, 0]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
}