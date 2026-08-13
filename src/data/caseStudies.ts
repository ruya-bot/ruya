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
    id: "crewly",
    number: "02",
    name: "Crewly",
    title: "Intelligent Enterprise Workspace & ERP",
    label: "AI System & Product Experience",
    category: "AI Agents · Enterprise ERP · Workflow Intelligence",
    oneLiner: "Intelligent enterprise workspace designed around task management, project coordination, and AI-assisted workflow.",
    description:
      "Crewly is an intelligent enterprise workspace / company ERP designed around task management, project coordination, team collaboration, financial visibility, and AI-assisted workflow intelligence.",
    challenge: {
      headline: "Fragmented enterprise tools and manual operational coordination",
      description:
        "Modern teams struggle with disconnected software for tasks, project tracking, team operations, and financial visibility. Crewly unifies these workflows into an intelligent enterprise workspace where AI assists with coordination, automation, and decision-making.",
    },
    built: [
      {
        title: "Task & Project Intelligence",
        description:
          "Structured task management, dynamic sprint views, dependency tracking, and automated progress summaries.",
      },
      {
        title: "Financial & Resource Tracking",
        description:
          "Operational budgeting, project cost tracking, resource allocation, and financial analytics.",
      },
      {
        title: "AI Agent Assistance",
        description:
          "Autonomous workflow agents that reason over workspace data to surface bottlenecks, summarize updates, and execute routine actions.",
      },
      {
        title: "Team Collaboration Workspace",
        description:
          "Unified communication threads, document sharing, and automated team activity digests.",
      },
      {
        title: "Enterprise Architecture",
        description:
          "Role-based security controls, audit logs, real-time sync, and scalable API integrations.",
      },
    ],
    systemPipeline: [
      "Ingest",
      "Coordinate",
      "Automate",
      "Execute",
    ],
    technology: [
      "TypeScript",
      "React",
      "Node.js",
      "AI Agents",
      "PostgreSQL",
      "FastAPI",
      "Tailwind CSS",
    ],
    focus: [
      "Enterprise Intelligence",
      "AI Agents",
      "Workflow Automation",
      "Task Management",
    ],
    architecture: [
      {
        id: "input",
        label: "Workspace Ingest",
        sublabel: "Tasks, Events & Communications",
        description: "Streams user inputs, task state updates, and external webhooks into a unified bus.",
      },
      {
        id: "data",
        label: "Data Model",
        sublabel: "Normalized Operational Graph",
        description: "Stores projects, tasks, budgets, and user permissions in a relational database graph.",
      },
      {
        id: "processing",
        label: "Workflow Engine",
        sublabel: "State Machine & Triggers",
        description: "Evaluates task status transitions, SLA timers, and automated notification rules.",
      },
      {
        id: "ai",
        label: "AI Agent Network",
        sublabel: "Reasoning & Automation",
        description: "Runs LLM-backed agents to auto-summarize work, draft updates, and predict delays.",
      },
      {
        id: "backend",
        label: "Backend Services",
        sublabel: "Node.js + FastAPI Microservices",
        description: "Exposes low-latency GraphQL & REST APIs for real-time workspace synchronization.",
      },
      {
        id: "interface",
        label: "Enterprise Portal",
        sublabel: "Role-Based UI",
        description: "Renders task boards, financial dashboards, team feeds, and AI assistant sidebars.",
      },
      {
        id: "output",
        label: "Operational Output",
        sublabel: "Execution Signals",
        description: "Dispatches automated sprint reports, invoice syncs, and team alerts.",
      },
    ],
    currentState: "Active Product & AI System",
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
      "Observe",
      "Analyze",
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
