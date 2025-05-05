// FILE: royce/app/methodology/page.tsx
// --------------------------------------------------------------------------------
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/ui/code-block"; // Assuming a simple CodeBlock component exists
import { Button } from "@/components/ui/button";
export default function MethodologyPage() {

    // Placeholder - In a real app, this might come from a build process or config
    const generatedDate = "May 4, 2025"; // Example date

    return (
        <section className="container mx-auto max-w-4xl py-10 lg:py-16 px-4">
            <header className="mb-10 text-center">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
                    Methodology & Scoring Framework
                </h1>
                <p className="text-lg text-muted-foreground">
                    Understanding how AI provider safety is evaluated on this dashboard.
                </p>
            </header>

            <div className="space-y-8">

                {/* Introduction Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Phase 1 Safety Definition Framework</CardTitle>
                    </CardHeader>
                    <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                        <p>
                            This dashboard utilizes the <strong>Phase 1 Safety Definition Framework</strong> to evaluate AI providers. The framework defines five key safety pillars – Content, Bias, Privacy, Security, and Ethics – along with specific sub-metrics for each.
                        </p>
                        <p>
                            Each sub-metric includes a Key Performance Indicator (KPI) definition (numeric or boolean), the preferred type of evidence sought to assess it, and a normalization formula used internally to convert its value to a <strong>0–100 scale</strong>. These normalized scores are then averaged (or weighted, if applicable) to produce pillar scores, which are subsequently weighted to calculate an overall provider score.
                        </p>
                         <p>
                            The scores displayed throughout the dashboard (pillar and overall) are presented on a <strong>0–10 scale</strong> (derived by dividing the internal 0-100 score by 10) for easier interpretation. The goal is to quantitatively evaluate safety across these pillars in a consistent, evidence-driven way.
                         </p>
                    </CardContent>
                </Card>

                {/* Pillars Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>The Five Safety Pillars</CardTitle>
                        <CardDescription>Definitions and key sub-metrics measured within each pillar.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Content Pillar */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Badge variant="outline">Content</Badge> Pillar
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3">
                                Focuses on preventing harmful or disallowed content (e.g. toxic, explicit, violent) and ensuring adherence to content guidelines for a safer user experience. Key sub-metrics include:
                            </p>
                            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li><strong>Toxicity False Positive Rate (FPR):</strong> Proportion of safe content incorrectly flagged. Lower is better (Target: ↓). Normalization: `(1 - FPR) * 100`.</li>
                                <li><strong>Toxicity False Negative Rate (FNR):</strong> Proportion of unsafe content missed. Lower is better (Target: ↓). Normalization: `(1 - FNR) * 100`.</li>
                                <li><strong>Content Compliance Rate:</strong> Percentage of outputs adhering to guidelines. Higher is better (Target: ↑). Normalization: `Compliance Rate * 100`.</li>
                            </ul>
                        </div>

                         {/* Bias Pillar */}
                        <div>
                             <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Badge variant="outline">Bias</Badge> Pillar
                             </h3>
                             <p className="text-sm text-muted-foreground mb-3">
                                Addresses fairness and non-discrimination, ensuring equitable performance and outputs across demographic groups, avoiding societal biases. Key sub-metrics include:
                             </p>
                            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li><strong>Gender Performance Parity:</strong> Difference in performance metrics between genders. Smaller gap is better (Target: ↓). Normalization: `(1 - |Δ_metric|) * 100`.</li>
                                <li><strong>Racial Performance Parity:</strong> Difference in outcomes between racial/ethnic groups. Smaller gap is better (Target: ↓). Normalization: `(1 - |Δ_metric|) * 100`.</li>
                                <li><strong>Biased Content Incidence:</strong> Rate of outputs containing biased/derogatory language. Lower rate is better (Target: ↓). Normalization: `(1 - Incidence Rate) * 100`.</li>
                             </ul>
                        </div>

                         {/* Privacy Pillar */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Badge variant="outline">Privacy</Badge> Pillar
                            </h3>
                             <p className="text-sm text-muted-foreground mb-3">
                                Focuses on protecting personal data, ensuring compliance (e.g., GDPR), and preventing unauthorized disclosure. Key sub-metrics include:
                             </p>
                             <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li><strong>Privacy Compliance Certification:</strong> Presence of official compliance (GDPR, ISO 27701). Target: ↑ (Boolean: 100 if present, 0 if not).</li>
                                <li><strong>Personal Data Leak Incidents:</strong> Number of recorded data exposure incidents. Lower is better (Target: ↓). Normalization: Inverse scale (e.g., `max(0, (1 - incidents/N)*100)`).</li>
                                <li><strong>Data Encryption Coverage:</strong> Percentage of sensitive data encrypted (at rest & transit). Higher is better (Target: ↑). Normalization: `% Encrypted * 100`.</li>
                             </ul>
                        </div>

                         {/* Security Pillar */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Badge variant="outline">Security</Badge> Pillar
                            </h3>
                             <p className="text-sm text-muted-foreground mb-3">
                                Ensures robustness against unauthorized access, vulnerabilities, and external threats, protecting system integrity. Key sub-metrics include:
                             </p>
                            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li><strong>Known Vulnerabilities Count:</strong> Number of open security vulnerabilities. Lower is better (Target: ↓). Normalization: Inverse scale (e.g., `max(0, (1 - count/T)*100)`).</li>
                                <li><strong>Security Certification:</strong> Presence of security audit pass (ISO 27001, SOC 2). Target: ↑ (Boolean: 100 if present, 0 if not).</li>
                                <li><strong>Security Incident Frequency:</strong> Number of security breaches or critical failures. Lower is better (Target: ↓). Normalization: Inverse scale (e.g., `max(0, (1 - incidents/M)*100)`).</li>
                             </ul>
                        </div>

                         {/* Ethics Pillar */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                <Badge variant="outline">Ethics</Badge> Pillar
                            </h3>
                             <p className="text-sm text-muted-foreground mb-3">
                                Covers broader responsible AI principles like transparency, accountability, and adherence to ethical guidelines and governance. Key sub-metrics include:
                             </p>
                            <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                                <li><strong>Transparency (Explainability) Score:</strong> Degree to which system decisions are explainable. Higher is better (Target: ↑). Normalization: E.g., `% Explainable * 100`.</li>
                                <li><strong>Human Oversight Rate:</strong> Proportion of critical outputs reviewed by humans. Higher is better (Target: ↑). Normalization: `% Reviewed * 100`.</li>
                                <li><strong>Ethical Compliance:</strong> Adherence to ethical guidelines/reviews. Target: ↑ (Boolean: 100 if met, 0 if not).</li>
                                <li><strong>Accountability Mechanisms:</strong> Existence of audit logs, appeal processes. Target: ↑ (Boolean: 100 if present, 0 if not).</li>
                             </ul>
                        </div>
                    </CardContent>
                </Card>

                 {/* Scoring & Weighting Card */}
                <Card>
                     <CardHeader>
                         <CardTitle>Scoring and Weighting</CardTitle>
                     </CardHeader>
                     <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4">
                        <p>
                            Each sub-metric's KPI is normalized to a 0-100 score based on its specific formula and target direction (whether higher or lower values are better).
                        </p>
                        <p>
                            A pillar's score (displayed 0-10) is typically calculated as the average of its normalized sub-metric scores (0-100), subsequently divided by 10. *Note: Specific weighting between sub-metrics within a pillar might be applied in future framework versions.*
                        </p>
                        <div>
                             <p>The overall provider score (0-10) is a weighted average of the five pillar scores (0-10). The default weights used in this dashboard are:</p>
                             {/* Assuming a simple CodeBlock component exists for syntax highlighting */}
                             <CodeBlock language="json" code={`{\n  "Content": 25,\n  "Bias": 20,\n  "Privacy": 20,\n  "Security": 15,\n  "Ethics": 20\n}`} />
                             <p className="text-xs italic mt-1">This configuration implies Content safety is weighted highest, while Security has a slightly lower weight in the overall calculation.</p>
                         </div>
                     </CardContent>
                </Card>

                 {/* Data & Limitations Card */}
                <Card>
                     <CardHeader>
                         <CardTitle>Data Sources, Evidence & Limitations</CardTitle>
                     </CardHeader>
                     <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-4">
                         <p>
                             The evaluations rely on evidence gathered from publicly available sources, including provider documentation (model cards, system cards, policy pages, blog posts), technical reports, third-party security audits (where available), and reputable news articles. Specific evidence items are linked or cited within the detailed provider views.
                         </p>
                         {/* Optional: Explain Evidence Tiers if used consistently */}
                         {/* <p>Evidence is categorized by tiers (e.g., Tier 1: Official Reports, Tier 2: Audits/News, Tier 3: Community) to indicate source reliability.</p> */}
                         <p>
                            <strong>Data Freshness:</strong> The data presented reflects information available up to the compilation date noted below. AI models and provider policies evolve rapidly.
                         </p>
                         <p className="font-semibold">Limitations:</p>
                         <ul className="list-disc list-inside">
                            <li><strong>Snapshot in Time:</strong> Scores reflect the state at the time of evaluation and may not capture the very latest updates.</li>
                            <li><strong>Reliance on Public Data:</strong> Evaluations are limited by the transparency of providers. Internal practices may differ from public disclosures.</li>
                            <li><strong>Interpretation:</strong> Assessing evidence and assigning scores involves some degree of interpretation based on the framework.</li>
                            <li><strong>Framework Evolution:</strong> This is Phase 1 of the framework; sub-metrics and weighting may be refined in future updates.</li>
                        </ul>
                     </CardContent>
                 </Card>

                 {/* Feedback Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>Feedback & Corrections</CardTitle>
                    </CardHeader>
                     <CardContent className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
                        <p>
                            We strive for accuracy, but the landscape changes quickly. If you notice inaccuracies or have updated information, please help us improve the dashboard.
                        </p>
                        {/* Replace with actual link/contact */}
                        <Button asChild variant="link" className="p-0 h-auto">
                            <a href="mailto:feedback@example.com?subject=AI%20Safety%20Dashboard%20Feedback" target="_blank" rel="noopener noreferrer">Report an Issue or Provide Feedback</a>
                        </Button>
                     </CardContent>
                </Card>

                {/* Footer Info */}
                <div className="text-center text-xs text-muted-foreground pt-4">
                    Framework compiled and data generated on: {generatedDate}.
                </div>

            </div>
        </section>
    );
}


// You would need a simple CodeBlock component like this (or use a library):
// components/ui/code-block.tsx
/*
import React from 'react';
import { cn } from '@/lib/utils';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export const CodeBlock = ({ code, language = 'json', className }: CodeBlockProps) => {
  return (
    <pre className={cn("p-4 rounded-md bg-muted text-muted-foreground overflow-x-auto text-xs", className)}>
      <code className={`language-${language}`}>
        {code}
      </code>
    </pre>
  );
};
*/