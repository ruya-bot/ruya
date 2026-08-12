export type SystemArchitectureNode = {
  id: string;
  label: string;
  sublabel: string;
  description: string;
};

export type CaseStudy = {
  id: string;
  number: string;
  name: string;
  title: string;
  label: string;
  category: string;
  description: string;
  oneLiner: string;
  challenge: {
    headline: string;
    description: string;
  };
  built: Array<{
    title: string;
    description: string;
  }>;
  systemPipeline: string[]; // e.g. ["Capture", "Process", "Understand", "Predict", "Decide"]
  technology: string[];
  focus: string[];
  architecture: SystemArchitectureNode[];
  currentState: string; // "Research Project", "AI Research & Engineering Project", "Product Concept & AI System"
  visual: string;
};
