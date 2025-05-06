"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const events = [
  {
    year: "2021",
    event: "AI UK 2021 Conference",
    link: "https://www.turing.ac.uk/news/announcing-ai-uk-2021-celebration-uks-ai-talent",
  },
  {
    year: "2022",
    event: "EU AI Act Draft Adopted",
    link: "https://artificialintelligenceact.eu/developments/",
  },
  {
    year: "Oct 2023",
    event: "White House AI Executive Order",
    link: "https://www.federalregister.gov/documents/2023/11/01/2023-24283/safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence",
  },
  {
    year: "Nov 2023",
    event: "Bletchley Park AI Summit",
    link: "https://en.wikipedia.org/wiki/AI_Safety_Summit",
  },
  {
    year: "May 2024",
    event: "AI Seoul Summit",
    link: "https://www.gov.uk/government/publications/frontier-ai-safety-commitments-ai-seoul-summit-2024/frontier-ai-safety-commitments-ai-seoul-summit-2024",
  },
  {
    year: "2025",
    event: "NIST AISIC Expansion",
    link: "https://www.nist.gov/aisi/artificial-intelligence-safety-institute-consortium-aisic",
  },
];

export function SafetyTimeline() {
  return (
    <div className="w-full py-8">
      <div className="relative overflow-x-auto pb-6 no-scrollbar">
        {/* Timeline track */}
        <div className="absolute left-4 right-4 top-8 h-[2px] bg-gradient-to-r from-gray-200 via-primary/50 to-gray-200 dark:from-slate-700 dark:via-primary/50 dark:to-slate-700" />
        
        {/* Events container */}
        <div className="flex px-8 space-x-12 min-w-max">
          {events.map((event, i) => (
            <motion.div
              key={i}
              className="relative flex flex-col items-center w-40 flex-shrink-0"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div className="absolute top-8 -mt-[5px] h-3 w-3 rounded-full bg-primary border-2 border-white dark:border-slate-900 z-10" />
              
              {/* Year label */}
              <div className="text-xs font-medium text-primary mb-8">{event.year}</div>
              
              {/* Event link */}
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center text-center"
              >
                <div className="text-sm font-medium text-gray-800 dark:text-slate-200 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                  {event.event}
                </div>
                <ArrowUpRight className="h-3 w-3 mt-1 text-gray-400 dark:text-slate-500 group-hover:text-primary dark:group-hover:text-primary transition-colors" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}