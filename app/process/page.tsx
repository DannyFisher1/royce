// FILE: royce/app/process/page.tsx
// --------------------------------------------------------------------------------
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CodeBlockWithHighlighting as CodeBlock } from "@/components/ui/code-block";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ChevronRight, Check, X, Gauge, Shield, Scale, Lock, Eye, FileText, ExternalLink } from "lucide-react";


// Helper components
const WorkflowStep = ({ stepNum, title, children }: { stepNum: number, title: string, children: React.ReactNode }) => (
  <div className="relative pl-9 py-4 group">
    <div className="absolute left-0 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold ring-2 ring-background group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
      {stepNum}
    </div>
    <h3 className="font-semibold text-base mb-1.5 flex items-center gap-2">
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
      {title}
    </h3>
    <div className="text-sm text-muted-foreground pl-2 prose prose-sm dark:prose-invert max-w-none">
      {children}
    </div>
    <ArrowDown className="absolute left-[11px] -bottom-4 h-4 w-4 text-border group-last:hidden" />
  </div>
);

interface MetricPillProps {
  name: string;
  value: string;
  source: string;
  link: string;
  tier: string;
  type: string;
}

const MetricPill = ({ name, value, source, link, tier, type }: MetricPillProps) => (
  <div className="p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
    <div className="flex justify-between items-start gap-2">
      <div>
        <h4 className="font-medium text-sm flex items-center gap-1.5">
          {name}
          <Badge variant="outline" className="text-[10px] px-1.5 py-0 h-5">
            {tier}
          </Badge>
        </h4>
        <p className="text-muted-foreground text-xs mt-1">{source}</p>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-sm bg-background px-2 py-0.5 rounded">
          {value}
        </span>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  </div>
);

const MetricTypeIcon = ({ type }: { type: string }) => {
  const iconMap: Record<string, React.ComponentType<any>> = {
    percentage: Gauge,
    boolean: type === 'certification' ? Shield : Check,
    certification: Shield,
    score: Scale,
    count: Eye,
    ratio: Lock,
    bytes: () => <span className="text-xs">KB</span>
  };

  const Icon = iconMap[type] || FileText;
  return <Icon className="h-4 w-4 text-muted-foreground" />;
};

// Helper component for the metric example blocks
const MetricExampleBlock = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mt-6 mb-4">
        <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
             <Badge variant="secondary" className="font-mono text-xs uppercase tracking-wider">{title}</Badge> Pillar Examples
         </h3>
        <div className="pl-4 border-l-2 border-muted-foreground/30 space-y-2 text-sm">
            {children}
        </div>
    </div>
);

// Helper for individual metric lines
const MetricLine = ({ metric, value, source, link, tier }: { metric: string, value: string, source: string, link: string, tier: string }) => (
    <p className="leading-relaxed">
        <span className="font-medium text-foreground">{metric}:</span> <strong className="text-primary font-semibold">{value}</strong> — <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">{source}</a> <Badge variant="outline" className="text-[10px] px-1.5 py-0.5 ml-1 align-middle font-mono">{tier}</Badge>
    </p>
);

export default function ProcessPage() {
  const metrics = {
    content: [
      { name: "Toxicity False-Positive Rate", value: "1.8%", source: "GPT-4o System Card", link: "https://openai.com/index/gpt-4o-system-card/", tier: "Tier 1", type: "percentage" },
      { name: "Harmful Content Avoidance", value: "96%", source: "Holistic AI Audit", link: "https://www.gov.uk/government/publications/ai-safety-institute-approach-to-evaluations/ai-safety-institute-approach-to-evaluations", tier: "Tier 2", type: "percentage" },
      { name: "Misinformation Recall", value: "94%", source: "AISI Report", link: "https://www.gov.uk/government/publications/ai-safety-institute-approach-to-evaluations/ai-safety-institute-approach-to-evaluations", tier: "Tier 2", type: "percentage" },
      { name: "NSFW Detection Recall", value: "98%", source: "LAION Benchmark", link: "https://ar5iv.labs.arxiv.org/html/2210.08402", tier: "Tier 3", type: "percentage" }
    ],
    bias: [
      { name: "Gender Parity Gap", value: "0.02", source: "ACL 2024 Paper", link: "https://aclanthology.org/2024.acl-long.846.pdf", tier: "Tier 3", type: "score" },
      { name: "Hate-Speech FP Rate", value: "0.5%", source: "Holistic AI Audit", link: "https://www.holisticai.com/blog/introducing-holisticai-open-source-library-responsible-ai", tier: "Tier 2", type: "percentage" },
      { name: "Constitutional Principles", value: "Yes", source: "Model Card", link: "https://openai.com/index/gpt-4o-system-card/", tier: "Tier 1", type: "boolean" }
    ],
    privacy: [
      { name: "Training Data Privacy", value: "Yes", source: "Privacy Policy", link: "https://openai.com/index/gpt-4o-system-card/", tier: "Tier 1", type: "boolean" },
      { name: "SOC 2 Type II", value: "Certified", source: "AICPA Attestation", link: "https://openai.com/security-and-privacy/", tier: "Tier 2", type: "certification" },
      { name: "GDPR Compliance", value: "Yes", source: "DPA", link: "https://openai.com/security-and-privacy/", tier: "Tier 1", type: "boolean" }
    ],
    security: [
      { name: "Jailbreak Resistance", value: "95%", source: "Red-Team Report", link: "https://openreview.net/forum?id=asR9FVd4eL", tier: "Tier 2", type: "percentage" },
      { name: "Bug Bounty Program", value: "Yes", source: "Security Page", link: "https://openai.com/index/bug-bounty-program/", tier: "Tier 1", type: "boolean" }
    ],
    ethics: [
      { name: "Transparency Docs", value: "Yes", source: "System Card", link: "https://openai.com/index/gpt-4o-system-card/", tier: "Tier 1", type: "boolean" },
      { name: "External Oversight", value: "Yes", source: "AISI Report", link: "https://www.gov.uk/government/publications/ai-safety-institute-approach-to-evaluations/ai-safety-institute-approach-to-evaluations", tier: "Tier 2", type: "boolean" }
    ]
  };

  return (
    <section className="container mx-auto max-w-6xl py-8 lg:py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-3">
          Safety Evaluation Process
        </h1>
        <p className="text-lg text-muted-foreground">
          Transparent methodology for AI provider assessments
        </p>
        <Badge variant="secondary" className="mt-2">
          v2.1 • May 2025
        </Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-8">
        {/* Workflow Steps */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Badge variant="secondary">10-Step</Badge>
                Scoring Workflow
              </CardTitle>
              <CardDescription>Our evidence-based evaluation process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-0">
              <WorkflowStep stepNum={1} title="Provider Selection">
                Identify target providers and models (≤ May 2025 cutoff)
              </WorkflowStep>
              <WorkflowStep stepNum={2} title="Evidence Collection">
                Crawl official docs, academic papers, audit reports, and compliance filings
              </WorkflowStep>
              <WorkflowStep stepNum={3} title="Source Reliability Tagging">
                Classify evidence as Tier 1-5 based on provenance and credibility
              </WorkflowStep>
              <WorkflowStep stepNum={4} title="Metric Extraction">
                Parse for KPIs using regex patterns and manual review
              </WorkflowStep>
              <WorkflowStep stepNum={5} title="Normalization">
                Apply mathematical transforms to 0-100 scale based on metric type
              </WorkflowStep>
              <WorkflowStep stepNum={6} title="Sub-metric Scoring">
                Store with evidence references or mark as unknown
              </WorkflowStep>
              <WorkflowStep stepNum={7} title="Pillar Aggregation">
                Calculate pillar scores as averages of normalized sub-metrics
              </WorkflowStep>
              <WorkflowStep stepNum={8} title="Quality Assurance">
                Require ≥8 Tier 1/2 sources before finalizing
              </WorkflowStep>
              <WorkflowStep stepNum={9} title="Weighted Scoring">
                Compute overall score using pillar weights
              </WorkflowStep>
              <WorkflowStep stepNum={10} title="Documentation">
                Generate evidence logs for each provider
              </WorkflowStep>
            </CardContent>
          </Card>

          <Card className="bg-background">
            <CardHeader>
              <CardTitle className="text-foreground">Example: GPT-4o Scoring Walkthrough</CardTitle>
              <CardDescription className="text-muted-foreground">Illustrative normalization process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Table */}
              <div className="overflow-x-auto rounded-lg border bg-card">
                <table className="w-full">
                  <thead className="[&_tr]:border-b">
                    <tr className="bg-muted/50 hover:bg-muted">
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Metric</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Raw</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Type</th>
                      <th className="p-3 text-left text-sm font-medium text-muted-foreground">Normalized</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-3 text-sm font-medium text-foreground">Toxicity FP Rate</td>
                      <td className="p-3 font-mono text-sm">1.8%</td>
                      <td className="p-3 text-sm text-muted-foreground">Ratio ↓</td>
                      <td className="p-3 font-mono text-sm text-primary">64</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-3 text-sm font-medium text-foreground">Misinfo Recall</td>
                      <td className="p-3 font-mono text-sm">94%</td>
                      <td className="p-3 text-sm text-muted-foreground">Ratio ↑</td>
                      <td className="p-3 font-mono text-sm text-primary">100</td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-3 text-sm font-medium text-foreground">SOC 2 Type II</td>
                      <td className="p-3 font-mono text-sm">Yes</td>
                      <td className="p-3 text-sm text-muted-foreground">Boolean</td>
                      <td className="p-3 font-mono text-sm text-primary">100</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Score Cards */}
              <div className="grid grid-cols-5 gap-2">
                {[
                  { label: "Content", value: "8.8" },
                  { label: "Bias", value: "8.2" },
                  { label: "Privacy", value: "10.0" },
                  { label: "Security", value: "9.8" },
                  { label: "Ethics", value: "10.0" }
                ].map((item) => (
                  <div 
                    key={item.label}
                    className="rounded-lg border bg-card p-3 text-center transition-colors hover:bg-muted/50"
                  >
                    <div className="text-xs text-muted-foreground">{item.label}</div>
                    <div className="font-bold text-foreground">{item.value}</div>
                  </div>
                ))}
              </div>

              {/* Calculation */}
              <div className="rounded-lg border bg-muted/30 p-4">
                <div className="rounded-md bg-muted/50 p-3 font-mono text-sm">
                  Overall = 0.25(88) + 0.20(82) + 0.20(100) + 0.15(98) + 0.20(100) = 93.1
                </div>
                <div className="mt-3 text-center text-lg font-bold text-primary">
                  Final Score: 9.3 / 10
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Metrics Catalogue */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Source Reliability Tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <div className="bg-muted p-2 rounded-full">
                  <Check className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">Tier 1</h4>
                  <p className="text-xs text-muted-foreground">Official provider documentation</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <div className="bg-muted p-2 rounded-full">
                  <FileText className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">Tier 2</h4>
                  <p className="text-xs text-muted-foreground">Independent audits & government reports</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                <div className="bg-muted p-2 rounded-full">
                  <Eye className="h-4 w-4 text-foreground" />
                </div>
                <div>
                  <h4 className="font-medium">Tier 3</h4>
                  <p className="text-xs text-muted-foreground">Peer-reviewed research</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="space-y-1">
                <CardTitle className="text-xl flex items-center gap-2">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    OpenAI's GPT-4o
                </span>
                <Badge variant="outline" className="text-xs">Example Analysis</Badge>
                </CardTitle>
                <CardDescription className="text-sm">
                Illustrative metrics with source references (mock values for demonstration)
                </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
                {/* Content Metrics */}
                <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <h3 className="font-semibold text-sm text-foreground">Content Safety</h3>
                </div>
                <div className="p-3 space-y-3">
                    <MetricLine 
                    metric="Toxicity false-positive rate" 
                    value="1.8%" 
                    source="GPT-4o System Card" 
                    link={metrics.content[0].link}
                    tier="Tier 1" 
                    />
                    <MetricLine 
                    metric="Misinformation recall" 
                    value="94%" 
                    source={metrics.content[2].source}
                    link={metrics.content[2].link}
                    tier="Tier 2" 
                    />
                    <MetricLine 
                    metric="NSFW recall" 
                    value="96%" 
                    source="LAION Benchmark" 
                    link={metrics.content[3].link}
                    tier="Tier 3" 
                    />
                </div>
                </div>

                {/* Bias Metrics */}
                <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <h3 className="font-semibold text-sm text-foreground">Bias & Fairness</h3>
                </div>
                <div className="p-3 space-y-3">
                    <MetricLine 
                    metric="BERTScore parity gap" 
                    value="0.02" 
                    source="ACL 2024 Paper" 
                    link={metrics.bias[0].link}
                    tier="Tier 3" 
                    />
                    <MetricLine 
                    metric="Hate-speech FP rate" 
                    value="0.5%" 
                    source="Holistic AI Audit" 
                    link={metrics.bias[1].link}
                    tier="Tier 2" 
                    />
                </div>
                </div>

                {/* Privacy Metrics */}
                <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <h3 className="font-semibold text-sm text-foreground">Privacy Protection</h3>
                </div>
                <div className="p-3 space-y-3">
                    <MetricLine 
                    metric="No user-data in training" 
                    value="Yes" 
                    source="Privacy Policy" 
                    link={metrics.privacy[0].link}
                    tier="Tier 1" 
                    />
                    <MetricLine 
                    metric="SOC 2 Type II" 
                    value="Certified" 
                    source="AICPA Attestation" 
                    link={metrics.privacy[1].link}
                    tier="Tier 2" 
                    />
                </div>
                </div>

                {/* Security Metrics */}
                <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <h3 className="font-semibold text-sm text-foreground">System Security</h3>
                </div>
                <div className="p-3 space-y-3">
                    <MetricLine 
                    metric="Jailbreak block-rate" 
                    value="95%" 
                    source="Red-Team Audit" 
                    link={metrics.security[0].link}
                    tier="Tier 2" 
                    />
                    <MetricLine 
                    metric="Bug Bounty Program" 
                    value="Active" 
                    source="Security Page" 
                    link={metrics.security[1].link}
                    tier="Tier 1" 
                    />
                </div>
                </div>

                {/* Ethics Metrics */}
                <div className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-3 border-b flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                    <h3 className="font-semibold text-sm text-foreground">Ethical Practices</h3>
                </div>
                <div className="p-3 space-y-3">
                    <MetricLine 
                    metric="Transparency docs" 
                    value="Published" 
                    source="System Card" 
                    link={metrics.ethics[0].link}
                    tier="Tier 1" 
                    />
                    <MetricLine 
                    metric="External oversight" 
                    value="Yes" 
                    source="AISI Report" 
                    link={metrics.ethics[1].link}
                    tier="Tier 2" 
                    />
                </div>
                </div>
            </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}