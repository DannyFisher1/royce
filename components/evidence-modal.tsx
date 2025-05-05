// FILE: royce/components/evidence-modal.tsx
// --------------------------------------------------------------------------------
"use client";

import { EvidenceItem } from "@/lib/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ExternalLink, FileText, BarChartBig, Info, Star, Calendar, Hash } from "lucide-react"; // Added more icons

interface EvidenceModalProps {
    evidence: EvidenceItem | null;
    isOpen: boolean;
    onClose: () => void;
}

// Helper to get a relevant icon (can be reused/moved to utils)
const getEvidenceIcon = (type: string | undefined, source: string | undefined, url: string | undefined) => {
    const typeLower = type?.toLowerCase() || '';
    const sourceLower = source?.toLowerCase() || '';
    if (typeLower.includes('report') || sourceLower.includes('pdf') || sourceLower.includes('document')) return <FileText className="h-4 w-4" />;
    if (url) return <ExternalLink className="h-4 w-4" />; // Use ExternalLink for URLs
    if (typeLower.includes('internal') || typeLower.includes('benchmark') || typeLower.includes('evaluation')) return <BarChartBig className="h-4 w-4" />;
    return <Info className="h-4 w-4" />;
}

export function EvidenceModal({ evidence, isOpen, onClose }: EvidenceModalProps) {
    if (!evidence) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {/* Increased max width for better readability of potentially long text */}
            <DialogContent className="sm:max-w-[700px] md:max-w-[800px]">
                <DialogHeader className="pr-10"> {/* Add padding to prevent overlap with close button */}
                    <DialogTitle className="flex items-start gap-3 text-lg sm:text-xl">
                        {/* Use helper for icon */}
                        <span className="mt-1 text-muted-foreground flex-shrink-0">
                             {getEvidenceIcon(evidence.type, evidence.source, evidence.url)}
                        </span>
                         <span className="flex-1">{evidence.title || evidence.source || 'Evidence Detail'}</span>
                         {/* Badge for Type - more subdued */}
                         {evidence.type && <Badge variant="secondary" className="text-xs ml-auto flex-shrink-0 font-normal">{evidence.type}</Badge>}
                    </DialogTitle>
                    {/* More detailed description using available fields */}
                    <DialogDescription className="text-xs grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-1 pt-2 border-t mt-3">
                       {evidence.source && <span className="flex items-center gap-1.5"><Info className="h-3 w-3 opacity-70"/> <strong>Source:</strong> <span className="truncate">{evidence.source}</span></span>}
                       <span className="flex items-center gap-1.5"><Star className="h-3 w-3 opacity-70"/> <strong>Score:</strong> {typeof evidence.score === 'number' ? evidence.score.toFixed(1) : 'N/A'}</span>
                       {evidence.tier && <span className="flex items-center gap-1.5"><Hash className="h-3 w-3 opacity-70"/> <strong>Tier:</strong> {evidence.tier}</span>}
                       {evidence.publish_date && <span className="flex items-center gap-1.5"><Calendar className="h-3 w-3 opacity-70"/> <strong>Date:</strong> {evidence.publish_date}</span>}
                       {evidence.url && (
                            <a
                                href={evidence.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 hover:underline col-span-2 sm:col-span-1 truncate"
                             >
                                <ExternalLink className="h-3 w-3 opacity-70"/>
                                <strong>Link:</strong> <span className="truncate">{evidence.url}</span>
                            </a>
                        )}
                    </DialogDescription>
                </DialogHeader>

                {/* Main Content Area */}
                 {/* Use ScrollArea only if needed, maybe based on content length? For now, keep it. */}
                <ScrollArea className="max-h-[60vh] my-4 pr-3"> {/* Add padding-right for scrollbar */}
                    <div className="space-y-4 text-sm p-1">
                        {/* Display Quote prominently if available */}
                        {evidence.quote && (
                            <blockquote className="border-l-4 pl-4 italic text-muted-foreground bg-muted/30 p-3 rounded-r-md">
                                "{evidence.quote}"
                            </blockquote>
                        )}

                        {/* Display Justification if available */}
                        {evidence.justification && (
                             <div>
                                 <h4 className="font-semibold text-sm mb-1">Justification / Context:</h4>
                                 <p className="whitespace-pre-wrap text-foreground/90">{evidence.justification}</p>
                             </div>
                        )}

                         {/* Display Value as fallback or additional detail */}
                         {/* Only show value if it's different from quote/justification and provides info */}
                         {evidence.value && evidence.value !== evidence.quote && evidence.value !== evidence.justification && (
                             <div>
                                <h4 className="font-semibold text-sm mb-1">Raw Value / Detail:</h4>
                                <p className="whitespace-pre-wrap text-foreground/90 bg-muted/20 border p-2 rounded-md text-xs font-mono">{evidence.value}</p>
                             </div>
                         )}
                         {/* Handle case where only value exists */}
                         {evidence.value && !evidence.quote && !evidence.justification && (
                             <p className="whitespace-pre-wrap text-foreground/90">{evidence.value}</p>
                         )}
                         {/* Handle empty case */}
                          {!evidence.quote && !evidence.justification && !evidence.value && (
                              <p className="text-center text-muted-foreground py-4">No detailed content available for this evidence item.</p>
                          )}
                    </div>
                </ScrollArea>

                <DialogFooter>
                     <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}