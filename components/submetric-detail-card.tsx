// FILE: royce/components/submetric-detail-card.tsx
// --------------------------------------------------------------------------------
"use client";

import { useState } from 'react';
import { SubmetricDetail, EvidenceItem } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, LinkIcon, BarChartBig, Info } from 'lucide-react'; // Example icons
import { EvidenceModal } from './evidence-modal'; // Keep modal for full view

interface SubmetricDetailCardProps {
    submetric: SubmetricDetail;
}

// Helper to render evidence snippets
const EvidenceSnippet = ({ evidenceItem, onShowModal }: { evidenceItem: EvidenceItem; onShowModal: (item: EvidenceItem) => void }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const getIcon = (type: string | undefined, source: string | undefined) => {
        // Basic icon logic (can be expanded)
        if (type?.toLowerCase().includes('report') || source?.toLowerCase().includes('pdf')) return <FileText className="h-4 w-4 text-muted-foreground" />;
        if (evidenceItem.url) return <LinkIcon className="h-4 w-4 text-muted-foreground" />;
        if (type?.toLowerCase().includes('internal') || type?.toLowerCase().includes('benchmark')) return <BarChartBig className="h-4 w-4 text-muted-foreground" />;
        return <Info className="h-4 w-4 text-muted-foreground" />;
    }

    const snippetVariants = {
        hidden: { opacity: 0, height: 0, marginTop: 0, marginBottom: 0 },
        visible: { opacity: 1, height: 'auto', marginTop: '0.5rem', marginBottom: '0.5rem' , transition: { duration: 0.3, ease: "easeInOut" } },
    };


    return (
        <motion.div
            layout // Animate layout changes smoothly
            className="border rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors duration-150 text-xs overflow-hidden mb-2 last:mb-0"
        >
            <div className="flex items-center justify-between p-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {getIcon(evidenceItem.type, evidenceItem.source)}
                    <span className="font-medium truncate flex-1">{evidenceItem.title || evidenceItem.source || evidenceItem.type || 'Evidence Item'}</span>
                     {/* Optional: Tier Badge */}
                     {evidenceItem.tier && (
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 ml-auto flex-shrink-0">
                             Tier {evidenceItem.tier.replace('Tier ', '')}
                        </Badge>
                    )}
                </div>
                <ChevronDown
                    className={cn("h-4 w-4 text-muted-foreground ml-2 transition-transform duration-200", isExpanded && "rotate-180")}
                />
            </div>

            {/* Expandable Content */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        key="content"
                        variants={snippetVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="px-3 pb-3 border-t border-border/50" // Add padding and border
                    >
                        {evidenceItem.publish_date && <p className="text-[11px] text-muted-foreground mb-1">Published: {evidenceItem.publish_date}</p>}
                        {evidenceItem.url && <a href={evidenceItem.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline break-all block mb-1">Source Link</a>}
                        {evidenceItem.quote && <p className="italic text-foreground/80 mb-2 line-clamp-4">"{evidenceItem.quote}"</p>}
                        {evidenceItem.justification && <p className="text-foreground mb-2 whitespace-pre-wrap">{evidenceItem.justification}</p>}
                        {evidenceItem.value && !evidenceItem.quote && <p className="text-foreground mb-2 whitespace-pre-wrap">{evidenceItem.value}</p>}

                         {/* Button to open the full modal */}
                        <Button size="lg" variant="ghost" onClick={() => onShowModal(evidenceItem)} className="text-xs h-6 px-1.5 mt-1 text-muted-foreground">
                            View Full Detail...
                        </Button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};


export function SubmetricDetailCard({ submetric }: SubmetricDetailCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

    const handleShowModal = (item: EvidenceItem) => {
        setSelectedEvidence(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvidence(null);
    };

     const cardVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    };


    return (
        <motion.div variants={cardVariants}>
            <Card className="overflow-hidden shadow-sm border bg-card"> {/* Apply card styling */}
                <CardHeader className="pb-3 bg-card"> {/* Reduced padding */}
                    <CardTitle className="text-base sm:text-lg font-semibold">{submetric.name}</CardTitle>
                    {(submetric.kpi || submetric.value) && (
                        <CardDescription className="text-xs sm:text-sm text-muted-foreground pt-1">
                             {submetric.kpi && <span><strong>KPI:</strong> {submetric.kpi}</span>}
                             {submetric.kpi && submetric.value && <span className="mx-2">|</span>}
                             {submetric.value && <span><strong>Value:</strong> {submetric.value}</span>}
                        </CardDescription>
                    )}
                </CardHeader>
                <CardContent className="p-4 pt-0"> {/* Adjust padding */}
                    {submetric.analysis && (
                        <p className="text-sm text-muted-foreground mb-4 pt-3 border-t whitespace-pre-wrap">{submetric.analysis}</p>
                    )}

                    {submetric.evidence && submetric.evidence.length > 0 && (
                         <div>
                             <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Evidence:</h5>
                             {submetric.evidence.map((item, index) => (
                                <EvidenceSnippet key={index} evidenceItem={item} onShowModal={handleShowModal} />
                            ))}
                         </div>
                    )}
                     {(!submetric.evidence || submetric.evidence.length === 0) && (
                        <p className="text-xs text-muted-foreground text-center py-3">No specific evidence listed for this submetric.</p>
                    )}
                </CardContent>
            </Card>

            {/* Evidence Modal (remains available) */}
            <EvidenceModal
                evidence={selectedEvidence}
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </motion.div>
    );
}

// Helper for conditional class names (if not already in utils)
function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}