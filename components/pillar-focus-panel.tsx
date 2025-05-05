// FILE: royce/components/pillar-focus-panel.tsx
// Note: Renamed from detailed-pillar-viewer.tsx
// --------------------------------------------------------------------------------
"use client";

import { PillarDetail } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Added CardDescription
import { SubmetricDetailCard } from "./submetric-detail-card"; // Import the new component we will create
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3 } from "lucide-react"; // Example icon

// Updated Props
interface PillarFocusPanelProps {
    pillars: { [key: string]: PillarDetail };
    selectedPillar: string | null; // Name of the pillar selected on the radar
}

// Renamed component to reflect its new role
export function PillarFocusPanel({ pillars, selectedPillar }: PillarFocusPanelProps) {

    const pillarData = selectedPillar ? pillars[selectedPillar] : null;

    const panelVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: "easeIn" } },
    };

    const submetricContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Stagger animation for submetrics
            },
        },
    };


    // Content displayed when a pillar *is* selected
    const renderPillarDetails = () => (
        <motion.div
            key={selectedPillar} // Ensures re-animation when selection changes
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-6" // Add spacing between elements
        >
            {/* Header: Pillar Name and Score */}
            <div className="bg-card border rounded-xl p-4 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
                    <h3 className="text-2xl font-bold tracking-tight">{selectedPillar}</h3>
                    <span className="text-xl font-semibold text-primary whitespace-nowrap">
                        Score: {typeof pillarData?.score === 'number' ? pillarData.score.toFixed(1) : 'N/A'} / 10
                    </span>
                </div>
                {pillarData?.analysis && (
                    <CardDescription className="text-sm text-muted-foreground border-t pt-3 mt-3">
                        {pillarData.analysis}
                    </CardDescription>
                )}
            </div>

            {/* Submetrics Section */}
            {pillarData?.submetrics && pillarData.submetrics.length > 0 ? (
                <motion.div
                    className="space-y-4" // Spacing between submetric cards
                    variants={submetricContainerVariants}
                    initial="hidden"
                    animate="visible"
                 >
                     <h4 className="text-lg font-semibold text-muted-foreground pl-2">Detailed Submetrics:</h4>
                    {pillarData.submetrics.map((submetric, index) => (
                        // Render the new SubmetricDetailCard component for each submetric
                        <SubmetricDetailCard key={`${selectedPillar}-${submetric.name}-${index}`} submetric={submetric} />
                    ))}
                </motion.div>
            ) : (
                <Card className="text-center">
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">No detailed submetrics available for the '{selectedPillar}' pillar.</p>
                    </CardContent>
                </Card>
            )}
        </motion.div>
    );

    // Content displayed when *no* pillar is selected
    const renderPlaceholder = () => (
         <motion.div
            key="placeholder"
            variants={panelVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center text-center p-10 border border-dashed rounded-xl h-[400px] bg-muted/30"
        >
            <BarChart3 className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <p className="text-lg font-medium text-muted-foreground">Select a Pillar</p>
            <p className="text-sm text-muted-foreground/80 mt-1">Click on a pillar name on the radar chart to view its detailed breakdown.</p>
        </motion.div>
    );

    return (
        // AnimatePresence handles the switch between placeholder and details smoothly
        <AnimatePresence mode="wait">
            {selectedPillar && pillarData ? renderPillarDetails() : renderPlaceholder()}
        </AnimatePresence>
    );
}