// FILE: royce/components/provider-card.tsx
// --------------------------------------------------------------------------------
"use client";

import Link from "next/link";
import { ProviderSummary } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { motion } from "framer-motion";
import { LargeScoreGauge } from "./ui/large-score-gauge";
import { MiniPillarBars } from "./ui/mini-pillar-bars";
import { cn } from "@/lib/utils";
import { ArrowRight, ShieldCheck, Star, Gem } from "lucide-react";

interface ProviderCardProps {
  provider: ProviderSummary;
  className?: string;
}

export function ProviderCard({ provider, className }: ProviderCardProps) {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // Determine score category for styling
  const scoreCategory = provider.overall_score >= 8 
    ? "excellent" 
    : provider.overall_score >= 6 
      ? "good" 
      : "fair";

  return (
    <Link href={`/providers/${provider.slug}`}>
      <motion.div 
      className={cn("block group h-full", className)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={cardVariants}
      >
        <Card className="h-full flex flex-col overflow-hidden rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all duration-300 bg-card hover:border-primary/20 group">
          {/* Header with logo, name, and score */}
          <CardHeader className="p-4 pb-2 border-b border-border/20">
            <motion.div 
              className="flex justify-between items-start gap-3"
              variants={itemVariant}
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                {provider.logo && (
                  <div className="relative w-10 h-10 rounded-lg bg-background border border-border/20 flex items-center justify-center p-1 overflow-hidden">
                    <Image
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      width={40}
                      height={40}
                      className="object-contain aspect-square"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-base font-semibold truncate">
                    {provider.name}
                  </CardTitle>
                  {provider.tier && (
                    <div className="flex items-center gap-1 mt-0.5">
                      <Gem className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs text-muted-foreground">
                        {provider.tier} Tier
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Score Gauge with category indicator */}
              <div className="flex flex-col items-center">
                <LargeScoreGauge 
                  score={provider.overall_score} 
                  size={48}
                  strokeWidth={5}
                  className={cn(
                    scoreCategory === "excellent" && "text-emerald-500",
                    scoreCategory === "good" && "text-blue-500",
                    scoreCategory === "fair" && "text-amber-500"
                  )}
                  textClassName="text-[0.95rem] font-bold" // Explicitly set small text
                  />
                <span className="text-[10px] font-medium mt-1 text-muted-foreground">
                  Overall
                </span>
              </div>
            </motion.div>
          </CardHeader>

          {/* Main content */}
          <CardContent className="p-4 pb-3 flex-1 flex flex-col">
            {/* Summary text */}
            <motion.div 
              variants={itemVariant}
              className="mb-4"
            >
              <CardDescription className="text-sm line-clamp-3 leading-snug">
                {provider.summary}
              </CardDescription>
            </motion.div>

            {/* Pillar bars with visual indicator */}
            <motion.div 
              variants={itemVariant}
              className="mt-auto"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Safety Pillars
                </h3>
                <span className="text-xs text-muted-foreground">
                  {provider.overall_score.toFixed(1)}/10
                </span>
              </div>
              <MiniPillarBars 
                pillars={provider.pillars} 
                className="mb-1"
              />
              <div className="flex justify-end">
                <span className="text-xs text-primary flex items-center gap-0.5">
                  View details <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.div>
          </CardContent>

          {/* Footer with certifications */}
          {provider.certifications && provider.certifications.length > 0 && (
            <CardFooter className="p-3 pt-2 border-t bg-muted/10">
              <motion.div
                className="flex flex-wrap gap-1.5 w-full"
                variants={itemVariant}
              >
                {provider.certifications.slice(0, 3).map((cert) => (
                  <Badge 
                    key={cert} 
                    variant="secondary" 
                    className="text-[10px] px-2 py-0.5 font-medium flex items-center gap-1"
                  >
                    <Star className="h-3 w-3 text-yellow-500 fill-yellow-500/20" />
                    {cert}
                  </Badge>
                ))}
                {provider.certifications.length > 3 && (
                  <Badge 
                    variant="outline" 
                    className="text-[10px] px-2 py-0.5 font-medium border-dashed"
                  >
                    +{provider.certifications.length - 3}
                  </Badge>
                )}
              </motion.div>
            </CardFooter>
          )}
        </Card>
      </motion.div>
    </Link>
  );
}