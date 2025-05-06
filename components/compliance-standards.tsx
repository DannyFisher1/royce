"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import Link from 'next/link';

const complianceStandardsData = [
    {
        name: "SOC 2",
        icon: "🔐",
        summary: "Security & compliance audit",
        description: "System and Organization Controls (SOC) 2 is an auditing procedure that ensures service providers securely manage data to protect the interests of their clients. Type II reports evaluate the effectiveness of controls over time.",
        details: [
            "Examines security, availability, processing integrity, confidentiality, and privacy",
            "Conducted by independent auditors",
            "Annual audit required for compliance"
        ],
        link: "https://www.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report.html",
        badgeVariant: "ghost" as const
    },
    {
        name: "ISO 27001",
        icon: "🌍",
        summary: "Information security standard",
        description: "The international standard for information security management systems (ISMS) published by the International Organization for Standardization (ISO) and the International Electrotechnical Commission (IEC).",
        details: [
            "Framework for managing sensitive company information",
            "Includes risk assessment and treatment processes",
            "Certification valid for 3 years"
        ],
        link: "https://www.iso.org/isoiec-27001-information-security.html",
        badgeVariant: "secondary" as const
    },
    {
        name: "EU AI Act",
        icon: "🤖",
        summary: "AI regulation framework",
        description: "The European Union's Artificial Intelligence Act is the first comprehensive legal framework for AI, categorizing systems by risk and setting requirements for high-risk applications.",
        details: [
            "Bans certain AI practices deemed unacceptable",
            "Special requirements for high-risk systems",
            "Transparency obligations for limited risk systems"
        ],
        link: "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai",
        badgeVariant: "outline" as const
    },
    {
        name: "NIST RMF",
        icon: "🛡️",
        summary: "Risk management framework",
        description: "The National Institute of Standards and Technology's Risk Management Framework provides a process for managing cybersecurity risk through six steps: prepare, categorize, select, implement, assess, authorize, and monitor.",
        details: [
            "Used by US federal agencies and contractors",
            "Flexible enough for private sector adoption",
            "Integrates with other NIST frameworks"
        ],
        link: "https://csrc.nist.gov/projects/risk-management/about-rmf",
        badgeVariant: "secondary" as const
    }
];

interface ComplianceStandardItemProps {
    name: string;
    icon: string;
    summary: string;
    description: string;
    details: string[];
    link: string;
    badgeVariant: "default" | "secondary" | "destructive" | "outline" | "ghost";
}

function ComplianceStandardItem({ name, icon, summary, description, details, link, badgeVariant }: ComplianceStandardItemProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Card className="w-full min-w-[220px] max-w-[260px] border border-gray-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all bg-white dark:bg-slate-900">
            <CardHeader 
                className="cursor-pointer p-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
            >
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-xl">{icon}</span>
                        {isOpen ? (
                            <ChevronUpIcon className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                        ) : (
                            <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                        )}
                    </div>
                    <CardTitle className="text-sm font-semibold dark:text-slate-50">{name}</CardTitle>
                    <Badge variant={badgeVariant} className="w-fit text-xs">
                        {summary}
                    </Badge>
                </div>
            </CardHeader>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <CardContent className="px-4 pb-4 pt-0 text-xs space-y-2">
                            <p className="text-gray-600 dark:text-slate-300 mt-2">{description}</p>
                            <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-slate-300 pl-1">
                                {details.map((detail, i) => (
                                    <li key={i}>{detail}</li>
                                ))}
                            </ul>
                            <Link href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline dark:text-blue-400 dark:hover:underline inline-block mt-2">
                                Learn more →
                            </Link>
                        </CardContent>
                    </motion.div>
                )}
            </AnimatePresence>
        </Card>
    );
}

export function ComplianceStandardsDisplay() {
    return (
        <div className="flex flex-wrap items-start justify-center gap-3 overflow-x-auto px-4 py-2 no-scrollbar">
            {complianceStandardsData.map((standard) => (
                <ComplianceStandardItem 
                    key={standard.name} 
                    {...standard}
                />
            ))}
        </div>
    );
}