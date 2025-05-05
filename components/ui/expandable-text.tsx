// FILE: royce/components/ui/expandable-text.tsx
"use client";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ExpandableTextProps {
    text: string;
    initialLines?: number;
    className?: string;
}

export function ExpandableText({ text, initialLines = 3, className }: ExpandableTextProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    // Estimate if text exceeds initial lines (very rough estimate)
    // A better way might involve measuring element height, but this is simpler for now.
    const likelyNeedsExpansion = text.split('\n').length > initialLines || text.length > initialLines * 80; // Rough character count heuristic

    const textVariants = {
        collapsed: { WebkitLineClamp: initialLines, height: 'auto', opacity: 1 }, // Use auto height initially
        expanded: { WebkitLineClamp: 'unset', height: 'auto', opacity: 1 }
    };

    // We need to calculate the height dynamically for smoother animation,
    // but for simplicity now, we'll just use opacity/line-clamp.

    return (
        <div className={cn("relative", className)}>
            <motion.p
                className={cn(
                    "text-sm text-muted-foreground whitespace-pre-wrap overflow-hidden",
                    !isExpanded && 'line-clamp-[var(--line-clamp)]' // Apply line-clamp dynamically
                )}
                style={{ '--line-clamp': initialLines } as React.CSSProperties}
                animate={isExpanded ? "expanded" : "collapsed"}
                // variants={textVariants} // Variants might need refinement for height animation
                transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
                {text}
            </motion.p>
            {likelyNeedsExpansion && (
                <div className="pt-2 text-right">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-xs h-7 px-2 text-primary hover:text-primary/80"
                    >
                        {isExpanded ? 'Read Less' : 'Read Full Summary'}
                        {isExpanded ? <ChevronUp className="ml-1 h-3 w-3" /> : <ChevronDown className="ml-1 h-3 w-3" />}
                    </Button>
                </div>
            )}
        </div>
    );
}