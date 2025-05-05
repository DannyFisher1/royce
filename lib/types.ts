export interface EvidenceItem {
    type: string;
    source: string;
    value: string;
    score: number;
    url?: string;
    title?: string;
    publish_date?: string;
    tier?: string;
    quote?: string;
    justification?: string;
  }
  
  export interface SubmetricDetail {
    name: string;
    kpi?: string;
    value?: string;
    evidence_type?: string;
    normalization?: string;
    target?: string;
    analysis?: string;
    evidence: EvidenceItem[];
  }
  
  export interface PillarDetail {
    score: number;
    weight?: number;
    submetrics: SubmetricDetail[];
    analysis?: string;
  }
  
  export interface ProviderEvidence {
    name: string;
    slug: string;
    model: string;
    tier: string;
    pillars: {
      [pillarName: string]: PillarDetail;
    };
    compliance_badges: string[];
    analysis_summary: string;
  }
  
  export interface PillarScores {
    Content: number;
    Bias: number;
    Privacy: number;
    Security: number;
    Ethics: number;
  }
  
  export interface ProviderSummary {
    name: string;
    slug: string;
    logo: string;
    tier: string;
    certifications: string[];
    pillars: PillarScores;
    overall_score: number;
    summary: string;
  }
  
  export type ProviderSummaryList = ProviderSummary[];
  