import { motion } from "framer-motion";
import { StudioThesis } from "./StudioThesis";
import { Capabilities } from "./Capabilities";
import { Process } from "./Process";
import { SelectedWork } from "./SelectedWork";
import { WorkMetrics } from "./WorkMetrics";
import { Industries } from "./Industries";
import { WhyRuya } from "./WhyRuya";
import { EngagementModels } from "./EngagementModels";
import { ClientExperience } from "./ClientExperience";
import { Technology } from "./Technology";
import { ResearchDirection } from "./ResearchDirection";
import { Founder } from "./Founder";
import { FinalCTA } from "./FinalCTA";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { EASE } from "@/lib/motion";
import { useMotionProfile } from "@/hooks/useMotionProfile";

function SectionSeam() {
  const { choreography } = useMotionProfile();
  if (!choreography) {
    return <div aria-hidden className="mx-auto h-px max-w-6xl bg-border" />;
  }
  return (
    <motion.div
      aria-hidden
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 1.1, ease: EASE.outExpo }}
      className="mx-auto h-px max-w-6xl origin-center bg-gradient-to-r from-transparent via-border to-transparent"
    />
  );
}

export function Sections() {
  return (
    <>
      <StudioThesis />
      <SectionSeam />
      <Capabilities />
      <SectionSeam />
      <Process />
      <SectionSeam />
      <SelectedWork />
      <WorkMetrics />
      <SectionSeam />
      <Industries />
      <WhyRuya />
      <SectionSeam />
      <EngagementModels />
      <ClientExperience />
      <SectionSeam />
      <Technology />
      <SectionSeam />
      <ResearchDirection />
      <SectionSeam />
      <Founder />
      <SectionSeam />
      <FinalCTA />
      <Contact />
      <Footer />
    </>
  );
}
