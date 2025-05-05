"use client";

import { useState, useMemo } from "react";
import type { ProviderSummary, PillarScores } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
// Placeholder imports - replace with actual components later
import { MultiSelectProvider } from "@/components/ui/multi-select-provider";
import { ProviderCompareChart } from "@/components/provider-compare-chart";
import { motion, AnimatePresence } from "framer-motion";
import { XCircle, Info } from "lucide-react";

// Define props received from the Server Component
interface CompareProviderProps {
    initialProviders: ProviderSummary[];
}

export function CompareProvider({ initialProviders }: CompareProviderProps) {
    const [allProviders] = useState<ProviderSummary[]>(initialProviders); // Use initial data
    const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
    // REMOVED isLoading state and useEffect for fetching - data is passed in

    // Memoize the selected provider data based on slugs
    const selectedProviders = useMemo(() => {
        return allProviders.filter(p => selectedSlugs.includes(p.slug));
    }, [allProviders, selectedSlugs]);

    // Prepare data for the grouped bar chart
    const chartData = useMemo(() => {
        if (selectedProviders.length < 2) return [];

        // Use PillarScores type for keys
        const pillarOrder: (keyof PillarScores)[] = ["Content", "Bias", "Privacy", "Security", "Ethics"];
        return pillarOrder.map(pillarName => {
            const dataPoint: { name: string; [providerName: string]: number | string } = { name: pillarName };
            selectedProviders.forEach(provider => {
                const score = provider.pillars[pillarName];
                dataPoint[provider.name] = typeof score === 'number' && !isNaN(score) ? score : 0; // Use 0 for N/A in chart
            });
            return dataPoint;
        });
    }, [selectedProviders]);

    const providerNamesForChart = useMemo(() => selectedProviders.map(p => p.name), [selectedProviders]);

    // Animation variants
    const sectionVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } }
    };

    // REMOVED isLoading check

    // Calculate dynamic grid columns based on selection, ensuring it's at least 1
    const numSelected = selectedProviders.length;
    const gridColsClass = `grid-cols-${Math.max(1, numSelected)}`; // Template literal for Tailwind class

    return (
        <section className="container mx-auto max-w-7xl py-10 lg:py-16">
            <header className="mb-8 lg:mb-12">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
                    Compare AI Provider Safety
                </h1>
                <p className="text-lg text-muted-foreground">
                    Select two or more providers to compare their safety profiles side-by-side.
                </p>
            </header>

            {/* Provider Selection */}
            <div className="mb-10 p-4 border rounded-lg bg-card shadow-sm">
                {/* TODO: Implement MultiSelectProvider component */}
                <MultiSelectProvider
                    providers={allProviders}
                    selectedSlugs={selectedSlugs}
                    onSelectionChange={setSelectedSlugs}
                />
            </div>

            {/* Comparison Area - Show only when 2+ providers are selected */}
            <AnimatePresence>
                {selectedProviders.length >= 2 ? (
                    <motion.div
                        key="comparison-area"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="space-y-8 lg:space-y-12"
                    >
                        {/* Section 1: At-a-Glance Info */}
                         <section>
                            <h2 className="text-xl font-semibold mb-4 border-b pb-2">Overview</h2>
                            {/* Use the dynamic grid class */}
                            <div className={`grid ${gridColsClass} gap-4 lg:gap-6`}>
                                {selectedProviders.map(provider => (
                                    <div key={provider.slug} className="flex flex-col items-center text-center p-3 border rounded-md bg-card">
                                         {provider.logo && (
                                            <Image src={provider.logo} alt={`${provider.name} logo`} width={40} height={40} className="mb-2 rounded-md object-contain"/>
                                         )}
                                         <p className="font-semibold text-sm mb-1">{provider.name}</p>
                                         <p className="text-xs text-muted-foreground mb-2">Overall: <span className="font-bold text-base">{provider.overall_score.toFixed(1)}</span></p>
                                    </div>
                                ))}
                            </div>
                         </section>

                         {/* Section 2: Pillar Score Comparison (Grouped Bar Chart) */}
                         <section>
                             <h2 className="text-xl font-semibold mb-4 border-b pb-2">Pillar Scores Comparison</h2>
                              <Card>
                                 <CardContent className="p-4 pt-6 h-[400px]">
                                     {/* TODO: Implement ProviderCompareChart component */}
                                     <ProviderCompareChart data={chartData} providerKeys={providerNamesForChart} />
                                 </CardContent>
                             </Card>
                         </section>

                         {/* Section 3: Compliance Badges */}
                          <section>
                             <h2 className="text-xl font-semibold mb-4 border-b pb-2">Compliance & Certifications</h2>
                             {/* Use the dynamic grid class */}
                              <div className={`grid ${gridColsClass} gap-4 lg:gap-6`}>
                                 {selectedProviders.map(provider => (
                                     <div key={provider.slug} className="p-3 border rounded-md bg-card h-full">
                                         <h3 className="font-semibold text-sm mb-2 text-center">{provider.name}</h3>
                                         <div className="flex flex-wrap justify-center gap-1.5">
                                              {provider.certifications && provider.certifications.length > 0 ? (
                                                 provider.certifications.map(cert => (
                                                     <Badge key={cert} variant="secondary" className="text-[10px] px-1.5 py-0.5">{cert}</Badge>
                                                 ))
                                             ) : (
                                                 <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 border-dashed">None Listed</Badge>
                                             )}
                                         </div>
                                     </div>
                                 ))}
                             </div>
                          </section>

                          {/* Section 4: Analysis Summaries */}
                          <section>
                             <h2 className="text-xl font-semibold mb-4 border-b pb-2">Analysis Summaries</h2>
                             {/* Use the dynamic grid class */}
                              <div className={`grid ${gridColsClass} gap-4 lg:gap-6 items-start`}>
                                 {selectedProviders.map(provider => (
                                     <Card key={provider.slug} className="h-full">
                                         <CardHeader className="p-3 pb-1">
                                             <CardTitle className="text-sm font-semibold text-center">{provider.name}</CardTitle>
                                         </CardHeader>
                                         <CardContent className="p-3 text-xs text-muted-foreground">
                                             {provider.summary || "No summary available."}
                                         </CardContent>
                                     </Card>
                                 ))}
                             </div>
                          </section>

                         {/* Clear Selection Button */}
                         <div className="text-center pt-4">
                             <Button variant="outline" size="sm" onClick={() => setSelectedSlugs([])}>
                                 <XCircle className="mr-2 h-4 w-4" /> Clear Selection
                             </Button>
                         </div>

                    </motion.div>
                ) : (
                    /* Placeholder when fewer than 2 providers are selected */
                    <motion.div
                        key="placeholder-area"
                        variants={sectionVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="text-center py-16 border border-dashed rounded-lg bg-muted/20"
                     >
                         <Info className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
                         <p className="font-medium text-muted-foreground">Select at least two providers above to start comparing.</p>
                    </motion.div>
                )}
            </AnimatePresence>

        </section>
    );
}
