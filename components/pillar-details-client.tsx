"use client";

import { useState } from 'react';
import {
    Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EvidenceItem, ProviderEvidence, SubmetricDetail } from "@/lib/types";
import { EvidenceModal } from "@/components/evidence-modal";
import { Separator } from "@/components/ui/separator";

// EvidenceDisplay remains largely the same, but uses fields from JSON if available
const EvidenceDisplay = ({ evidence, onEvidenceClick }: { evidence: EvidenceItem[]; onEvidenceClick: (item: EvidenceItem) => void }) => (
    <div className="space-y-2 mt-3">
        {evidence.map((item, index) => (
            <div
                key={index}
                className="text-xs p-3 border rounded-md bg-muted/30 hover:bg-muted/60 cursor-pointer transition-colors duration-150"
                onClick={() => onEvidenceClick(item)}
            >
                {/* Use JSON fields if they exist, otherwise fallback or show N/A */}
                <p className="font-semibold mb-1 truncate">{item.title || item.type || 'Evidence Item'}</p>
                <p className="text-muted-foreground text-[11px] mb-1">
                    {item.source || item.url || 'No Source'}
                    {item.publish_date && ` (${item.publish_date})`}
                    {/* Display score from JSON if needed, or the old score field */}
                    {/* | Score: {item.score} */}
                </p>
                <p className="text-muted-foreground line-clamp-2">
                    {item.quote || item.value || 'No details available.'}
                </p>
            </div>
        ))}
        {evidence.length === 0 && <p className="text-xs text-muted-foreground text-center py-2">No specific evidence listed for this submetric.</p>}
    </div>
);

interface PillarDetailsClientProps {
    pillars: ProviderEvidence['pillars'];
}

export function PillarDetailsClient({ pillars }: PillarDetailsClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);

    const handleEvidenceClick = (item: EvidenceItem) => {
        // Map JSON fields to modal display if necessary, or enhance modal
        setSelectedEvidence(item);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvidence(null);
    };

    return (
        <div className="space-y-6">
            {Object.entries(pillars).map(([pillarName, pillarDetail]) => {
                const pillarScore = typeof pillarDetail?.score === 'number' ? pillarDetail.score.toFixed(1) : 'N/A';
                // const pillarWeight = typeof pillarDetail?.weight === 'number' ? pillarDetail.weight.toFixed(2) : 'N/A'; // Weight seems unused/missing

                return (
                    <Card key={pillarName}>
                        <CardHeader>
                            <CardTitle className="text-xl flex justify-between items-center">
                                <span>{pillarName}</span>
                                <span className="text-lg font-semibold">Score: {pillarScore}</span>
                            </CardTitle>
                            {pillarDetail.analysis && (
                                <CardDescription className="pt-2">{pillarDetail.analysis}</CardDescription>
                            )}
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {pillarDetail.submetrics.map((submetric, index) => (
                                    <AccordionItem value={`item-${index}`} key={submetric.name}>
                                        <AccordionTrigger className="text-base font-medium hover:no-underline">
                                            {submetric.name}
                                            {/* Optionally display submetric value/KPI here */}
                                            {/* <span className="text-sm text-muted-foreground ml-auto pr-4">{submetric.value || 'N/A'}</span> */} 
                                        </AccordionTrigger>
                                        <AccordionContent className="space-y-3 pt-3">
                                            {submetric.analysis && (
                                                <p className="text-sm text-muted-foreground pb-2 border-b mb-3"> {submetric.analysis}</p>
                                            )}
                                            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">Evidence:</h4>
                                            <EvidenceDisplay evidence={submetric.evidence || []} onEvidenceClick={handleEvidenceClick} />
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            {pillarDetail.submetrics.length === 0 && (
                                <p className="text-sm text-muted-foreground text-center py-4">No submetrics detailed for this pillar.</p>
                            )}
                        </CardContent>
                    </Card>
                );
            })}

            <EvidenceModal
                evidence={selectedEvidence} // Consider enhancing modal to show more fields
                isOpen={isModalOpen}
                onClose={closeModal}
            />
        </div>
    );
} 