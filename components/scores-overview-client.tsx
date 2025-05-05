// "use client";

// import dynamic from 'next/dynamic';
// import { PillarDetail } from "@/lib/types";
// import {
//     BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
// } from 'recharts';
// import { useTheme } from 'next-themes';

// // Define props
// interface ScoresOverviewClientProps {
//     pillars: { [key: string]: PillarDetail };
// }

// // Dynamically import the radar chart wrapper (as before)
// const DynamicRadarChart = dynamic(() => 
//     import('@/components/radar-chart-wrapper').then(mod => mod.RadarChartWrapper),
//     {
//         ssr: false,
//         loading: () => <div className="h-[280px] flex items-center justify-center text-sm text-muted-foreground">Loading Radar Chart...</div>
//     }
// );

// // Define bar chart colors (can align with theme)
// const BAR_COLORS = {
//     light: "hsl(var(--primary) / 0.7)",
//     dark: "hsl(var(--primary) / 0.8)"
// };

// export function ScoresOverviewClient({ pillars }: ScoresOverviewClientProps) {
//     const { resolvedTheme } = useTheme();
//     const barFillColor = BAR_COLORS[resolvedTheme === 'dark' ? 'dark' : 'light'];

//     // Prepare data for the bar chart
//     const barData = Object.entries(pillars).map(([name, detail]) => ({
//         name: name,
//         score: typeof detail.score === 'number' ? detail.score : 0,
//     }));

//     return (
//         <div className="flex flex-col items-center justify-center space-y-6 h-full">
//              {/* Radar Chart */} 
//             <div className="w-full h-[280px] flex-shrink-0"> {/* Give radar chart fixed height */} 
//                  <DynamicRadarChart pillars={pillars} height={280} />
//             </div>
            
//             {/* Divider */}
//             <hr className="w-full border-border my-4" />

//             {/* Bar Chart */}
//             <div className="w-full flex-grow h-[200px]"> {/* Allow bar chart to take remaining space */} 
//                  <ResponsiveContainer width="100%" height="100%">
//                     <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
//                         <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 10 }} stroke="hsl(var(--muted-foreground))" />
//                         <YAxis 
//                             dataKey="name" 
//                             type="category" 
//                             width={60} // Adjust width for labels
//                             tick={{ fontSize: 11 }} 
//                             stroke="hsl(var(--muted-foreground))"
//                             axisLine={false}
//                             tickLine={false}
//                         />
//                         <Tooltip 
//                             cursor={{ fill: 'hsl(var(--muted) / 0.3)'}} 
//                             contentStyle={{
//                                 backgroundColor: 'hsl(var(--popover))',
//                                 borderColor: 'hsl(var(--border))',
//                                 color: 'hsl(var(--popover-foreground))',
//                                 fontSize: '12px',
//                                 borderRadius: 'var(--radius)',
//                             }}
//                             formatter={(value: number) => [value.toFixed(1), 'Score']}
//                         />
//                         <Bar dataKey="score" barSize={16} radius={[4, 4, 0, 0]}> 
//                              {barData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={barFillColor} />
//                             ))}
//                         </Bar>
//                     </BarChart>
//                 </ResponsiveContainer>
//             </div>
//         </div>
//     );
// } 