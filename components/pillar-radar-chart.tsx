"use client";

import { PillarDetail } from "@/lib/types";
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
    ResponsiveContainer, Tooltip, Text
} from "recharts";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface PillarRadarChartProps {
    pillars: { [key: string]: PillarDetail };
    selectedPillar: string | null;
    onPillarSelect: (pillarName: string) => void;
    height?: number;
}

const RADAR_COLORS = {
    light: {
        stroke: "hsl(var(--primary))",
        fill: "hsl(var(--primary))",
        axis: "hsl(var(--muted-foreground))",
        axisSelected: "hsl(var(--primary))",
        grid: "hsl(var(--border) / 0.75)",
        tooltipBg: "hsl(var(--popover))",
        tooltipText: "hsl(var(--popover-foreground))",
        tooltipBorder: "hsl(var(--border))",
    },
    dark: {
        stroke: "hsl(var(--primary))",
        fill: "hsl(var(--primary))",
        axis: "hsl(var(--muted-foreground))",
        axisSelected: "hsl(var(--primary))",
        grid: "hsl(var(--border) / 0.65)",
        tooltipBg: "hsl(var(--popover))",
        tooltipText: "hsl(var(--popover-foreground))",
        tooltipBorder: "hsl(var(--border))",
    },
};

const InteractiveAngleTick = (props: any) => {
    const { x, y, payload, selectedPillar, onPillarSelect, colors } = props;
    const isSelected = payload.value === selectedPillar;

    return (
        <Text
            x={x}
            y={y}
            dy={y > 150 ? 16 : -6}
            textAnchor="middle"
            className={cn(
                "text-[13px] font-medium cursor-pointer transition-colors",
                isSelected ? "font-bold" : ""
            )}
            fill={isSelected ? colors.axisSelected : colors.axis}
            onClick={() => onPillarSelect(payload.value)}
        >
            {payload.value}
        </Text>
    );
};

export function PillarRadarChart({
    pillars,
    selectedPillar,
    onPillarSelect,
    height = 350,
}: PillarRadarChartProps) {
    const { resolvedTheme } = useTheme();
    const colors = RADAR_COLORS[resolvedTheme === "dark" ? "dark" : "light"];

    const data = Object.entries(pillars).map(([pillar, detail]) => ({
        pillar,
        score: typeof detail?.score === "number" ? detail.score : 0,
        fullMark: 10,
    }));

    if (data.length < 3) {
        return (
            <div className="bg-background border rounded-xl shadow-md p-4 text-center text-muted-foreground" style={{ height }}>
                Radar chart requires at least 3 data points.
            </div>
        );
    }

    return (
        <div className="bg-background rounded-xl shadow-md p-4">
            <ResponsiveContainer width="100%" height={height}>
                <RadarChart
                    cx="50%"
                    cy="50%"
                    outerRadius="70%"
                    data={data}
                    margin={{ top: 20, right: 35, bottom: 20, left: 35 }}
                >
                    <PolarGrid stroke={colors.grid} strokeDasharray="3 3" />
                    <PolarAngleAxis
                        dataKey="pillar"
                        tick={(props) => (
                            <InteractiveAngleTick
                                {...props}
                                selectedPillar={selectedPillar}
                                onPillarSelect={onPillarSelect}
                                colors={colors}
                            />
                        )}
                        axisLine={false}
                    />
                    <PolarRadiusAxis
                        angle={90}
                        domain={[0, 10]}
                        tickCount={6}
                        tick={{ fill: colors.axis, fontSize: 11 }}
                        axisLine={{ stroke: colors.grid }}
                        tickLine={{ stroke: colors.grid }}
                    />
                    <Radar
                        name="Score"
                        dataKey="score"
                        stroke={colors.stroke}
                        fill={colors.fill}
                        fillOpacity={0.6}
                        strokeWidth={2}
                        activeDot={{ r: 5, strokeWidth: 2, fill: colors.stroke }}
                    />
                    <Tooltip
                        cursor={{
                            stroke: colors.stroke,
                            strokeDasharray: "3 3",
                            strokeWidth: 1.5,
                        }}
                        contentStyle={{
                            backgroundColor: colors.tooltipBg,
                            borderColor: colors.tooltipBorder,
                            color: colors.tooltipText,
                            fontSize: "12px",
                            borderRadius: "var(--radius-md)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            padding: "8px 12px",
                            borderWidth: "1px",
                        }}
                        formatter={(value: number) => [`${value.toFixed(1)} / 10`, null]}
                        labelFormatter={(label: string) => <span className="font-semibold">{label}</span>}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}
