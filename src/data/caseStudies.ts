import type { CaseStudy } from "@/types/caseStudy";
import bgWork1 from "@/assets/bg-work-1.jpg";
import bgWork2 from "@/assets/bg-work-2.jpg";
import vision from "@/assets/vision.jpg";

export const caseStudies: CaseStudy[] = [
  {
    id: "gridpulse",
    number: "01",
    name: "GridPulse",
    title: "AI Traffic Intelligence for Smarter Mobility",
    label: "Research & Engineering Project",
    category: "Computer Vision · Traffic Intelligence · Predictive AI",
    oneLiner: "Transforming visual traffic streams into real-time congestion intelligence and decision support.",
    description:
      "GridPulse is an AI-powered traffic intelligence platform designed to transform visual traffic data into actionable transportation insights. The system combines automated data collection, computer vision, congestion analysis, predictive intelligence, and decision-support interfaces to understand how traffic conditions evolve over time.",
    challenge: {
      headline: "Fragmented observation vs. continuous real-time analysis",
      description:
        "Traffic conditions change continuously, but traditional traffic analysis often depends on fragmented data and manual observation. GridPulse explores how AI can continuously capture, interpret, and transform traffic conditions into structured intelligence.",
    },
    built: [
      {
        title: "Automated Traffic Capture",
        description:
          "A data collection system designed to continuously capture traffic conditions and create a time-series dataset.",
      },
      {
        title: "Computer Vision Pipeline",
        description:
          "Visual traffic conditions are analyzed using object detection and density metrics to identify congestion patterns.",
      },
      {
        title: "Congestion Intelligence",
        description:
          "Traffic conditions are converted into structured congestion scores that can be analyzed historically.",
      },
      {
        title: "Predictive Intelligence",
        description:
          "Historical traffic patterns can be used to explore future congestion and transportation trends.",
      },
      {
        title: "Decision Support",
        description:
          "The resulting intelligence is presented through an interactive dashboard designed to support operational decision-making.",
      },
    ],
    systemPipeline: [
      "Capture",
      "Process",
      "Understand",
      "Predict",
      "Decide",
    ],
    technology: [
      "Python",
      "OpenCV",
      "Computer Vision",
      "React",
      "FastAPI",
      "Machine Learning",
      "Data Pipelines",
      "Google Cloud",
    ],
    focus: [
      "Computer Vision",
      "Traffic Intelligence",
      "Predictive AI",
      "Autonomous Data Collection",
    ],
    architecture: [
      {
        id: "input",
        label: "Input Streams",
        sublabel: "Video & Satellite Feed",
        description: "Continuous frame ingestion from satellite feeds and CCTV streams.",
      },
      {
        id: "data",
        label: "Data Ingestion",
        sublabel: "Time-Series Pipeline",
        description: "Normalizes frame rates and builds temporal time-series buffers.",
      },
      {
        id: "processing",
        label: "Computer Vision",
        sublabel: "YOLO + Optical Flow",
        description: "Performs vehicle detection, density mapping, and velocity tracking.",
      },
      {
        id: "ai",
        label: "AI Layer",
        sublabel: "Congestion Scorer",
        description: "Computes spatio-temporal congestion indexes and anomaly alerts.",
      },
      {
        id: "backend",
        label: "Backend Service",
        sublabel: "FastAPI + TimescaleDB",
        description: "Exposes low-latency REST endpoints for real-time querying.",
      },
      {
        id: "interface",
        label: "Product Interface",
        sublabel: "Interactive Dashboard",
        description: "Renders heatmaps, trend forecasts, and routing decision support.",
      },
      {
        id: "output",
        label: "Intelligence Output",
        sublabel: "Decision Signals",
        description: "Dispatches automated signals to municipal traffic control networks.",
      },
    ],
    currentState: "Research & Engineering Project",
    visual: bgWork1,
  },
  {
    id: "deeptrace",
    number: "02",
    name: "DeepTrace",
    title: "Multimodal AI for Deepfake Detection",
    label: "AI Research & Engineering Project",
    category: "Audio AI · Deep Learning · Computer Vision",
    oneLiner: "Identifying synthetic audio and manipulated video streams through multimodal neural pipelines.",
    description:
      "DeepTrace is a multimodal deepfake detection system exploring how artificial intelligence can identify manipulated audio and video. The system combines specialized deep learning pipelines for audio and visual analysis into a unified detection platform.",
    challenge: {
      headline: "Increasingly convincing synthetic media requiring cross-modal verification",
      description:
        "Synthetic media is becoming increasingly convincing. Detecting manipulated content requires systems capable of analyzing signals that are difficult to identify through conventional methods. DeepTrace explores a multimodal approach — examining both what is seen and what is heard.",
    },
    built: [
      {
        title: "Audio Intelligence",
        description:
          "Audio is transformed into Mel-spectrogram representations and analyzed using custom convolutional neural networks.",
      },
      {
        title: "Video Intelligence",
        description:
          "Video sequences are analyzed using deep visual features combined with temporal modeling.",
      },
      {
        title: "Multimodal Architecture",
        description:
          "Independent audio and video intelligence pipelines allow different forms of synthetic manipulation to be analyzed.",
      },
      {
        title: "Inference API",
        description:
          "A FastAPI backend connects trained models to the product interface.",
      },
      {
        title: "Research Pipeline",
        description:
          "Large-scale dataset preprocessing, normalization, balancing, training, evaluation, and model experimentation form the foundation of the system.",
      },
    ],
    systemPipeline: [
      "Media",
      "Feature Extraction",
      "Deep Learning",
      "Classification",
      "Intelligence",
    ],
    technology: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "Librosa",
      "CNN",
      "BiLSTM",
      "FastAPI",
      "React",
      "Google Cloud",
    ],
    focus: [
      "Computer Vision",
      "Audio AI",
      "Deep Learning",
      "Multimodal Intelligence",
    ],
    architecture: [
      {
        id: "input",
        label: "Media Upload",
        sublabel: "Video / Audio File",
        description: "Demuxes combined video streams into separate audio & video channels.",
      },
      {
        id: "data",
        label: "Feature Extraction",
        sublabel: "Spectrogram & Frames",
        description: "Generates Mel-spectrograms and extracts facial landmark frame sequences.",
      },
      {
        id: "processing",
        label: "Audio & Visual Models",
        sublabel: "CNN-BiLSTM Pipeline",
        description: "Runs parallel deep spatial-temporal feature classification models.",
      },
      {
        id: "ai",
        label: "Multimodal Fusion",
        sublabel: "Cross-Attention Engine",
        description: "Fuses audio-visual embeddings to calculate authenticity probabilities.",
      },
      {
        id: "backend",
        label: "Inference Server",
        sublabel: "FastAPI + PyTorch",
        description: "Executes batch GPU inference with low-latency confidence scoring.",
      },
      {
        id: "interface",
        label: "Analysis Console",
        sublabel: "Report & Heatmap UI",
        description: "Displays frame-by-frame forgery timelines and audio frequency anomalies.",
      },
      {
        id: "output",
        label: "Verification Signal",
        sublabel: "Authenticity Score",
        description: "Produces tamper certification metadata and forensic reports.",
      },
    ],
    currentState: "AI Research & Engineering Project",
    visual: bgWork2,
  },
  {
    id: "freshness-passport",
    number: "03",
    name: "Freshness Passport",
    title: "AI-Powered Food Freshness Intelligence",
    label: "Product Concept & AI System",
    category: "Computer Vision · Sustainability · Retail AI",
    oneLiner: "Connecting visual product inspection, digital passports, and predictive waste management for retail.",
    description:
      "Freshness Passport explores how artificial intelligence can help retailers understand food freshness, reduce waste, and make better inventory decisions. The concept connects product intelligence, visual analysis, freshness information, and digital tracking into a unified experience.",
    challenge: {
      headline: "Retail inventory waste due to static expiration assumptions",
      description:
        "Food waste is not simply a consumer problem. Retailers need better ways to understand product freshness, monitor inventory, identify potential waste, and communicate product information throughout the supply chain.",
    },
    built: [
      {
        title: "Freshness Intelligence",
        description:
          "AI-assisted analysis designed to help estimate and communicate freshness-related information.",
      },
      {
        title: "Digital Product Identity",
        description:
          "A digital passport concept that connects a product with its freshness and lifecycle information.",
      },
      {
        title: "Visual Intelligence",
        description:
          "Computer vision can assist with identifying visible freshness indicators and product conditions.",
      },
      {
        title: "Waste Reduction",
        description:
          "The system is designed around earlier identification of products approaching the end of their useful lifecycle.",
      },
      {
        title: "Retail Intelligence",
        description:
          "Freshness data can become an operational signal for inventory decisions, prioritization, and waste management.",
      },
    ],
    systemPipeline: [
      "Product",
      "Observe",
      "Analyze",
      "Predict",
      "Act",
    ],
    technology: [
      "AI",
      "Computer Vision",
      "Predictive Analytics",
      "Product Intelligence",
      "Digital Identity",
      "Data Analytics",
    ],
    focus: [
      "Computer Vision",
      "Sustainability",
      "Retail Intelligence",
      "Predictive AI",
    ],
    architecture: [
      {
        id: "input",
        label: "Product Inspection",
        sublabel: "Camera / Scanner Feed",
        description: "Captures optical RGB and hyperspectral images of perishables.",
      },
      {
        id: "data",
        label: "Digital Passport Ingest",
        sublabel: "Batch & Origin Data",
        description: "Links visual data with harvest timestamps and logistics history.",
      },
      {
        id: "processing",
        label: "Visual Intelligence",
        sublabel: "Feature Classification",
        description: "Detects discoloration, skin texture degradation, and structural softness.",
      },
      {
        id: "ai",
        label: "Freshness Estimator",
        sublabel: "Predictive Model",
        description: "Calculates remaining shelf-life days and degradation trajectories.",
      },
      {
        id: "backend",
        label: "Retail Integration API",
        sublabel: "Inventory Synchronization",
        description: "Transmits real-time shelf-life updates to ERP and point-of-sale systems.",
      },
      {
        id: "interface",
        label: "Staff & Customer UI",
        sublabel: "Digital Passport Portal",
        description: "Shows dynamic pricing recommendations and freshness badges.",
      },
      {
        id: "output",
        label: "Waste Action Signal",
        sublabel: "Inventory Priority",
        description: "Triggers automated markdowns and redistribution routing before spoilage.",
      },
    ],
    currentState: "Product Concept & AI System",
    visual: vision,
  },
];
