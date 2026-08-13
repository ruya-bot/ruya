import { motion } from "framer-motion";
import { StudioThesis } from "./StudioThesis";
import { Capabilities } from "./Capabilities";
import { Process } from "./Process";
import { SelectedWork } from "./SelectedWork";
import { ProblemsWeSolve } from "./ProblemsWeSolve";
import { Industries } from "./Industries";
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
      {/* 2. ABOUT */}
      <StudioThesis />
      <SectionSeam />

      {/* 3. CAPABILITIES */}
      <Capabilities />
      <SectionSeam />

      {/* 4. HOW WE THINK */}
      <ProblemsWeSolve />
      <SectionSeam />

      {/* 5. WORK */}
      <SelectedWork />
      <SectionSeam />

      {/* 5. PROCESS */}
      <Process />
      <SectionSeam />

      {/* 6. WHO WE WORK WITH */}
      <Industries />
      <SectionSeam />

      {/* 7. FOUNDER */}
      <Founder />
      <SectionSeam />

      {/* 8. FINAL CTA */}
      <FinalCTA />

      {/* 9. CONTACT */}
      <Contact />

      {/* 10. FOOTER */}
      <Footer />
    </>
  );
}
