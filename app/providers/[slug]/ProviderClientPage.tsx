// FILE: royce/app/providers/[slug]/ProviderClientPage.tsx
// --------------------------------------------------------------------------------
"use client"; // Required for useState and Framer Motion

import { useState, useEffect, Suspense } from "react";
// REMOVE imports related to data fetching if not needed here
// import { getProviderData, getAllProviderSlugs, getProviderSummaries } from "@/lib/data"; 
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ProviderEvidence, PillarDetail, ProviderSummary } from "@/lib/types";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableText } from "@/components/ui/expandable-text";
import { LargeScoreGauge } from "@/components/ui/large-score-gauge";
import { PillarScoreSnapshot } from "@/components/ui/pillar-score-snapshot";
import { InteractiveRadarChart } from "@/components/interactive-radar-chart";
import { PillarFocusPanel } from "@/components/pillar-focus-panel";
import { ArrowLeft, Download, AlertTriangle, GitCompareArrows } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingAnimation } from "@/components/ui/loading-animation";

// Define the props received from the Server Component
interface ProviderClientPageProps {
    slug: string; // Accept slug directly
    initialProviderData: ProviderEvidence; // Use non-nullable types as parent handles notFound
    initialProviderSummary: ProviderSummary;
}

// Update function signature to accept direct props
export default function ProviderClientPage({
    slug, // Use slug directly
    initialProviderData,
    initialProviderSummary
}: ProviderClientPageProps) {
    const router = useRouter();
    // Data comes directly from props, no need for state/fetching here
    const providerData = initialProviderData;
    const providerSummary = initialProviderSummary;
    const [selectedPillar, setSelectedPillar] = useState<string | null>(null);
    // REMOVE isLoading state and useEffect for fetching
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => { ... fetchData ... }, [slug]);

    // Initialize selectedPillar based on props data
    useEffect(() => {
        const pillarNames = Object.keys(providerData.pillars ?? {});
        if (pillarNames.length > 0 && !selectedPillar) { // Only set if not already set
            setSelectedPillar(pillarNames[0]);
        }
    // Depend only on providerData to set initial state once
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [providerData]);

    // REMOVE loading state check
    // if (isLoading) { ... }

    // REMOVE not found check (handled by parent Server Component)
    // if (!providerData || !providerSummary) { ... }

    const pillarsData = providerData.pillars ?? {};
    const hasPillars = Object.keys(pillarsData).length > 0;

    // Enhance animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                when: "beforeChildren",
                staggerChildren: 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: {
            opacity: 0,
            transition: { 
                when: "afterChildren",
                staggerChildren: 0.05,
                staggerDirection: -1,
                duration: 0.4
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
            }
        },
        exit: { 
            opacity: 0, 
            y: -10,
            transition: { 
                duration: 0.3
            }
        }
    };

    // Add subtle hover animation to interactive elements
    const hoverVariants = {
        hover: { 
            scale: 1.02,
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
            transition: { 
                duration: 0.2,
                ease: "easeOut" 
            }
        }
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                className="container mx-auto max-w-7xl p-4 py-8 md:p-8 lg:py-12"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={containerVariants}
                key={slug} // Important for AnimatePresence to work correctly
            >
                {/* Back Button with enhanced animation */}
                <motion.div 
                    variants={itemVariants} 
                    className="mb-6"
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    <Button variant="ghost" onClick={() => router.back()} className="text-sm text-muted-foreground">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Overview
                    </Button>
                </motion.div>

                {/* --- I. Above the Fold --- */}
                <motion.section variants={itemVariants} className="mb-12 lg:mb-16">
                    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6 lg:gap-10">

                        {/* A) Provider Masthead */}
                        <div className="flex items-center gap-4 lg:gap-6 flex-shrink-0">
                            {providerSummary.logo && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 0.4 }}
                                >
                                    <Image
                                        src={providerSummary.logo}
                                        alt={`${providerData.name} logo`}
                                        width={80}
                                        height={80}
                                        className="rounded-lg border bg-card p-1 shadow-sm"
                                    />
                                </motion.div>
                            )}
                            <div className="space-y-1">
                                <h1 className="text-4xl lg:text-5xl font-bold tracking-tight">{providerData.name}</h1>
                                <p className="text-lg text-muted-foreground">Model: {providerData.model}</p>
                            </div>
                        </div>

                        {/* Compliance Badges - moved below name on small screens, aside on large */}
                        {providerData.compliance_badges && providerData.compliance_badges.length > 0 && (
                            <div className="flex flex-wrap gap-2 pt-2 lg:pt-0 lg:ml-auto">
                                {providerData.compliance_badges.map((badge) => (
                                    // TODO: Add tooltips explaining badges
                                    <Badge key={badge} variant="secondary" className="whitespace-nowrap text-xs font-medium py-1 px-2.5 rounded-md">
                                        {badge}
                                    </Badge>
                                ))}
                            </div>
                        )}

                    </div>
                </motion.section>

                <motion.section variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16">
                    {/* B) Overall Assessment Panel */}
                    <motion.div 
                        className="md:col-span-2 bg-card border rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start gap-6"
                        whileHover={hoverVariants.hover}
                    >
                        <div className="flex-shrink-0">
                            {/* TODO: Implement LargeScoreGauge component */}
                            <LargeScoreGauge score={providerSummary.overall_score} />
                            <p className="text-center text-xs text-muted-foreground mt-1">Overall Safety Score</p>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-semibold mb-2">Expert Analysis Summary</h2>
                            {/* TODO: Implement ExpandableText component */}
                            <ExpandableText text={providerData.analysis_summary || "No summary available."} initialLines={4} />
                        </div>
                    </motion.div>

                    {/* C) Pillar Score Snapshot */}
                    <motion.div 
                        className="md:col-span-1 bg-card border rounded-xl p-6 shadow-sm"
                        whileHover={hoverVariants.hover}
                    >
                        <h2 className="text-lg font-semibold mb-4 text-center">Pillar Score Snapshot</h2>
                        {hasPillars && providerSummary.pillars ? (
                            // TODO: Implement PillarScoreSnapshot component
                            <PillarScoreSnapshot pillars={providerSummary.pillars} />
                        ) : (
                            <p className="text-sm text-muted-foreground text-center">Pillar scores not available.</p>
                        )}
                    </motion.div>
                </motion.section>

                {/* --- II. Main Exploration Area --- */}
                <motion.section variants={itemVariants}>
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Explore the Pillars</h2>
                    {hasPillars ? (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                            {/* D) Interactive Radar Chart */}
                            <div className="lg:col-span-1 bg-card border rounded-xl p-4 pt-6 shadow-sm sticky top-[calc(theme(spacing.14)+2rem)] h-[400px] lg:h-[500px]"> {/* Sticky positioning */}
                                <h3 className="text-md font-semibold text-center mb-2">Safety Profile Overview</h3>
                                {/* TODO: Implement InteractiveRadarChart component */}
                                <InteractiveRadarChart
                                    pillars={pillarsData}
                                    selectedPillar={selectedPillar}
                                    onPillarSelect={setSelectedPillar}
                                />
                            </div>

                            {/* E) Pillar Focus Panel */}
                            <div className="lg:col-span-2">
                                {/* TODO: Implement PillarFocusPanel component */}
                                <PillarFocusPanel
                                    pillars={pillarsData}
                                    selectedPillar={selectedPillar}
                                />
                            </div>
                        </div>
                    ) : (
                        <Card className="mt-6">
                            <CardHeader><CardTitle>Detailed Pillar Breakdown</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground text-center py-6">Detailed pillar data not available for this provider.</p></CardContent>
                        </Card>
                    )}
                </motion.section>

                {/* --- IV. Footer & Contextual Actions --- */}
                <motion.footer 
                    variants={itemVariants} 
                    className="mt-16 pt-8 border-t text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <p className="text-xs text-muted-foreground">
                        Data sourced from provider documentation and public articles, Compiled on {new Date().toLocaleDateString()}. Accuracy not guaranteed. We did our best but you never know.
                    </p>
                </motion.footer>

            </motion.div>
        </AnimatePresence>
    );
}