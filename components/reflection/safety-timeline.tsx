// FILE: royce/components/reflection/safety-timeline.tsx
// --------------------------------------------------------------------------------
"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming cn utility is available
import { LinkIcon } from "lucide-react"; // Import LinkIcon

// Define the timeline events with accurate data and links
const events = [
    {
        year: '2021',
        event: "Groundwork for AI Safety Summit (AI UK 2021)",
        link: "https://www.turing.ac.uk/news/announcing-ai-uk-2021-celebration-uks-ai-talent",
        side: 'left' as 'left' | 'right'
    },
    {
        year: '2022',
        event: "EU AI Act Council General Approach Adopted",
        link: "https://artificialintelligenceact.eu/developments/",
        side: 'right' as 'left' | 'right'
    },
    {
        year: 'Oct 2023',
        event: "White House AI Executive Order (EO 14110)",
        link: "https://www.federalregister.gov/documents/2023/11/01/2023-24283/safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence",
        side: 'left' as 'left' | 'right'
    },
    {
        year: 'Nov 2023',
        event: "First Global AI Safety Summit (Bletchley Park, UK)",
        link: "https://en.wikipedia.org/wiki/AI_Safety_Summit",
        side: 'right' as 'left' | 'right'
    },
    {
        year: 'May 2024',
        event: "Frontier AI Safety Commitments (AI Seoul Summit)",
        link: "https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024",
        side: 'left' as 'left' | 'right'
    },
    {
        year: '2025 (Projected)',
        event: "Increased Focus on Red-Teaming (NIST AISIC, etc.)",
        link: "https://www.nist.gov/aisi/artificial-intelligence-safety-institute-consortium-aisic",
        side: 'right' as 'left' | 'right'
    },
];

// Animation variants for timeline items
const itemVariants = (side: 'left' | 'right') => ({
  hidden: { opacity: 0, x: side === 'left' ? -50 : 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
   },
});

export function SafetyTimeline() {
  return (
    <div className="relative py-8 px-2 sm:px-0">
        {/* The vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-purple-600/50 transform -translate-x-1/2" aria-hidden="true" />

        {/* Timeline Events */}
        {events.map((event, i) => (
            <motion.div
                key={i}
                className="relative mb-10 sm:mb-12 group" // Add group for potential hover effects
                custom={event.side}
                variants={itemVariants(event.side)}
                initial="hidden"
                 // Animate when it comes into view
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }} // Trigger when 40% visible
             >
                <div className="flex items-center">
                     {/* Dot on the line */}
                    <div
                        className={cn(
                             "absolute top-1.5 z-10 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-background bg-primary group-hover:bg-purple-600 transition-colors",
                             event.side === 'left' ? 'right-[calc(50%-8px)]' : 'left-[calc(50%-8px)]' // Position dot centered on line
                         )}
                     />

                    {/* Content Card - Make the whole card the link target */}
                    <a 
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                            "block w-[calc(50%-2rem)] p-3 sm:p-4 border rounded-lg bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/40", // Added block, transitions
                            event.side === 'left' ? 'mr-[4rem]' : 'ml-[4rem]'
                        )}
                    >
                         <div className="flex justify-between items-start"> {/* Flex container for text and icon */}
                             <div className={cn(event.side === 'right' && 'text-right')}> {/* Align text right if needed */} 
                                 <div className="text-xs font-semibold text-primary mb-0.5">{event.year}</div>
                                 <div className="text-sm sm:text-base font-medium text-foreground">{event.event}</div>
                             </div>
                             <LinkIcon className="h-3 w-3 text-muted-foreground/70 shrink-0 ml-2 mt-0.5" /> {/* Link icon */} 
                         </div>
                     </a>
                </div>
            </motion.div>
        ))}
    </div>
  );
};