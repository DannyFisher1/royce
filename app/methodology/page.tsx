// FILE: royce/app/methodology/page.tsx
// --------------------------------------------------------------------------------
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { InfoIcon, AlertCircleIcon, MailIcon, ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { ComplianceStandardsDisplay } from "@/components/compliance-standards";
import { SafetyTimeline } from "@/components/reflection/safety-timeline";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import Link from "next/link";

export default function MethodologyPage() {
    const generatedDate = "May 2, 2025";
    
    // Pillar data with icons and colors
    const pillars = [
        {
            name: "Content Safety",
            description: "Preventing harmful or disallowed content",
            color: "bg-blue-500",
            icon: "🛡️",
            metrics: [
                "Toxicity detection accuracy",
                "Harmful content prevention",
                "Guideline compliance"
            ],
            weight: 25
        },
        {
            name: "Bias & Fairness",
            description: "Equitable performance across groups",
            color: "bg-purple-500",
            icon: "⚖️",
            metrics: [
                "Gender performance parity",
                "Racial fairness",
                "Biased content reduction"
            ],
            weight: 20
        },
        {
            name: "Privacy Protection",
            description: "Safeguarding personal data",
            color: "bg-green-500",
            icon: "🔒",
            metrics: [
                "Privacy certifications",
                "Data leak prevention",
                "Encryption standards"
            ],
            weight: 20
        },
        {
            name: "System Security",
            description: "Protecting against threats and vulnerabilities",
            color: "bg-orange-500",
            icon: "🛡️",
            metrics: [
                "Vulnerability management",
                "Security certifications",
                "Incident response"
            ],
            weight: 15
        },
        {
            name: "Ethical Practices",
            description: "Transparency and accountability",
            color: "bg-pink-500",
            icon: "🌐",
            metrics: [
                "Decision explainability",
                "Human oversight",
                "Accountability measures"
            ],
            weight: 20
        }
    ];

    return (
        <section className="container mx-auto max-w-6xl py-8 lg:py-12 px-4">
            {/* Hero Section */}
            <header className="mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 sm:p-8 text-white">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    How We Evaluate AI Safety
                </h1>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto">
                    A transparent look at our framework for assessing AI provider safety
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                    <Button variant="secondary" className="gap-2" asChild>
                        <Link href="#framework-overview">
                            <InfoIcon className="h-4 w-4 mr-1.5" />
                            Quick Summary
                        </Link>
                    </Button>
                    <Button variant="secondary" className="gap-2" asChild>
                        <Link href="#data-transparency">
                            <AlertCircleIcon className="h-4 w-4 mr-1.5" />
                            Why This Matters
                        </Link>
                    </Button>
                </div>
            </header>

            {/* Visual Framework Overview */}
            <div id="framework-overview" className="mb-16 scroll-mt-20">
                <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">Our Safety Framework at a Glance</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    {pillars.map((pillar) => (
                        <div key={pillar.name} className="flex flex-col items-center">
                            <div className={`h-3 w-full ${pillar.color} rounded-t-lg`}></div>
                            <div className="p-4 border rounded-b-lg w-full text-center h-full">
                                <div className="text-2xl mb-2">{pillar.icon}</div>
                                <h3 className="font-bold mb-1">{pillar.name}</h3>
                                <p className="text-sm text-muted-foreground mb-3">{pillar.description}</p>
                                <div className="text-xs bg-muted p-2 rounded">
                                    <span className="font-semibold">Weight:</span> {pillar.weight}%
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* How Scoring Works */}
            <Card className="mb-12">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Understanding the Scores</CardTitle>
                    <CardDescription>We make complex safety metrics simple to understand</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Badge variant="secondary">1-10 Scale</Badge> Simple Scoring
                            </h3>
                            <p className="mb-4">
                                Each provider receives scores from 1-10 across five safety categories, plus an overall score. 
                                Higher numbers mean better safety practices.
                            </p>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>8.5 - Excellent</span>
                                        <span className="text-muted-foreground">Top Tier</span>
                                    </div>
                                    <Progress value={85} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>6.2 - Good</span>
                                        <span className="text-muted-foreground">Industry Standard</span>
                                    </div>
                                    <Progress value={62} className="h-2" />
                                </div>
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span>3.8 - Needs Work</span>
                                        <span className="text-muted-foreground">Higher Risk</span>
                                    </div>
                                    <Progress value={38} className="h-2" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                                <Badge variant="secondary">Behind the Numbers</Badge> How We Calculate
                            </h3>
                            <p className="mb-4">
                                We evaluate hundreds of data points across these categories, then normalize them to our simple 1-10 scale:
                            </p>
                            <ol className="list-decimal list-inside space-y-2 pl-2">
                                <li>Gather evidence from audits, tests, and public reports</li>
                                <li>Assess against our framework criteria</li>
                                <li>Convert to standardized metrics (0-100 scale)</li>
                                <li>Apply category weights</li>
                                <li>Present as easy-to-understand 1-10 scores</li>
                            </ol>
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                                <CodeBlock 
                                    language="json" 
                                    code={`{
  "Content Safety": 25%,
  "Bias & Fairness": 20%,
  "Privacy Protection": 20%,
  "System Security": 15%,
  "Ethical Practices": 20%
}`} 
                                />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <h2 className="text-xl sm:text-2xl font-bold mb-6 mt-12">How We Score Each Pillar</h2>

            <Accordion type="multiple" className="mb-12">
                {pillars.map((pillar) => (
                    <AccordionItem key={pillar.name} value={pillar.name}>
                        <AccordionTrigger className="text-lg font-semibold group hover:no-underline">
                            <div className="flex items-center gap-4">
                                <div className={`${pillar.color} text-white p-2 rounded-md`}>
                                    <span className="text-xl">{pillar.icon}</span>
                                </div>
                                <span className="group-hover:underline">{pillar.name}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-muted/30 rounded-lg">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-semibold mb-2">What We Measure</h4>
                                    <ul className="space-y-2 text-sm">
                                        {pillar.metrics.map((metric) => (
                                            <li key={metric} className="flex items-start gap-2">
                                                <span className="text-muted-foreground">✓</span>
                                                <span>{metric}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-2">Why It Matters</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        {pillar.name === "Content Safety" && "Prevents harmful outputs that could spread misinformation or cause harm."}
                                        {pillar.name === "Bias & Fairness" && "Ensures AI treats all users fairly regardless of gender, race, or background."}
                                        {pillar.name === "Privacy Protection" && "Protects your personal data from misuse or unauthorized access."}
                                        {pillar.name === "System Security" && "Keeps AI systems safe from hacking, misuse, or unexpected behaviors."}
                                        {pillar.name === "Ethical Practices" && "Promotes transparency about how AI systems work and make decisions."}
                                    </p>
                                    <div className="p-3 bg-muted rounded-lg">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Category Weight</span>
                                            <span className="font-semibold">{pillar.weight}% of total score</span>
                                        </div>
                                        <Progress value={pillar.weight} className="h-2" />
                                    </div>
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            {/* Common Compliance Standards Section */}
            <h2 className="text-xl sm:text-2xl font-bold mb-6 mt-12">Common Compliance Standards</h2>
            <div className="mb-12">
                <ComplianceStandardsDisplay />
            </div>

            {/* AI Safety Milestones Section */}
            <h2 className="text-xl sm:text-2xl font-bold mb-6 mt-12">AI Safety Milestones</h2>
            <div className="mb-12">
                <SafetyTimeline />
                <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                    A brief overview of significant events shaping the AI safety landscape. <br></br>
                    (This of course is not all of them.)
                </p>
            </div>

            {/* Data & Transparency Section */}
            <Card id="data-transparency" className="mb-12 scroll-mt-20">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl">Our Data & Methodology</CardTitle>
                    <CardDescription>Transparent about how we gather and evaluate information</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Where Our Data Comes From</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-100 p-2 rounded-full">
                                        <InfoIcon className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Official Documentation</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Model cards, system cards, and policy pages from providers
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-purple-100 p-2 rounded-full">
                                        <InfoIcon className="h-4 w-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Independent Audits</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Third-party security and bias assessments when available
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                        <InfoIcon className="h-4 w-4 text-green-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Public Testing</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Results from standardized safety benchmark tests
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Our Evaluation Principles</h3>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">Evidence-Based</h4>
                                    <p className="text-sm text-muted-foreground">
                                        We only score what we can verify through documentation or testing
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">Transparent</h4>
                                    <p className="text-sm text-muted-foreground">
                                        All scores link back to their source evidence for verification
                                    </p>
                                </div>
                                <div className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-2">Practical</h4>
                                    <p className="text-sm text-muted-foreground">
                                        We focus on safety factors that impact real-world usage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Limitations & Feedback */}
            <Card className="bg-card border-border">
                <CardHeader>
                    <CardTitle className="text-xl sm:text-2xl flex items-center gap-2 text-destructive">
                        <AlertCircleIcon className="h-5 w-5" />
                        Important Limitations
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Scores reflect the state at evaluation time - AI systems evolve rapidly</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>We can only evaluate what providers make public - internal practices may differ</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>No AI system is 100% safe - even high scores require careful use</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span>•</span>
                            <span>Our framework will evolve as AI safety standards mature</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-center text-sm text-muted-foreground py-6 border-t">
                <p>Last framework update: {generatedDate}</p>
            </div>
        </section>
    );
}