// FILE: royce/components/provider-card.tsx
// --------------------------------------------------------------------------------
"use client"; // Still needed for framer-motion

import Link from "next/link";
import { ProviderSummary } from "@/lib/types";
import {
    Card,
    CardContent,
    CardDescription, // Keep CardDescription for summary
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import { LargeScoreGauge } from "@/components/ui/large-score-gauge"; // Import the new Gauge
import { MiniPillarBars } from "@/components/ui/mini-pillar-bars"; // Import the new Mini Bars
// Remove ScoreDial import
// import { ScoreDial } from "./score-dial";

interface ProviderCardProps {
    provider: ProviderSummary;
}

// Remove the old PillarScoresDisplay component
// const PillarScoresDisplay = ...

export function ProviderCard({ provider }: ProviderCardProps) {
    // Animation variants for staggering content inside the card
    const cardContentVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08, // Slight stagger for elements
            }
        }
    };
    const itemVariant = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        // Link wraps the motion anchor
        <Link href={`/providers/${provider.slug}`} passHref legacyBehavior>
            <motion.a // Use motion.a for animations on the link
                className="block group h-full" // Ensure anchor takes full height for layout
                whileHover={{ scale: 1.02, y: -5 }} // Slightly adjusted hover effect
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 350, damping: 20 }} // Adjusted spring physics
            >
                {/* Card setup */}
                <Card className="h-full flex flex-col overflow-hidden rounded-xl border shadow-sm group-hover:shadow-lg transition-shadow duration-200 bg-card">
                    {/* A) Top Section: Identity & Overall Score */}
                    <CardHeader className="p-4 pb-2"> {/* Adjust padding */}
                        <motion.div
                            className="flex justify-between items-start gap-4"
                            variants={cardContentVariants}
                            initial="hidden"
                            animate="visible"
                        >
                             {/* Left side: Logo and Name */}
                            <motion.div className="flex items-center gap-3 flex-1 min-w-0" variants={itemVariant}>
                                {provider.logo && (
                                    <Image
                                        src={provider.logo}
                                        alt={`${provider.name} logo`}
                                        width={48} // Adjusted size
                                        height={48}
                                        className="rounded-md border border-border/40 object-contain aspect-square bg-background p-0.5 flex-shrink-0" // Added bg
                                    />
                                )}
                                <div className="flex-1 min-w-0">
                                    <CardTitle className="text-base sm:text-lg font-semibold truncate">{provider.name}</CardTitle>
                                    {/* Optional: Could add model name here if short */}
                                </div>
                            </motion.div>

                             {/* Right side: Score Gauge */}
                            <motion.div className="flex-shrink-0" variants={itemVariant}>
                                {/* Use LargeScoreGauge, adjust size for card context */}
                                <LargeScoreGauge score={provider.overall_score} size={52} strokeWidth={4} />
                            </motion.div>
                        </motion.div>
                    </CardHeader>

                    {/* B) Middle Section: Summary & Pillar Snapshot */}
                    <CardContent className="p-4 pt-2 pb-3 flex-grow flex flex-col gap-3"> {/* Allow content to grow */}
                         {/* Summary Text */}
                        <motion.div variants={itemVariant}>
                             <CardDescription className="text-xs line-clamp-3 leading-relaxed">
                                 {provider.summary}
                             </CardDescription>
                         </motion.div>

                         {/* Pillar Bars */}
                        <motion.div className="mt-auto pt-2" variants={itemVariant}> {/* Push bars towards bottom slightly */}
                             <MiniPillarBars pillars={provider.pillars} />
                         </motion.div>
                    </CardContent>

                    {/* C) Bottom Section: Certifications/Badges */}
                    {provider.certifications && provider.certifications.length > 0 && (
                        <CardFooter className="p-3 pt-0 border-t mt-auto bg-muted/30"> {/* Use footer for badges, add background */}
                            <motion.div
                                className="flex flex-wrap gap-1.5 w-full" // Use gap-1.5
                                variants={cardContentVariants} // Stagger badges slightly
                                initial="hidden"
                                animate="visible"
                             >
                                {provider.certifications.slice(0, 3).map((cert) => ( // Limit badges shown initially if needed
                                    <motion.div key={cert} variants={itemVariant}>
                                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5 font-medium"> {/* Smaller badges */}
                                            {cert}
                                        </Badge>
                                     </motion.div>
                                ))}
                                {/* Optional: Indicate if more badges exist */}
                                {provider.certifications.length > 3 && (
                                     <motion.div variants={itemVariant}>
                                         <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 font-medium border-dashed">
                                             +{provider.certifications.length - 3} more
                                         </Badge>
                                     </motion.div>
                                )}
                            </motion.div>
                        </CardFooter>
                    )}
                </Card>
            </motion.a>
        </Link>
    );
}